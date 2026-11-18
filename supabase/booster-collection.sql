-- Apply once in the project's Supabase SQL editor before deploying the booster game.
-- This migration is independent of the quiz, cost and account-permission tables.
begin;

create table if not exists public.booster_players (
  user_id uuid primary key references auth.users(id) on delete cascade,
  packs_opened bigint not null default 0 check (packs_opened >= 0)
);
create table if not exists public.booster_packs (
  user_id uuid not null references auth.users(id) on delete cascade,
  id uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);
create table if not exists public.booster_cards (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_key text not null,
  pokemon_name text not null,
  rarity text not null check (rarity in ('common', 'uncommon', 'rare', 'super', 'special')),
  full_art boolean not null,
  variant text not null check (variant in ('normal', 'mega', 'tera', 'z')),
  card_data jsonb not null,
  count bigint not null check (count > 0),
  primary key (user_id, card_key)
);

alter table public.booster_players enable row level security;
alter table public.booster_packs enable row level security;
alter table public.booster_cards enable row level security;
revoke all on public.booster_players, public.booster_packs, public.booster_cards from anon, authenticated;
grant select on public.booster_players, public.booster_cards to authenticated;
drop policy if exists "owner reads booster progress" on public.booster_players;
create policy "owner reads booster progress" on public.booster_players for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "owner reads booster cards" on public.booster_cards;
create policy "owner reads booster cards" on public.booster_cards for select to authenticated
  using ((select auth.uid()) = user_id);

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
  if jsonb_array_length(p_cards) <> 5 or octet_length(p_cards::text) > 32768 then
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
      on conflict(user_id, card_key) do update set count = public.booster_cards.count + 1;
  end loop;
  update public.booster_players set packs_opened = packs_opened + 1 where user_id = owner_id;
  return jsonb_build_object('recorded', true);
end;
$$;
revoke all on function public.booster_collect_pack(uuid, uuid, jsonb) from public, anon;
grant execute on function public.booster_collect_pack(uuid, uuid, jsonb) to authenticated;
commit;
