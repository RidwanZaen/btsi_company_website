-- Jalankan di Supabase Dashboard > SQL Editor

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  seq bigint generated always as identity,
  name text not null,
  category text not null check (category in ('Customer', 'Partner')),
  logo_url text not null default '',
  logo_path text,
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;

create policy "clients: public read" on public.clients
  for select using (true);
create policy "clients: admin insert" on public.clients
  for insert to authenticated with check (true);
create policy "clients: admin update" on public.clients
  for update to authenticated using (true) with check (true);
create policy "clients: admin delete" on public.clients
  for delete to authenticated using (true);

-- Bucket gambar logo (publik, maks 2 MB)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('logos', 'logos', true, 2097152, array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
on conflict (id) do nothing;

create policy "logos: public read" on storage.objects
  for select using (bucket_id = 'logos');
create policy "logos: admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'logos');
create policy "logos: admin update" on storage.objects
  for update to authenticated using (bucket_id = 'logos') with check (bucket_id = 'logos');
create policy "logos: admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'logos');

-- Data awal (customer + partner yang sudah ada)
insert into public.clients (name, category) values
  ('Bank Woori Saudara', 'Customer'),
  ('KB Bank', 'Customer'),
  ('IBK Bank Indonesia', 'Customer'),
  ('Shinhan Bank Indonesia', 'Customer'),
  ('OK! Bank Indonesia', 'Customer'),
  ('OK! Asset', 'Customer'),
  ('Woori Finance Indonesia', 'Customer'),
  ('KB Valbury Sekuritas', 'Customer'),
  ('KB Bank Syariah', 'Customer'),
  ('Mirae Asset Sekuritas', 'Customer'),
  ('Kreditplus', 'Customer'),
  ('J Trust Bank', 'Customer'),
  ('Damai Putra Group', 'Customer'),
  ('MarkAny', 'Partner'),
  ('NETAND', 'Partner'),
  ('PIOLINK', 'Partner'),
  ('Menlo Security', 'Partner'),
  ('Raon', 'Partner'),
  ('AhnLab', 'Partner'),
  ('SECUI', 'Partner'),
  ('EY', 'Partner'),
  ('Everyzone', 'Partner'),
  ('Secure Systems', 'Partner'),
  ('Blue Global Tech', 'Partner'),
  ('YoungLimWon Soft Lab', 'Partner'),
  ('ensof Technology', 'Partner'),
  ('PT. Inkor Sinergi Mandiri', 'Partner'),
  ('Snet', 'Partner'),
  ('INTIKOM', 'Partner'),
  ('next TI', 'Partner'),
  ('ENAGE', 'Partner'),
  ('Fortress Data Services', 'Partner'),
  ('G.I.S', 'Partner'),
  ('...plus info', 'Partner');
