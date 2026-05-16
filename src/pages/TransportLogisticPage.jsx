import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { NeoMinimalFooter } from "../components/NeoMinimalFooter"
import { TransportNav } from "../components/TransportNav"

// ─── Couleurs Transport & Logistique (Bleu) ────────────────────
const PRIMARY   = "#0ea5e9"      // Cyan/Bleu clair
const ACCENT    = "#67e8f9"      // Cyan très clair
const ACCENT_OP = "#06b6d4"      // Cyan intermédiaire
const DARK      = "#0f1720"      // Bleu très foncé

// ─── Helpers ─────────────────────────────────────────────────────────────────────
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

// ─── PRÉSENTATION ─────────────────────────────────────────────────────────────────
const Presentation = () => (
  <section id="presentation" className="py-20 px-6 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto">

      <Reveal className="mb-14">
        <Tag>À propos</Tag>
        <SectionTitle>Sibiri Transport & Logistique</SectionTitle>
        <div className="w-14 h-0.5 mt-3" style={{ background: PRIMARY }} />
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal delay={0.05}>
          <p className="text-slate-600 leading-relaxed text-base mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
            <P>Sibiri Transport & Logistique</P> est un leader régional spécialisé dans le <P>transport sécurisé et conforme d'hydrocarbures, minerais et marchandises</P> en Afrique de l'Ouest. Fondée avec une vision de <P>fiabilité opérationnelle et excellence logistique</P>, elle intervient pour les grands acteurs des secteurs pétrolier, minier et commercial.
          </p>
          <p className="text-slate-600 leading-relaxed text-base mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
            Dotée d'une <P>flotte certifiée</P> et d'une <P>équipe opérationnelle 24/7</P>, l'entreprise garantit le <P>suivi GPS en temps réel</P> et le respect des normes ADR, HSE et de traçabilité complète sur chaque expédition.
          </p>
          <p className="text-slate-600 leading-relaxed text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Partenaire de confiance des plus grands groupes africains, STL est reconnue pour son <P>expertise en gestion de flux complexes</P> et sa capacité à assurer la continuité de service avec sécurité maximale en Afrique.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="relative rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(14,165,233,0.08), rgba(6,182,212,0.08))`,
              border: `1px solid ${PRIMARY}22`,
              minHeight: 260,
              padding: 40,
            }}
          >
            <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', border: `1px solid ${PRIMARY}22` }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', border: `1px solid ${PRIMARY}18` }} />
            <img
              src="/Sibiri-Transport.png"
              alt="Sibiri Transport & Logistique — logo"
              style={{ position: 'relative', zIndex: 1, maxWidth: '75%', height: 'auto' }}
            />
          </div>
        </Reveal>
      </div>

    </div>
  </section>
)

// ─── MISSION / VISION / VALEURS ──────────────────────────────────────────────────
const MISSION_ITEMS = [
  "Assurer le transport sécurisé et conforme des hydrocarbures et minerais",
  "Optimiser les délais de livraison et réduire les coûts logistiques",
  "Garantir la traçabilité complète des flux et la continuité de service",
  "Former et professionnaliser les équipes opérationnelles",
  "Respecter scrupuleusement les normes HSE et ADR",
]

const VALEURS_ITEMS = [
  { label: "Sécurité", icon: "🔒" },
  { label: "Fiabilité", icon: "✓" },
  { label: "Excellence opérationnelle", icon: "⚙️" },
  { label: "Responsabilité environnementale", icon: "🌍" },
  { label: "Innovation", icon: "💡" },
  { label: "Intégrité", icon: "🤝" },
]

const MissionVision = () => (
  <section style={{
    position: 'relative', overflow: 'hidden',
    background: 'white',
    padding: '100px 40px 120px',
  }}>
    {/* Déco fond */}
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

      {/* Header */}
      <Reveal className="text-center mb-16">
        <Tag>Nos engagements</Tag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700, color: '#0f1720', margin: '14px 0 20px',
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

      {/* Grille asymétrique */}
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
            }}>🚚</div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, fontWeight: 700, color: '#0f1720', margin: '0 0 8px',
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

          {/* VISION — carte colorée */}
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
                Devenir un <strong style={{ color: 'white' }}>leader régional du transport logistique</strong> en Afrique de l'Ouest, reconnu pour sa fiabilité, sécurité et innovation à l'horizon de 2027.
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
                fontSize: 22, fontWeight: 700, color: '#0f1720', margin: '0 0 24px',
              }}>Nos 6 Valeurs</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {VALEURS_ITEMS.map((v, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 12,
                    background: `rgba(14, 165, 233, 0.06)`,
                    border: `1px solid ${PRIMARY}22`,
                  }}>
                    <span style={{ fontSize: 16 }}>{v.icon}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13, fontWeight: 600, color: '#0f1720',
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

// ─── ACTIVITÉS PRINCIPALES ──────────────────────────────────────────────────────
const ACTIVITES = [
  {
    icon: "⛽",
    num: "01",
    title: "Transport d'hydrocarbures",
    desc: "Acheminement de carburants (essence, gasoil) via camions-citernes certifiés pour matières dangereuses.",
  },
  {
    icon: "⛏️",
    num: "02",
    title: "Transport de minerais",
    desc: "Convoyage de matières premières depuis les mines vers ports ou usines de transformation.",
  },
  {
    icon: "📦",
    num: "03",
    title: "Transport conteneurisé",
    desc: "Gestion complète du transport de marchandises conteneurisées et marchandises diverses.",
  },
  {
    icon: "🔗",
    num: "04",
    title: "Logistique intégrée",
    desc: "Gestion des flux, stockage, livraison et optimisation complète de la supply chain.",
  },
  {
    icon: "🛰️",
    num: "05",
    title: "Suivi & tracking GPS",
    desc: "Géolocalisation en temps réel et suivi continu de chaque expédition.",
  },
  {
    icon: "🔧",
    num: "06",
    title: "Gestion de flotte",
    desc: "Maintenance préventive, optimisation véhicules et assurance de la performance opérationnelle.",
  },
]

const Activites = () => {
  const [active, setActive] = useState(0)

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

        {/* Grille 3 colonnes */}
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

// ─── ATOUTS ───────────────────────────────────────────────────────────────────────
const ATOUTS_ITEMS = [
  {
    icon: "🚛",
    num: "01",
    stat: "50+",
    title: "Flotte complète",
    desc: "Camions-citernes, bennes et plateaux certifiés pour tous types de marchandises.",
    badge: "Tous types",
  },
  {
    icon: "✓",
    num: "02",
    stat: "24/7",
    title: "Disponibilité",
    desc: "Opérations continues et équipes réactives pour garantir la continuité de service.",
    badge: "Non-stop",
  },
  {
    icon: "🌐",
    num: "03",
    stat: "AOA",
    title: "Couverture régionale",
    desc: "Présence opérationnelle en Afrique de l'Ouest avec corridors de transport optimisés.",
    badge: "Multi-pays",
  },
  {
    icon: "📊",
    num: "04",
    stat: "100%",
    title: "Traçabilité",
    desc: "Suivi GPS en temps réel et reporting transparent pour chaque expédition.",
    badge: "Temps réel",
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
              fontWeight: 700, color: '#0f1720',
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
            Une entreprise spécialisée reconnue pour sa sécurité, fiabilité et excellence opérationnelle.
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
                color: '#0f1720', margin: '0 0 10px',
              }}>{item.title}</h3>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: '#64748b',
                lineHeight: 1.68, margin: '0 0 22px',
              }}>{item.desc}</p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 13px', borderRadius: 99,
                background: `rgba(14, 165, 233, 0.08)`, border: `1px solid ${PRIMARY}33`,
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

// ─── PROJETS FUTURS ───────────────────────────────────────────────────────────────
const PROJETS = [
  {
    icon: '🚛',
    num: '01',
    status: 'En cours',
    statusColor: ACCENT,
    annee: '2025 – 2026',
    title: 'Expansion de flotte',
    desc: 'Acquisition de 25 nouveaux camions-citernes certifiés ADR pour étendre la capacité de transport d\'hydrocarbures.',
  },
  {
    icon: '💻',
    num: '02',
    status: 'En étude',
    statusColor: '#F0D080',
    annee: '2026',
    title: 'Plateforme TMS digitale',
    desc: 'Développement d\'un système de gestion du transport et optimisation des itinéraires avec IA.',
  },
  {
    icon: '🌍',
    num: '03',
    status: 'Planifié',
    statusColor: '#F0D080',
    annee: '2026 – 2027',
    title: 'Extension sous-régionale',
    desc: 'Ouverture de hubs logistiques en Côte d\'Ivoire et Mali pour renforcer la présence régionale.',
  },
  {
    icon: '♻️',
    num: '04',
    status: 'Planifié',
    statusColor: ACCENT,
    annee: '2027',
    title: 'Transition énergétique',
    desc: 'Intégration de véhicules plus écologiques et réduction de l\'empreinte carbone des opérations.',
  },
]

const ProjetsFuturs = () => (
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
    <div style={{
      position: 'absolute', bottom: '-10%', left: '-5%', pointerEvents: 'none',
      width: '35%', height: '45%',
      background: `radial-gradient(ellipse, ${ACCENT}08 0%, transparent 65%)`,
      filter: 'blur(70px)',
    }} />

    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

      <Reveal className="mb-14">
        <Tag light>Vision</Tag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700, color: 'white',
          margin: '14px 0 20px',
        }}>
          Projets{' '}
          <span style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>futurs</span>
        </h2>
        <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }} />
      </Reveal>

      <div className="projets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {PROJETS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -5, borderColor: `${PRIMARY}66` }}
              transition={{ duration: 0.28 }}
              style={{
                borderRadius: 24,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(255,255,255,0.09)`,
                padding: '36px 32px',
                position: 'relative', overflow: 'hidden',
                cursor: 'default',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
                opacity: 0.6,
              }} />

              <div style={{
                position: 'absolute', top: 14, right: 22,
                fontSize: 72, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: `${PRIMARY}10`, lineHeight: 1, userSelect: 'none',
              }}>{p.num}</div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 15, flexShrink: 0,
                    background: `${PRIMARY}1A`, border: `1px solid ${PRIMARY}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>{p.icon}</div>

                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em',
                  }}>{p.annee}</span>
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 12px', borderRadius: 99, flexShrink: 0,
                  background: `${p.statusColor}18`,
                  border: `1px solid ${p.statusColor}44`,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.statusColor, flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11, fontWeight: 700, color: p.statusColor,
                  }}>{p.status}</span>
                </div>
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 19, fontWeight: 700, color: 'white',
                margin: '0 0 12px', lineHeight: 1.3,
              }}>{p.title}</h3>

              <div style={{
                width: '100%', height: 1, marginBottom: 16,
                background: `linear-gradient(90deg, ${PRIMARY}33, transparent)`,
              }} />

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13.5, color: 'rgba(255,255,255,0.58)',
                lineHeight: 1.72, margin: 0,
              }}>{p.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 860px) { .projets-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
)

// ─── CONFORMITÉ & NORMES ──────────────────────────────────────────────────────────
const NORMES_ITEMS = [
  {
    label: "Normes HSE",
    desc: "Hygiène, sécurité et environnement dans toutes les opérations",
  },
  {
    label: "ADR (accord routier)",
    desc: "Transport international des marchandises dangereuses par route",
  },
  {
    label: "Traçabilité complète",
    desc: "Documentation et suivi transparent de chaque expédition",
  },
  {
    label: "Formations régulières",
    desc: "Capacitation continue des chauffeurs et équipes opérationnelles",
  },
]

const Conformite = () => (
  <section style={{
    background: 'white',
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', bottom: '-10%', right: '-5%', pointerEvents: 'none',
      width: '45%', height: '55%',
      background: `radial-gradient(ellipse, ${PRIMARY}09 0%, transparent 65%)`,
      filter: 'blur(90px)',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal className="mb-14">
        <Tag>Engagement</Tag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700, color: '#0f1720',
          margin: '14px 0 0',
        }}>
          Conformité &{' '}
          <span style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>normes</span>
        </h2>
        <div style={{ width: 56, height: 3, borderRadius: 2, marginTop: 24, background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }} />
      </Reveal>

      <div className="normes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {NORMES_ITEMS.map((n, i) => (
          <Reveal key={n.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: 20,
                background: 'white',
                border: `1px solid ${PRIMARY}22`,
                padding: '28px 32px',
                position: 'relative',
                cursor: 'default',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
              }} />

              <div style={{
                width: 44, height: 44, borderRadius: 12, marginBottom: 16,
                background: `${PRIMARY}12`, border: `1px solid ${PRIMARY}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, fontWeight: 700, color: PRIMARY,
              }}>✓</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18, fontWeight: 700, color: '#0f1720',
                margin: '0 0 10px',
              }}>{n.label}</h3>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14, color: '#64748b',
                lineHeight: 1.6, margin: 0,
              }}>{n.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 640px) { .normes-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
)


// ─── HERO BANNER ──────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  '/transport/highway1.jpg',
  '/transport/warehouse.jpg',
  '/transport/truck-convoy.jpg',
]

const TLCarouselBanner = () => {
  return (
    <section style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>

      {/* Vidéo background */}
      <motion.div style={{ position: 'absolute', inset: '-10% 0', zIndex: 0 }}>
        <video
          autoPlay loop muted playsInline
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          src="/transport/istockphoto-2194913184-640_adpp_is.mp4"
        />
      </motion.div>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(
          135deg,
          rgba(45,45,45,0.88) 0%,
          rgba(45,45,45,0.72) 50%,
          rgba(14,165,233,0.12) 100%
        )`,
      }} />

      {/* Texture grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: `linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }} />

      {/* Glow ambient */}
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

      {/* Contenu */}
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
            Sibiri Transport & Logistique
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
          La sécurité de vos flux,<br />
          <span style={{
            background: `linear-gradient(90deg, ${PRIMARY} 0%, ${ACCENT} 60%, ${PRIMARY} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            au cœur de l'Afrique
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
          Transport d'hydrocarbures, minerais et marchandises — avec suivi GPS, flotte certifiée et équipes opérationnelles 24/7.
        </motion.p>

      </div>
    </section>
  )
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────────
export const TransportLogisticPage = () => (
  <div className="w-full">
    <TransportNav />
    <TLCarouselBanner />
    <Presentation />
    <MissionVision />
    <Activites />
    <Atouts />
    <Conformite />
    <ProjetsFuturs />
    <NeoMinimalFooter variant="logistic" />
  </div>
)
