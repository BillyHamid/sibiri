import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { NeoMinimalFooter } from '../components/NeoMinimalFooter'

// ─── Palette ─────────────────────────────────────────────────────────────────
const GOLD = '#C9A84C'
const DARK = '#1D1D1B'
const DARK2 = '#2A2A28'
const DARK3 = '#3A3A38'
const GRAY = '#9ca3af'

// ─── Sample articles data ─────────────────────────────────────────────────────
const ARTICLES_DATA = [
  {
    id: 1,
    title: 'SIBIRI Holding inaugure son nouveau siège régional',
    excerpt: 'Le groupe annonce l\'ouverture de son centre de commandement régional en Afrique de l\'Ouest, renforçant sa présence dans la zone.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Événements',
    image: '/news/news-1.jpg',
    date: '2025-05-15',
    filiale: 'Groupe',
    featured: true,
  },
  {
    id: 2,
    title: 'SIBIRI Energy signe un contrat exclusif avec WOLF LUBRICANTS',
    excerpt: 'Partenariat stratégique pour la distribution de lubrifiants premium en Afrique de l\'Ouest.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Communiqués de Presse',
    image: '/news/energy-1.jpg',
    date: '2025-05-10',
    filiale: 'Energy',
    featured: true,
  },
  {
    id: 3,
    title: 'Expansion du réseau de stations-service SIBIRI Energy',
    excerpt: '3 nouvelles stations prévues dans la zone de Ouagadougou pour 2025.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Actualités Filiales',
    image: '/news/energy-2.jpg',
    date: '2025-05-08',
    filiale: 'Energy',
    featured: false,
  },
  {
    id: 4,
    title: 'SIBIRI Bio Medical lance un programme de formation médicale',
    excerpt: 'Initiative de renforcement des capacités des professionnels de santé au Burkina Faso.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Actualités Filiales',
    image: '/news/medical-1.jpg',
    date: '2025-05-05',
    filiale: 'Medical',
    featured: false,
  },
  {
    id: 5,
    title: 'Transport & Logistique : nouveaux véhicules de dernière génération',
    excerpt: 'Acquisition d\'une flotte moderne pour optimiser les opérations de transport.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Actualités Filiales',
    image: '/news/transport-1.jpg',
    date: '2025-04-28',
    filiale: 'Transport',
    featured: false,
  },
  {
    id: 6,
    title: 'SIBIRI Global Construction et Rénovation remporte un prix d\'excellence',
    excerpt: 'Reconnaissance internationale pour ses projets de construction durable.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Communiqués de Presse',
    image: '/news/construction-1.jpg',
    date: '2025-04-25',
    filiale: 'Construction',
    featured: false,
  },
  {
    id: 7,
    title: 'Rapport annuel 2024 : croissance de 35% pour le groupe',
    excerpt: 'SIBIRI Holding affiche des résultats exceptionnels avec une expansion dans 5 nouveaux marchés.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Rapports',
    image: '/news/rapport-2024.jpg',
    date: '2025-04-20',
    filiale: 'Groupe',
    featured: false,
  },
  {
    id: 8,
    title: 'Conférence internationale : SIBIRI Holding présente ses innovations',
    excerpt: 'Participation aux débats mondiaux sur l\'énergie durable et la transformation digitale.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Événements',
    image: '/news/conference.jpg',
    date: '2025-04-15',
    filiale: 'Groupe',
    featured: false,
  },
]

const CATEGORIES = [
  'Tous',
  'Communiqués de Presse',
  'Événements',
  'Actualités Filiales',
  'Rapports',
]

const FILIALES = ['Tous', 'Groupe', 'Energy', 'Medical', 'Transport', 'Construction', 'Agro-Chimie']

// ─── Reveal helper ───────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, x = 0, y = 24 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}

// ─── Hero section ────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section style={{
    position: 'relative', width: '100%', minHeight: '60vh',
    background: `linear-gradient(135deg, ${DARK} 0%, ${DARK2} 100%)`,
    overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    paddingTop: 90,
  }}>
    {/* Decorative background */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 500, height: 500,
          background: `radial-gradient(circle, ${GOLD}15, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />
    </div>

    {/* Content */}
    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 40px' }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: GOLD, fontFamily: "'Inter', sans-serif", margin: '0 0 20px',
        }}
      >
        Actualités et événements
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        style={{
          fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 900,
          color: '#ffffff', margin: '0 0 20px',
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.1,
        }}
      >
        Suivez nos dernières<br />actualités
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          fontSize: 'clamp(14px, 1.2vw, 16px)', color: GRAY,
          maxWidth: 580, margin: '0 auto', lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Découvrez les derniers développements, projets et initiatives du groupe SIBIRI Holding et ses filiales.
      </motion.p>
    </div>
  </section>
)

// ─── Featured Carousel ───────────────────────────────────────────────────────
const FeaturedCarousel = () => {
  const featured = ARTICLES_DATA.filter(a => a.featured)
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % featured.length)
  const prev = () => setCurrent((current - 1 + featured.length) % featured.length)

  return (
    <section style={{ background: DARK2, padding: '60px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        <Reveal>
          <p style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.34em',
            textTransform: 'uppercase', color: GOLD,
            fontFamily: "'Inter', sans-serif", margin: '0 0 14px',
          }}>À la une</p>
        </Reveal>

        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '16/9' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <img
                src={featured[current].image}
                alt={featured[current].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => e.target.style.display = 'none'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(29,29,27,0.95) 100%)',
              }} />
            </motion.div>
          </AnimatePresence>

          {/* Content overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '48px 40px', zIndex: 10,
            color: '#fff', maxWidth: 800,
          }}>
            <motion.p
              key={`tag-${current}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                margin: '0 0 14px',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                color: GOLD, textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {featured[current].category}
            </motion.p>

            <motion.h2
              key={`title-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800,
                margin: '0 0 16px', fontFamily: "'Playfair Display', serif",
                lineHeight: 1.2,
              }}
            >
              {featured[current].title}
            </motion.h2>

            <motion.p
              key={`excerpt-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '0 0 24px',
                lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
                maxWidth: 500,
              }}
            >
              {featured[current].excerpt}
            </motion.p>

            <motion.p
              key={`date-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 12, color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Inter', sans-serif", margin: 0,
              }}
            >
              {new Date(featured[current].date).toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </motion.p>
          </div>

          {/* Navigation */}
          <div style={{
            position: 'absolute', bottom: 24, right: 24, zIndex: 20,
            display: 'flex', gap: 10,
          }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              style={{
                width: 44, height: 44, borderRadius: 99,
                background: `${GOLD}25`, border: `1.5px solid ${GOLD}`,
                color: GOLD, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              style={{
                width: 44, height: 44, borderRadius: 99,
                background: GOLD, border: `1.5px solid ${GOLD}`,
                color: DARK, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>

          {/* Dots */}
          <div style={{
            position: 'absolute', bottom: 24, left: 24, zIndex: 20,
            display: 'flex', gap: 8,
          }}>
            {featured.map((_, i) => (
              <motion.div
                key={i}
                onClick={() => setCurrent(i)}
                animate={{
                  width: current === i ? 28 : 8,
                  background: current === i ? GOLD : `${GOLD}50`,
                }}
                style={{
                  height: 8, borderRadius: 99, cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Filters & Grid ──────────────────────────────────────────────────────────
const NewsGrid = () => {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [activeFiliale, setActiveFiliale] = useState('Tous')
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  const filtered = useMemo(() => {
    return ARTICLES_DATA.filter(a => {
      const catMatch = activeCategory === 'Tous' || a.category === activeCategory
      const filMatch = activeFiliale === 'Tous' || a.filiale === activeFiliale
      return catMatch && filMatch && !a.featured
    })
  }, [activeCategory, activeFiliale])

  const paginated = filtered.slice(0, page * itemsPerPage)
  const hasMore = paginated.length < filtered.length

  return (
    <section style={{ background: DARK, padding: '100px 0 120px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        {/* Category filters */}
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: GRAY,
              fontFamily: "'Inter', sans-serif", margin: '0 0 16px',
            }}>Catégories</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setActiveCategory(cat); setPage(1) }}
                  style={{
                    padding: '10px 18px', borderRadius: 99,
                    background: activeCategory === cat ? GOLD : 'transparent',
                    border: `1.5px solid ${activeCategory === cat ? GOLD : `${GOLD}40`}`,
                    color: activeCategory === cat ? DARK : GOLD,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    transition: 'all 0.3s',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Filiale filters */}
        <Reveal delay={0.1}>
          <div style={{ marginBottom: 56 }}>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: GRAY,
              fontFamily: "'Inter', sans-serif", margin: '0 0 16px',
            }}>Filiales</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {FILIALES.map(fil => (
                <motion.button
                  key={fil}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setActiveFiliale(fil); setPage(1) }}
                  style={{
                    padding: '10px 18px', borderRadius: 99,
                    background: activeFiliale === fil ? GOLD : 'transparent',
                    border: `1.5px solid ${activeFiliale === fil ? GOLD : `${GOLD}40`}`,
                    color: activeFiliale === fil ? DARK : GOLD,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    transition: 'all 0.3s',
                  }}
                >
                  {fil}
                </motion.button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Articles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 56 }}>
          <AnimatePresence mode="wait">
            {paginated.map((article, i) => (
              <ArticleCard key={article.id} article={article} delay={i * 0.05} />
            ))}
          </AnimatePresence>
        </div>

        {/* Load more button */}
        {hasMore && (
          <Reveal>
            <div style={{ textAlign: 'center' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(p => p + 1)}
                style={{
                  padding: '14px 40px', borderRadius: 10,
                  background: GOLD, color: DARK,
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", border: 'none',
                  transition: 'all 0.3s',
                  boxShadow: `0 8px 24px ${GOLD}40`,
                }}
              >
                Charger plus d'articles
              </motion.button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

// ─── Article Card ───────────────────────────────────────────────────────────
const ArticleCard = ({ article, delay }) => {
  const [hov, setHov] = useState(false)

  return (
    <Reveal delay={delay}>
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
          background: DARK2, border: `1.5px solid ${GOLD}20`,
          transform: hov ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hov ? `0 24px 56px -12px ${GOLD}30` : '0 8px 24px rgba(0,0,0,0.3)',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative', height: 220, overflow: 'hidden',
          background: `linear-gradient(135deg, ${DARK2}, ${DARK3})`,
        }}>
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hov ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
            onError={(e) => e.target.style.display = 'none'}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, transparent 40%, ${DARK}80)`,
          }} />

          {/* Category tag */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: `${GOLD}25`, border: `1px solid ${GOLD}`,
            padding: '5px 12px', borderRadius: 6,
            fontSize: 10, fontWeight: 700, color: GOLD,
            fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            {article.category}
          </div>

          {/* Filiale badge */}
          <div style={{
            position: 'absolute', bottom: 12, left: 14,
            background: `${GOLD}20`, color: GOLD,
            padding: '4px 10px', borderRadius: 4,
            fontSize: 9, fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}>
            {article.filiale}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <p style={{
            margin: '0 0 10px', fontSize: 11, color: GRAY,
            fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {new Date(article.date).toLocaleDateString('fr-FR', {
              year: 'numeric', month: 'short', day: 'numeric'
            })}
          </p>

          <h3 style={{
            margin: '0 0 12px', fontSize: 17, fontWeight: 700,
            color: '#fff', fontFamily: "'Inter', sans-serif", lineHeight: 1.3,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {article.title}
          </h3>

          <p style={{
            margin: '0 0 16px', fontSize: 13.5, color: GRAY,
            fontFamily: "'Inter', sans-serif", lineHeight: 1.6,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {article.excerpt}
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 600, color: GOLD,
            fontFamily: "'Inter', sans-serif",
            transform: hov ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.25s',
          }}>
            Lire l'article
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7.5 3L11 6.5 7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

// ─── Main page ──────────────────────────────────────────────────────────────
export const NewsPage = () => (
  <>
    <Navbar />
    <HeroSection />
    <FeaturedCarousel />
    <NewsGrid />
    <NeoMinimalFooter variant="default" />
  </>
)
