import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { NeoMinimalFooter } from "../components/NeoMinimalFooter"
import { ConstructionNav } from "../components/ConstructionNav"

// ─── Couleurs Global Construction (Rouge/Marron Brick du Logo) ──────────────────
const PRIMARY   = "#A64D42"      // Rouge/Marron du logo
const ACCENT    = "#D4756B"      // Rouge plus clair
const ACCENT_OP = "#C05A52"      // Rouge intermédiaire
const DARK      = "#2D2D2D"      // Gris très foncé

// ─── Helpers ──────────────────────────────────────────────────────────────────
const P = ({ children }) => (
  <span style={{ color: PRIMARY, fontWeight: 600 }}>{children}</span>
)

const Reveal = ({ children, delay = 0, y = 20, className = "" }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const SectionTitle = ({ children, light = false }) => (
  <h2
    className={`text-2xl md:text-3xl font-bold mb-2 ${light ? "text-white" : "text-slate-900"}`}
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    {children}
  </h2>
)

const Tag = ({ children, light = false }) => (
  <span
    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
    style={
      light
        ? { background: `${PRIMARY}55`, color: "#a8e6f8", border: `1px solid ${ACCENT}55` }
        : { background: `${PRIMARY}22`, color: PRIMARY, border: `1px solid ${PRIMARY}44` }
    }
  >
    {children}
  </span>
)

// ─── PRÉSENTATION ─────────────────────────────────────────────────────────────
const Presentation = () => (
  <section id="presentation" className="px-6 bg-white overflow-hidden" style={{ padding: '120px 0' }}>
    <div className="max-w-6xl mx-auto">

      <Reveal className="mb-20">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 4, height: 32, borderRadius: 2, background: `linear-gradient(180deg, ${PRIMARY}, ${ACCENT})` }} />
          <Tag>À propos de nous</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 700, color: '#1F2937', margin: '0 0 12px',
        }}>
          SIBIRI Global <span style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Construction & Rénovation</span>
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16, color: '#6B7280', maxWidth: 600, lineHeight: 1.8, margin: 0,
        }}>
          Une entreprise spécialisée dans la réalisation de projets d'infrastructures de grande envergure en Afrique de l'Ouest.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Reveal delay={0.08}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              {
                icon: "🏗️",
                title: "Expertise complète",
                text: "Génie civil, construction neuve, rénovation, travaux publics et aménagements hydro-agricoles"
              },
              {
                icon: "👥",
                title: "Équipe qualifiée",
                text: "Ingénieurs expérimentés et équipes pluridisciplinaires pour chaque projet"
              },
              {
                icon: "⚙️",
                title: "Équipements modernes",
                text: "Parc de matériels adapté aux standards internationaux de qualité et sécurité"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex', gap: 16, padding: '24px', borderRadius: 16,
                  background: `${PRIMARY}08`, border: `1px solid ${PRIMARY}15`,
                }}
              >
                <div style={{ fontSize: 28, minWidth: 40 }}>{item.icon}</div>
                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16, fontWeight: 700, color: '#1F2937', margin: '0 0 6px',
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14, color: '#6B7280', margin: 0, lineHeight: 1.6,
                  }}>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, rgba(166,77,66,0.12), rgba(212,117,107,0.06))`,
              border: `2px solid ${PRIMARY}18`,
              minHeight: 420,
              padding: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', top: -80, right: -60, width: 280, height: 280,
              borderRadius: '50%', background: `radial-gradient(circle, ${PRIMARY}12, transparent)`,
              filter: 'blur(60px)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -100, left: -80, width: 300, height: 300,
              borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}10, transparent)`,
              filter: 'blur(70px)', pointerEvents: 'none',
            }} />
            <img
              src="/Sibiri-Construction.jpg"
              alt="SIBIRI Global Construction et Rénovation — logo"
              style={{ position: 'relative', zIndex: 1, maxWidth: '80%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
            />
          </motion.div>
        </Reveal>
      </div>

    </div>
  </section>
)

// ─── MISSION / VISION / VALEURS ──────────────────────────────────────────────
const MISSION_ITEMS = [
  "Participer au développement du Burkina Faso par des constructions de qualité",
  "Assurer une exécution rigoureuse et un pilotage clair des chantiers",
  "Maîtriser les délais de livraison et les coûts de réalisation",
  "Intégrer les standards de qualité et sécurité à chaque étape",
  "Coordonner efficacement les équipes multi-disciplinaires",
]

const VALEURS_ITEMS = [
  { label: "Intégrité", icon: "🤝" },
  { label: "Loyauté", icon: "✓" },
  { label: "Endurance", icon: "💪" },
  { label: "Qualité", icon: "⭐" },
]

const MissionVision = () => (
  <section style={{
    position: 'relative', overflow: 'hidden',
    background: 'white',
    padding: '140px 40px',
  }}>
    <div style={{
      position: 'absolute', top: '-10%', right: '-5%', zIndex: 0, pointerEvents: 'none',
      width: '45%', height: '55%',
      background: `radial-gradient(ellipse, ${PRIMARY}14 0%, transparent 65%)`,
      filter: 'blur(80px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-8%', left: '-5%', zIndex: 0, pointerEvents: 'none',
      width: '40%', height: '45%',
      background: `radial-gradient(ellipse, ${ACCENT}12 0%, transparent 65%)`,
      filter: 'blur(90px)',
    }} />
    <div style={{
      position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
      fontSize: 'clamp(8rem, 20vw, 16rem)', fontWeight: 900,
      fontFamily: "'Playfair Display', serif",
      color: `${PRIMARY}06`,
      whiteSpace: 'nowrap', userSelect: 'none', zIndex: 0, letterSpacing: '-0.04em',
    }}>VALEURS</div>

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>

      <Reveal className="mb-20">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 4, height: 32, borderRadius: 2, background: `linear-gradient(180deg, ${PRIMARY}, ${ACCENT})` }} />
          <Tag>Nos engagements fondamentaux</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 700, color: '#1F2937', margin: '0 0 12px',
        }}>
          Mission, Vision & <span style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Valeurs</span>
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16, color: '#6B7280', maxWidth: 500, lineHeight: 1.7, margin: '8px 0 0',
        }}>
          Les trois piliers qui guident chaque décision et chaque action au sein de notre entreprise.
        </p>
      </Reveal>

      <div className="mvv-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.35fr 1fr',
        gap: 24,
      }}>

        {/* ── MISSION ── */}
        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -6, boxShadow: `0 20px 48px ${PRIMARY}25` }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: 24, padding: '44px 40px',
              background: 'white',
              border: `1.5px solid ${PRIMARY}28`,
              boxShadow: `0 4px 32px ${PRIMARY}10`,
              position: 'relative', overflow: 'hidden',
              cursor: 'default',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 4,
              background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT}, transparent)`,
            }} />
            <div style={{
              position: 'absolute', top: 20, right: 28,
              fontSize: 110, fontWeight: 900, fontFamily: "'Playfair Display', serif",
              color: `${PRIMARY}0C`, lineHeight: 1, userSelect: 'none',
            }}>01</div>

            <div style={{
              width: 56, height: 56, borderRadius: 18, marginBottom: 28,
              background: `linear-gradient(135deg, ${PRIMARY}18, ${ACCENT}12)`, border: `1px solid ${PRIMARY}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
            }}>🏗️</div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700, color: '#1F2937', margin: '0 0 10px',
            }}>Notre Mission</h3>
            <div style={{
              width: 48, height: 2.5, borderRadius: 2, marginBottom: 32,
              background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            }} />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {MISSION_ITEMS.map((item, j) => (
                <li key={j} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  fontFamily: "'Inter', sans-serif", fontSize: 14,
                  color: '#4B5563', lineHeight: 1.7,
                }}>
                  <span style={{
                    flexShrink: 0, marginTop: 3,
                    width: 24, height: 24, borderRadius: 8,
                    background: `${PRIMARY}12`, border: `1.5px solid ${PRIMARY}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="12" height="10" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5L3.8 7.5L10 1" stroke={PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </Reveal>

        {/* ── VISION + VALEURS empilés ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* VISION */}
          <Reveal delay={0.2}>
            <motion.div
              whileHover={{ y: -6, boxShadow: `0 24px 56px ${PRIMARY}55` }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: 24, padding: '40px 36px',
                background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)`,
                position: 'relative', overflow: 'hidden',
                boxShadow: `0 12px 40px ${PRIMARY}40`,
                cursor: 'default',
              }}
            >
              <div style={{
                position: 'absolute', top: 14, right: 22,
                fontSize: 100, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: 'rgba(255,255,255,0.10)', lineHeight: 1, userSelect: 'none',
              }}>02</div>

              <div style={{
                width: 56, height: 56, borderRadius: 18, marginBottom: 24,
                background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>🌍</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: 'white', margin: '0 0 16px',
              }}>Notre Vision</h3>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15, lineHeight: 1.8,
                color: 'rgba(255,255,255,0.92)', margin: 0,
              }}>
                Être un <strong style={{ color: 'white' }}>leader en construction et génie civil</strong> reconnu pour sa qualité, ses délais maîtrisés et son excellence opérationnelle.
              </p>
            </motion.div>
          </Reveal>

          {/* VALEURS */}
          <Reveal delay={0.35}>
            <motion.div
              whileHover={{ y: -6, boxShadow: `0 20px 48px ${PRIMARY}20` }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: 24, padding: '40px 36px',
                background: 'white',
                border: `1.5px solid ${PRIMARY}25`,
                boxShadow: `0 4px 32px ${PRIMARY}08`,
                position: 'relative', overflow: 'hidden',
                cursor: 'default',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY}22)`,
              }} />
              <div style={{
                position: 'absolute', top: 14, right: 22,
                fontSize: 100, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: `${ACCENT}10`, lineHeight: 1, userSelect: 'none',
              }}>03</div>

              <div style={{
                width: 56, height: 56, borderRadius: 18, marginBottom: 24,
                background: `linear-gradient(135deg, ${ACCENT}18, ${PRIMARY}12)`, border: `1px solid ${ACCENT}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>💎</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: '#1F2937', margin: '0 0 24px',
              }}>Nos 4 Valeurs</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {VALEURS_ITEMS.map((v, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.05, background: `${PRIMARY}12` }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 16px', borderRadius: 14,
                      background: `${PRIMARY}08`,
                      border: `1.5px solid ${PRIMARY}20`,
                      cursor: 'default',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{v.icon}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13, fontWeight: 700, color: '#1F2937',
                    }}>{v.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 860px) {
        .mvv-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
)

// ─── ACTIVITÉS PRINCIPALES ──────────────────────────────────────────────────
const ACTIVITES = [
  {
    icon: "🏢",
    num: "01",
    title: "Construction neuve de bâtiments",
    desc: "Aggloméré de ciment, matériaux locaux, construction métallique — tous corps d'état.",
  },
  {
    icon: "🔨",
    num: "02",
    title: "Rénovation de bâtiments",
    desc: "Restauration et mise aux normes d'ouvrages existants avec qualité garantie.",
  },
  {
    icon: "🛣️",
    num: "03",
    title: "Construction routière",
    desc: "Routes en terre, reprfilage, ouvrages d'art et infrastructures de transport.",
  },
  {
    icon: "💧",
    num: "04",
    title: "Assainissement & eau potable",
    desc: "Drainage des eaux pluviales, égouts, adduction d'eau potable et systèmes sanitaires.",
  },
  {
    icon: "🌾",
    num: "05",
    title: "Aménagement hydro-agricole",
    desc: "Aménagement de plaines agricoles et infrastructures de soutien à l'agriculture.",
  },
  {
    icon: "⚙️",
    num: "06",
    title: "Seconde œuvre",
    desc: "Finitions, installations techniques et remise d'ouvrages prêts à exploiter.",
  },
]

const Activites = () => {
  return (
    <section
      id="activites"
      style={{
        background: DARK,
        padding: '140px 40px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-15%', pointerEvents: 'none',
        width: '65%', height: '70%',
        background: `radial-gradient(ellipse, ${PRIMARY}14 0%, transparent 65%)`,
        filter: 'blur(100px)',
      }} />
      <div style={{
        position: 'absolute', top: '-10%', left: '-8%', pointerEvents: 'none',
        width: '40%', height: '50%',
        background: `radial-gradient(ellipse, ${ACCENT}0C 0%, transparent 65%)`,
        filter: 'blur(90px)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <Reveal className="mb-20">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 32, borderRadius: 2, background: `linear-gradient(180deg, ${PRIMARY}, ${ACCENT})` }} />
            <Tag light>Domaines d'expertise</Tag>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700, color: 'white',
            margin: '0 0 8px',
          }}>
            Nos <span style={{
              background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>activités principales</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: '12px 0 0',
            maxWidth: 500, lineHeight: 1.7,
          }}>Six domaines de spécialisation pour couvrir tous vos besoins en construction et génie civil.</p>
        </Reveal>

        <div className="activites-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {ACTIVITES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, borderColor: `${PRIMARY}66` }}
                transition={{ duration: 0.28 }}
                style={{
                  borderRadius: 24,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(255,255,255,0.09)`,
                  padding: '32px 28px',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default', height: '100%',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
                  opacity: 0.7,
                }} />

                <div style={{
                  position: 'absolute', top: 14, right: 22,
                  fontSize: 72, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                  color: `${PRIMARY}10`, lineHeight: 1, userSelect: 'none',
                }}>{a.num}</div>

                <div style={{
                  width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                  background: `${PRIMARY}1A`, border: `1px solid ${PRIMARY}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{a.icon}</div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18, fontWeight: 700, color: 'white',
                  margin: '0 0 12px',
                }}>{a.title}</h3>

                <div style={{ width: '100%', height: 1, marginBottom: 14, background: `linear-gradient(90deg, ${PRIMARY}33, transparent)` }} />

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5, color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7, margin: 0,
                }}>{a.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1000px) { .activites-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px)  { .activites-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── ATOUTS ───────────────────────────────────────────────────────────────────
const ATOUTS_ITEMS = [
  {
    icon: "🎯",
    num: "01",
    stat: "15+ ans",
    title: "Expérience reconnue",
    desc: "Plus de 15 années de présence dans le secteur avec des réalisations majeures.",
    badge: "Expérience éprouvée",
  },
  {
    icon: "👥",
    num: "02",
    stat: "Multi",
    title: "Équipe pluridisciplinaire",
    desc: "Experts en tous corps d'état et spécialités de construction.",
    badge: "Expertise complète",
  },
  {
    icon: "🚜",
    num: "03",
    stat: "Équipé",
    title: "Flotte de matériel",
    desc: "Parc d'équipements adapté à BTP et aménagements hydro-agricoles.",
    badge: "Bien outillé",
  },
  {
    icon: "📋",
    num: "04",
    stat: "Maîtrise",
    title: "Procédures administratives",
    desc: "Expertise complète en marchés publics et réglementations.",
    badge: "Conforme",
  },
]

const Atouts = () => (
  <section style={{
    background: 'white',
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '-15%', right: '-10%', pointerEvents: 'none',
      width: '50%', height: '70%',
      background: `radial-gradient(ellipse, ${PRIMARY}0A 0%, transparent 60%)`,
      filter: 'blur(90px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-10%', left: '-8%', pointerEvents: 'none',
      width: '40%', height: '50%',
      background: `radial-gradient(ellipse, ${ACCENT}0A 0%, transparent 60%)`,
      filter: 'blur(80px)',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

      <Reveal className="mb-16">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Tag>Pourquoi nous choisir</Tag>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700, color: '#2D2D2D',
              margin: '14px 0 0',
            }}>
              Nos{' '}
              <span style={{
                background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>atouts</span>
            </h2>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: '#64748b',
            maxWidth: 380, lineHeight: 1.75, margin: 0,
          }}>
            Une entreprise reconnue pour son excellence opérationnelle et sa maîtrise de projets complexes.
          </p>
        </div>
        <div style={{
          width: 56, height: 3, borderRadius: 2, marginTop: 24,
          background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
        }} />
      </Reveal>

      <div className="atouts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {ATOUTS_ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -7, boxShadow: `0 20px 56px ${PRIMARY}1E` }}
              transition={{ duration: 0.28 }}
              style={{
                borderRadius: 24,
                background: 'white',
                border: `1px solid ${PRIMARY}1E`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                position: 'relative',
                padding: '36px 28px 32px',
                cursor: 'default',
                height: '100%',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
              }} />

              <div style={{
                position: 'absolute', top: 10, right: 18,
                fontSize: 72, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: `${PRIMARY}0C`, lineHeight: 1, userSelect: 'none',
              }}>{item.num}</div>

              <div style={{
                width: 52, height: 52, borderRadius: 15, marginBottom: 24,
                background: `linear-gradient(135deg, ${PRIMARY}22, ${ACCENT}18)`,
                border: `1px solid ${PRIMARY}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>{item.icon}</div>

              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.3rem, 2vw, 1.85rem)',
                fontWeight: 700, margin: '0 0 10px',
                background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.15,
              }}>{item.stat}</p>

              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15, fontWeight: 700,
                color: '#2D2D2D', margin: '0 0 10px',
              }}>{item.title}</h3>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: '#64748b',
                lineHeight: 1.68, margin: '0 0 22px',
              }}>{item.desc}</p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 13px', borderRadius: 99,
                background: `rgba(59, 130, 246, 0.08)`, border: `1px solid ${PRIMARY}33`,
                fontFamily: "'Inter', sans-serif",
                fontSize: 11, fontWeight: 700, color: PRIMARY,
                letterSpacing: '0.03em',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: PRIMARY, flexShrink: 0 }} />
                {item.badge}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 1100px) { .atouts-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 580px)  { .atouts-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
)

// ─── SLOGAN & VALEURS CORE ───────────────────────────────────────────────────
const Slogan = () => (
  <section style={{
    background: `linear-gradient(165deg, ${DARK} 0%, rgba(45,45,45,0.95) 50%, ${DARK} 100%)`,
    padding: '140px 40px',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '-20%', right: '-10%', pointerEvents: 'none',
      width: '60%', height: '70%',
      background: `radial-gradient(ellipse, ${PRIMARY}18 0%, transparent 65%)`,
      filter: 'blur(100px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-15%', left: '-8%', pointerEvents: 'none',
      width: '50%', height: '60%',
      background: `radial-gradient(ellipse, ${ACCENT}12 0%, transparent 65%)`,
      filter: 'blur(90px)',
    }} />

    <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 24, padding: '10px 20px', borderRadius: 99,
            background: `linear-gradient(135deg, ${PRIMARY}22, ${ACCENT}18)`,
            border: `1px solid ${PRIMARY}44`,
          }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11, fontWeight: 800, letterSpacing: '0.15em',
              textTransform: 'uppercase', background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Notre philosophie</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              fontWeight: 700, color: 'white', margin: '0 0 20px',
              lineHeight: 1.2, letterSpacing: '-0.02em',
            }}
          >
            Construire pour <span style={{
              background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>l'éternité</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 620, margin: '0 auto 20px', lineHeight: 1.8, fontWeight: 400,
            }}
          >
            Chaque bâtiment que nous construisons porte notre signature. Une signature de durabilité, de fiabilité et de excellence — qui perdure bien au-delà de la fin du chantier.
          </motion.p>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18, marginBottom: 52,
          }}
        >
          {[
            { icon: '⚡', title: 'Rapidité exécutée', desc: 'Délais maîtrisés sans compromis sur la qualité' },
            { icon: '🛡️', title: 'Fiabilité totale', desc: 'Normes ISO et standards internationaux garantis' },
            { icon: '🏆', title: 'Excellence durable', desc: 'Constructions qui traversent les décennies' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, background: `rgba(255,255,255,0.12)` }}
              style={{
                padding: '28px 24px', borderRadius: 20,
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid rgba(255,255,255,0.12)`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 16, fontWeight: 700, color: 'white', margin: '0 0 8px',
              }}>{item.title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6,
              }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Commitment Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          viewport={{ once: true }}
          style={{
            padding: '40px 32px', borderRadius: 24,
            background: `linear-gradient(135deg, ${PRIMARY}16, ${ACCENT}12)`,
            border: `1.5px solid ${PRIMARY}44`,
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 24 }}>✨</span>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, fontWeight: 700, color: ACCENT,
              textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0,
            }}>Notre engagement</p>
            <span style={{ fontSize: 24 }}>✨</span>
          </div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
            fontWeight: 700, color: 'white', margin: '0 0 12px',
            lineHeight: 1.4,
          }}>
            Zéro compromis sur la <span style={{ color: ACCENT }}>qualité</span> — c'est notre promesse.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.7,
          }}>
            Du premier coup de pioche jusqu'à la réception des clés, nous garantissons une excellence constante sur chaque chantier.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            { icon: '✓', text: 'Qualité certifiée' },
            { icon: '⏱', text: 'Délais respectés' },
            { icon: '🔒', text: 'Sécurité optimale' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, boxShadow: `0 8px 24px ${PRIMARY}44` }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 24px', borderRadius: 99,
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                border: `1px solid ${PRIMARY}55`,
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700,
                color: 'rgba(255,255,255,0.9)',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: 16, color: ACCENT }}>{badge.icon}</span> {badge.text}
            </motion.div>
          ))}
        </motion.div>
      </Reveal>
    </div>
  </section>
)


// ─── HERO BANNER ──────────────────────────────────────────────────────────────
const GCCarouselBanner = () => {
  return (
    <section style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>

      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          zIndex: 0,
        }}
      >
        <source src="/construction/3741-174188012_large.mp4" type="video/mp4" />
      </video>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(
          135deg,
          rgba(17,20,24,0.88) 0%,
          rgba(17,20,24,0.72) 50%,
          rgba(166,77,66,0.12) 100%
        )`,
      }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: `linear-gradient(rgba(166,77,66,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(166,77,66,0.06) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }} />

      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: '50%', height: '70%',
          background: `radial-gradient(ellipse, ${PRIMARY}55 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 820, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 28 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 18px', borderRadius: 99,
            background: `${PRIMARY}20`, border: `1px solid ${PRIMARY}55`,
            fontFamily: "'Inter', sans-serif",
            fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: `${ACCENT}EE`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: PRIMARY, display: 'inline-block' }} />
            SIBIRI Global Construction et Rénovation
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
            fontWeight: 700, color: 'white',
            lineHeight: 1.1, margin: '0 0 24px',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}
        >
          Tout passe, mais la<br />
          <span style={{
            background: `linear-gradient(90deg, ${PRIMARY} 0%, ${ACCENT} 60%, ${PRIMARY} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            qualité demeure
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16.5, color: 'rgba(255,255,255,0.52)',
            maxWidth: 520, margin: '0 auto 52px', lineHeight: 1.78,
          }}
        >
          Bâtiments, routes, assainissement, adduction d'eau — avec qualité, délais maîtrisés et sécurité chantier.
        </motion.p>

      </div>
    </section>
  )
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: "📍",
    label: "Siège",
    value: "Nationale 5, Zone Wend Panga",
    detail: "KOUBA - Commune de KOUBRI",
  },
  {
    icon: "📞",
    label: "Téléphone",
    value: "+226 25 50 27 24",
    detail: "+226 25 37 69 56",
  },
  {
    icon: "✉️",
    label: "E-mail",
    value: "sibirigcr@sibiri.group",
    detail: "Réponse en 24h",
  },
]

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        {[
          { name: 'nom', label: 'Nom complet', type: 'text' },
          { name: 'email', label: 'E-mail', type: 'email' },
          { name: 'telephone', label: 'Téléphone', type: 'tel' },
          { name: 'sujet', label: 'Sujet', type: 'text' },
        ].map((field) => (
          <motion.div key={field.name} whileHover={{ scale: 1.02 }}>
            <label style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#6B7280',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
              placeholder={field.label}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: `1.5px solid ${PRIMARY}22`,
                background: 'white',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#1F2937',
                transition: 'all 0.3s ease',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = PRIMARY
                e.target.style.boxShadow = `0 0 0 3px ${PRIMARY}15`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = `${PRIMARY}22`
                e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div whileHover={{ scale: 1.01 }}>
        <label style={{
          display: 'block',
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: '#6B7280',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Votre message..."
          rows={5}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 12,
            border: `1.5px solid ${PRIMARY}22`,
            background: 'white',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: '#1F2937',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            resize: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = PRIMARY
            e.target.style.boxShadow = `0 0 0 3px ${PRIMARY}15`
          }}
          onBlur={(e) => {
            e.target.style.borderColor = `${PRIMARY}22`
            e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'
          }}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        style={{
          padding: '16px 32px',
          borderRadius: 16,
          background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
          border: 'none',
          color: 'white',
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: `0 8px 20px ${PRIMARY}30`,
        }}
      >
        Envoyer le message 🚀
      </motion.button>
    </motion.form>
  )
}

const Contact = () => (
  <section id="contact" style={{ background: 'white', padding: '140px 40px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal className="mb-20">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 4, height: 32, borderRadius: 2, background: `linear-gradient(180deg, ${PRIMARY}, ${ACCENT})` }} />
          <Tag>Nous écrire</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 700, color: '#1F2937', margin: '0 0 12px',
        }}>
          Parlons de votre <span style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>prochain projet</span>
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16, color: '#6B7280', maxWidth: 600, lineHeight: 1.8, margin: 0,
        }}>
          Une question? Un projet? Contactez nos experts pour une consultation gratuite et une réponse rapide.
        </p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginBottom: 60 }}>

        {/* Contact Form */}
        <Reveal delay={0.1}>
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 700, color: '#1F2937', margin: '0 0 24px',
            }}>
              Formulaire de contact
            </h3>
            <ContactForm />
          </div>
        </Reveal>

        {/* Contact Info */}
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 700, color: '#1F2937', margin: 0,
            }}>
              Informations de contact
            </h3>

            {CONTACT_INFO.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 8 }}
                style={{
                  padding: '20px 24px',
                  borderRadius: 16,
                  background: `${PRIMARY}08`,
                  border: `1.5px solid ${PRIMARY}15`,
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ fontSize: 28, lineHeight: 1 }}>{info.icon}</div>
                  <div>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12, fontWeight: 700, color: PRIMARY,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      margin: '0 0 6px',
                    }}>
                      {info.label}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15, fontWeight: 700, color: '#1F2937',
                      margin: '0 0 4px',
                    }}>
                      {info.value}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14, color: '#6B7280',
                      margin: 0,
                    }}>
                      {info.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              style={{
                padding: '28px 24px',
                borderRadius: 16,
                background: `linear-gradient(135deg, ${PRIMARY}12, ${ACCENT}08)`,
                border: `1.5px solid ${PRIMARY}25`,
                marginTop: 16,
              }}
            >
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: '#6B7280', lineHeight: 1.8,
                margin: 0,
              }}>
                <span style={{ fontWeight: 700, color: '#1F2937' }}>Horaires:</span><br/>
                Lundi - Vendredi: 8h - 18h<br/>
                Samedi: 9h - 13h<br/>
                Dimanche: Fermé
              </p>
            </motion.div>
          </div>
        </Reveal>

      </div>
    </div>
  </section>
)

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────
export const GlobalConstructionPage = () => (
  <div className="w-full">
    <ConstructionNav />
    <GCCarouselBanner />
    <Presentation />
    <MissionVision />
    <Activites />
    <Atouts />
    <Slogan />
    <Contact />
    <NeoMinimalFooter variant="construction" />
  </div>
)
