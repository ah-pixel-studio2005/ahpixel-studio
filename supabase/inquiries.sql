create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  website_type text not null,
  business_type text not null,
  goal text not null,
  budget text not null,
  message text not null,
  language text,
  source_page text,
  status text not null default 'new',
  ip_hash text,
  user_agent text
);

alter table public.inquiries enable row level security;

comment on table public.inquiries is 'Private AHPixel Studio project inquiries. Writes are performed only by the server using the service-role key.';
