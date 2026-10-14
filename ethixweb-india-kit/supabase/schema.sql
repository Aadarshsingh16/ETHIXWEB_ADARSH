-- Ethixweb India — leads schema. Run in Supabase SQL editor.
create extension if not exists "pgcrypto";

create type lead_status as enum ('new', 'contacted', 'won', 'lost');

create table public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  name          text not null check (char_length(name) between 2 and 80),
  email         text not null check (char_length(email) <= 254),
  phone         text not null check (phone ~ '^[6-9][0-9]{9}$'),   -- 10-digit Indian mobile, without +91
  company       text check (char_length(company) <= 120),
  city          text not null,
  service       text not null,
  budget        text,
  contact_pref  text not null default 'whatsapp' check (contact_pref in ('whatsapp','call','email')),
  message       text check (char_length(message) <= 2000),
  consent       boolean not null default false,

  status        lead_status not null default 'new',
  notes         text check (char_length(notes) <= 4000),

  source_page   text,                -- e.g. /en/contact
  ip_hash       text,                -- sha256(ip + IP_HASH_SALT); raw IP is never stored
  user_agent    text
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx     on public.leads (status);
create index leads_ip_hash_idx    on public.leads (ip_hash, created_at desc);   -- rate limiting lookups

-- keep updated_at fresh
create or replace function public.set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger leads_set_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

-- Row Level Security: ON, and NO policies for anon/authenticated roles.
-- => the public (anon key) can neither read nor write leads.
-- All access goes through server code using the service-role key, which bypasses RLS,
-- after the server has verified the admin session + ADMIN_EMAILS allowlist.
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
