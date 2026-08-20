-- AdSyncd Growth Audit schema
-- Anonymous visitors may submit an audit, but never read submitted leads.
create table if not exists public.growth_audits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  phone text,
  industry text not null,
  revenue text not null,
  spend text not null,
  challenge text not null
);

alter table public.growth_audits enable row level security;

drop policy if exists "Allow public growth audit inserts" on public.growth_audits;
create policy "Allow public growth audit inserts"
  on public.growth_audits for insert
  to anon, authenticated
  with check (true);

-- Intentionally no SELECT policy is created for anon. Lead data remains private.
