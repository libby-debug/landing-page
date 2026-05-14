create table if not exists public.module_mastery_scores (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  score integer not null check (score >= 0 and score <= 100),
  mastered boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);

grant select on table public.module_mastery_scores to anon;

grant select, insert, update, delete
on table public.module_mastery_scores
to authenticated;

grant select, insert, update, delete
on table public.module_mastery_scores
to service_role;

alter table public.module_mastery_scores enable row level security;

create policy "Users can read their own module mastery scores"
  on public.module_mastery_scores
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own module mastery scores"
  on public.module_mastery_scores
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own module mastery scores"
  on public.module_mastery_scores
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own module mastery scores"
  on public.module_mastery_scores
  for delete
  using (auth.uid() = user_id);
