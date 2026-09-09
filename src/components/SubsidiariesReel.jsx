import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContentValue } from '../lib/content/ContentProvider'
import './SubsidiariesReel.css'

const SUBSIDIARIES = [
  {
    id: 'construction',
    name: 'Sibiri Global Construction et Rénovation',
    shortName: 'Global Construction',
    tagline: 'BTP & Infrastructures',
    color: '#A64D42',
    route: '/global-construction',
    logo: '/Sibiri-Construction.png',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Chantier de construction et engins de travaux publics',
    headline: 'Bâtir les espaces de demain.',
    desc: 'Bâtiments, voiries et génie civil : une expertise au service des infrastructures, de la construction à la rénovation.',
    fields: ['Construction', 'Rénovation', 'Génie civil'],
  },
  {
    id: 'medical',
    name: 'Sibiri Bio Medical',
    shortName: 'Bio Medical',
    tagline: 'Santé & Biomédical',
    color: '#31823e',
    route: '/medical',
    logo: '/Sibiri-Medical.png',
    image: '/medical/scientist-black-woman-beaker-microscope-600nw-2555614553.webp',
    imageAlt: 'Scientifique au travail dans un laboratoire',
    headline: 'Accompagner celles et ceux qui soignent.',
    desc: 'Équipements biomédicaux, produits pharmaceutiques et maintenance : des solutions pour les professionnels de santé.',
    fields: ['Équipements médicaux', 'Laboratoire', 'Maintenance'],
  },
  {
    id: 'energy',
    name: 'Sibiri Energy',
    shortName: 'Energy',
    tagline: 'Énergie & Ressources',
    color: '#E62630',
    route: '/energy',
    logo: '/Sibiri-Energy.png',
    image: '/energy/SIBIRI%20ENERGY-5.JPG.jpeg',
    imageAlt: 'Station-service Sibiri Energy à Kouba–Koubri',
    headline: 'Faire avancer toutes les énergies.',
    desc: 'Carburants, lubrifiants et solutions énergétiques pour accompagner les entreprises comme le grand public.',
    fields: ['Carburants', 'Lubrifiants', 'Solaire'],
  },
  {
    id: 'transport',
    name: 'Sibiri Transport & Logistics',
    shortName: 'Transport & Logistics',
    tagline: 'Transport & Logistique',
    color: '#0070b3',
    route: '/transport-logistic',
    logo: '/Sibiri-Transport.png',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?fm=jpg&q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Camion de transport de marchandises sur la route',
    headline: 'Relier les marchés et les opportunités.',
    desc: 'Transport de marchandises et logistique pour les secteurs industriel, minier et commercial, au national comme à l’international.',
    fields: ['Transport routier', 'Logistique', 'Distribution'],
  },
  {
    id: 'agro',
    name: 'Sibiri Agro Chemical',
    shortName: 'Agro Chemical',
    tagline: 'Agriculture & Chimie',
    color: '#527d17',
    route: '/agro-chemical',
    logo: '/Sibiri-Agro.png',
    image: '/agro/engrais-haute-qualite.jpg',
    imageAlt: 'Apport d’engrais à une jeune plante',
    headline: 'Cultiver le potentiel de nos terres.',
    desc: 'Intrants agricoles, engrais et accompagnement technique pour répondre aux besoins des producteurs et aux enjeux du secteur agricole.',
    fields: ['Intrants agricoles', 'Engrais', 'Conseil agronomique'],
  },
]

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const SubsidiariesReel = () => {
  const title = useContentValue('home.filiales.title', 'Un Groupe, 5 expertises')
  const subtitle = useContentValue('home.filiales.subtitle', "Chaque filiale incarne un secteur clé du développement africain, avec une stratégie d'excellence propre à son domaine.")
  const [activeIndex, setActiveIndex] = useState(0)
  const [failedImages, setFailedImages] = useState({})
  const selected = SUBSIDIARIES[activeIndex]

  return (
    <section id="nos-filiales" className="holding-filiales" aria-labelledby="holding-filiales-title">
      <div className="hf-container">
        <header className="hf-heading">
          <div>
            <p className="hf-eyebrow"><span aria-hidden="true" />Nos filiales</p>
            <h2 id="holding-filiales-title">{title}<span className="hf-heading-dot">.</span></h2>
          </div>
          <p className="hf-introduction">{subtitle}</p>
        </header>

        <div className="hf-explorer">
          <div className="hf-directory">
            <p className="hf-directory-label">Explorez nos univers <span aria-hidden="true">↓</span></p>
            <div className="hf-selectors" role="group" aria-label="Choisir une filiale">
              {SUBSIDIARIES.map((filiale, index) => (
                <button
                  key={filiale.id}
                  type="button"
                  className="hf-selector"
                  aria-label={`Sélectionner ${filiale.name}`}
                  aria-pressed={activeIndex === index}
                  aria-controls="holding-filiale-detail"
                  onClick={() => setActiveIndex(index)}
                  style={{ '--filiale-color': filiale.color }}
                >
                  <span className="hf-selector-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="hf-selector-logo-wrap">
                    <img src={filiale.logo} alt="" className="hf-selector-logo" />
                  </span>
                  <span className="hf-selector-arrow"><Arrow /></span>
                </button>
              ))}
            </div>
            <div className="hf-signature"><span className="hf-signature-line" /><p>Cinq métiers.<br /><strong>Une ambition commune.</strong></p></div>
          </div>

          <div id="holding-filiale-detail" className="hf-detail" style={{ '--filiale-color': selected.color }} role="region" aria-label={selected.name}>
            <div className="hf-photo">
              {failedImages[selected.id] ? (
                <div className="hf-photo-fallback"><img src={selected.logo} alt={selected.name} /></div>
              ) : (
                <img
                  key={selected.id}
                  className="hf-main-image"
                  src={selected.image}
                  alt={selected.imageAlt}
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailedImages(previous => ({ ...previous, [selected.id]: true }))}
                />
              )}
              <span className="hf-photo-caption">L’univers {selected.shortName}</span>
              <span className="hf-counter"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span>/ 05</span></span>
            </div>
            <div className="hf-detail-copy">
              <div className="hf-brand-row"><p>{selected.name}</p><img src={selected.logo} alt="" className="hf-brand-logo" /></div>
              <div aria-live="polite" aria-atomic="true">
                <h3>{selected.headline}</h3>
                <p className="hf-description">{selected.desc}</p>
              </div>
              <ul className="hf-fields" aria-label="Domaines d’activité">{selected.fields.map(field => <li key={field}>{field}</li>)}</ul>
              <Link className="hf-discover" to={selected.route}>Découvrir {selected.shortName}<Arrow /></Link>
            </div>
          </div>
        </div>

        <footer className="hf-footer"><p>Des expertises complémentaires, une vision partagée.</p><Link to="/groupe">Découvrir le groupe<Arrow /></Link></footer>
      </div>
    </section>
  )
}
