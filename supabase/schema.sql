-- ═══════════════════════════════════════════════════════════════════════════
-- Schéma du back-office SIBIRI Holding
-- À exécuter une fois dans : Supabase → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Table de contenu (clé → valeur) ──────────────────────────────────────────
-- Chaque champ modifiable du site (titre, paragraphe, image...) est une ligne.
-- La clé suit la convention "page.section.champ", ex: "home.hero.title".
create table if not exists content (
  key         text primary key,
  value       jsonb not null,
  type        text not null default 'text' check (type in ('text', 'richtext', 'image', 'list')),
  page        text not null,
  section     text not null,
  label       text not null,       -- nom lisible affiché dans le back-office
  is_public   boolean not null default true,
  updated_at  timestamptz not null default now(),
  updated_by  text
);

create index if not exists content_page_idx on content (page);
create index if not exists content_public_idx on content (is_public) where is_public = true;

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table content enable row level security;

-- Liste explicite des comptes autorisés à administrer le site.
create table if not exists admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table admin_users enable row level security;

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

-- Le site public lit uniquement les lignes publiées ; les administrateurs
-- peuvent accéder au contenu complet depuis le back-office.
drop policy if exists "Public read access" on content;
create policy "Public read published content" on content
  for select to anon, authenticated using (is_public = true or public.is_admin());

-- Les écritures requièrent désormais le rôle administrateur explicite.
drop policy if exists "Authenticated write access" on content;
drop policy if exists "Authenticated update access" on content;
create policy "Admin insert access" on content
  for insert to authenticated with check (public.is_admin());
create policy "Admin update access" on content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin delete access" on content
  for delete to authenticated using (public.is_admin());

-- ── Workflow éditorial : brouillons et historique ───────────────────────────
-- Le contenu public reste dans `content`. Un brouillon n'est jamais visible
-- sur le site tant qu'un administrateur ne choisit pas explicitement Publier.
create table if not exists content_drafts (
  key         text primary key references content(key) on delete cascade,
  value       jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users(id) on delete set null
);
alter table content_drafts enable row level security;
create policy "Admin read drafts" on content_drafts for select to authenticated using (public.is_admin());
create policy "Admin insert drafts" on content_drafts for insert to authenticated with check (public.is_admin());
create policy "Admin update drafts" on content_drafts for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin delete drafts" on content_drafts for delete to authenticated using (public.is_admin());

create table if not exists content_revisions (
  id           bigint generated always as identity primary key,
  content_key  text not null,
  value        jsonb,
  action       text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  changed_at   timestamptz not null default now(),
  changed_by   uuid references auth.users(id) on delete set null
);
create index if not exists content_revisions_key_idx on content_revisions (content_key, changed_at desc);
alter table content_revisions enable row level security;
create policy "Admin read revisions" on content_revisions for select to authenticated using (public.is_admin());

create or replace function public.log_content_revision()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.content_revisions (content_key, value, action, changed_by)
  values (coalesce(new.key, old.key), coalesce(new.value, old.value), tg_op, auth.uid());
  return coalesce(new, old);
end;
$$;
drop trigger if exists content_revision_audit on content;
create trigger content_revision_audit
  after insert or update or delete on content
  for each row execute function public.log_content_revision();

-- ── Stockage des images uploadées depuis le back-office ─────────────────────
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read images" on storage.objects;
create policy "Public read images" on storage.objects
  for select using (bucket_id = 'content-images');

drop policy if exists "Authenticated upload images" on storage.objects;
drop policy if exists "Authenticated update images" on storage.objects;
create policy "Admin upload images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'content-images' and public.is_admin()
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
    and coalesce((metadata ->> 'size')::bigint, 999999999) <= 5242880
  );
create policy "Admin update images" on storage.objects
  for update to authenticated
  using (bucket_id = 'content-images' and public.is_admin())
  with check (
    bucket_id = 'content-images' and public.is_admin()
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
    and coalesce((metadata ->> 'size')::bigint, 999999999) <= 5242880
  );
create policy "Admin delete images" on storage.objects
  for delete to authenticated using (bucket_id = 'content-images' and public.is_admin());

-- Ajouter le premier administrateur depuis le SQL Editor Supabase :
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'admin@votre-domaine.com';
