-- Admin testing tools for the signed-in administrator's own collection.
-- Apply after booster-collection.sql; no table grants or existing policies change.
begin;

-- Keep normal saving compatible with the Energy Foil bonus when installing admin tools.
create or replace function public.booster_collect_pack(p_user_id uuid, p_pack_id uuid, p_cards jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  receipt uuid;
  card jsonb;
begin
  if owner_id is null or owner_id is distinct from p_user_id then
    raise exception 'Not authorized' using errcode = '42501';
  end if;
  if p_pack_id is null or jsonb_typeof(p_cards) is distinct from 'array' then
    raise exception 'Invalid booster';
  end if;
  if jsonb_array_length(p_cards) not in (5, 6) or octet_length(p_cards::text) > 32768 then
    raise exception 'Invalid booster size';
  end if;
  for card in select value from jsonb_array_elements(p_cards) loop
    if jsonb_typeof(card) is distinct from 'object'
      or coalesce(length(card->>'card_key'), 0) not between 1 and 500
      or coalesce(length(card->>'pokemon_name'), 0) not between 1 and 100
      or coalesce(card->>'rarity', '') not in ('common', 'uncommon', 'rare', 'super', 'special')
      or coalesce(card->>'variant', '') not in ('normal', 'mega', 'tera', 'z')
      or jsonb_typeof(card->'full_art') is distinct from 'boolean'
      or jsonb_typeof(card->'card_data') is distinct from 'object' then
      raise exception 'Invalid card';
    end if;
  end loop;

  -- Five main cards, optionally one independent Energy Foil bonus.
  if (select count(*) from jsonb_array_elements(p_cards) c
      where c->'card_data'->'energyFoil' = 'true'::jsonb) <> jsonb_array_length(p_cards) - 5 then
    raise exception 'Invalid Energy Foil bonus count';
  end if;
  if exists (select 1 from jsonb_array_elements(p_cards) c
      where c->'card_data'->'energyFoil' = 'true'::jsonb
        and (c->>'variant' <> 'normal' or c->'full_art' <> 'false'::jsonb
          or coalesce(c->'card_data'->>'trainer', '') <> ''
          or c->'card_data'->'fullArt' <> 'false'::jsonb)) then
    raise exception 'Energy Foil cannot combine with other treatments';
  end if;

  insert into public.booster_players(user_id) values(owner_id) on conflict do nothing;
  -- Serialize pack credits per account, including requests from different tabs/devices.
  perform 1 from public.booster_players where user_id = owner_id for update;
  insert into public.booster_packs(user_id, id) values(owner_id, p_pack_id)
    on conflict do nothing returning id into receipt;
  if receipt is null then return jsonb_build_object('recorded', false); end if;

  for card in select value from jsonb_array_elements(p_cards) loop
    insert into public.booster_cards(user_id, card_key, pokemon_name, rarity, full_art, variant, card_data, count)
      values(owner_id, card->>'card_key', card->>'pokemon_name', card->>'rarity',
        (card->>'full_art')::boolean, card->>'variant', card->'card_data', 1)
      on conflict(user_id, card_key) do update set count = public.booster_cards.count + 1, rarity = excluded.rarity;
  end loop;
  update public.booster_players set packs_opened = packs_opened + 1 where user_id = owner_id;
  return jsonb_build_object('recorded', true);
end;
$$;
revoke all on function public.booster_collect_pack(uuid, uuid, jsonb) from public, anon;
grant execute on function public.booster_collect_pack(uuid, uuid, jsonb) to authenticated;


create or replace function public.booster_admin_collection(
  p_user_id uuid,
  p_action text,
  p_card_key text default null,
  p_count bigint default null,
  p_card jsonb default null,
  p_set_id text default null
)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  affected bigint;
begin
  if owner_id is null or owner_id is distinct from p_user_id
    or coalesce(auth.jwt()->'app_metadata'->'site_access'->'permissions'->>'play_milo', 'false') <> 'true' then
    raise exception 'Not authorized' using errcode = '42501';
  end if;
  if p_action not in ('set_count', 'add_card', 'clear_set', 'clear_all', 'set_packs') or p_action is null then
    raise exception 'Unknown collection action';
  end if;
  if p_action in ('set_count', 'add_card', 'set_packs')
    and (p_count is null or p_count < 0 or p_count > 1000000) then
    raise exception 'Invalid count';
  end if;

  insert into public.booster_players(user_id) values(owner_id) on conflict do nothing;
  -- Serialize admin edits with normal pack credits, including other browser tabs.
  perform 1 from public.booster_players where user_id = owner_id for update;

  if p_action = 'set_count' then
    if p_card_key is null or length(p_card_key) not between 1 and 500 then
      raise exception 'Invalid card key';
    end if;
    if p_count = 0 then
      delete from public.booster_cards where user_id = owner_id and card_key = p_card_key;
    else
      update public.booster_cards set count = p_count where user_id = owner_id and card_key = p_card_key;
    end if;
    get diagnostics affected = row_count;
    if affected = 0 then raise exception 'Card no longer exists'; end if;
  elsif p_action = 'add_card' then
    if p_count < 1 or p_card is null or jsonb_typeof(p_card) is distinct from 'object'
      or octet_length(p_card::text) > 32768
      or coalesce(length(p_card->>'card_key'), 0) not between 1 and 500
      or coalesce(length(p_card->>'pokemon_name'), 0) not between 1 and 100
      or coalesce(p_card->>'rarity', '') not in ('common', 'uncommon', 'rare', 'super', 'special')
      or coalesce(p_card->>'variant', '') not in ('normal', 'mega', 'tera', 'z')
      or jsonb_typeof(p_card->'full_art') is distinct from 'boolean'
      or jsonb_typeof(p_card->'card_data') is distinct from 'object' then
      raise exception 'Invalid card';
    end if;
    if coalesce((select count from public.booster_cards where user_id = owner_id and card_key = p_card->>'card_key'), 0) + p_count > 1000000 then
      raise exception 'Too many copies';
    end if;
    insert into public.booster_cards(user_id, card_key, pokemon_name, rarity, full_art, variant, card_data, count)
      values(owner_id, p_card->>'card_key', p_card->>'pokemon_name', p_card->>'rarity',
        (p_card->>'full_art')::boolean, p_card->>'variant', p_card->'card_data', p_count)
      on conflict(user_id, card_key) do update set count = public.booster_cards.count + excluded.count;
  elsif p_action = 'clear_set' then
    if p_set_id is null or length(p_set_id) not between 1 and 100 then
      raise exception 'Invalid set';
    end if;
    delete from public.booster_cards where user_id = owner_id and coalesce(card_data->>'setId', 'milo') = p_set_id;
  elsif p_action = 'clear_all' then
    delete from public.booster_cards where user_id = owner_id;
  elsif p_action = 'set_packs' then
    update public.booster_players set packs_opened = p_count where user_id = owner_id;
  end if;
  -- Keep pack receipts: replaying an old UUID must never restore deleted cards.
  return jsonb_build_object('updated', true);
end;
$$;

revoke all on function public.booster_admin_collection(uuid, text, text, bigint, jsonb, text) from public, anon;
grant execute on function public.booster_admin_collection(uuid, text, text, bigint, jsonb, text) to authenticated;
commit;
