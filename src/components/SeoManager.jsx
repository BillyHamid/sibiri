import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://www.sibiri.group'
const FALLBACK = {
  title: 'SIBIRI Holding | Groupe multisectoriel au Burkina Faso',
  description: 'SIBIRI Holding est un groupe multisectoriel engagé dans la construction, la santé, l’énergie, le transport et l’agriculture au Burkina Faso.',
}

const PAGES = {
  '/': FALLBACK,
  '/groupe': { title: 'Le Groupe | SIBIRI Holding', description: 'Découvrez l’histoire, la vision et les valeurs qui animent SIBIRI Holding.' },
  '/actualites': { title: 'Actualités | SIBIRI Holding', description: 'Les actualités, projets et partenariats de SIBIRI Holding et de ses filiales.' },
  '/contact': { title: 'Contact | SIBIRI Holding', description: 'Contactez les équipes de SIBIRI Holding au Burkina Faso.' },
  '/medical': { title: 'SIBIRI Bio Medical | Santé & biomédical', description: 'Produits pharmaceutiques, équipements biomédicaux et services de santé par SIBIRI Bio Medical.' },
  '/medical/realisations': { title: 'Réalisations médicales | SIBIRI Bio Medical', description: 'Découvrez les réalisations de SIBIRI Bio Medical dans le secteur de la santé.' },
  '/medical/actualite': { title: 'Actualités médicales | SIBIRI Bio Medical', description: 'Les actualités et projets de SIBIRI Bio Medical.' },
  '/medical/formation': { title: 'Formations | SIBIRI Bio Medical', description: 'Les programmes de formation proposés par SIBIRI Bio Medical.' },
  '/energy': { title: 'SIBIRI Energy | Carburants & lubrifiants', description: 'Carburants, lubrifiants et solutions énergétiques pour les professionnels et le grand public.' },
  '/energy/services': { title: 'Produits & services | SIBIRI Energy', description: 'Découvrez les carburants, lubrifiants et services de SIBIRI Energy.' },
  '/energy/a-propos': { title: 'À propos | SIBIRI Energy', description: 'SIBIRI Energy accompagne les territoires avec des solutions énergétiques fiables.' },
  '/energy/actualite': { title: 'Actualités | SIBIRI Energy', description: 'Les dernières actualités de SIBIRI Energy.' },
  '/energy/contact': { title: 'Contact | SIBIRI Energy', description: 'Contactez SIBIRI Energy pour vos besoins en carburants et lubrifiants.' },
  '/agro-chemical': { title: 'SIBIRI Agro Chemical | Agriculture & intrants', description: 'Intrants agricoles, engrais et accompagnement technique pour une agriculture performante et durable.' },
  '/global-construction': { title: 'SIBIRI Global Construction | BTP & infrastructures', description: 'Construction, rénovation et génie civil avec SIBIRI Global Construction.' },
  '/transport-logistic': { title: 'SIBIRI Transport & Logistics | Transport & logistique', description: 'Transport de marchandises et solutions logistiques par SIBIRI Transport & Logistics.' },
}

const setMeta = (selector, attribute, content) => {
  const node = document.querySelector(selector)
  if (node) node.setAttribute(attribute, content)
}

export const SeoManager = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = PAGES[pathname] || FALLBACK
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    document.title = page.title
    setMeta('meta[name="description"]', 'content', page.description)
    setMeta('meta[property="og:title"]', 'content', page.title)
    setMeta('meta[property="og:description"]', 'content', page.description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [pathname])

  return null
}
