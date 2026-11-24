-- Run this upgrade for an existing booster collection installation.
-- Changes only the booster RPC; existing collections and permissions are retained.
begin;

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
commit;
