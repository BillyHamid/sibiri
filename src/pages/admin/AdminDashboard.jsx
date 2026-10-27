import { Building2, Stethoscope, Zap, HardHat, Truck, Leaf } from 'lucide-react';
import { AdminEditor } from './AdminEditor';
const GOLD = '#B8923E';
const FILIALES = [{
  id: 'holding',
  label: 'SIBIRI Holding',
  Icon: Building2,
  color: GOLD,
  pages: [{
    id: 'accueil',
    label: 'Accueil',
    path: '/',
    dbPage: 'Accueil',
    sections: ['Hero', 'Nos filiales', 'Mot du Président', 'Organigramme', 'Partenaires']
  }, {
    id: 'groupe',
    label: 'Groupe',
    path: '/groupe',
    dbPage: 'Groupe',
    sections: ['Hero', 'Histoire', 'Valeurs']
  }, {
    id: 'actualites',
    label: 'Actualités',
    path: '/actualites',
    dbPage: 'Actualités',
    sections: ['Liste des actualités']
  }, {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    dbPage: 'Contact',
    sections: ['Coordonnées', 'Formulaire']
  }]
}, {
  id: 'medical',
  label: 'Bio Medical',
  Icon: Stethoscope,
  color: '#00A99D',
  pages: [{
    id: 'accueil',
    label: 'Accueil',
    path: '/medical',
    dbPage: 'Medical',
    sections: ['Hero', 'Présentation', 'Mission & Vision', 'Services', 'Atouts', 'Contact']
  }, {
    id: 'realisations',
    label: 'Réalisations',
    path: '/medical/realisations',
    dbPage: 'Medical Réalisations',
    sections: ['Liste des réalisations']
  }, {
    id: 'actualite',
    label: 'Actualité',
    path: '/medical/actualite',
    dbPage: 'Medical Actualité',
    sections: ['Liste des actualités']
  }, {
    id: 'formation',
    label: 'Formation',
    path: '/medical/formation',
    dbPage: 'Medical Formation',
    sections: ['Programmes de formation']
  }]
}, {
  id: 'energy',
  label: 'Energy',
  Icon: Zap,
  color: '#E62630',
  pages: [{
    id: 'accueil',
    label: 'Accueil',
    path: '/energy',
    dbPage: 'Energy',
    sections: ['Hero / Carrousel', 'Chiffres clés']
  }, {
    id: 'produits',
    label: 'Produits',
    path: '/energy/services',
    dbPage: 'Energy Produits',
    sections: ['Carburant', 'Lubrifiants', 'Services']
  }, {
    id: 'apropos',
    label: 'À propos',
    path: '/energy/a-propos',
    dbPage: 'Energy À propos',
    sections: ['Présentation']
  }, {
    id: 'actualite',
    label: 'Actualité',
    path: '/energy/actualite',
    dbPage: 'Energy Actualité',
    sections: ['Liste des actualités']
  }, {
    id: 'contact',
    label: 'Contact',
    path: '/energy/contact',
    dbPage: 'Energy Contact',
    sections: ['Coordonnées']
  }]
}, {
  id: 'construction',
  label: 'Global Construction',
  Icon: HardHat,
  color: '#A64D42',
  pages: [{
    id: 'accueil',
    label: 'Page principale',
    path: '/global-construction',
    dbPage: 'Global Construction',
    sections: ['Hero', 'Activités', 'Organisation', 'Solidité & Équipe', 'Valeurs', 'Contact']
  }]
}, {
  id: 'transport',
  label: 'Transport & Logistic',
  Icon: Truck,
  color: '#0ea5e9',
  pages: [{
    id: 'accueil',
    label: 'Page principale',
    path: '/transport-logistic',
    dbPage: 'Transport & Logistic',
    sections: ['Hero', 'Activités', 'Flotte', 'Engagements', 'Contact']
  }]
}, {
  id: 'agro',
  label: 'Agro Chemical',
  Icon: Leaf,
  color: '#1f9d55',
  pages: [{
    id: 'accueil',
    label: 'Page principale',
    path: '/agro-chemical',
    dbPage: 'Agro Chemical',
    sections: ['Hero', 'Expertise', 'Services', 'Réalisations', 'Contact']
  }]
}];
export const AdminDashboard = () => <AdminEditor filiales={FILIALES} />;
