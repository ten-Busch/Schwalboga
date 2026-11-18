-- Run ONCE in the Supabase SQL editor BEFORE deploying the updated JavaScript.
-- Fingerprints are bootstrap matching values, not secrets or authorization tokens.
begin;
-- This mapping exists only within the UPDATE statement; no table is created.
with legacy_account_access(fingerprint, access) as (values
('badb275aa01f9e2af8adc95b070695df5f3412fb2487199cbd456ed26512cb0e', '{"permissions":{"edit_costs":true,"view_all_replays":false,"play_milo":true},"replay_players":["tenbusch"]}'::jsonb),
('611037fc68a73b6e467f967a65f35d572ef4ef5515e463cf9ee327efd7f9d8b1', '{"permissions":{"edit_costs":true,"view_all_replays":false,"play_milo":false},"replay_players":["gysi1994"]}'::jsonb),
('f99c3794821d072e355d10959c67187568c5d5ef5ee5f4211d3d56c3d5840e72', '{"permissions":{"edit_costs":false,"view_all_replays":true,"play_milo":false},"replay_players":[]}'::jsonb),
('7e18234e4be451d47c35474953b8c5b68d760cc684d733a941fae91adb8de48b', '{"permissions":{"edit_costs":false,"view_all_replays":true,"play_milo":false},"replay_players":[]}'::jsonb),
('d98df9e444b785b5366b9de1a9f71591b4da720ec961c6e387f8de77d7f036b7', '{"permissions":{"edit_costs":false,"view_all_replays":false,"play_milo":false},"replay_players":["mrstarli"]}'::jsonb),
('ce0a81c0a6e037d1dbe27c14aef871160f2303a92323f04d92e070d50abf2d2d', '{"permissions":{"edit_costs":false,"view_all_replays":false,"play_milo":false},"replay_players":["nyantacuga"]}'::jsonb),
('104a6cd797246540af1736200d8d4ac9b00d9eb68acf06716fabfe679a5434f1', '{"permissions":{"edit_costs":false,"view_all_replays":false,"play_milo":false},"replay_players":["sibra1998"]}'::jsonb)
)

-- Preserve existing metadata and snapshot the old replay identity fallbacks.
-- Every existing account retains its email-prefix/display-name replay identities.
update auth.users u
set raw_app_meta_data = coalesce(u.raw_app_meta_data, '{}'::jsonb) || jsonb_build_object(
  'site_access', coalesce(u.raw_app_meta_data->'site_access', '{}'::jsonb) ||
    jsonb_build_object(
      'permissions', coalesce(u.raw_app_meta_data->'site_access'->'permissions', '{}'::jsonb) || coalesce(a.access->'permissions', '{}'::jsonb),
      'replay_players', (select coalesce(jsonb_agg(distinct identity), '[]'::jsonb) from jsonb_array_elements(
        coalesce(u.raw_app_meta_data->'site_access'->'replay_players', '[]'::jsonb) ||
        coalesce(a.access->'replay_players', '[]'::jsonb) ||
        jsonb_build_array(split_part(coalesce(u.email, ''), '@', 1), coalesce(u.raw_user_meta_data->>'display_name', ''))
      ) as identities(identity))
    )
)
from (select users.id, legacy.access from auth.users users left join legacy_account_access legacy
  on legacy.fingerprint = encode(sha256(convert_to(lower(btrim(users.email)), 'UTF8')), 'hex')) a
where u.id = a.id;

drop policy if exists "authenticated users can add costs" on public.pokemon_costs;
drop policy if exists "cost administrators can add costs" on public.pokemon_costs;
create policy "cost administrators can add costs"
on public.pokemon_costs for insert
to authenticated
with check (
  (select auth.uid()) = updated_by
  and (coalesce((select auth.jwt() -> 'app_metadata' -> 'site_access' -> 'permissions' ->> 'edit_costs'), 'false') = 'true')
);

drop policy if exists "authenticated users can update costs" on public.pokemon_costs;
drop policy if exists "cost administrators can update costs" on public.pokemon_costs;
create policy "cost administrators can update costs"
on public.pokemon_costs for update
to authenticated
using (
  (coalesce((select auth.jwt() -> 'app_metadata' -> 'site_access' -> 'permissions' ->> 'edit_costs'), 'false') = 'true')
)
with check (
  (select auth.uid()) = updated_by
  and (coalesce((select auth.jwt() -> 'app_metadata' -> 'site_access' -> 'permissions' ->> 'edit_costs'), 'false') = 'true')
);


drop policy if exists "quiz admin reads scores" on public.milo_highscores;
create policy "quiz admin reads scores"
on public.milo_highscores for select to authenticated
using ((coalesce((select auth.jwt() -> 'app_metadata' -> 'site_access' -> 'permissions' ->> 'play_milo'), 'false') = 'true'));

drop policy if exists "quiz admin inserts scores" on public.milo_highscores;
create policy "quiz admin inserts scores"
on public.milo_highscores for insert to authenticated
with check (
  created_by = (select auth.uid())
  and (coalesce((select auth.jwt() -> 'app_metadata' -> 'site_access' -> 'permissions' ->> 'play_milo'), 'false') = 'true')
);

drop policy if exists "quiz admin edits scores" on public.milo_highscores;
create policy "quiz admin edits scores"
on public.milo_highscores for update to authenticated
using ((coalesce((select auth.jwt() -> 'app_metadata' -> 'site_access' -> 'permissions' ->> 'play_milo'), 'false') = 'true'))
with check ((coalesce((select auth.jwt() -> 'app_metadata' -> 'site_access' -> 'permissions' ->> 'play_milo'), 'false') = 'true'));

commit;
