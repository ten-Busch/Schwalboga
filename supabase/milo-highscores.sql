create table if not exists public.milo_highscores (
  id uuid primary key,
  player_name text not null check (char_length(btrim(player_name)) between 1 and 40),
  score integer not null check (score in (
    0, 50, 100, 200, 300, 500, 1000, 2000, 4000, 8000,
    16000, 32000, 64000, 125000, 250000, 500000, 1000000
  )),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists milo_highscores_ranking
  on public.milo_highscores (score desc, created_at asc, id asc);

-- Existing scores were collected while the quiz was in test mode.
alter table public.milo_highscores
  add column if not exists run_mode text not null default 'safe'
    check (run_mode in ('safe', 'risk')),
  add column if not exists is_test boolean not null default true,
  add column if not exists is_deleted boolean not null default false;

alter table public.milo_highscores enable row level security;
revoke all on public.milo_highscores from anon, authenticated;
grant select, insert on public.milo_highscores to authenticated;
grant update (player_name, score, run_mode, is_test, is_deleted)
  on public.milo_highscores to authenticated;

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
