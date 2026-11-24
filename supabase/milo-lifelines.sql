-- Run once in the Supabase SQL editor before using bonus lifelines.
-- Existing scores and access policies are preserved.
alter table public.milo_highscores
  drop constraint if exists milo_highscores_score_check;
alter table public.milo_highscores
  add constraint milo_highscores_score_check check (score between 0 and 1000000);

alter table public.milo_highscores
  add column if not exists lifelines jsonb not null default '[]'::jsonb
    check (jsonb_typeof(lifelines) = 'array' and jsonb_array_length(lifelines) in (0, 4)),
  add column if not exists lifelines_used integer generated always as
    (jsonb_array_length(jsonb_path_query_array(lifelines, '$[*] ? (@.used == true)'))) stored;

drop index if exists public.milo_highscores_ranking;
create index milo_highscores_ranking
  on public.milo_highscores (score desc, lifelines_used asc, created_at asc, id asc);
grant update (lifelines) on public.milo_highscores to authenticated;
