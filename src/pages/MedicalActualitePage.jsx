import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MedicalNav } from '../components/MedicalNav'

const GREEN       = '#00A99D'
const GREEN_LIGHT = '#8DC63F'
const DARK        = '#03201F'

const Reveal = ({ children, delay = 0, y = 20, className = '' }) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.9] }} className={className}>
      {children}
    </motion.div>
  )
}

const Tag = ({ children }) => (
  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
    style={{ background: `${GREEN}22`, color: GREEN, border: `1px solid ${GREEN}44` }}>
    {children}
  </span>
)

// ─── Données ──────────────────────────────────────────────────────────────────
const ACTUS = [
  {
    date: 'Mars 2025',
    tag: 'Partenariat',
    tagColor: GREEN,
    title: 'Renouvellement du partenariat avec NIPRO',
    desc: "Sibiri Bio Médical Services renouvelle et renforce son accord de distribution exclusive avec NIPRO pour les générateurs de dialyse au Burkina Faso. Ce partenariat stratégique garantit l'accès prioritaire aux dernières technologies de dialyse pour les établissements de santé nationaux.",
    img: '/medical/IMG_0482.JPG.jpeg',
  },
  {
    date: 'Janvier 2025',
    tag: 'Inauguration',
    tagColor: '#45b757',
    title: "Ouverture du centre de dialyse — CHU Tengandogo",
    desc: "Mise en service du 6ème centre d'hémodialyse équipé par Sibiri Bio Médical, renforçant l'accès aux soins dans la capitale. Ce centre est équipé de 24 générateurs NIPRO de dernière génération et d'une unité de traitement d'eau certifiée.",
    img: '/medical/Image1.jpg',
  },
  {
    date: 'Novembre 2024',
    tag: 'Installation',
    tagColor: '#E6A020',
    title: "5ème centrale d'oxygène — CHU Souro Sanou",
    desc: "Livraison et mise en service de la 5ème centrale PSA VPSA MIL'S au CHU Souro Sanou de Bobo-Dioulasso. Cette installation garantit une autonomie complète en oxygène médical et élimine la dépendance aux bouteilles d'oxygène.",
    img: '/medical/IMG_0161.JPG.jpeg',
  },
  {
    date: 'Septembre 2024',
    tag: 'Formation',
    tagColor: '#6DE8E0',
    title: 'Session de formation — CHR Ouahigouya',
    desc: "Organisation d'une session de formation de 5 jours à destination des techniciens biomédicaux et du personnel infirmier du CHR Ouahigouya. 18 professionnels de santé ont été formés à la maintenance et à l'utilisation optimale des équipements de dialyse.",
    img: '/medical/IMG_0281.JPG.jpeg',
  },
  {
    date: 'Juin 2024',
    tag: 'Accord PPP',
    tagColor: GREEN_LIGHT,
    title: 'Accord-cadre avec le Ministère de la Santé',
    desc: "Renouvellement et extension de l'accord de partenariat public-privé avec le Ministère de la Santé du Burkina Faso. Sibiri Bio Médical Services conserve l'exclusivité de la fourniture de kits de dialyse sur l'ensemble du territoire national.",
    img: '/medical/IMG_4221.JPG.jpeg',
  },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section style={{ position: 'relative', minHeight: '52vh', background: DARK, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(rgba(0,169,157,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,169,157,0.05) 1px, transparent 1px)`,
      backgroundSize: '64px 64px', pointerEvents: 'none' }} />
    <motion.div animate={{ opacity: [0.2, 0.42, 0.2], scale: [1, 1.08, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top: '-15%', right: '-5%', width: '50%', height: '75%',
        background: `radial-gradient(ellipse, ${GREEN}44 0%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '140px 40px 80px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
        <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 99,
          background: `${GREEN}33`, border: `1px solid ${GREEN_LIGHT}66`, color: '#b8e8e6',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif", marginBottom: 24 }}>Actualité</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
          fontWeight: 700, color: 'white', margin: '0 0 20px', lineHeight: 1.1 }}>
        Nos dernières{' '}
        <span style={{ background: `linear-gradient(90deg, ${GREEN_LIGHT}, #6DE8E0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          nouvelles
        </span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.58)', maxWidth: 520, lineHeight: 1.75, margin: 0 }}>
        Suivez les dernières actualités, inaugurations et partenariats de Sibiri Bio Médical Services.
      </motion.p>
    </div>
  </section>
)

// ─── Page ─────────────────────────────────────────────────────────────────────
export const MedicalActualitePage = () => (
  <div className="w-full">
    <MedicalNav />
    <Hero />

    <section style={{ background: 'white', padding: '100px 40px 120px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', pointerEvents: 'none',
        width: '45%', height: '55%', background: `radial-gradient(ellipse, ${GREEN}09 0%, transparent 65%)`, filter: 'blur(90px)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal className="mb-14">
          <Tag>Actualité</Tag>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#0d1f14', margin: '12px 0 0' }}>
            Toutes les actualités
          </h2>
          <div style={{ width: 56, height: 3, borderRadius: 2, marginTop: 20, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ACTUS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.25 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 40,
                  padding: '40px 0', borderBottom: `1px solid ${GREEN}14`,
                  position: 'relative', cursor: 'default', alignItems: 'start' }}
                className="actu-item"
              >
                {/* Barre accent gauche */}
                <motion.div
                  initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }} transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', left: -28, top: 40, bottom: 40, width: 3,
                    background: `linear-gradient(180deg, ${GREEN}, ${GREEN_LIGHT})`,
                    borderRadius: 2, transformOrigin: 'top' }}
                />

                {/* Image + meta */}
                <div>
                  <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 16, height: 200 }}>
                    <img src={a.img} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>{a.date}</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#cbd5e1' }} />
                    <span style={{ padding: '3px 10px', borderRadius: 99,
                      background: `${a.tagColor}18`, border: `1px solid ${a.tagColor}44`,
                      fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 700, color: a.tagColor }}>
                      {a.tag}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div style={{ paddingTop: 8 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700,
                    color: '#0d1f14', margin: '0 0 14px', lineHeight: 1.3 }}>{a.title}</h3>
                  <div style={{ width: 44, height: 2, borderRadius: 2, marginBottom: 16,
                    background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: '#64748b',
                    lineHeight: 1.78, margin: 0 }}>{a.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) { .actu-item { grid-template-columns: 1fr !important; gap: 20px !important; } }
      `}</style>
    </section>

    {/* Footer */}
    <section style={{ background: `linear-gradient(135deg, ${DARK}, #1a3a22)`, padding: '60px 40px', textAlign: 'center' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
        Vous avez une question sur nos activités ?
      </p>
      <a href="/medical#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px',
        borderRadius: 99, textDecoration: 'none', background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`,
        color: 'white', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, boxShadow: `0 8px 28px ${GREEN}44` }}>
        Nous contacter →
      </a>
    </section>
  </div>
)
