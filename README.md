# SIBIRI Holding

Site React / Vite et back-office de gestion des contenus.

## Démarrer

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Le site est accessible sur `http://127.0.0.1:5173/` et le back-office sur `/admin`.
Les variables Supabase publiques sont décrites dans `.env.example` et configurées dans `.env.local`.

## Contenus et publication

Le catalogue `src/lib/content/catalog.js` relie 545 champs distincts aux 16 pages publiques. Il conserve 24 anciennes clés comme alias pour préserver les publications existantes.

Tous les champs sont éditables dès l'ouverture du back-office. Publier crée ou met à jour la ligne Supabase ; il n'est pas nécessaire de précharger les valeurs d'origine en base. Les publications mettent à jour le contexte du site, avertissent les autres onglets et sont relues au retour sur un onglet. Une valeur vide est conservée pour les textes ; une image vide revient à son visuel d'origine.

Les clés, types et emplacements proviennent du catalogue commun. Un champ inconnu déjà enregistré en base reste visible avec un avertissement et ne peut pas être publié comme s'il était relié.

## Brouillons et historique

La base historique ne possède ni `is_public`, ni `content_drafts`, ni `content_revisions`. Le code détecte cette version : la publication reste compatible, et les brouillons/historiques sont alors stockés **uniquement dans le navigateur courant**, séparément pour chaque compte administrateur et projet. Ils ne sont pas synchronisés entre appareils et sont perdus si les données du navigateur sont effacées. Aucun brouillon local n'est publié automatiquement.

Pour centraliser le workflow dans Supabase, appliquer les migrations existantes `supabase/security-hardening.sql` puis `supabase/editorial-upgrade.sql`, en conservant les comptes autorisés dans `admin_users`. Le code détectera les tables à la prochaine ouverture du back-office. Avec ce schéma, un premier brouillon crée une ligne parent privée ; seule une publication explicite la rend publique. Les anciens brouillons locaux restent accessibles.

## Formulaires de contact

Les formulaires Holding et Energy préparent un e-mail avec les champs saisis et l'adresse de contact modifiable dans le back-office. Le visiteur termine l'envoi dans sa messagerie. Le site n'affiche jamais une confirmation de livraison et conserve les champs saisis. Aucun prestataire d'envoi ni serveur de messagerie n'est configuré dans ce projet.

## Vérifications

```sh
npm run test:content
npm run build
```

Le contrôle de contenu injecte des valeurs repérables et rend les 16 pages, les états dépliés, la seconde diapositive d'actualité et la pagination. Il vérifie les 545 champs, les alias, la séparation des brouillons locaux par compte, l'historique, la lecture compatible des deux schémas et la construction des e-mails préremplis. Il n'écrit aucune donnée distante.

`npm run lint` vérifie aussi les composants historiques du projet ; certains comportent encore des avertissements ou erreurs préexistants (symboles inutilisés et règles React).
