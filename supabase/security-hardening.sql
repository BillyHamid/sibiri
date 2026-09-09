-- Renforcement sécurité pour une base Supabase déjà créée.
-- À exécuter une fois dans Supabase → SQL Editor.

alter table public.content add column if not exists is_public boolean not null default true;
create index if not exists content_public_idx on public.content (is_public) where is_public = true;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.content enable row level security;
drop policy if exists "Public read access" on public.content;
drop policy if exists "Authenticated write access" on public.content;
drop policy if exists "Authenticated update access" on public.content;
drop policy if exists "Public read published content" on public.content;
drop policy if exists "Admin insert access" on public.content;
drop policy if exists "Admin update access" on public.content;
drop policy if exists "Admin delete access" on public.content;
create policy "Public read published content" on public.content
  for select to anon, authenticated using (is_public = true or public.is_admin());
create policy "Admin insert access" on public.content
  for insert to authenticated with check (public.is_admin());
create policy "Admin update access" on public.content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin delete access" on public.content
  for delete to authenticated using (public.is_admin());

drop policy if exists "Authenticated upload images" on storage.objects;
drop policy if exists "Authenticated update images" on storage.objects;
drop policy if exists "Admin upload images" on storage.objects;
drop policy if exists "Admin update images" on storage.objects;
drop policy if exists "Admin delete images" on storage.objects;
create policy "Admin upload images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'content-images'
    and public.is_admin()
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
    and coalesce((metadata ->> 'size')::bigint, 999999999) <= 5242880
  );
create policy "Admin update images" on storage.objects
  for update to authenticated
  using (bucket_id = 'content-images' and public.is_admin())
  with check (
    bucket_id = 'content-images'
    and public.is_admin()
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
    and coalesce((metadata ->> 'size')::bigint, 999999999) <= 5242880
  );
create policy "Admin delete images" on storage.objects
  for delete to authenticated using (bucket_id = 'content-images' and public.is_admin());

-- Ajouter ensuite le premier administrateur depuis le SQL Editor :
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'admin@votre-domaine.com';
