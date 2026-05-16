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
  <section id="presentation" className="py-20 px-6 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto">

      <Reveal className="mb-14">
        <Tag>À propos</Tag>
        <SectionTitle>SIBIRI Global Construction & Rénovation</SectionTitle>
        <div className="w-14 h-0.5 mt-3" style={{ background: PRIMARY }} />
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal delay={0.05}>
          <p className="text-slate-600 leading-relaxed text-base mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
            <P>SIBIRI Global Construction & Rénovation SA</P> est une entreprise spécialisée dans le <P>génie civil, la construction</P> et la <P>rénovation de bâtiments</P>. Elle intervient dans les <P>travaux publics, l'aménagement hydro-agricole</P> et les infrastructures en Afrique de l'Ouest.
          </p>
          <p className="text-slate-600 leading-relaxed text-base mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
            Avec une équipe <P>pluridisciplinaire</P> et une <P>flotte de matériel adaptée</P>, l'entreprise s'engage à offrir des solutions de construction de <P>qualité, dans les délais convenus et avec une sécurité chantier optimale</P>.
          </p>
          <p className="text-slate-600 leading-relaxed text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Filiale du Groupe SIBIRI HOLDING, l'entreprise bénéficie d'une <P>solidité financière</P> et d'une <P>synergie opérationnelle</P> lui permettant de répondre efficacement aux défis majeurs des infrastructures africaines.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="relative rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(166,77,66,0.08), rgba(212,117,107,0.08))`,
              border: `1px solid ${PRIMARY}22`,
              minHeight: 260,
              padding: 40,
            }}
          >
            <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', border: `1px solid ${PRIMARY}22` }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', border: `1px solid ${PRIMARY}18` }} />
            <img
              src="/Sibiri-Construction.jpg"
              alt="SIBIRI Global Construction — logo"
              style={{ position: 'relative', zIndex: 1, maxWidth: '75%', height: 'auto' }}
            />
          </div>
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
    padding: '100px 40px 120px',
  }}>
    <div style={{
      position: 'absolute', top: '-10%', right: '-5%', zIndex: 0, pointerEvents: 'none',
      width: '40%', height: '50%',
      background: `radial-gradient(ellipse, ${PRIMARY}12 0%, transparent 65%)`,
      filter: 'blur(70px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-5%', left: '-5%', zIndex: 0, pointerEvents: 'none',
      width: '35%', height: '40%',
      background: `radial-gradient(ellipse, ${ACCENT}10 0%, transparent 65%)`,
      filter: 'blur(80px)',
    }} />
    <div style={{
      position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
      fontSize: 'clamp(7rem, 18vw, 15rem)', fontWeight: 900,
      fontFamily: "'Playfair Display', serif",
      color: `${PRIMARY}07`,
      whiteSpace: 'nowrap', userSelect: 'none', zIndex: 0, letterSpacing: '-0.04em',
    }}>VALEURS</div>

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

      <Reveal className="text-center mb-16">
        <Tag>Nos engagements</Tag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700, color: '#2D2D2D', margin: '14px 0 20px',
        }}>
          Mission, Vision &{' '}
          <span style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Valeurs</span>
        </h2>
        <div style={{
          width: 56, height: 3, borderRadius: 2, margin: '0 auto',
          background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
        }} />
      </Reveal>

      <div className="mvv-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.35fr 1fr',
        gap: 24,
      }}>

        {/* ── MISSION ── */}
        <Reveal delay={0.1}>
          <div style={{
            borderRadius: 24, padding: '44px 40px',
            background: 'white',
            border: `1px solid ${PRIMARY}28`,
            boxShadow: `0 4px 32px ${PRIMARY}10`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT}, transparent)`,
            }} />
            <div style={{
              position: 'absolute', top: 20, right: 28,
              fontSize: 110, fontWeight: 900, fontFamily: "'Playfair Display', serif",
              color: `${PRIMARY}0D`, lineHeight: 1, userSelect: 'none',
            }}>01</div>

            <div style={{
              width: 54, height: 54, borderRadius: 16, marginBottom: 28,
              background: `${PRIMARY}15`, border: `1px solid ${PRIMARY}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            }}>🏗️</div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, fontWeight: 700, color: '#2D2D2D', margin: '0 0 8px',
            }}>Notre Mission</h3>
            <div style={{
              width: 44, height: 2, borderRadius: 2, marginBottom: 32,
              background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            }} />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {MISSION_ITEMS.map((item, j) => (
                <li key={j} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  fontFamily: "'Inter', sans-serif", fontSize: 14,
                  color: '#475569', lineHeight: 1.68,
                }}>
                  <span style={{
                    flexShrink: 0, marginTop: 4,
                    width: 22, height: 22, borderRadius: 7,
                    background: `${PRIMARY}18`, border: `1px solid ${PRIMARY}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5L3.8 7.5L10 1" stroke={PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ── VISION + VALEURS empilés ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* VISION */}
          <Reveal delay={0.2}>
            <div style={{
              borderRadius: 24, padding: '36px 32px',
              background: `linear-gradient(140deg, ${PRIMARY} 0%, ${ACCENT} 100%)`,
              position: 'relative', overflow: 'hidden',
              boxShadow: `0 12px 40px ${PRIMARY}44`,
            }}>
              <div style={{
                position: 'absolute', top: 14, right: 22,
                fontSize: 80, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: 'rgba(255,255,255,0.12)', lineHeight: 1, userSelect: 'none',
              }}>02</div>

              <div style={{
                width: 54, height: 54, borderRadius: 16, marginBottom: 22,
                background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>🌍</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: 'white', margin: '0 0 16px',
              }}>Notre Vision</h3>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15, lineHeight: 1.78,
                color: 'rgba(255,255,255,0.88)', margin: 0,
              }}>
                Être un <strong style={{ color: 'white' }}>leader en construction et génie civil</strong> reconnu pour sa qualité, ses délais maîtrisés et son excellence opérationnelle.
              </p>
            </div>
          </Reveal>

          {/* VALEURS */}
          <Reveal delay={0.35}>
            <div style={{
              borderRadius: 24, padding: '36px 32px',
              background: 'white',
              border: `1px solid ${PRIMARY}28`,
              boxShadow: `0 4px 32px ${PRIMARY}10`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
              }} />
              <div style={{
                position: 'absolute', top: 14, right: 22,
                fontSize: 80, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: `${ACCENT}18`, lineHeight: 1, userSelect: 'none',
              }}>03</div>

              <div style={{
                width: 54, height: 54, borderRadius: 16, marginBottom: 22,
                background: `${ACCENT}18`, border: `1px solid ${ACCENT}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>💎</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: '#2D2D2D', margin: '0 0 24px',
              }}>Nos 4 Valeurs</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {VALEURS_ITEMS.map((v, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 12,
                    background: `rgba(59, 130, 246, 0.06)`,
                    border: `1px solid ${PRIMARY}22`,
                  }}>
                    <span style={{ fontSize: 16 }}>{v.icon}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13, fontWeight: 600, color: '#2D2D2D',
                    }}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
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
        padding: '100px 40px 120px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%', pointerEvents: 'none',
        width: '55%', height: '65%',
        background: `radial-gradient(ellipse, ${PRIMARY}0B 0%, transparent 65%)`,
        filter: 'blur(80px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <Reveal className="mb-14">
          <Tag light>Ce que nous faisons</Tag>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 700, color: 'white',
            margin: '14px 0 20px',
          }}>
            Nos{' '}
            <span style={{
              background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>activités</span>
          </h2>
          <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }} />
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
    icon: "🏛️",
    num: "01",
    stat: "Groupe solide",
    title: "Solidité financière",
    desc: "Soutien du Groupe SIBIRI offrant stabilité et ressources.",
    badge: "Groupe solide",
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
    background: DARK,
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '-15%', right: '-8%', pointerEvents: 'none',
      width: '50%', height: '60%',
      background: `radial-gradient(ellipse, ${PRIMARY}0C 0%, transparent 65%)`,
      filter: 'blur(80px)',
    }} />

    <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Reveal>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: ACCENT, marginBottom: 20,
        }}>Notre slogan</p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 700, color: 'white', margin: '0 0 28px',
        }}>
          "Tout passe, mais la <span style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>qualité demeure</span>"
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16, color: 'rgba(255,255,255,0.65)',
          maxWidth: 620, margin: '0 auto 52px', lineHeight: 1.8,
        }}>
          Nous attachons du prix à la qualité de nos ouvrages. À travers ce slogan, nous affirmons que nos clients oublieront les efforts financiers supportés lors de la réalisation, tant la qualité de nos constructions perdure dans le temps.
        </p>
      </Reveal>
    </div>
  </section>
)


// ─── HERO BANNER ──────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  '/construction/chantier1.jpg',
  '/construction/chantier2.jpg',
  '/construction/infrastructure.jpg',
]

const GCCarouselBanner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % HERO_IMAGES.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>

      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={HERO_IMAGES[current]}
          alt={`GC ${current + 1}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            zIndex: 0,
          }}
        />
      </AnimatePresence>

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
            SIBIRI Global Construction
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
          Excellence en construction,<br />
          <span style={{
            background: `linear-gradient(90deg, ${PRIMARY} 0%, ${ACCENT} 60%, ${PRIMARY} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            pour l'Afrique de demain
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 10 }}
        >
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 28 : 8,
                height: 8, borderRadius: 99, border: 'none', cursor: 'pointer',
                background: i === current ? PRIMARY : 'rgba(255,255,255,0.28)',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

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
    <NeoMinimalFooter variant="construction" />
  </div>
)
