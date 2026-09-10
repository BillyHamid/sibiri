-- SIBIRI Holding — mise à niveau éditoriale (à exécuter dans Supabase SQL Editor)
-- Ajoute les brouillons privés et l'historique des publications sans modifier
-- les contenus existants ni l'accès public.

create table if not exists public.content_drafts (
  key         text primary key references public.content(key) on delete cascade,
  value       jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users(id) on delete set null
);
alter table public.content_drafts enable row level security;
drop policy if exists "Admin read drafts" on public.content_drafts;
drop policy if exists "Admin insert drafts" on public.content_drafts;
drop policy if exists "Admin update drafts" on public.content_drafts;
drop policy if exists "Admin delete drafts" on public.content_drafts;
create policy "Admin read drafts" on public.content_drafts for select to authenticated using (public.is_admin());
create policy "Admin insert drafts" on public.content_drafts for insert to authenticated with check (public.is_admin());
create policy "Admin update drafts" on public.content_drafts for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin delete drafts" on public.content_drafts for delete to authenticated using (public.is_admin());

create table if not exists public.content_revisions (
  id           bigint generated always as identity primary key,
  content_key  text not null,
  value        jsonb,
  action       text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  changed_at   timestamptz not null default now(),
  changed_by   uuid references auth.users(id) on delete set null
);
create index if not exists content_revisions_key_idx on public.content_revisions (content_key, changed_at desc);
alter table public.content_revisions enable row level security;
drop policy if exists "Admin read revisions" on public.content_revisions;
create policy "Admin read revisions" on public.content_revisions for select to authenticated using (public.is_admin());

create or replace function public.log_content_revision()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.content_revisions (content_key, value, action, changed_by)
  values (coalesce(new.key, old.key), coalesce(new.value, old.value), tg_op, auth.uid());
  return coalesce(new, old);
end;
$$;
drop trigger if exists content_revision_audit on public.content;
create trigger content_revision_audit after insert or update or delete on public.content
  for each row execute function public.log_content_revision();
