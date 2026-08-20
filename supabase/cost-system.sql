create table if not exists public.pokemon_costs (
  pokemon_name text primary key,
  cost smallint null check (cost between 0 and 32),
  cost_dbl smallint null check (cost_dbl between 0 and 32),
  updated_at timestamptz not null default now(),
  updated_by uuid null references auth.users(id)
);

create table if not exists public.pokemon_cost_history (
  id bigint generated always as identity primary key,
  pokemon_name text not null,
  old_cost smallint null,
  new_cost smallint null,
  old_cost_dbl smallint null,
  new_cost_dbl smallint null,
  changed_at timestamptz not null default now(),
  changed_by uuid null references auth.users(id)
);

alter table public.pokemon_costs enable row level security;
alter table public.pokemon_cost_history enable row level security;

drop policy if exists "authenticated users can read costs" on public.pokemon_costs;
create policy "authenticated users can read costs"
on public.pokemon_costs for select
to authenticated
using (true);

drop policy if exists "authenticated users can add costs" on public.pokemon_costs;
drop policy if exists "cost administrators can add costs" on public.pokemon_costs;
create policy "cost administrators can add costs"
on public.pokemon_costs for insert
to authenticated
with check (
  (select auth.uid()) = updated_by
  and lower(coalesce((select auth.jwt() ->> 'email'), '')) in (
    'tenbusch1@gmail.com',
    'stefan.gysbers@web.de'
  )
);

drop policy if exists "authenticated users can update costs" on public.pokemon_costs;
drop policy if exists "cost administrators can update costs" on public.pokemon_costs;
create policy "cost administrators can update costs"
on public.pokemon_costs for update
to authenticated
using (
  lower(coalesce((select auth.jwt() ->> 'email'), '')) in (
    'tenbusch1@gmail.com',
    'stefan.gysbers@web.de'
  )
)
with check (
  (select auth.uid()) = updated_by
  and lower(coalesce((select auth.jwt() ->> 'email'), '')) in (
    'tenbusch1@gmail.com',
    'stefan.gysbers@web.de'
  )
);

drop policy if exists "authenticated users can read cost history" on public.pokemon_cost_history;
create policy "authenticated users can read cost history"
on public.pokemon_cost_history for select
to authenticated
using (true);

create or replace function public.record_pokemon_cost_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.pokemon_cost_history (
      pokemon_name, old_cost, new_cost, old_cost_dbl, new_cost_dbl, changed_by
    ) values (
      new.pokemon_name, null, new.cost, null, new.cost_dbl, new.updated_by
    );
  elsif old.cost is distinct from new.cost or old.cost_dbl is distinct from new.cost_dbl then
    insert into public.pokemon_cost_history (
      pokemon_name, old_cost, new_cost, old_cost_dbl, new_cost_dbl, changed_by
    ) values (
      new.pokemon_name, old.cost, new.cost, old.cost_dbl, new.cost_dbl, new.updated_by
    );
  end if;
  return new;
end;
$$;

drop trigger if exists pokemon_cost_change_history on public.pokemon_costs;
create trigger pokemon_cost_change_history
after insert or update on public.pokemon_costs
for each row execute function public.record_pokemon_cost_change();

grant select, insert, update on public.pokemon_costs to authenticated;
grant select on public.pokemon_cost_history to authenticated;
revoke all on public.pokemon_costs from anon;
revoke all on public.pokemon_cost_history from anon;
