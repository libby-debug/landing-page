create table if not exists public.user_progress_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  progress_key text not null,
  progress_data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, progress_key)
);

grant select on table public.user_progress_state to anon;

grant select, insert, update, delete
on table public.user_progress_state
to authenticated;

grant select, insert, update, delete
on table public.user_progress_state
to service_role;

alter table public.user_progress_state enable row level security;

create policy "Users can read their own progress state"
  on public.user_progress_state
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress state"
  on public.user_progress_state
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress state"
  on public.user_progress_state
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own progress state"
  on public.user_progress_state
  for delete
  using (auth.uid() = user_id);
