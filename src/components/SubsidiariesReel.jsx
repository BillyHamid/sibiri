import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const GOLD = '#C9A84C'

const SUBSIDIARIES = [
  {
    id: 'construction',
    name: 'Sibiri Global Construction',
    tagline: 'BTP & Infrastructures',
    color: '#C0392B',
    colorLight: '#FDECEA',
    route: '/global-construction',
    logo: '/Sibiri-Construction.jpg',
    icon: '🏗️',
    desc: "Sibiri Global Construction est le bras armé du Groupe SIBIRI dans le secteur des travaux publics et du génie civil. Spécialisée dans la conception et la réalisation de projets d'infrastructures de grande envergure, la filiale intervient sur des chantiers de bâtiments administratifs, de voiries, de réseaux divers et d'aménagements urbains au Burkina Faso et dans la sous-région ouest-africaine. Portée par des ingénieurs qualifiés et un parc de matériels moderne, elle répond aux exigences des standards internationaux de construction.",
    highlights: [
      'Construction de bâtiments administratifs, commerciaux et industriels',
      'Aménagement de voiries, routes et réseaux divers',
      'Génie civil et infrastructures urbaines & rurales',
    ],
    stats: [
      { val: '10+', lab: 'Projets livrés' },
      { val: 'Norme ISO', lab: 'Standards qualité' },
      { val: 'UEMOA', lab: "Zone d'opération" },
    ],
  },
  {
    id: 'medical',
    name: 'Sibiri Bio Medical',
    tagline: 'Santé & Biomédical',
    color: '#45b757',
    colorAlt: '#d9e25a',
    colorLight: '#F2FAE8',
    route: '/medical',
    logo: '/Sibiri-Medical.jpg',
    icon: '🏥',
    desc: "Sibiri Bio Medical Services est spécialisée dans l'importation et la distribution de produits pharmaceutiques, de matériels et d'équipements médicaux au Burkina Faso. Agréée par le Ministère de la Santé pour les catégories A1 à B4, la filiale dessert aussi bien les acteurs publics que privés du système de santé national. Avec un entrepôt certifié de 2 000 m² aux normes BPD et une équipe dédiée au service après-vente disponible 24h/7j, elle s'impose comme un partenaire incontournable des professionnels de santé.",
    highlights: [
      'Importation et distribution de médicaments & consommables',
      'Équipements médicaux, matériels de laboratoire et imagerie',
      'Service après-vente 24h/7j — maintenance & formation',
    ],
    stats: [
      { val: '2018', lab: 'Fondée en' },
      { val: 'A1 → B4', lab: 'Agréments Santé' },
      { val: '2 000 m²', lab: 'Stockage certifié' },
    ],
  },
  {
    id: 'energy',
    name: 'Sibiri Energy',
    tagline: 'Énergie & Ressources',
    color: '#E62630',
    colorLight: '#FDEBEC',
    route: '/energy',
    logo: '/Sibiri-Energy.png',
    icon: '⚡',
    desc: "Sibiri Energy est la filiale du Groupe dédiée à l'exploitation et à la valorisation des ressources énergétiques du continent africain. Positionnée sur le segment des hydrocarbures et des solutions énergétiques adaptées aux marchés émergents, elle contribue activement à la sécurité énergétique du Burkina Faso et de la sous-région. En alliant fiabilité des approvisionnements, flexibilité commerciale et engagement vers les énergies durables, Sibiri Energy se positionne comme un acteur clé de la transition énergétique africaine.",
    highlights: [
      'Négoce et distribution de produits pétroliers & hydrocarbures',
      "Solutions énergétiques sur mesure pour l'industrie et les PME",
      'Développement progressif vers les énergies renouvelables',
    ],
    stats: [
      { val: '5+', lab: 'Pays desservis' },
      { val: 'B2B', lab: 'Marché principal' },
      { val: '24/7', lab: 'Disponibilité logistique' },
    ],
  },
  {
    id: 'transport',
    name: 'Sibiri Transport & Logistics',
    tagline: 'Mobilité & Supply Chain',
    color: '#0070b3',
    colorLight: '#E5F2FB',
    route: '/transport-logistic',
    logo: '/Sibiri-Transport.png',
    icon: '🚛',
    desc: "Sibiri Transport & Logistics offre des solutions de transport et de logistique intégrée à travers l'Afrique subsaharienne. La filiale coordonne l'acheminement de marchandises par voie terrestre et assure des prestations complètes de supply chain pour les entreprises, institutions et organismes internationaux opérant au Burkina Faso et dans les pays voisins. Dotée d'une flotte adaptée et d'équipes formées aux procédures douanières, elle garantit rapidité, traçabilité et sécurité de chaque livraison.",
    highlights: [
      'Transport routier de marchandises — national & international',
      'Logistique intégrée : entreposage, gestion de stock et distribution',
      'Transit douanier, dédouanement et affrètement',
    ],
    stats: [
      { val: '6+', lab: 'Pays couverts' },
      { val: '100 T+', lab: 'Capacité mensuelle' },
      { val: 'GPS', lab: 'Traçabilité temps réel' },
    ],
  },
  {
    id: 'agro',
    name: 'Sibiri Agro Chemical',
    tagline: 'Agriculture & Chimie',
    color: '#6B9E1F',
    colorLight: '#F1F8E4',
    route: '/agro-chemical',
    logo: '/Sibiri-Agro.png',
    icon: '🌿',
    desc: "Sibiri Agro Chemical répond aux besoins croissants du secteur agricole burkinabé en fournissant des intrants de qualité, des produits phytosanitaires homologués et des engrais adaptés aux cultures locales. Engagée dans une agriculture responsable et productive, la filiale accompagne agriculteurs, coopératives et agro-industries dans l'optimisation de leurs rendements tout en préservant les ressources naturelles. Sa gamme de produits couvre l'ensemble du cycle cultural, du sol à la récolte.",
    highlights: [
      'Fourniture d\'intrants agricoles et produits phytosanitaires homologués',
      'Engrais minéraux et organiques adaptés aux sols africains',
      'Conseil agronomique et accompagnement technique des producteurs',
    ],
    stats: [
      { val: '500+', lab: 'Producteurs accompagnés' },
      { val: '4', lab: 'Régions couvertes' },
      { val: 'Agréée', lab: 'Ministère Agriculture' },
    ],
  },
]

// ── Icône checkmark ─────────────────────────────────────────────────────────
const CheckIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="8" cy="8" r="7.5" stroke={color} strokeOpacity=".25" />
    <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── Helpers ──────────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 28 }) => {
  const innerRef = useRef(null)
  const inView = useInView(innerRef, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={innerRef}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {children}
    </motion.div>
  )
}

// ── Carte filiale détaillée ──────────────────────────────────────────────────
const FilialeCard = ({ filiale, index }) => {
  const isEven = index % 2 === 0
  const [imgOk, setImgOk] = useState(true)

  return (
    <Reveal delay={0.1}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1.5fr' : '1.5fr 1fr',
        gap: 0,
        borderRadius: 24,
        overflow: 'hidden',
        border: `1px solid ${filiale.color}28`,
        boxShadow: `0 4px 40px ${filiale.color}12, 0 1px 3px rgba(0,0,0,0.06)`,
        background: 'white',
      }} className="filiale-card-grid">

        {/* ── Visuel (logo + couleur) ── */}
        <div
          style={{ order: isEven ? 0 : 1 }}
          className="filiale-visual"
        >
          <div style={{
            height: '100%', minHeight: 340,
            background: filiale.colorLight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Fond déco cercle */}
            <div style={{
              position: 'absolute',
              width: '200%', height: '200%',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at center, ${filiale.color}18 0%, transparent 60%)`,
              pointerEvents: 'none',
            }} />

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              style={{
                width: 160, height: 160,
                borderRadius: 28,
                background: 'white',
                border: `2px solid ${filiale.color}30`,
                boxShadow: `0 16px 48px ${filiale.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative', zIndex: 1,
              }}
            >
              <img
                src={filiale.logo}
                alt={filiale.name}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
              />
              <div style={{
                display: 'none', width: '100%', height: '100%',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 56,
              }}>{filiale.icon}</div>
            </motion.div>

            {/* Tag secteur */}
            <div style={{
              position: 'relative', zIndex: 1,
              marginTop: 24,
              padding: '6px 18px', borderRadius: 99,
              background: `${filiale.color}18`,
              border: `1px solid ${filiale.color}40`,
              color: filiale.color,
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
            }}>
              {filiale.tagline}
            </div>

            {/* Stats bar */}
            <div style={{
              position: 'relative', zIndex: 1,
              display: 'flex', gap: 0,
              marginTop: 32,
              borderRadius: 14,
              overflow: 'hidden',
              border: `1px solid ${filiale.color}25`,
              background: 'white',
              width: '100%',
            }}>
              {filiale.stats.map((s, i) => (
                <div key={i} style={{
                  flex: 1, padding: '14px 10px', textAlign: 'center',
                  borderRight: i < filiale.stats.length - 1 ? `1px solid ${filiale.color}20` : 'none',
                }}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 17, fontWeight: 700,
                    color: filiale.color, margin: 0, lineHeight: 1.2,
                  }}>{s.val}</p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9, color: '#9CA3AF',
                    margin: '4px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>{s.lab}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Contenu texte ── */}
        <div style={{
          order: isEven ? 1 : 0,
          padding: '52px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 22,
          background: filiale.colorLight,
          position: 'relative',
          overflow: 'hidden',
        }} className="filiale-content">

          {/* Bande couleur top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${filiale.colorAlt || filiale.color}, ${filiale.color})`,
          }} />

          {/* Numéro watermark */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 96, fontWeight: 900, lineHeight: 1,
            color: `${filiale.color}18`,
            userSelect: 'none',
            marginBottom: -24,
            letterSpacing: '-0.04em',
          }}>{String(index + 1).padStart(2, '0')}</div>

          {/* Nom + tagline */}
          <div>
            {/* Tagline badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 99, marginBottom: 10,
              background: `${filiale.color}18`,
              border: `1px solid ${filiale.color}35`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: filiale.color, flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10, fontWeight: 700,
                color: filiale.color,
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>{filiale.tagline}</span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
              fontWeight: 700,
              margin: '0 0 10px',
              lineHeight: 1.2,
            }}>
              <span style={{
                background: `linear-gradient(90deg, ${filiale.colorAlt || filiale.color} 0%, ${filiale.color} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {filiale.name.replace('Sibiri ', '')}
              </span>
            </h2>
            <div style={{
              width: 52, height: 3, borderRadius: 3,
              background: `linear-gradient(90deg, ${filiale.colorAlt || filiale.color}, ${filiale.color}22)`,
            }} />
          </div>

          {/* Description */}
          <div style={{
            borderLeft: `3px solid ${filiale.color}`,
            paddingLeft: 16,
            margin: '2px 0',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, lineHeight: 1.85,
              color: '#374151', margin: 0,
            }}>
              {filiale.desc}
            </p>
          </div>

          {/* Highlights */}
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filiale.highlights.map((h, i) => (
              <li key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                padding: '9px 12px', borderRadius: 10,
                background: `${filiale.color}0D`,
                border: `1px solid ${filiale.color}1A`,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: '#1F2937',
                lineHeight: 1.5,
              }}>
                <CheckIcon color={filiale.color} />
                {h}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div style={{ marginTop: 4 }}>
            <Link to={filiale.route} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: `0 14px 40px ${filiale.color}50` }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '13px 30px', borderRadius: 99,
                  background: filiale.color,
                  color: 'white',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700, fontSize: 14,
                  boxShadow: `0 6px 20px ${filiale.color}40`,
                  cursor: 'pointer',
                }}
              >
                Découvrir la filiale
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ── Section principale ───────────────────────────────────────────────────────
export const SubsidiariesReel = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{
      background: '#fff',
      padding: '92px 0 104px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Halo décoratif */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000, height: 500,
        background: `radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{
            fontSize: 10, fontWeight: 800,
            letterSpacing: '0.34em', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.9)',
            fontFamily: "'Inter', sans-serif",
            margin: '0 0 16px',
          }}>Nos Filiales</p>

          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 700,
            color: '#1D1D1B',
            margin: '0 0 14px',
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1.15,
          }}>Un groupe, cinq expertises</h2>

          <p style={{
            fontSize: 15,
            color: '#9ca3af',
            maxWidth: 460,
            margin: '0 auto',
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          }}>
            Chaque filiale incarne un secteur clé du développement africain,
            avec une stratégie d'excellence propre à son domaine.
          </p>

          <div style={{
            width: 48, height: 2,
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
            margin: '20px auto 0',
            borderRadius: 99,
          }} />
        </motion.div>

        {/* ── Liste des filiales détaillées ──────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {SUBSIDIARIES.map((f, i) => (
            <FilialeCard key={f.id} filiale={f} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .filiale-card-grid {
            grid-template-columns: 1fr !important;
          }
          .filiale-visual {
            order: 0 !important;
            min-height: 280px !important;
          }
          .filiale-content {
            order: 1 !important;
            padding: 36px 28px !important;
          }
        }
      `}</style>
    </section>
  )
}
