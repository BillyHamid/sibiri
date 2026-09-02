import { useEffect, useMemo, useState } from 'react'
import {
  Building2, Stethoscope, Zap, HardHat, Truck, Leaf,
  ExternalLink, Plus, Trash2, Upload, Type, FileText, Image as ImageIcon, List, Menu, X,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

const GOLD  = '#B8923E'
const GOLD_BG = '#FBF6EA'
const INK   = '#18181B'
const MUTED = '#71717A'
const LINE  = '#E7E5DF'
const PANEL = '#FAFAF8'

const TYPE_LABELS = { text: 'Texte court', richtext: 'Paragraphe', image: 'Image', list: 'Liste (JSON)' }
const TYPE_ICONS  = { text: Type, richtext: FileText, image: ImageIcon, list: List }

// ─── Arborescence du site — toutes les filiales et tous leurs onglets ──────
// `dbPage` = valeur stockée dans la colonne `page` de la table `content`.
// `path`   = URL réelle de la page sur le site public (bouton « Voir la page »).
const FILIALES = [
  {
    id: 'holding', label: 'SIBIRI Holding', Icon: Building2, color: GOLD,
    pages: [
      { id: 'accueil',    label: 'Accueil',    path: '/',           dbPage: 'Accueil',    sections: ['Hero', 'Nos filiales', 'Mot du Président', 'Organigramme', 'Partenaires'] },
      { id: 'groupe',     label: 'Groupe',     path: '/groupe',     dbPage: 'Groupe',     sections: ['Histoire', 'Valeurs'] },
      { id: 'actualites', label: 'Actualités', path: '/actualites', dbPage: 'Actualités', sections: ['Liste des actualités'] },
      { id: 'contact',    label: 'Contact',    path: '/contact',    dbPage: 'Contact',    sections: ['Coordonnées', 'Formulaire'] },
    ],
  },
  {
    id: 'medical', label: 'Bio Medical', Icon: Stethoscope, color: '#00A99D',
    pages: [
      { id: 'accueil',      label: 'Accueil',      path: '/medical',              dbPage: 'Medical',              sections: ['Hero', 'Présentation', 'Mission & Vision', 'Services', 'Atouts', 'Contact'] },
      { id: 'realisations', label: 'Réalisations', path: '/medical/realisations', dbPage: 'Medical Réalisations', sections: ['Liste des réalisations'] },
      { id: 'actualite',    label: 'Actualité',    path: '/medical/actualite',    dbPage: 'Medical Actualité',    sections: ['Liste des actualités'] },
      { id: 'formation',    label: 'Formation',    path: '/medical/formation',    dbPage: 'Medical Formation',    sections: ['Programmes de formation'] },
    ],
  },
  {
    id: 'energy', label: 'Energy', Icon: Zap, color: '#E62630',
    pages: [
      { id: 'accueil',   label: 'Accueil',   path: '/energy',           dbPage: 'Energy',           sections: ['Hero / Carrousel', 'Chiffres clés'] },
      { id: 'produits',  label: 'Produits',  path: '/energy/services',  dbPage: 'Energy Produits',  sections: ['Carburant', 'Lubrifiants', 'Services'] },
      { id: 'apropos',   label: 'À propos',  path: '/energy/a-propos',  dbPage: 'Energy À propos',  sections: ['Présentation'] },
      { id: 'actualite', label: 'Actualité', path: '/energy/actualite', dbPage: 'Energy Actualité', sections: ['Liste des actualités'] },
      { id: 'contact',   label: 'Contact',   path: '/energy/contact',   dbPage: 'Energy Contact',   sections: ['Coordonnées'] },
    ],
  },
  {
    id: 'construction', label: 'Global Construction', Icon: HardHat, color: '#A64D42',
    pages: [
      { id: 'accueil', label: 'Page principale', path: '/global-construction', dbPage: 'Global Construction', sections: ['Hero', 'Activités', 'Organisation', 'Solidité & Équipe', 'Valeurs', 'Contact'] },
    ],
  },
  {
    id: 'transport', label: 'Transport & Logistic', Icon: Truck, color: '#0ea5e9',
    pages: [
      { id: 'accueil', label: 'Page principale', path: '/transport-logistic', dbPage: 'Transport & Logistic', sections: ['Hero', 'Activités', 'Flotte', 'Engagements', 'Contact'] },
    ],
  },
  {
    id: 'agro', label: 'Agro Chemical', Icon: Leaf, color: '#1f9d55',
    pages: [
      { id: 'accueil', label: 'Page principale', path: '/agro-chemical', dbPage: 'Agro Chemical', sections: ['Hero', 'Expertise', 'Services', 'Réalisations', 'Contact'] },
    ],
  },
]

// ─── Contenu actuellement en dur sur le site, pour les sections pas encore
// reliées au back-office — permet de voir immédiatement « ce qu'il y a déjà »
// sur chaque onglet, même avant migration, et de le publier en un clic.
const SITE_SNAPSHOT = {
  'Accueil::Mot du Président': [
    { label: "Salutation", value: "Mesdames et Messieurs, Chers partenaires, chers collaborateurs," },
    { label: "Paragraphe 1", value: "C'est avec fierté que je prends la parole au nom du Groupe Sibiri Holding, une entreprise bâtie sur une histoire forte, portée par une ambition et des valeurs solides." },
    { label: "Paragraphe 2", value: "Notre vision est de faire du Groupe Sibiri Holding un acteur économique de référence en Afrique." },
    { label: "Paragraphe 3", value: "Nous aspirons à être reconnus pour la qualité de nos réalisations, la fidélité de nos engagements et notre contribution au développement économique et social de nos pays." },
    { label: "Paragraphe 4", value: "Cette vision s'incarne à travers les domaines d'expertise dans lesquels nous nous sommes engagés et pour lesquels nous recherchons l'excellence et une valeur ajoutée partagée avec nos partenaires et nos clients." },
    { label: "Paragraphe 5", value: "Nous sommes attachés à l'excellence, avec une exigence constante de professionnalisme et de respect de nos engagements." },
    { label: "Paragraphe 6", value: "Dans un environnement en constante évolution, nous restons tournés vers l'avenir, avec la volonté de consolider notre position et de développer des projets pouvant contribuer à la croissance économique et au développement social de nos régions." },
    { label: "Paragraphe 7", value: "Je tiens à remercier l'ensemble de nos partenaires et de nos collaborateurs pour leur confiance et leur engagement, qui sont les véritables moteurs de notre réussite collective." },
    { label: "Badge — chiffre", value: "15+" },
    { label: "Badge — légende", value: "Ans d'expérience" },
    { label: "Valeur 1", value: "Intégrité" },
    { label: "Valeur 2", value: "Excellence" },
    { label: "Valeur 3", value: "Engagement" },
    { label: "Valeur 4", value: "Respect" },
    { label: "Photo du Président", value: "/presi.jpg", type: "image" },
  ],
  'Accueil::Organigramme': [
    { label: "Niveau 1 — Poste", value: "Administrateur Général" },
    { label: "Niveau 1 — Rôle", value: "Direction Générale" },
    { label: "Niveau 2 — Poste", value: "Conseiller Spécial / Conseillère Spéciale" },
    { label: "Niveau 2 — Poste", value: "Secrétaire Général" },
    { label: "Niveau 3 — Poste", value: "Contrôleur Général et Financier" },
    { label: "Niveau 3 — Poste", value: "Responsable Juridique et RH" },
    { label: "Niveau 3 — Poste", value: "Assistante de Direction" },
    { label: "Niveau 3 — Poste", value: "Secrétaire" },
    { label: "Niveau 3 — Poste", value: "Agent de liaison" },
    { label: "DAF — filiales", value: "DAF 1 (SH), DAF 2 (SBMS), DAF 3 (SE), DAF 4 (STL), DAF 5 (SGCR)" },
  ],
  'Accueil::Partenaires': [
    { label: "Eyebrow", value: "Partenariats" },
    { label: "Titre de section", value: "Nos Partenaires" },
    { label: "Texte de clôture", value: "Intéressé par un partenariat ? Contactez-nous" },
    { label: "Liste des partenaires", value: "Partner Medical, Arrefour Medical, MILS, Wolf Lubricant, NIPRO, SORUBAT" },
    { label: "Logo — Partner Medical", value: "/partners/medical-logo.svg", type: "image" },
    { label: "Logo — Arrefour Medical", value: "/partners/arrefour-medical.svg", type: "image" },
    { label: "Logo — MILS", value: "/partners/mils-logo.svg", type: "image" },
    { label: "Logo — Wolf Lubricant", value: "/partners/wolf.jpeg", type: "image" },
    { label: "Logo — NIPRO", value: "/partners/nipro.jpg", type: "image" },
    { label: "Logo — SORUBAT", value: "/partners/Soroubat-logo.png", type: "image" },
  ],
  'Medical::Hero': [
    { label: "Tag", value: "Sibiri Bio Médical" },
    { label: "Titre principal", value: "La santé de qualité, au cœur du Burkina." },
    { label: "Description", value: "Importation et distribution de produits pharmaceutiques, matériels et équipements médicaux — au service des acteurs publics et privés de santé depuis 2018." },
    { label: "CTA principal", value: "Nos prestations →" },
    { label: "CTA secondaire", value: "Nous contacter" },
  ],
  'Medical::Présentation': [
    { label: "Tag", value: "À propos" },
    { label: "Titre de section", value: "Sibiri Bio Médical Services" },
    { label: "Paragraphe 1", value: "Fondée en 2018, Sibiri Bio Médical Services est une entreprise spécialisée dans l'importation et la distribution de produits pharmaceutiques, de matériels, accessoires et équipements médicaux destinés aux acteurs publics et privés du secteur de la santé au Burkina Faso." },
    { label: "Paragraphe 2", value: "Forte d'une équipe pluridisciplinaire, l'entreprise s'engage à apporter des solutions adaptées aux besoins des hôpitaux, cliniques et structures de santé — avec un haut niveau d'exigence en matière de qualité, de traçabilité et de disponibilité." },
    { label: "Paragraphe 3", value: "Partenaire de confiance des autorités sanitaires, Sibiri Bio Médical est reconnue pour son professionnalisme et sa capacité à répondre aux défis de la santé en Afrique de l'Ouest." },
    { label: "Logo Sibiri Bio Médical Services (bloc présentation)", value: "/Sibiri-Medical.png", type: "image" },
  ],
  'Medical::Mission & Vision': [
    { label: "Tag", value: "Nos engagements" },
    { label: "Titre de section", value: "Mission, Vision & Valeurs" },
    { label: "Mission — item 1", value: "Fournir une réponse professionnelle aux besoins d'amélioration des plateaux techniques des hôpitaux publics et privés" },
    { label: "Mission — item 2", value: "Élargir l'offre de consommables et produits pharmaceutiques aux meilleures conditions de qualité, de prix et de disponibilité" },
    { label: "Mission — item 3", value: "Assurer un Service Après-Vente irréprochable des équipements installés" },
    { label: "Mission — item 4", value: "Assurer la formation continue de nos équipes et des praticiens de santé" },
    { label: "Mission — item 5", value: "Être à l'écoute pour répondre aux besoins des populations en matière de santé" },
    { label: "Vision — Titre", value: "Notre Vision" },
    { label: "Vision — Texte", value: "Être un partenaire de santé reconnu en Afrique pour son professionnalisme et un service de référence incontournable." },
    { label: "Crédo — Titre", value: "Notre Crédo" },
    { label: "Crédo — Valeurs", value: "Professionnalisme, Respect des engagements, Exigence dans la qualité" },
  ],
  'Medical::Services': [
    { label: "Tag", value: "Ce que nous faisons" },
    { label: "Titre de section", value: "Nos prestations" },
    { label: "Service 1 — Titre", value: "Hémodialyse" },
    { label: "Service 1 — Sous-titre", value: "Partenaire : NIPRO · Ministère de la Santé & Cliniques privées" },
    { label: "Service 1 — Prestations", value: "Offre clé en main d'unités d'hémodialyse ; Générateurs de dialyse (12, 24, 48 par centre) ; Installation du traitement d'eau ; Mise à disposition des lits de dialyse ; Générateur de remplacement (1 ou 2) par centre ; Service Après-Vente des équipements ; Formation continue (techniciens, infirmier(e)s, néphrologues) ; Fourniture des consommables de dialyse (kits) ; Stock de sécurité pour les consommables" },
    { label: "Service 2 — Titre", value: "Centrales d'oxygène" },
    { label: "Service 2 — Sous-titre", value: "Partenaire : MIL'S (leader mondial) · Ministère de la Santé & Cliniques privées" },
    { label: "Service 2 — Prestations", value: "Acquisition et installation de centrales d'oxygène ; Maintenance et Services Après-Vente des centrales ; Mise en conformité de centrales d'oxygène ; Formation des équipes de SAV ; Disponibilité des pièces de rechange ; PSA VPSA en conteneur — durée de vie 15 à 20 ans" },
    { label: "Service 2 — Notre parc", value: "5 centrales en activité ; 3 centrales en cours d'installation" },
    { label: "Service 3 — Titre", value: "Équipements & Produits" },
    { label: "Service 3 — Sous-titre", value: "Distribution de produits pharmaceutiques et équipements médicaux" },
    { label: "Service 3 — Prestations", value: "Imagerie médicale ; Traitement de déchets ; Laboratoire d'analyses fonctionnelles ; Produits pharmaceutiques (médicaments, vaccins, tests...) ; Consommables médicaux ; Distribution de médicaments" },
    { label: "Service 3 — Nos atouts", value: "Notoriété & fiabilité reconnues ; Disponibilité & compétitivité ; Partenaires internationaux (SMV Inde...)" },
  ],
  'Medical::Atouts': [
    { label: "Tag", value: "Pourquoi nous choisir" },
    { label: "Titre de section", value: "Nos atouts" },
    { label: "Sous-titre", value: "Une entreprise reconnue pour son professionnalisme et sa fiabilité dans le secteur biomédical au Burkina Faso." },
    { label: "Atout 1 — Stat", value: "50+" },
    { label: "Atout 1 — Titre", value: "Marques partenaires mondiales" },
    { label: "Atout 1 — Description", value: "Collaboration avec plus de 50 marques internationales reconnues pour offrir les meilleures solutions en biomédicale et pharmaceutiques." },
    { label: "Atout 2 — Stat", value: "Continue" },
    { label: "Atout 2 — Titre", value: "Formation du personnel" },
    { label: "Atout 2 — Description", value: "Formation continue de nos équipes et des praticiens de santé pour maintenir le plus haut niveau d'excellence." },
    { label: "Atout 3 — Stat", value: "24 / 7" },
    { label: "Atout 3 — Titre", value: "Service après-vente" },
    { label: "Atout 3 — Description", value: "SAV qualifié disponible 24h/24, 7j/7, 365 jours par an pour tous les équipements installés." },
    { label: "Atout 4 — Stat", value: "5+" },
    { label: "Atout 4 — Titre", value: "Présence régionale établie" },
    { label: "Atout 4 — Description", value: "Implantés dans plus de 5 pays d'Afrique de l'Ouest avec un réseau de distribution robuste et fiable pour servir les acteurs de santé." },
  ],
  'Medical::Contact': [
    { label: "Titre de section", value: "Nous contacter" },
    { label: "Adresse", value: "Ouaga 2000 zone C, Bd Mouammar Kadhafi, Burkina Faso" },
    { label: "Téléphone", value: "+ 226 25 37 69 49" },
    { label: "Emails", value: "secretariatbiomed@sibiri.group\nlamine.ouedraogo@sibiri.group" },
    { label: "Lien retour", value: "Retour au Groupe SIBIRI" },
  ],
  'Medical Réalisations::Liste des réalisations': [
    { label: "Hero — Tag", value: "Portfolio" },
    { label: "Hero — Titre", value: "Nos réalisations" },
    { label: "Hero — Sous-titre", value: "Des projets concrets déployés sur l'ensemble du territoire national au service de la santé publique burkinabè." },
    { label: "Section — Tag", value: "Nos projets" },
    { label: "Section — Titre", value: "Projets réalisés" },
    { label: "Réalisation 1 — Titre", value: "Unité d'hémodialyse — CHU Yalgado" },
    { label: "Réalisation 1 — Détails", value: "Ouagadougou · 2020 · Dialyse" },
    { label: "Réalisation 2 — Titre", value: "Installation générateurs de dialyse" },
    { label: "Réalisation 2 — Détails", value: "CHU Bogodogo · 2021 · Dialyse" },
    { label: "Réalisation 3 — Titre", value: "Centrale d'oxygène — CHU Souro Sanou" },
    { label: "Réalisation 3 — Détails", value: "Bobo-Dioulasso · 2022 · Oxygène" },
    { label: "Réalisation 4 — Titre", value: "Équipements de laboratoire" },
    { label: "Réalisation 4 — Détails", value: "CHR Ouahigouya · 2022 · Équipements" },
    { label: "Réalisation 5 — Titre", value: "Formation des praticiens" },
    { label: "Réalisation 5 — Détails", value: "Ouagadougou · 2023 · Formation" },
    { label: "Réalisation 6 — Titre", value: "Centre d'hémodialyse — CHU Tengandogo" },
    { label: "Réalisation 6 — Détails", value: "Ouagadougou · 2024 · Dialyse" },
    { label: "Stat 1", value: "6 — Centres de dialyse opérationnels" },
    { label: "Stat 2", value: "5 — Centrales d'oxygène installées" },
    { label: "Stat 3", value: "300K+ — Kits de dialyse fournis" },
    { label: "Stat 4", value: "2018 — Année de création" },
    { label: "Bandeau contact — Texte", value: "Un projet à nous confier ?" },
    { label: "Bandeau contact — CTA", value: "Nous contacter →" },
    { label: "Unité d'hémodialyse — CHU Yalgado (Ouagadougou)", value: "/medical/IMG_0482.JPG.jpeg", type: "image" },
    { label: "Installation générateurs de dialyse — CHU Bogodogo", value: "/medical/IMG_0495.JPG.jpeg", type: "image" },
    { label: "Centrale d'oxygène — CHU Souro Sanou (Bobo-Dioulasso)", value: "/medical/IMG_0161.JPG.jpeg", type: "image" },
    { label: "Équipements de laboratoire — CHR Ouahigouya", value: "/medical/IMG_0281.JPG.jpeg", type: "image" },
    { label: "Formation des praticiens (Ouagadougou)", value: "/medical/IMG_4221.JPG.jpeg", type: "image" },
    { label: "Centre d'hémodialyse — CHU Tengandogo (Ouagadougou)", value: "/medical/Image1.jpg", type: "image" },
  ],
  'Medical Actualité::Liste des actualités': [
    { label: "Hero — Tag", value: "Actualité" },
    { label: "Hero — Titre", value: "Nos dernières nouvelles" },
    { label: "Hero — Sous-titre", value: "Suivez les dernières actualités, inaugurations et partenariats de Sibiri Bio Médical Services." },
    { label: "Section — Titre", value: "Toutes les actualités" },
    { label: "Actualité 1 — Titre", value: "Renouvellement du partenariat avec NIPRO" },
    { label: "Actualité 1 — Meta", value: "Mars 2025 · Partenariat" },
    { label: "Actualité 1 — Description", value: "Sibiri Bio Médical Services renouvelle et renforce son accord de distribution exclusive avec NIPRO pour les générateurs de dialyse au Burkina Faso. Ce partenariat stratégique garantit l'accès prioritaire aux dernières technologies de dialyse pour les établissements de santé nationaux." },
    { label: "Actualité 2 — Titre", value: "Ouverture du centre de dialyse — CHU Tengandogo" },
    { label: "Actualité 2 — Meta", value: "Janvier 2025 · Inauguration" },
    { label: "Actualité 2 — Description", value: "Mise en service du 6ème centre d'hémodialyse équipé par Sibiri Bio Médical, renforçant l'accès aux soins dans la capitale. Ce centre est équipé de 24 générateurs NIPRO de dernière génération et d'une unité de traitement d'eau certifiée." },
    { label: "Actualité 3 — Titre", value: "5ème centrale d'oxygène — CHU Souro Sanou" },
    { label: "Actualité 3 — Meta", value: "Novembre 2024 · Installation" },
    { label: "Actualité 3 — Description", value: "Livraison et mise en service de la 5ème centrale PSA VPSA MIL'S au CHU Souro Sanou de Bobo-Dioulasso. Cette installation garantit une autonomie complète en oxygène médical et élimine la dépendance aux bouteilles d'oxygène." },
    { label: "Actualité 4 — Titre", value: "Session de formation — CHR Ouahigouya" },
    { label: "Actualité 4 — Meta", value: "Septembre 2024 · Formation" },
    { label: "Actualité 4 — Description", value: "Organisation d'une session de formation de 5 jours à destination des techniciens biomédicaux et du personnel infirmier du CHR Ouahigouya. 18 professionnels de santé ont été formés à la maintenance et à l'utilisation optimale des équipements de dialyse." },
    { label: "Actualité 5 — Titre", value: "Accord-cadre avec le Ministère de la Santé" },
    { label: "Actualité 5 — Meta", value: "Juin 2024 · Accord PPP" },
    { label: "Actualité 5 — Description", value: "Renouvellement et extension de l'accord de partenariat public-privé avec le Ministère de la Santé du Burkina Faso. Sibiri Bio Médical Services conserve l'exclusivité de la fourniture de kits de dialyse sur l'ensemble du territoire national." },
    { label: "Bandeau contact — Texte", value: "Vous avez une question sur nos activités ?" },
    { label: "Bandeau contact — CTA", value: "Nous contacter →" },
    { label: "Renouvellement du partenariat avec NIPRO", value: "/medical/IMG_0482.JPG.jpeg", type: "image" },
    { label: "Ouverture du centre de dialyse — CHU Tengandogo", value: "/medical/Image1.jpg", type: "image" },
    { label: "5ème centrale d'oxygène — CHU Souro Sanou", value: "/medical/IMG_0161.JPG.jpeg", type: "image" },
    { label: "Session de formation — CHR Ouahigouya", value: "/medical/IMG_0281.JPG.jpeg", type: "image" },
    { label: "Accord-cadre avec le Ministère de la Santé", value: "/medical/IMG_4221.JPG.jpeg", type: "image" },
  ],
  'Medical Formation::Programmes de formation': [
    { label: "Hero — Tag", value: "Renforcement des capacités" },
    { label: "Hero — Titre", value: "Nos formations" },
    { label: "Hero — Sous-titre", value: "Des programmes adaptés aux besoins des équipes médicales et techniques — conçus et dispensés par nos experts terrain." },
    { label: "Hero — Stat 1", value: "6 — Modules disponibles" },
    { label: "Hero — Stat 2", value: "1–5j — Durées adaptées" },
    { label: "Hero — Stat 3", value: "Sur site — Formation terrain" },
    { label: "Section — Tag", value: "Nos modules" },
    { label: "Section — Titre", value: "Catalogue de formation" },
    { label: "Module 1 — Titre", value: "Hémodialyse clinique" },
    { label: "Module 1 — Description", value: "Formation théorique et pratique sur la prise en charge du patient dialysé : réglages des générateurs, surveillance des paramètres vitaux, gestion des complications aiguës et chroniques." },
    { label: "Module 1 — Public", value: "Infirmier(e)s · Néphrologues" },
    { label: "Module 2 — Titre", value: "Maintenance des générateurs NIPRO" },
    { label: "Module 2 — Description", value: "Entretien préventif et correctif, diagnostic de pannes et remplacement de pièces sur les générateurs de dialyse NIPRO. Certification délivrée à l'issue de la formation." },
    { label: "Module 2 — Public", value: "Techniciens biomédicaux" },
    { label: "Module 3 — Titre", value: "Gestion des centrales d'oxygène" },
    { label: "Module 3 — Description", value: "Surveillance opérationnelle, sécurité et maintenance des centrales PSA VPSA MIL'S. Formation dispensée sur site, en conditions réelles d'exploitation." },
    { label: "Module 3 — Public", value: "Techniciens · Responsables SAV" },
    { label: "Module 4 — Titre", value: "Traçabilité & gestion des stocks" },
    { label: "Module 4 — Description", value: "Bonnes pratiques de gestion des consommables médicaux, suivi des kits de dialyse et optimisation des stocks en milieu hospitalier." },
    { label: "Module 4 — Public", value: "Gestionnaires · Pharmaciens" },
    { label: "Module 5 — Titre", value: "Installation d'équipements médicaux" },
    { label: "Module 5 — Description", value: "Processus complet d'installation et de mise en service des équipements d'imagerie médicale, de laboratoire et de dialyse selon les normes internationales." },
    { label: "Module 5 — Public", value: "Techniciens biomédicaux · Ingénieurs" },
    { label: "Module 6 — Titre", value: "Imagerie médicale — utilisation" },
    { label: "Module 6 — Description", value: "Formation à l'utilisation optimale des équipements d'imagerie médicale distribués par Sibiri Bio Médical : échographes, radios numériques et appareils de biologie." },
    { label: "Module 6 — Public", value: "Médecins · Techniciens de radiologie" },
    { label: "CTA band — Titre", value: "Une formation sur mesure pour votre équipe ?" },
    { label: "CTA band — Texte", value: "Nos experts se déplacent directement dans vos établissements pour des sessions adaptées à vos équipements et à vos équipes." },
    { label: "CTA band — Bouton", value: "Demander un devis →" },
  ],
  'Energy::Hero / Carrousel': [
    { label: "Titre principal", value: "QUALITY ONLY" },
    { label: "Sous-titre", value: "10 ans d'expertise dans le secteur pétrolier." },
    { label: "Bouton CTA", value: "Nos services →" },
    { label: "Indicateur de défilement", value: "Défiler" },
    { label: "Image carrousel 1", value: "/energy/SIBIRI%20ENERGY-6.JPG.jpeg", type: "image" },
    { label: "Image carrousel 2", value: "/energy/SIBIRI%20ENERGY-8.JPG.jpeg", type: "image" },
    { label: "Image carrousel 3", value: "/energy/SIBIRI%20ENERGY-10.JPG.jpeg", type: "image" },
    { label: "Image carrousel 4", value: "/energy/SIBIRI%20ENERGY-15.JPG.jpeg", type: "image" },
    { label: "Image carrousel 5", value: "/energy/SIBIRI%20ENERGY-12.JPG.jpeg", type: "image" },
  ],
  'Energy::Chiffres clés': [
    { label: "Label section", value: "Sibiri Energy en bref" },
    { label: "Titre", value: "Le partenaire énergétique de référence" },
    { label: "Sous-titre", value: "Une expertise complète, du carburant aux solutions solaires." },
    { label: "Stat 1", value: "2024 — Lubrifiant WOLF" },
    { label: "Stat 2", value: "2022 — Réseau de station service" },
    { label: "Stat 3", value: "2016 — Clients Entreprise" },
    { label: "Stat 4", value: "6 — Domaines d'expertise" },
    { label: "Bouton CTA", value: "Découvrir nos services" },
    { label: "Label section — À propos teaser", value: "À propos" },
    { label: "Titre — À propos teaser", value: "Une expertise énergétique étendue" },
    { label: "Paragraphe — À propos teaser", value: "SIBIRI ENERGY SA est la filiale énergétique du Groupe Sibiri Holding, opérant au Burkina Faso avec une expertise étendue couvrant la distribution de produits pétroliers, les travaux électriques, mécaniques et de génie civil, ainsi que les réseaux téléphoniques et internet." },
    { label: "Lien — À propos teaser", value: "En savoir plus" },
    { label: "Label section — Produits teaser", value: "Nos produits" },
    { label: "Titre — Produits teaser", value: "Carburant & Lubrifiant" },
    { label: "Produit 1 titre", value: "Carburant" },
    { label: "Produit 1 description", value: "Essence, gasoil et cuves portatives pour entreprises et grand public." },
    { label: "Produit 2 titre", value: "Lubrifiant" },
    { label: "Produit 2 description", value: "Distribution WOLF LUBRICANTS pour véhicules, bus, camions et engins miniers." },
    { label: "Label section — Actualité teaser", value: "Actualité" },
    { label: "Titre — Actualité teaser", value: "Nos dernières actualités" },
    { label: "Lien — Actualité teaser", value: "Toutes les actualités" },
    { label: "Actu 1 titre", value: "WOLF LUBRICANTS — Distribution Nationale" },
    { label: "Actu 1 description", value: "Exclusivité de distribution au Burkina Faso de la marque belge WOLF LUBRICANTS, une gamme premium depuis 1955." },
    { label: "Actu 2 titre", value: "Station-service Kouba — KOUBRI" },
    { label: "Actu 2 description", value: "Première station grand public de SIBIRI ENERGY SA, point de départ de l'expansion du réseau à Ouagadougou." },
    { label: "Image — À propos teaser", value: "/energy/SIBIRI%20ENERGY-12.JPG.jpeg", type: "image" },
  ],
  'Energy Produits::Carburant': [
    { label: "Titre page", value: "Une expertise" },
    { label: "Titre page (accent)", value: "complète et intégrée" },
    { label: "Sous-titre page", value: "De la distribution à la proposition de solution, nous couvrons tous les domaines de l'énergie." },
    { label: "Carte produit — tagline", value: "Essence · Gasoil · Cuves portatives" },
    { label: "Carte produit — description courte", value: "Ravitaillement en carburant (essence, gasoil) des grandes entreprises des secteurs Transport, BTP et Industrie, ainsi que du grand public via notre réseau de stations-service à Ouagadougou. Location et mise à disposition de cuves portatives pour vos besoins spécifiques." },
    { label: "Section détail — titre", value: "Carburant" },
    { label: "Section détail — description", value: "Ravitaillement en carburant (essence, gasoil) des grandes entreprises des secteurs Transport, BTP et Industrie, ainsi que du grand public via notre réseau de stations-service à Ouagadougou. Location et mise à disposition de cuves portatives pour vos besoins spécifiques." },
    { label: "Image hero page Produits", value: "/energy/SIBIRI%20ENERGY-15.JPG.jpeg", type: "image" },
  ],
  'Energy Produits::Lubrifiants': [
    { label: "Carte produit — tagline", value: "Tourisme · Bus & camions · Engins miniers" },
    { label: "Carte produit — description courte", value: "Distribution de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers, en partenariat avec Wolf Lubricants — une marque internationale de référence pour la performance et la protection moteur." },
    { label: "Section détail — titre", value: "Lubrifiant" },
    { label: "Section détail — description", value: "Distribution de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers, en partenariat avec Wolf Lubricants — une marque internationale de référence pour la performance et la protection moteur." },
  ],
  'Energy Produits::Services': [
    { label: "Titre section", value: "Un accompagnement à chaque étape" },
    { label: "Service B2B — titre", value: "B2B" },
    { label: "Service B2B — description", value: "Solutions de ravitaillement et de fourniture énergétique dédiées aux entreprises des secteurs Transport, BTP et Industrie." },
    { label: "Service Réseau de Stations — titre", value: "Réseau de Stations" },
    { label: "Service Réseau de Stations — description", value: "Quatre stations-service dans la zone de Ouagadougou, dont la première à Kouba (commune de KOUBRI), ouverte en 2022." },
    { label: "Service Réseau Distribution Lubrifiant — titre", value: "Réseau de Distribution Lubrifiant" },
    { label: "Service Réseau Distribution Lubrifiant — description", value: "Un réseau de distribution dédié à l'approvisionnement en lubrifiants auprès de nos partenaires et points de vente." },
    { label: "Service Post Consommateur — titre", value: "Post Consommateur" },
    { label: "Service Post Consommateur — description", value: "Accompagnement et service après-vente pour nos clients particuliers et professionnels." },
    { label: "Service Solution de Stockage — titre", value: "Solution de Stockage" },
    { label: "Service Solution de Stockage — description", value: "Location et mise à disposition de cuves portatives et solutions de stockage adaptées à vos besoins." },
    { label: "Titre — Autres domaines", value: "Une expertise énergétique élargie" },
    { label: "Centrale & Éclairage Solaire — titre", value: "Centrale & Éclairage Solaire" },
    { label: "Centrale & Éclairage Solaire — description", value: "Étude et réalisation de centrales solaires et systèmes d'éclairage solaire pour particuliers, entreprises et institutions." },
    { label: "Travaux Électriques & Mécaniques — titre", value: "Travaux Électriques & Mécaniques" },
    { label: "Travaux Électriques & Mécaniques — description", value: "Étude et réalisation de travaux électriques, mécaniques et de génie civil. Commerce de matériels électriques et mécaniques." },
    { label: "Réseaux Téléphoniques & Internet — titre", value: "Réseaux Téléphoniques & Internet" },
    { label: "Réseaux Téléphoniques & Internet — description", value: "Étude et réalisation de réseaux téléphoniques et internet pour entreprises, sites industriels et infrastructures publiques." },
    { label: "Forages & Consulting — titre", value: "Forages & Consulting" },
    { label: "Forages & Consulting — description", value: "Étude et réalisation de forages. Consulting en solutions énergétiques, accompagnement stratégique et technique des entreprises." },
  ],
  'Energy À propos::Présentation': [
    { label: "Titre page", value: "Le partenaire énergétique de" },
    { label: "Titre page (accent)", value: "référence au Burkina Faso" },
    { label: "Sous-titre page", value: "Filiale énergétique du Groupe Sibiri Holding, alliant expertise B2B et accès grand public." },
    { label: "Titre section", value: "Une expertise énergétique étendue" },
    { label: "Paragraphe 1", value: "SIBIRI ENERGY SA est la filiale énergétique du Groupe Sibiri Holding, opérant au Burkina Faso avec une expertise étendue couvrant la distribution de produits pétroliers, les travaux électriques, mécaniques et de génie civil, ainsi que les réseaux téléphoniques et internet." },
    { label: "Paragraphe 2", value: "Pionnière dans l'accès à l'énergie solaire, la société réalise des centrales solaires et systèmes d'éclairage solaire, des forages et offre du consulting en solutions énergétiques. Avec quatre stations-service dans la zone de Ouagadougou depuis 2022, elle combine expertise B2B et accès grand public." },
    { label: "Paragraphe 3", value: "En 2025, la société a obtenu l'exclusivité de distribution au Burkina Faso de WOLF LUBRICANTS de WOLF OIL CORPORATION, partenaire stratégique dans les lubrifiants premium depuis 1955, renforçant sa position de leader énergétique régional." },
    { label: "Bouton CTA", value: "Nous contacter" },
    { label: "Stat 1", value: "4 — Stations-service" },
    { label: "Stat 2", value: "2022 — Réseau grand public" },
    { label: "Stat 3", value: "70+ — Clients entreprises" },
    { label: "Stat 4", value: "2025 — Exclusivité WOLF Lubric." },
    { label: "Titre — Pourquoi nous", value: "Six raisons de nous faire confiance" },
    { label: "Raison 1 titre", value: "\"Quality Only\"" },
    { label: "Raison 1 description", value: "Notre slogan est notre engagement. La satisfaction client est un devoir, qui place le professionnalisme au cœur de chaque action." },
    { label: "Raison 2 titre", value: "Spécialiste Hydrocarbures" },
    { label: "Raison 2 description", value: "Années d'expérience dans la distribution de carburant aux grandes entreprises avec des solutions adaptées à chaque secteur." },
    { label: "Raison 3 titre", value: "Solutions Solaires" },
    { label: "Raison 3 description", value: "Conception et réalisation de centrales solaires et éclairage solaire pour accompagner la transition énergétique." },
    { label: "Raison 4 titre", value: "Soutien Sibiri Holding" },
    { label: "Raison 4 description", value: "Bénéficie de l'assistance technique permanente du Groupe Sibiri Holding : juridique, RH, financement et garantie." },
    { label: "Raison 5 titre", value: "Ancrage Local Fort" },
    { label: "Raison 5 description", value: "Profonde connaissance du marché burkinabè et adaptation constante aux réalités techniques et économiques locales." },
    { label: "Raison 6 titre", value: "Politique QHSE" },
    { label: "Raison 6 description", value: "Engagement qualité, hygiène, sécurité et environnement comme preuve concrète de notre adaptation aux mutations du monde." },
    { label: "Image hero page À propos", value: "/energy/SIBIRI%20ENERGY-6.JPG.jpeg", type: "image" },
  ],
  'Energy Actualité::Liste des actualités': [
    { label: "Titre page", value: "Nos dernières" },
    { label: "Titre page (accent)", value: "actualités" },
    { label: "Sous-titre page", value: "Inaugurations, partenariats et exclusivités qui structurent le développement de Sibiri Energy." },
    { label: "Titre section", value: "Toutes les actualités" },
    { label: "Actu 1 titre", value: "WOLF LUBRICANTS — Distribution Nationale" },
    { label: "Actu 1 description", value: "Exclusivité de distribution au Burkina Faso de la marque belge WOLF LUBRICANTS (WOLF OIL CORPORATION). Une gamme premium de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers, disponible depuis 1955." },
    { label: "Actu 2 titre", value: "Station-service Kouba — KOUBRI" },
    { label: "Actu 2 description", value: "Première station grand public de SIBIRI ENERGY SA, inaugurée en 2022 dans la commune de KOUBRI. Point de départ de l'expansion du réseau dans la zone de Ouagadougou, aujourd'hui composé de quatre stations-service." },
    { label: "Actu 3 titre", value: "Ravitaillement Grandes Entreprises" },
    { label: "Actu 3 description", value: "Distribution et approvisionnement en produits pétroliers des grandes entreprises des secteurs Transport, BTP et Industrie. Solutions de cuves portatives sur mesure pour accompagner nos clients professionnels." },
    { label: "Image hero page Actualité", value: "/energy/SIBIRI%20ENERGY-8.JPG.jpeg", type: "image" },
  ],
  'Energy Contact::Coordonnées': [
    { label: "Titre page", value: "Parlons de votre" },
    { label: "Titre page (accent)", value: "projet énergétique" },
    { label: "Sous-titre page", value: "Notre équipe est disponible pour étudier vos besoins et vous proposer des solutions adaptées." },
    { label: "Titre section — parcours", value: "Trois façons de nous contacter" },
    { label: "Parcours 1 titre", value: "Stations-service & Grand public" },
    { label: "Parcours 1 description", value: "Vous êtes un particulier ? Retrouvez nos stations-service à Ouagadougou pour vos besoins en carburant et lubrifiants." },
    { label: "Parcours 2 titre", value: "Entreprises & B2B" },
    { label: "Parcours 2 description", value: "Ravitaillement, cuves portatives, solutions de stockage : parlons de vos besoins en carburant et lubrifiants pour votre activité." },
    { label: "Parcours 3 titre", value: "Devenir partenaire / revendeur" },
    { label: "Parcours 3 description", value: "Vous souhaitez rejoindre notre réseau de distribution de carburant ou de lubrifiants WOLF ? Contactez notre équipe partenariats." },
    { label: "Titre section — formulaire", value: "Écrivez-nous" },
    { label: "Adresse", value: "Ouagadougou, Burkina Faso\nAfrique de l'Ouest" },
    { label: "Téléphone", value: "+226 XX XX XX XX" },
    { label: "Disponibilité", value: "Lun – Ven : 08h00 – 18h00" },
    { label: "Contacts par service — Renseignements généraux", value: "energy@sibiri.group" },
    { label: "Contacts par service — Presse & partenariats", value: "presse@sibiri.group" },
    { label: "Contacts par service — Support technique / SAV", value: "support@sibiri.group" },
    { label: "Bouton envoi formulaire", value: "Envoyer le message" },
    { label: "Message de confirmation — titre", value: "Message envoyé !" },
    { label: "Message de confirmation — texte", value: "Nous vous répondrons dans les plus brefs délais." },
    { label: "Image hero page Contact", value: "/energy/SIBIRI%20ENERGY-10.JPG.jpeg", type: "image" },
    { label: "Image carte / localisation", value: "https://images.unsplash.com/photo-1524661135-423995f22d0b?fm=jpg&q=80&w=800&auto=format&fit=crop", type: "image" },
  ],
  'Global Construction::Hero': [
    { label: "Titre principal", value: "Tout passe, mais la qualité demeure" },
    { label: "Sous-titre", value: "SIBIRI GLOBAL CONSTRUCTION ET RENOVATION (SGCR) participe au développement du Burkina Faso à travers la construction, la rénovation, les infrastructures routières et l'aménagement hydro-agricole." },
    { label: "Badge", value: "BTP · Aménagement hydro-agricole" },
    { label: "CTA principal", value: "Nos activités" },
    { label: "CTA secondaire", value: "Nous contacter" },
    { label: "Image de fond du hero — Chantier de construction de bâtiment", value: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=1800&auto=format&fit=crop", type: "image" },
  ],
  'Global Construction::Activités': [
    { label: "Titre section", value: "Un savoir-faire complet, du bâtiment à l'hydraulique" },
    { label: "Texte mission", value: "Entreprise de construction en génie civil (Bâtiment et Travaux Publics) et d'aménagement hydro-agricole, SGCR met à disposition son savoir-faire et son parc matériel pour accompagner les acteurs publics et privés dans leurs projets d'infrastructures." },
    { label: "Activité 1 - Titre", value: "Construction neuve" },
    { label: "Activité 1 - Description", value: "Bâtiment tout corps d'état en béton armé, aggloméré de ciment, matériaux locaux ou construction métallique." },
    { label: "Activité 2 - Titre", value: "Rénovation de bâtiment" },
    { label: "Activité 2 - Description", value: "Réhabilitation en béton armé, en aggloméré de ciment, matériaux locaux ou construction métallique." },
    { label: "Activité 3 - Titre", value: "Routes & ouvrages d'art" },
    { label: "Activité 3 - Description", value: "Construction de routes en terre, ouvrages d'art et reprofilage." },
    { label: "Activité 4 - Titre", value: "Assainissement" },
    { label: "Activité 4 - Description", value: "Drainage des eaux pluviales, réseaux d'égouts." },
    { label: "Activité 5 - Titre", value: "Adduction d'eau potable" },
    { label: "Activité 5 - Description", value: "Conception et réalisation de réseaux d'accès à l'eau potable." },
    { label: "Activité 6 - Titre", value: "Aménagement de plaines agricoles" },
    { label: "Activité 6 - Description", value: "Aménagements hydro-agricoles au service de la production locale." },
    { label: "Construction neuve", value: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Rénovation de bâtiment", value: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Routes & ouvrages d'art", value: "https://images.unsplash.com/photo-1780389098001-e641e50aeebd?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Assainissement", value: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Adduction d'eau potable", value: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Aménagement de plaines agricoles", value: "https://images.unsplash.com/photo-1743742566156-f1745850281a?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
  ],
  'Global Construction::Organisation': [
    { label: "Titre section", value: "Une équipe structurée pour chaque chantier" },
    { label: "Niveau 1", value: "Administrateur Général — SIBIRI HOLDING" },
    { label: "Niveau 2", value: "Secrétaire Général" },
    { label: "Niveau 3", value: "Directeur Général Délégué" },
  ],
  'Global Construction::Solidité & Équipe': [
    { label: "Titre section", value: "Pourquoi choisir SGCR" },
    { label: "Atout 1 - Titre", value: "Solidité financière" },
    { label: "Atout 1 - Description", value: "Adossée au groupe SIBIRI HOLDING, une synergie forte entre les filiales, et un bon partenariat avec les structures de financement." },
    { label: "Atout 2 - Titre", value: "Équipe pluridisciplinaire" },
    { label: "Atout 2 - Description", value: "Une organisation complète, du directeur des travaux aux ouvriers spécialisés, en passant par les conducteurs de travaux, les chefs de chantier et les chefs d'équipe." },
    { label: "Atout 3 - Titre", value: "Parc matériel étoffé" },
    { label: "Atout 3 - Description", value: "Adapté aux chantiers BTP comme aux aménagements hydro-agricoles." },
    { label: "Atout 4 - Titre", value: "Maîtrise réglementaire" },
    { label: "Atout 4 - Description", value: "Maîtrise de la réglementation en matière de construction au Burkina Faso." },
  ],
  'Global Construction::Valeurs': [
    { label: "Titre section", value: "Ce qui guide nos actions" },
    { label: "Slogan", value: "« Tout passe mais la qualité demeure »" },
    { label: "Texte slogan", value: "Nous faisons de la qualité notre priorité : savoir que la qualité de vos ouvrages demeure dans le temps, bien au-delà de l'effort financier consenti lors de leur réalisation." },
    { label: "Valeur 1", value: "Qualité" },
    { label: "Valeur 2", value: "Intégrité" },
    { label: "Valeur 3", value: "Endurance dans l'action" },
    { label: "Valeur 4", value: "Loyauté" },
  ],
  'Global Construction::Contact': [
    { label: "Siège", value: "Nationale 5, Zone Wend Panga, Kouba — Commune de Koubri" },
    { label: "Téléphone", value: "+226 25 50 27 24 / +226 25 37 69 56" },
    { label: "Email", value: "sibirigcr@sibiri.group" },
    { label: "Boîte postale", value: "01 BP 5096 Ouaga 01" },
    { label: "Localisation SGCR", value: "https://images.unsplash.com/photo-1541888698598-4096432cd70e?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
  ],
  'Transport & Logistic::Hero': [
    { label: "Badge", value: "Transport & logistique · Hydrocarbures · Minerais" },
    { label: "Titre principal", value: "Le transport sécurisé des ressources qui font avancer l'Afrique de l'Ouest" },
    { label: "Sous-titre", value: "SIBIRI TRANSPORT & LOGISTICS (STL) assure le transport d'hydrocarbures, de minerais et de marchandises diverses, avec une gestion complète de la chaîne d'approvisionnement, depuis la production jusqu'à la distribution." },
    { label: "CTA principal", value: "Nos activités" },
    { label: "CTA secondaire", value: "Nous contacter" },
  ],
  'Transport & Logistic::Activités': [
    { label: "Titre section", value: "Cinq activités clés" },
    { label: "Texte introduction", value: "Spécialisée dans le transport et la logistique des produits pétroliers, des ressources minières et de marchandises diverses, STL intervient principalement en Afrique de l'Ouest et assure la gestion complète de la chaîne d'approvisionnement, depuis les sites de production jusqu'aux zones de distribution ou d'exportation." },
    { label: "Activité 1 - Titre", value: "Transport d'hydrocarbures" },
    { label: "Activité 1 - Description", value: "Acheminement de carburants (essence, gasoil) via des camions-citernes certifiés." },
    { label: "Activité 2 - Titre", value: "Transport de minerais" },
    { label: "Activité 2 - Description", value: "Convoyage de matières premières (minerais, clinker) des mines vers les ports ou usines." },
    { label: "Activité 3 - Titre", value: "Marchandises conteneurisées" },
    { label: "Activité 3 - Description", value: "Transport de marchandises diverses en conteneurs." },
    { label: "Activité 4 - Titre", value: "Logistique intégrée" },
    { label: "Activité 4 - Description", value: "Gestion des flux, livraison et optimisation de la supply chain." },
    { label: "Activité 5 - Titre", value: "Gestion de flotte" },
    { label: "Activité 5 - Description", value: "Maintenance, suivi GPS et optimisation des véhicules." },
    { label: "Transport d'hydrocarbures", value: "https://images.unsplash.com/photo-1720811559337-c59b75acc4de?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Transport de minerais", value: "https://images.unsplash.com/photo-1711012604128-8339024a3e12?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Marchandises conteneurisées", value: "https://images.unsplash.com/photo-1708193203896-ba0630862bb6?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Logistique intégrée", value: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Gestion de flotte", value: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
  ],
  'Transport & Logistic::Flotte': [
    { label: "Titre section", value: "Une flotte adaptée à chaque type de transport" },
    { label: "Moyen 1 - Titre", value: "Camions-citernes" },
    { label: "Moyen 1 - Description", value: "Certifiés matières dangereuses" },
    { label: "Moyen 2 - Titre", value: "Camions bennes" },
    { label: "Moyen 2 - Description", value: "Transport de minerais" },
    { label: "Moyen 3 - Titre", value: "Géolocalisation GPS" },
    { label: "Moyen 3 - Description", value: "Suivi en temps réel" },
  ],
  'Transport & Logistic::Engagements': [
    { label: "Titre section", value: "La sécurité, une priorité absolue" },
    { label: "Texte", value: "STL respecte les normes internationales et forme régulièrement ses chauffeurs pour réduire les risques d'accident." },
    { label: "Norme 1", value: "Normes HSE (Hygiène, Sécurité, Environnement)" },
    { label: "Norme 2", value: "Réglementation ADR — matières dangereuses" },
    { label: "Vision", value: "« Devenir un leader régional du transport logistique des ressources minières, reconnu pour sa fiabilité, sa sécurité et son innovation à l'horizon 2027. »" },
    { label: "Mission", value: "« Assurer le transport sécurisé, efficace et fiable des hydrocarbures, minerais et produits divers, avec des solutions logistiques adaptées aux industries extractives, énergétiques et commerciales. »" },
  ],
  'Transport & Logistic::Contact': [
    { label: "Siège social", value: "Secteur 30, Ouagadougou" },
    { label: "Représentant", value: "Conseiller Spécial de Direction — M. OUEDRAOGO Mahamadou Lamine" },
    { label: "Boîte postale", value: "01 BP 5096 Ouagadougou 01" },
    { label: "RCCM", value: "BF OUA 2022 M 1379" },
    { label: "Localisation STL", value: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
  ],
  'Agro Chemical::Hero': [
    { label: "Badge", value: "Agriculture & intrants" },
    { label: "Titre principal", value: "Des intrants de qualité et un accompagnement pour une agriculture performante et durable" },
    { label: "Sous-titre", value: "SIBIRI AGRO CHEMICAL importe, distribue et accompagne les producteurs du Burkina Faso et de la sous-région à travers des intrants certifiés, un appui technique et des aménagements agricoles." },
    { label: "CTA 1", value: "Découvrir nos services" },
    { label: "CTA 2", value: "Voir nos réalisations" },
    { label: "CTA 3", value: "Nous contacter" },
    { label: "Épandage d'engrais de haute qualité sur une jeune pousse", value: "/agro/engrais-haute-qualite.jpg", type: "image" },
  ],
  'Agro Chemical::Expertise': [
    { label: "Titre section", value: "Notre savoir-faire" },
    { label: "Expertise 1 - Titre", value: "Approvisionnement" },
    { label: "Expertise 1 - Description", value: "Intrants agricoles certifiés" },
    { label: "Expertise 2 - Titre", value: "Conseil agronomique" },
    { label: "Expertise 2 - Description", value: "Accompagnement technique" },
    { label: "Expertise 3 - Titre", value: "Hydro-agricole" },
    { label: "Expertise 3 - Description", value: "Aménagement & irrigation" },
    { label: "Expertise 4 - Titre", value: "Maraîchage" },
    { label: "Expertise 4 - Description", value: "Techniques de production" },
  ],
  'Agro Chemical::Services': [
    { label: "Titre section", value: "Nos solutions" },
    { label: "Service 1 - Titre", value: "Intrants agricoles" },
    { label: "Service 1 - Description", value: "Engrais minéraux et organiques · Produits phytosanitaires · Semences" },
    { label: "Service 2 - Titre", value: "Appui-conseil" },
    { label: "Service 2 - Description", value: "Formation des producteurs · Suivi des cultures · Recommandations techniques" },
    { label: "Service 3 - Titre", value: "Aménagements agricoles" },
    { label: "Service 3 - Description", value: "Forages · Systèmes d'irrigation · Bassins de stockage · Équipements" },
    { label: "Service 4 - Titre", value: "Production maraîchère" },
    { label: "Service 4 - Description", value: "Exploitation de périmètres irrigués · Cultures à haute valeur ajoutée" },
    { label: "Intrants agricoles", value: "https://images.unsplash.com/photo-1655130944329-b3a63166f6b5?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Appui-conseil", value: "https://images.unsplash.com/photo-1521791136064-7986c2920216?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Aménagements agricoles", value: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
    { label: "Production maraîchère", value: "https://images.unsplash.com/photo-1563030932-b26f45cd6064?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
  ],
  'Agro Chemical::Réalisations': [
    { label: "Titre section", value: "Réalisations & impact terrain" },
    { label: "Réalisation 1 - Titre", value: "Distribution à grande échelle" },
    { label: "Réalisation 1 - Description", value: "Volumes d'intrants livrés aux producteurs et coopératives" },
    { label: "Réalisation 2 - Titre", value: "Périmètres maraîchers" },
    { label: "Réalisation 2 - Description", value: "Mise en place de périmètres irrigués productifs" },
    { label: "Réalisation 3 - Titre", value: "Systèmes d'irrigation" },
    { label: "Réalisation 3 - Description", value: "Installation de solutions d'irrigation performantes" },
    { label: "Galerie — Distribution d'intrants", value: "https://images.unsplash.com/photo-1655130944329-b3a63166f6b5?fm=jpg&q=80&w=700&auto=format&fit=crop", type: "image" },
    { label: "Galerie — Périmètre maraîcher", value: "https://images.unsplash.com/photo-1563030932-b26f45cd6064?fm=jpg&q=80&w=700&auto=format&fit=crop", type: "image" },
    { label: "Galerie — Irrigation", value: "https://images.unsplash.com/photo-1743742566156-f1745850281a?fm=jpg&q=80&w=700&auto=format&fit=crop", type: "image" },
    { label: "Galerie — Aménagement hydraulique", value: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=700&auto=format&fit=crop", type: "image" },
  ],
  'Agro Chemical::Contact': [
    { label: "Adresse", value: "À compléter" },
    { label: "Téléphone", value: "Ligne filiale AGRO\nSIBIRI GROUP" },
    { label: "Email", value: "agro@sibiri.group" },
    { label: "Localisation filiale AGRO", value: "https://images.unsplash.com/photo-1743742566156-f1745850281a?fm=jpg&q=80&w=900&auto=format&fit=crop", type: "image" },
  ],
  'Groupe::Histoire': [
    { label: "Titre section", value: "L'héritage d'une vision familiale" },
    { label: "Paragraphe 1", value: "SIBIRI Holding SA est une société Anonyme de droit Burkinabé au capital de cent soixante-quinze millions cinq cent mille (175 500 000) FCFA, avec Administrateur Général en la personne de son Fondateur, Monsieur Mahamadou Lamine OUEDRAOGO, actionnaire principal, Consul Honoraire du Burkina en République du Bénin et Officier de l'Ordre National du Burkina Faso." },
    { label: "Paragraphe 2", value: "Elle est une société d'investissements, de gestion et de contrôle d'actifs mobiliers et immobiliers." },
    { label: "Paragraphe 3", value: "Monsieur Mahamadou Lamine OUEDRAOGO est un fils du premier Président de la Chambre de Commerce et d'Industrie de la Haute Volta (Feu El Hadj Ousmane Sibiri OUEDRAOGO) — d'où le nom de la Holding —, il porte et défend l'ensemble des intérêts du Groupe SIBIRI." },
    { label: "Paragraphe 4", value: "Le Groupe est présent dans le domaine du BTP, du biomédical, des Hydrocarbures, du transport, des intrants agricoles et du Négoce international." },
    { label: "Histoire SIBIRI Groupe — photo 1", value: "/groupe/histoire/DJI_0229.JPG", type: "image" },
    { label: "Histoire SIBIRI Groupe — photo 2", value: "/groupe/histoire/DJI_0235.JPG", type: "image" },
    { label: "Histoire SIBIRI Groupe — photo 3", value: "/groupe/histoire/DJI_0241.JPG", type: "image" },
    { label: "Histoire SIBIRI Groupe — photo 4", value: "/groupe/histoire/DJI_0244.JPG", type: "image" },
  ],
  'Groupe::Valeurs': [
    { label: "Titre section", value: "Les Principes qui Nous Définissent" },
    { label: "Confiance", value: "Par la fiabilité de nos prestations et le respect des engagements." },
    { label: "Qualité", value: "Par la recherche de l'excellence." },
    { label: "Croissance", value: "Par l'investissement dans des secteurs à forte valeur ajoutée." },
    { label: "Environnement", value: "Par le respect des normes environnementales." },
    { label: "Fidélité", value: "Par le développement de la qualité auprès de nos clients." },
  ],
  'Actualités::Liste des actualités': [
    { label: "Eyebrow", value: "Actualités et événements" },
    { label: "Titre principal", value: "Suivez nos dernières actualités" },
    { label: "Sous-titre", value: "Découvrez les derniers développements, projets et initiatives du groupe SIBIRI Holding et ses filiales." },
    { label: "Label À la une", value: "À la une" },
    { label: "Article 1 - Titre", value: "SIBIRI Holding inaugure son nouveau siège régional" },
    { label: "Article 1 - Extrait", value: "Le groupe annonce l'ouverture de son centre de commandement régional en Afrique de l'Ouest, renforçant sa présence dans la zone." },
    { label: "Article 2 - Titre", value: "SIBIRI Energy signe un contrat exclusif avec WOLF LUBRICANTS" },
    { label: "Article 2 - Extrait", value: "Partenariat stratégique pour la distribution de lubrifiants premium en Afrique de l'Ouest." },
    { label: "CTA pagination", value: "Charger plus d'articles" },
    { label: "Lien article", value: "Lire l'article" },
    { label: "SIBIRI Holding inaugure son nouveau siège régional (image cassée — fichier manquant)", value: "/news/news-1.jpg", type: "image" },
    { label: "SIBIRI Energy signe un contrat exclusif avec WOLF LUBRICANTS (image cassée — fichier manquant)", value: "/news/energy-1.jpg", type: "image" },
    { label: "Expansion du réseau de stations-service SIBIRI Energy (image cassée — fichier manquant)", value: "/news/energy-2.jpg", type: "image" },
    { label: "SIBIRI Bio Medical lance un programme de formation médicale (image cassée — fichier manquant)", value: "/news/medical-1.jpg", type: "image" },
    { label: "Transport & Logistique : nouveaux véhicules (image cassée — fichier manquant)", value: "/news/transport-1.jpg", type: "image" },
    { label: "SIBIRI Global Construction remporte un prix d'excellence (image cassée — fichier manquant)", value: "/news/construction-1.jpg", type: "image" },
    { label: "Rapport annuel 2024 (image cassée — fichier manquant)", value: "/news/rapport-2024.jpg", type: "image" },
    { label: "Conférence internationale SIBIRI Holding (image cassée — fichier manquant)", value: "/news/conference.jpg", type: "image" },
  ],
  'Contact::Coordonnées': [
    { label: "Badge Hero", value: "Contactez-Nous" },
    { label: "Titre Hero", value: "Parlons de votre projet" },
    { label: "Sous-titre Hero", value: "Que vous soyez partenaire, investisseur, client ou candidat, notre équipe est à votre écoute pour répondre à toutes vos sollicitations." },
    { label: "Siège Social", value: "Ouagadougou, Burkina Faso" },
    { label: "Siège Social - Détail", value: "Secteur 15, Avenue Kwamé N'Krumah" },
    { label: "Téléphone", value: "+226 25 36 XX XX" },
    { label: "Téléphone - Détail", value: "Lun – Ven, 08h – 17h" },
    { label: "Email", value: "contact@sibiriholding.com" },
    { label: "Email - Détail", value: "Réponse sous 24h ouvrées" },
    { label: "Horaires", value: "Lun – Ven : 08h00 – 17h00" },
    { label: "Horaires - Détail", value: "Samedi : 09h00 – 13h00" },
    { label: "Titre section carte", value: "Nous trouver à Ouagadougou" },
    { label: "Logo SIBIRI Holding (carte contact)", value: "/SIBIRI%20Holding.png", type: "image" },
  ],
  'Contact::Formulaire': [
    { label: "Badge", value: "Formulaire de contact" },
    { label: "Titre section", value: "Envoyez-nous un message" },
    { label: "Sous-titre", value: "Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les meilleurs délais." },
    { label: "Bouton envoi", value: "Envoyer le message" },
    { label: "Confirmation - Titre", value: "Message envoyé !" },
    { label: "Confirmation - Texte", value: "Merci pour votre message. Notre équipe reviendra vers vous dans les 24 heures ouvrées." },
    { label: "Texte politique de confidentialité", value: "En soumettant ce formulaire, vous acceptez que vos données soient traitées par SIBIRI Holding SA dans le cadre de votre demande, conformément à notre politique de confidentialité." },
  ],
  'Accueil::Hero': [
    { label: "Logo filiale — Construction (bandeau hero)", value: "/Sibiri-Construction.png", type: "image" },
    { label: "Logo filiale — Medical (bandeau hero)", value: "/Sibiri-Medical.png", type: "image" },
    { label: "Logo filiale — Energy (bandeau hero)", value: "/Sibiri-Energy.png", type: "image" },
    { label: "Logo filiale — Transport (bandeau hero)", value: "/Sibiri-Transport.png", type: "image" },
    { label: "Logo filiale — Agro (bandeau hero)", value: "/Sibiri-Agro.png", type: "image" },
  ],
  'Accueil::Nos filiales': [
    { label: "Logo carte — Construction", value: "/Sibiri-Construction.png", type: "image" },
    { label: "Logo carte — Medical", value: "/Sibiri-Medical.png", type: "image" },
    { label: "Logo carte — Energy", value: "/Sibiri-Energy.png", type: "image" },
    { label: "Logo carte — Transport", value: "/Sibiri-Transport.png", type: "image" },
    { label: "Logo carte — Agro", value: "/Sibiri-Agro.png", type: "image" },
  ],
}

const slugify = (s) => (s || '')
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// ─── Une ligne de contenu éditable ─────────────────────────────────────────
const ContentRow = ({ row, onSaved, onDeleted }) => {
  const initial = row.type === 'text' || row.type === 'richtext' || row.type === 'image'
    ? (typeof row.value === 'string' ? row.value : JSON.stringify(row.value))
    : JSON.stringify(row.value, null, 2)

  const [value, setValue] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | saving | saved | error
  const [uploading, setUploading] = useState(false)
  const TypeIcon = TYPE_ICONS[row.type] || Type

  const save = async () => {
    setStatus('saving')
    let parsed = value
    if (row.type === 'list') {
      try { parsed = JSON.parse(value) } catch { setStatus('error'); return }
    }
    const { error } = await supabase.from('content').update({ value: parsed, updated_at: new Date().toISOString() }).eq('key', row.key)
    setStatus(error ? 'error' : 'saved')
    if (!error) { onSaved?.(row.key, parsed); setTimeout(() => setStatus('idle'), 1800) }
  }

  const removeRow = async () => {
    if (!confirm(`Supprimer le champ « ${row.label} » ? Cette action est définitive.`)) return
    const { error } = await supabase.from('content').delete().eq('key', row.key)
    if (!error) onDeleted?.(row.key)
  }

  const uploadImage = async (file) => {
    setUploading(true)
    const path = `${row.key}/${Date.now()}-${file.name}`
    const { error: upErr } = await supabase.storage.from('content-images').upload(path, file, { upsert: true })
    if (!upErr) {
      const { data } = supabase.storage.from('content-images').getPublicUrl(path)
      setValue(data.publicUrl)
    }
    setUploading(false)
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 7,
    border: `1.5px solid ${LINE}`, background: '#fff', color: INK, fontSize: 13.5, fontFamily: "'Inter', sans-serif",
  }

  return (
    <div style={{ padding: '16px 18px', borderRadius: 10, background: '#fff', border: `1px solid ${LINE}`, marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
          <TypeIcon size={14} color={MUTED} style={{ marginTop: 3, flexShrink: 0 }} />
          <div>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: INK, fontFamily: "'Inter', sans-serif" }}>{row.label}</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: MUTED, fontFamily: "'Inter', sans-serif" }}>
              {row.key} · {TYPE_LABELS[row.type] || row.type}
            </p>
          </div>
        </div>
        <button
          onClick={removeRow} title="Supprimer ce champ"
          style={{ background: 'transparent', border: 'none', color: '#A1A1AA', cursor: 'pointer', padding: 4, borderRadius: 6, flexShrink: 0, display: 'flex' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#B4453A'; e.currentTarget.style.background = '#FBEDEB' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#A1A1AA'; e.currentTarget.style.background = 'transparent' }}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {row.type === 'image' ? (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {value && <img src={value} alt="" style={{ height: 56, borderRadius: 7, border: `1px solid ${LINE}` }} />}
          <label style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 7,
            border: `1.5px solid ${LINE}`, fontSize: 12.5, color: '#3F3F46', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
          }}>
            <Upload size={13} /> {uploading ? 'Envoi…' : 'Choisir une image'}
            <input type="file" accept="image/*" onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>
      ) : row.type === 'richtext' || row.type === 'list' ? (
        <textarea
          value={value} onChange={e => setValue(e.target.value)} rows={row.type === 'list' ? 5 : 3}
          style={{ ...inputStyle, fontFamily: row.type === 'list' ? "'SFMono-Regular', Consolas, monospace" : "'Inter', sans-serif", resize: 'vertical' }}
        />
      ) : (
        <input value={value} onChange={e => setValue(e.target.value)} style={inputStyle} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <button
          onClick={save} disabled={status === 'saving'}
          style={{ padding: '7px 16px', borderRadius: 7, border: 'none', background: GOLD, color: '#fff', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
        >
          {status === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        {status === 'saved' && <span style={{ fontSize: 12, color: '#3F8A57', fontFamily: "'Inter', sans-serif" }}>✓ Enregistré</span>}
        {status === 'error' && <span style={{ fontSize: 12, color: '#B4453A', fontFamily: "'Inter', sans-serif" }}>Erreur — JSON invalide ?</span>}
      </div>
    </div>
  )
}

// ─── Formulaire compact d'ajout, pré-rempli avec la page/section active ────
const AddFieldInline = ({ page, section, onAdded }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ key: '', label: '', type: 'text', value: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    let value = form.value
    if (form.type === 'list') {
      try { value = JSON.parse(form.value || '[]') } catch { setError('JSON invalide pour une liste.'); setBusy(false); return }
    }
    const { error: err } = await supabase.from('content').insert({
      key: form.key.trim(), label: form.label.trim(), page, section, type: form.type, value,
    })
    setBusy(false)
    if (err) { setError(err.message); return }
    onAdded?.()
    setForm({ key: '', label: '', type: 'text', value: '' })
    setOpen(false)
  }

  const inputSm = {
    padding: '8px 11px', borderRadius: 7, border: `1.5px solid ${LINE}`,
    background: '#fff', color: INK, fontSize: 13, fontFamily: "'Inter', sans-serif",
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 10px', borderRadius: 7, border: 'none', background: 'transparent',
          color: MUTED, fontWeight: 500, fontSize: 12.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif", marginBottom: 8,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = INK; e.currentTarget.style.background = '#F4F4F2' }}
        onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.background = 'transparent' }}
      >
        <Plus size={13} /> Ajouter un champ
      </button>
    )
  }

  return (
    <form onSubmit={submit} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10, padding: 16, marginBottom: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      <div style={{ gridColumn: '1 / -1', fontSize: 11.5, color: MUTED, fontFamily: "'Inter', sans-serif" }}>
        Nouveau champ pour <strong style={{ color: INK }}>{page} → {section}</strong> — sera visible sur le site une fois relié au composant par un développeur.
      </div>
      <input required placeholder="Clé unique (ex: medical.hero.title)" value={form.key} onChange={set('key')} style={{ ...inputSm, gridColumn: '1 / -1' }} />
      <input required placeholder="Nom affiché (ex: Titre du hero)" value={form.label} onChange={set('label')} style={inputSm} />
      <select value={form.type} onChange={set('type')} style={inputSm}>
        {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <input placeholder="Valeur initiale" value={form.value} onChange={set('value')} style={{ ...inputSm, gridColumn: '1 / -1' }} />
      {error && <p style={{ gridColumn: '1 / -1', color: '#B4453A', fontSize: 12, margin: 0 }}>{error}</p>}
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10 }}>
        <button type="submit" disabled={busy} style={{ padding: '7px 16px', borderRadius: 7, border: 'none', background: GOLD, color: '#fff', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          {busy ? 'Ajout…' : 'Créer le champ'}
        </button>
        <button type="button" onClick={() => setOpen(false)} style={{ padding: '7px 14px', borderRadius: 7, border: `1px solid ${LINE}`, background: 'transparent', color: MUTED, fontSize: 12.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          Annuler
        </button>
      </div>
    </form>
  )
}

// ─── Une donnée qui existe déjà en dur sur le site, pas encore reliée au
// back-office — aperçu en lecture seule + publication en un clic (le champ
// est alors créé avec cette valeur exacte, prêt à être relié par un développeur).
const SnapshotRow = ({ entry, page, section, onAdded }) => {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState(() => `${slugify(page)}.${slugify(section)}.${slugify(entry.label)}`)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const isImage = entry.type === 'image'
  const preview = !isImage && entry.value.length > 170 ? entry.value.slice(0, 170) + '…' : entry.value

  const publish = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error: err } = await supabase.from('content').insert({
      key: key.trim(), label: entry.label, page, section, type: isImage ? 'image' : 'text', value: entry.value,
    })
    setBusy(false)
    if (err) { setError(err.message); return }
    onAdded?.()
  }

  if (open) {
    return (
      <form onSubmit={publish} style={{ background: '#fff', border: `1px solid ${GOLD}`, borderRadius: 10, padding: 14, marginBottom: 8 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: MUTED }}>Publier « <strong style={{ color: INK }}>{entry.label}</strong> » comme champ éditable :</p>
        {isImage ? (
          <div style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 10, background: PANEL, borderRadius: 7, padding: '8px 10px' }}>
            <img src={entry.value} alt="" style={{ height: 44, borderRadius: 5, border: `1px solid ${LINE}` }} />
            <code style={{ fontSize: 11, color: MUTED, wordBreak: 'break-all' }}>{entry.value}</code>
          </div>
        ) : (
          <p style={{ margin: '0 0 10px', fontSize: 12.5, color: '#3F3F46', background: PANEL, borderRadius: 7, padding: '8px 10px', whiteSpace: 'pre-wrap' }}>{entry.value}</p>
        )}
        <input required value={key} onChange={e => setKey(e.target.value)} placeholder="Clé unique"
          style={{ width: '100%', boxSizing: 'border-box', padding: '8px 11px', borderRadius: 7, border: `1.5px solid ${LINE}`, background: '#fff', color: INK, fontSize: 13, fontFamily: "'SFMono-Regular', Consolas, monospace", marginBottom: 10 }} />
        {error && <p style={{ color: '#B4453A', fontSize: 12, margin: '0 0 8px' }}>{error}</p>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={busy} style={{ padding: '7px 14px', borderRadius: 7, border: 'none', background: GOLD, color: '#fff', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            {busy ? 'Publication…' : 'Publier ce champ'}
          </button>
          <button type="button" onClick={() => setOpen(false)} style={{ padding: '7px 14px', borderRadius: 7, border: `1px solid ${LINE}`, background: 'transparent', color: MUTED, fontSize: 12.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            Annuler
          </button>
        </div>
      </form>
    )
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
      padding: '11px 14px', borderRadius: 10, background: PANEL, border: `1px dashed ${LINE}`, marginBottom: 8,
    }}>
      <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
        {isImage && <img src={entry.value} alt="" style={{ height: 36, width: 36, objectFit: 'cover', borderRadius: 6, border: `1px solid ${LINE}`, flexShrink: 0 }} />}
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: '#3F3F46', fontFamily: "'Inter', sans-serif" }}>{entry.label}</p>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: MUTED, whiteSpace: isImage ? 'nowrap' : 'pre-wrap', overflow: isImage ? 'hidden' : 'visible', textOverflow: isImage ? 'ellipsis' : 'clip', lineHeight: 1.5, fontFamily: isImage ? "'SFMono-Regular', Consolas, monospace" : "'Inter', sans-serif" }}>{preview}</p>
        </div>
      </div>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 11px', borderRadius: 7,
          border: `1px solid ${LINE}`, background: '#fff', color: '#3F3F46', fontSize: 11.5, fontWeight: 600,
          cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
        }}
      >
        <Plus size={12} /> Publier
      </button>
    </div>
  )
}

// ─── Détection mobile (réactive au redimensionnement) ──────────────────────
const useIsMobile = (breakpoint = 880) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < breakpoint)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isMobile
}

// ─── Dashboard principal ────────────────────────────────────────────────────
export const AdminDashboard = () => {
  const [rows, setRows] = useState(null)
  const [filialeId, setFilialeId] = useState('holding')
  const [pageId, setPageId] = useState('accueil')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const isMobile = useIsMobile()

  const load = async () => {
    const { data, error } = await supabase.from('content').select('*').order('page').order('section')
    if (!error) setRows(data)
  }

  useEffect(() => { load() }, [])

  const filiale = FILIALES.find(f => f.id === filialeId) || FILIALES[0]
  const page = filiale.pages.find(p => p.id === pageId) || filiale.pages[0]

  const rowsByPage = useMemo(() => {
    if (!rows) return []
    return rows.filter(r => r.page === page.dbPage)
  }, [rows, page.dbPage])

  const rowsBySection = useMemo(() => {
    const map = {}
    for (const r of rowsByPage) { (map[r.section] = map[r.section] || []).push(r) }
    return map
  }, [rowsByPage])

  // Sections définies pour cette page, + toute section imprévue déjà présente en base.
  const sectionsToShow = useMemo(() => {
    const extra = Object.keys(rowsBySection).filter(s => !page.sections.includes(s))
    return [...page.sections, ...extra]
  }, [page, rowsBySection])

  const totalFields = rowsByPage.length

  const navBtnBase = {
    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8,
    border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', fontFamily: "'Inter', sans-serif",
  }

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: 'calc(100vh - 57px)', background: '#fff', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Sidebar : toutes les filiales du site ────────────────────────── */}
      <aside style={{
        width: isMobile ? '100%' : 260, flexShrink: 0, background: PANEL, borderRight: isMobile ? 'none' : `1px solid ${LINE}`,
        borderBottom: isMobile ? `1px solid ${LINE}` : 'none',
        padding: isMobile ? 14 : '22px 14px',
      }}>
        {isMobile && (
          <button
            onClick={() => setMobileNavOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
              padding: '9px 12px', borderRadius: 8, border: `1px solid ${LINE}`, background: '#fff', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: 13, color: INK, fontWeight: 600,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <filiale.Icon size={14} color={filiale.color} /> {filiale.label} — {page.label}
            </span>
            {mobileNavOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        )}

        <div style={{ display: isMobile && !mobileNavOpen ? 'none' : 'block', marginTop: isMobile ? 14 : 0 }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A1A1AA', margin: '0 0 8px 10px' }}>Filiales</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {FILIALES.map(f => (
              <button
                key={f.id}
                onClick={() => { setFilialeId(f.id); setPageId(f.pages[0].id) }}
                style={{
                  ...navBtnBase,
                  background: filialeId === f.id ? GOLD_BG : 'transparent',
                  color: filialeId === f.id ? INK : '#3F3F46',
                  fontWeight: filialeId === f.id ? 600 : 500, fontSize: 13.5,
                }}
              >
                <f.Icon size={15} color={filialeId === f.id ? f.color : '#A1A1AA'} />
                {f.label}
              </button>
            ))}
          </div>

          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A1A1AA', margin: '24px 0 8px 10px' }}>Pages — {filiale.label}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filiale.pages.map(p => (
              <button
                key={p.id}
                onClick={() => { setPageId(p.id); setMobileNavOpen(false) }}
                style={{
                  ...navBtnBase, flexDirection: 'column', alignItems: 'flex-start', gap: 1,
                  background: pageId === p.id ? '#F4F4F2' : 'transparent',
                }}
              >
                <span style={{ color: pageId === p.id ? INK : '#3F3F46', fontWeight: pageId === p.id ? 600 : 500, fontSize: 13 }}>{p.label}</span>
                <span style={{ color: '#A1A1AA', fontSize: 10.5, fontFamily: "'SFMono-Regular', Consolas, monospace" }}>{p.path}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Contenu principal ────────────────────────────────────────────── */}
      <main style={{ flex: 1, minWidth: 0, padding: isMobile ? '24px 18px 80px' : '32px 40px 100px', maxWidth: 860 }}>

        {/* Fil d'ariane + titre + lien vers la page réelle */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 4 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <filiale.Icon size={13} color={filiale.color} />
              <p style={{ margin: 0, fontSize: 12, color: MUTED }}>{filiale.label}</p>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: 0, letterSpacing: '-0.01em' }}>{page.label}</h1>
          </div>
          <a
            href={page.path} target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 8,
              border: `1px solid ${LINE}`, color: '#3F3F46', textDecoration: 'none', fontSize: 12.5, fontWeight: 500,
              flexShrink: 0,
            }}
          >
            Voir la page <ExternalLink size={13} />
          </a>
        </div>

        <p style={{ fontSize: 13, color: MUTED, margin: '10px 0 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <code style={{ background: PANEL, border: `1px solid ${LINE}`, borderRadius: 5, padding: '2px 7px', fontSize: 11.5, color: '#52525B' }}>{page.path}</code>
          {totalFields > 0
            ? `${totalFields} champ${totalFields > 1 ? 's' : ''} éditable${totalFields > 1 ? 's' : ''}`
            : 'Aucun champ relié pour le moment'}
        </p>

        {rows === null && <p style={{ color: MUTED, fontSize: 13.5 }}>Chargement…</p>}

        {rows && sectionsToShow.map(section => {
          const existingLabels = new Set((rowsBySection[section] || []).map(r => r.label))
          const snapshotEntries = (SITE_SNAPSHOT[`${page.dbPage}::${section}`] || [])
            .filter(entry => !existingLabels.has(entry.label))

          return (
            <div key={section} style={{ marginBottom: 30 }}>
              <h2 style={{
                fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                color: '#3F3F46', margin: '0 0 12px', paddingBottom: 8, borderBottom: `1px solid ${LINE}`,
              }}>
                {section}
              </h2>

              {(rowsBySection[section] || []).map(row => (
                <ContentRow
                  key={row.key}
                  row={row}
                  onSaved={(key, value) => setRows(rs => rs.map(r => r.key === key ? { ...r, value } : r))}
                  onDeleted={(key) => setRows(rs => rs.filter(r => r.key !== key))}
                />
              ))}

              {snapshotEntries.length > 0 && (
                <>
                  <p style={{ fontSize: 11, color: MUTED, margin: '4px 0 8px', fontFamily: "'Inter', sans-serif" }}>
                    Contenu actuel sur le site — pas encore relié au back-office
                  </p>
                  {snapshotEntries.map((entry, i) => (
                    <SnapshotRow key={`${section}-${i}`} entry={entry} page={page.dbPage} section={section} onAdded={load} />
                  ))}
                </>
              )}

              <AddFieldInline page={page.dbPage} section={section} onAdded={load} />
            </div>
          )
        })}
      </main>
    </div>
  )
}
