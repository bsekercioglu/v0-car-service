-- Users/Profiles table with organization and role
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  email text not null,
  first_name text not null,
  last_name text not null,
  phone text,
  role text not null default 'user', -- admin, manager, technician, user
  is_active boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.users enable row level security;

-- Users can view users in their organization
create policy "users_select_org"
  on public.users for select
  using (
    organization_id in (
      select organization_id from public.users where auth.uid() = id
    )
  );

-- Only admins and managers can insert users
create policy "users_insert_admin"
  on public.users for insert
  with check (
    organization_id in (
      select organization_id from public.users 
      where auth.uid() = id and role in ('admin', 'manager')
    )
  );

-- Only admins and managers can update users
create policy "users_update_admin"
  on public.users for update
  using (
    organization_id in (
      select organization_id from public.users 
      where auth.uid() = id and role in ('admin', 'manager')
    )
  );

-- Only admins can delete users
create policy "users_delete_admin"
  on public.users for delete
  using (
    organization_id in (
      select organization_id from public.users 
      where auth.uid() = id and role = 'admin'
    )
  );
