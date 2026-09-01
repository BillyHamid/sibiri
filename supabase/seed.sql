-- ═══════════════════════════════════════════════════════════════════════════
-- Contenu de départ — reprend les textes actuels du site pour que le
-- back-office affiche tout de suite les vraies valeurs (au lieu d'être vide).
-- À exécuter après schema.sql, dans Supabase → SQL Editor.
-- ═══════════════════════════════════════════════════════════════════════════

insert into content (key, value, type, page, section, label) values
  ('home.hero.title',    '"Un Groupe Multisectoriel"', 'text', 'Accueil', 'Hero', 'Titre principal'),
  ('home.hero.subtitle', '"Bâtisseurs d''Avenir"',      'text', 'Accueil', 'Hero', 'Sous-titre'),
  ('home.hero.cta',      '"Accéder à nos filiales"',    'text', 'Accueil', 'Hero', 'Texte du bouton'),
  ('home.filiales.title','"Un Groupe, 5 expertises"',   'text', 'Accueil', 'Nos filiales', 'Titre de section'),
  ('home.filiales.subtitle', '"Chaque filiale incarne un secteur clé du développement africain, avec une stratégie d''excellence propre à son domaine."', 'text', 'Accueil', 'Nos filiales', 'Sous-titre de section')
on conflict (key) do nothing;
