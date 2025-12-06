-- Vehicles table
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  plate_number text not null,
  brand text not null,
  model text not null,
  year integer,
  vin text, -- Şase numarası
  engine_number text, -- Motor numarası
  color text,
  fuel_type text,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.vehicles enable row level security;

create policy "vehicles_all_org"
  on public.vehicles for all
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
