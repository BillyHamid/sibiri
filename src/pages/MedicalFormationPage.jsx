import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MedicalNav } from '../components/MedicalNav'

const GREEN       = '#00A99D'
const GREEN_LIGHT = '#8DC63F'
const GREEN_PALE  = '#E4F7F6'
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

// ─── Données ──────────────────────────────────────────────────────────────────
const MODULES = [
  {
    icon: '🩺', num: '01', duree: '3 jours', niveau: 'Praticiens',
    title: 'Hémodialyse clinique',
    desc: "Formation théorique et pratique sur la prise en charge du patient dialysé : réglages des générateurs, surveillance des paramètres vitaux, gestion des complications aiguës et chroniques.",
    public: "Infirmier(e)s · Néphrologues",
    points: ["Physiologie rénale et indications de la dialyse", "Réglage et surveillance du générateur", "Gestion des complications", "Hygiène et prévention des infections"],
  },
  {
    icon: '🔧', num: '02', duree: '5 jours', niveau: 'Technique',
    title: 'Maintenance des générateurs NIPRO',
    desc: "Entretien préventif et correctif, diagnostic de pannes et remplacement de pièces sur les générateurs de dialyse NIPRO. Certification délivrée à l'issue de la formation.",
    public: "Techniciens biomédicaux",
    points: ["Architecture et fonctionnement des générateurs", "Maintenance préventive planifiée", "Diagnostic et dépannage", "Remplacement des pièces critiques"],
  },
  {
    icon: '🫧', num: '03', duree: '2 jours', niveau: 'Technique',
    title: "Gestion des centrales d'oxygène",
    desc: "Surveillance opérationnelle, sécurité et maintenance des centrales PSA VPSA MIL'S. Formation dispensée sur site, en conditions réelles d'exploitation.",
    public: "Techniciens · Responsables SAV",
    points: ["Principe de fonctionnement PSA/VPSA", "Paramètres de surveillance quotidienne", "Procédures de sécurité", "Maintenance de premier niveau"],
  },
  {
    icon: '📊', num: '04', duree: '1 jour', niveau: 'Gestion',
    title: 'Traçabilité & gestion des stocks',
    desc: "Bonnes pratiques de gestion des consommables médicaux, suivi des kits de dialyse et optimisation des stocks en milieu hospitalier.",
    public: "Gestionnaires · Pharmaciens",
    points: ["Système de traçabilité des kits", "Optimisation des niveaux de stock", "Gestion des dates de péremption", "Reporting et indicateurs de suivi"],
  },
  {
    icon: '🏥', num: '05', duree: '4 jours', niveau: 'Avancé',
    title: "Installation d'équipements médicaux",
    desc: "Processus complet d'installation et de mise en service des équipements d'imagerie médicale, de laboratoire et de dialyse selon les normes internationales.",
    public: "Techniciens biomédicaux · Ingénieurs",
    points: ["Réception et contrôle des équipements", "Installation selon les spécifications", "Tests de qualification IQ/OQ/PQ", "Documentation technique"],
  },
  {
    icon: '🌡️', num: '06', duree: '2 jours', niveau: 'Praticiens',
    title: "Imagerie médicale — utilisation",
    desc: "Formation à l'utilisation optimale des équipements d'imagerie médicale distribués par Sibiri Bio Médical : échographes, radios numériques et appareils de biologie.",
    public: "Médecins · Techniciens de radiologie",
    points: ["Réglages et paramétrage", "Protocoles d'acquisition", "Maintenance de premier niveau", "Archivage et transfert d'images"],
  },
]

const NIVEAUX_COLORS = {
  'Praticiens': { bg: `${GREEN}18`,          border: `${GREEN}33`,          text: GREEN },
  'Technique':  { bg: '#E6A02018',            border: '#E6A02033',            text: '#E6A020' },
  'Gestion':    { bg: '#6DE8E018',            border: '#6DE8E033',            text: '#6DE8E0' },
  'Avancé':     { bg: `${GREEN_LIGHT}18`,     border: `${GREEN_LIGHT}33`,     text: GREEN_LIGHT },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section style={{ position: 'relative', minHeight: '52vh', background: DARK, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(rgba(0,169,157,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,169,157,0.05) 1px, transparent 1px)`,
      backgroundSize: '64px 64px', pointerEvents: 'none' }} />
    <motion.div animate={{ opacity: [0.18, 0.38, 0.18], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50%', height: '75%',
        background: `radial-gradient(ellipse, ${GREEN_LIGHT}33 0%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
    <motion.div animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      style={{ position: 'absolute', top: '-10%', left: '-5%', width: '45%', height: '70%',
        background: `radial-gradient(ellipse, ${GREEN}44 0%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '140px 40px 80px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
        <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 99,
          background: `${GREEN}33`, border: `1px solid ${GREEN_LIGHT}66`, color: '#b8e8e6',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif", marginBottom: 24 }}>
          Renforcement des capacités
        </span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
          fontWeight: 700, color: 'white', margin: '0 0 20px', lineHeight: 1.1 }}>
        Nos{' '}
        <span style={{ background: `linear-gradient(90deg, ${GREEN_LIGHT}, #6DE8E0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          formations
        </span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.58)', maxWidth: 560, lineHeight: 1.75, margin: '0 0 40px' }}>
        Des programmes adaptés aux besoins des équipes médicales et techniques — conçus et dispensés par nos experts terrain.
      </motion.p>

      {/* Mini stats */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.62 }}
        style={{ display: 'flex', gap: 40, flexWrap: 'wrap', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {[{ val: '6', lab: 'Modules disponibles' }, { val: '1–5j', lab: 'Durées adaptées' }, { val: 'Sur site', lab: 'Formation terrain' }].map(s => (
          <div key={s.val}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#6DE8E0', margin: 0 }}>{s.val}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.38)', margin: '4px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.lab}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
)

// ─── Page ─────────────────────────────────────────────────────────────────────
export const MedicalFormationPage = () => (
  <div className="w-full">
    <MedicalNav />
    <Hero />

    {/* Modules */}
    <section style={{ background: DARK, padding: '100px 40px 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(0,169,157,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,169,157,0.04) 1px, transparent 1px)`,
        backgroundSize: '64px 64px' }} />
      <div style={{ position: 'absolute', top: '-15%', right: '-8%', pointerEvents: 'none',
        width: '50%', height: '60%', background: `radial-gradient(ellipse, ${GREEN}0C 0%, transparent 65%)`, filter: 'blur(80px)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal className="mb-14">
          <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 99,
            background: `${GREEN}33`, border: `1px solid ${GREEN_LIGHT}55`, color: '#b8e8e6',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif", marginBottom: 16 }}>Nos modules</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 700, color: 'white', margin: '0 0 0' }}>
            Catalogue de{' '}
            <span style={{ background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              formation
            </span>
          </h2>
          <div style={{ width: 56, height: 3, borderRadius: 2, marginTop: 20, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
        </Reveal>

        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {MODULES.map((m, i) => {
            const nc = NIVEAUX_COLORS[m.niveau] || NIVEAUX_COLORS['Technique']
            return (
              <Reveal key={m.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -5, borderColor: `${GREEN}55` }} transition={{ duration: 0.28 }}
                  style={{ borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                    padding: '30px 26px', position: 'relative', overflow: 'hidden', cursor: 'default', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Accent top */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`, opacity: 0.55 }} />

                  {/* Watermark */}
                  <div style={{ position: 'absolute', top: 10, right: 16, fontSize: 60, fontWeight: 900,
                    fontFamily: "'Playfair Display', serif", color: `${GREEN}0E`, lineHeight: 1, userSelect: 'none' }}>{m.num}</div>

                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: `${GREEN}1A`, border: `1px solid ${GREEN}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{m.icon}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 99, background: `${GREEN}1A`, border: `1px solid ${GREEN}33`,
                        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 700, color: GREEN_LIGHT }}>{m.duree}</span>
                      <span style={{ padding: '3px 10px', borderRadius: 99, background: nc.bg, border: `1px solid ${nc.border}`,
                        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 700, color: nc.text }}>{m.niveau}</span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: 'white', margin: '0 0 10px' }}>{m.title}</h3>
                  <div style={{ width: '100%', height: 1, marginBottom: 12, background: `linear-gradient(90deg, ${GREEN}33, transparent)` }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, margin: '0 0 16px', flex: 1 }}>{m.desc}</p>

                  {/* Points */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {m.points.map((p, j) => (
                      <li key={j} style={{ display: 'flex', gap: 9, alignItems: 'flex-start',
                        fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>
                        <span style={{ flexShrink: 0, marginTop: 5, width: 4, height: 4, borderRadius: '50%', background: GREEN_LIGHT }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* Public */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 'auto' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9.5, fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>Public :</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 600, color: `${GREEN}CC` }}>{m.public}</span>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .form-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>

    {/* CTA band */}
    <section style={{ background: 'white', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{ borderRadius: 28, padding: '52px 56px', position: 'relative', overflow: 'hidden',
            background: `linear-gradient(135deg, ${DARK} 0%, #1a3a22 100%)`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {/* Glow déco */}
            <div style={{ position: 'absolute', top: '-30%', left: '-10%', pointerEvents: 'none',
              width: '50%', height: '150%', background: `radial-gradient(ellipse, ${GREEN}22 0%, transparent 65%)`, filter: 'blur(50px)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 700, color: 'white', margin: '0 0 10px' }}>
                Une formation sur mesure pour votre équipe ?
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: 0, maxWidth: 480 }}>
                Nos experts se déplacent directement dans vos établissements pour des sessions adaptées à vos équipements et à vos équipes.
              </p>
            </div>

            <a href="/medical#contact" style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center',
              gap: 10, padding: '16px 36px', borderRadius: 99, textDecoration: 'none', flexShrink: 0,
              background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`, color: 'white',
              fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, boxShadow: `0 10px 32px ${GREEN}55` }}>
              Demander un devis →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
)
