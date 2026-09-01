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
  updated_at  timestamptz not null default now(),
  updated_by  text
);

create index if not exists content_page_idx on content (page);

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table content enable row level security;

-- Le site public (visiteurs) peut lire tout le contenu, sans compte.
drop policy if exists "Public read access" on content;
create policy "Public read access" on content
  for select using (true);

-- Seuls les utilisateurs connectés (comptes admin créés dans Supabase Auth)
-- peuvent créer/modifier du contenu.
drop policy if exists "Authenticated write access" on content;
create policy "Authenticated write access" on content
  for insert to authenticated with check (true);

drop policy if exists "Authenticated update access" on content;
create policy "Authenticated update access" on content
  for update to authenticated using (true);

-- ── Stockage des images uploadées depuis le back-office ─────────────────────
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read images" on storage.objects;
create policy "Public read images" on storage.objects
  for select using (bucket_id = 'content-images');

drop policy if exists "Authenticated upload images" on storage.objects;
create policy "Authenticated upload images" on storage.objects
  for insert to authenticated with check (bucket_id = 'content-images');

drop policy if exists "Authenticated update images" on storage.objects;
create policy "Authenticated update images" on storage.objects
  for update to authenticated using (bucket_id = 'content-images');
