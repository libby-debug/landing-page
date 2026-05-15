create table if not exists public.user_billing_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  subscription_status text,
  plan_name text,
  price_id text,
  paid_active boolean not null default false,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on table public.user_billing_profiles to anon;

grant select, insert, update, delete
on table public.user_billing_profiles
to authenticated;

grant select, insert, update, delete
on table public.user_billing_profiles
to service_role;

alter table public.user_billing_profiles enable row level security;

drop policy if exists "Users can read their own billing profile"
  on public.user_billing_profiles;
create policy "Users can read their own billing profile"
  on public.user_billing_profiles
  for select
  using (auth.uid() = user_id);
