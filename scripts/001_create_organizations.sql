-- Organizations table (Araç Servisleri)
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  phone text,
  email text,
  tax_number text,
  logo_url text,
  license_type text not null default 'trial', -- trial, basic, premium, enterprise
  license_expires_at timestamp with time zone,
  max_users integer not null default 3,
  max_customers integer not null default 50,
  is_active boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.organizations enable row level security;

-- Users can view their own organization
create policy "organizations_select_own"
  on public.organizations for select
  using (
    id in (
      select organization_id from public.users where auth.uid() = id
    )
  );

-- Only admins can update their organization
create policy "organizations_update_admin"
  on public.organizations for update
  using (
    id in (
      select organization_id from public.users 
      where auth.uid() = id and role = 'admin'
    )
  );
