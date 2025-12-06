-- Customers table with organization scope
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text,
  address text,
  city text,
  postal_code text,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.customers enable row level security;

create policy "customers_all_org"
  on public.customers for all
  using (
    organization_id in (
      select organization_id from public.users where auth.uid() = id
    )
  )
  with check (
    organization_id in (
      select organization_id from public.users where auth.uid() = id
    )
  );
