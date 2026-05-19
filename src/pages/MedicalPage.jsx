import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, AnimatePresence } from "framer-motion"
import { MedicalTailarkHeroSection } from "../components/MedicalTailarkHeroSection"
import { MedicalNav } from "../components/MedicalNav"
import { NeoMinimalFooter } from "../components/NeoMinimalFooter"

// ─── Icônes SVG inline (pas de dépendance externe) ───────────────────────────
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconArrowLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
)

const GREEN       = "#00A99D"
const GREEN_LIGHT = "#8DC63F"
const GREEN_PALE  = "#E4F7F6"
const DARK        = "#03201F"

// ─── Helpers communs ──────────────────────────────────────────────────────────
const G = ({ children }) => (
  <span style={{ color: GREEN, fontWeight: 600 }}>{children}</span>
)

const Reveal = ({ children, delay = 0, y = 20, className = "" }) => {
  const ref    = useRef(null)
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
        ? { background: `${GREEN}55`, color: "#a8e6b8", border: `1px solid ${GREEN_LIGHT}55` }
        : { background: `${GREEN}22`, color: GREEN, border: `1px solid ${GREEN}44` }
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
        <SectionTitle>Sibiri Bio Médical Services</SectionTitle>
        <div className="w-14 h-0.5 mt-3" style={{ background: GREEN }} />
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal delay={0.05}>
          <p className="text-slate-600 leading-relaxed text-base mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
            Fondée en <G>2018</G>, <G>Sibiri Bio Médical Services</G> est une entreprise spécialisée dans
            l'importation et la distribution de produits pharmaceutiques, de matériels, accessoires et équipements médicaux
            destinés aux acteurs publics et privés du secteur de la santé au Burkina Faso.
          </p>
          <p className="text-slate-600 leading-relaxed text-base mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
            Forte d'une équipe pluridisciplinaire, l'entreprise s'engage à apporter des <G>solutions adaptées</G> aux
            besoins des hôpitaux, cliniques et structures de santé — avec un haut niveau d'exigence en matière
            de qualité, de traçabilité et de disponibilité.
          </p>
          <p className="text-slate-600 leading-relaxed text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Partenaire de confiance des autorités sanitaires, Sibiri Bio Médical est reconnue pour son
            professionnalisme et sa capacité à <G>répondre aux défis de la santé en Afrique de l'Ouest</G>.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="relative rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${GREEN_PALE}, #b8ece9)`,
              border: `1px solid ${GREEN}22`,
              minHeight: 260,
              padding: 40,
            }}
          >
            <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', border: `1px solid ${GREEN}22` }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', border: `1px solid ${GREEN}18` }} />
            <img
              src="/Sibiri-Medical.jpg"
              alt="Sibiri Bio Médical Services — logo"
              style={{ position: 'relative', zIndex: 1, maxWidth: '75%', height: 'auto' }}
            />
          </div>
        </Reveal>
      </div>

    </div>
  </section>
)


// ─── MISSION / VISION / CRÉDO ─────────────────────────────────────────────────
const MISSION_ITEMS = [
  "Fournir une réponse professionnelle aux besoins d'amélioration des plateaux techniques des hôpitaux publics et privés",
  "Élargir l'offre de consommables et produits pharmaceutiques aux meilleures conditions de qualité, de prix et de disponibilité",
  "Assurer un Service Après-Vente irréprochable des équipements installés",
  "Assurer la formation continue de nos équipes et des praticiens de santé",
  "Être à l'écoute pour répondre aux besoins des populations en matière de santé",
]

const CREDO_ITEMS = [
  { label: "Professionnalisme",              icon: "◆" },
  { label: "Respect des engagements",        icon: "◆" },
  { label: "Exigence dans la qualité",       icon: "◆" },
]

const MissionVision = () => (
  <section style={{
    position: 'relative', overflow: 'hidden',
    background: 'white',
    padding: '100px 40px 120px',
  }}>
    {/* Déco fond clair */}
    <div style={{
      position: 'absolute', top: '-10%', right: '-5%', zIndex: 0, pointerEvents: 'none',
      width: '40%', height: '50%',
      background: `radial-gradient(ellipse, ${GREEN}12 0%, transparent 65%)`,
      filter: 'blur(70px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-5%', left: '-5%', zIndex: 0, pointerEvents: 'none',
      width: '35%', height: '40%',
      background: `radial-gradient(ellipse, ${GREEN_LIGHT}10 0%, transparent 65%)`,
      filter: 'blur(80px)',
    }} />
    <div style={{
      position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
      fontSize: 'clamp(7rem, 18vw, 15rem)', fontWeight: 900,
      fontFamily: "'Playfair Display', serif",
      color: `${GREEN}07`,
      whiteSpace: 'nowrap', userSelect: 'none', zIndex: 0, letterSpacing: '-0.04em',
    }}>VALEURS</div>

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <Reveal className="text-center mb-16">
        <Tag>Nos engagements</Tag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700, color: '#0d1f14', margin: '14px 0 20px',
        }}>
          Mission, Vision &{' '}
          <span style={{
            background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Valeurs</span>
        </h2>
        <div style={{
          width: 56, height: 3, borderRadius: 2, margin: '0 auto',
          background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
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
            border: `1px solid ${GREEN}28`,
            boxShadow: `0 4px 32px ${GREEN}10`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT}, transparent)`,
            }} />
            <div style={{
              position: 'absolute', top: 20, right: 28,
              fontSize: 110, fontWeight: 900, fontFamily: "'Playfair Display', serif",
              color: `${GREEN}0D`, lineHeight: 1, userSelect: 'none',
            }}>01</div>

            <div style={{
              width: 54, height: 54, borderRadius: 16, marginBottom: 28,
              background: `${GREEN}15`, border: `1px solid ${GREEN}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            }}>🎯</div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, fontWeight: 700, color: '#0d1f14', margin: '0 0 8px',
            }}>Notre Mission</h3>
            <div style={{
              width: 44, height: 2, borderRadius: 2, marginBottom: 32,
              background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
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
                    background: `${GREEN}18`, border: `1px solid ${GREEN}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5L3.8 7.5L10 1" stroke="#00A99D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ── VISION + CRÉDO empilés ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* VISION — carte colorée qui ressort sur fond blanc */}
          <Reveal delay={0.2}>
            <div style={{
              borderRadius: 24, padding: '36px 32px',
              background: `linear-gradient(140deg, ${GREEN} 0%, ${GREEN_LIGHT} 100%)`,
              position: 'relative', overflow: 'hidden',
              boxShadow: `0 12px 40px ${GREEN}44`,
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
                Être un <strong style={{ color: 'white' }}>partenaire de santé reconnu en Afrique</strong> pour son professionnalisme et un service de référence incontournable.
              </p>
            </div>
          </Reveal>

          {/* CRÉDO */}
          <Reveal delay={0.35}>
            <div style={{
              borderRadius: 24, padding: '36px 32px',
              background: 'white',
              border: `1px solid ${GREEN}28`,
              boxShadow: `0 4px 32px ${GREEN}10`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${GREEN_LIGHT}, transparent)`,
              }} />
              <div style={{
                position: 'absolute', top: 14, right: 22,
                fontSize: 80, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: `${GREEN_LIGHT}18`, lineHeight: 1, userSelect: 'none',
              }}>03</div>

              <div style={{
                width: 54, height: 54, borderRadius: 16, marginBottom: 22,
                background: `${GREEN_LIGHT}18`, border: `1px solid ${GREEN_LIGHT}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>💎</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: '#0d1f14', margin: '0 0 24px',
              }}>Notre Crédo</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {CREDO_ITEMS.map((v, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 18px', borderRadius: 12,
                    background: GREEN_PALE,
                    border: `1px solid ${GREEN}22`,
                  }}>
                    <span style={{
                      fontSize: 7, flexShrink: 0,
                      background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>◆</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14, fontWeight: 600, color: '#1a3a28',
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

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const Services = () => {
  const [active, setActive] = useState(0)

  const services = [
    {
      icon: "💧",
      num: "01",
      title: "Hémodialyse",
      subtitle: "Partenaire : NIPRO · Ministère de la Santé & Cliniques privées",
      prestations: [
        "Offre clé en main d'unités d'hémodialyse",
        "Générateurs de dialyse (12, 24, 48 par centre)",
        "Installation du traitement d'eau",
        "Mise à disposition des lits de dialyse",
        "Générateur de remplacement (1 ou 2) par centre",
        "Service Après-Vente des équipements",
        "Formation continue (techniciens, infirmier(e)s, néphrologues)",
        "Fourniture des consommables de dialyse (kits)",
        "Stock de sécurité pour les consommables",
      ],
    },
    {
      icon: "🫧",
      num: "02",
      title: "Centrales d'oxygène",
      subtitle: "Partenaire : MIL'S (leader mondial) · Ministère de la Santé & Cliniques privées",
      prestations: [
        "Acquisition et installation de centrales d'oxygène",
        "Maintenance et Services Après-Vente des centrales",
        "Mise en conformité de centrales d'oxygène",
        "Formation des équipes de SAV",
        "Disponibilité des pièces de rechange",
        "PSA VPSA en conteneur — durée de vie 15 à 20 ans",
      ],
      extra: { label: "Notre parc", items: ["5 centrales en activité", "3 centrales en cours d'installation"] },
    },
    {
      icon: "🏥",
      num: "03",
      title: "Équipements & Produits",
      subtitle: "Distribution de produits pharmaceutiques et équipements médicaux",
      prestations: [
        "Imagerie médicale",
        "Traitement de déchets",
        "Laboratoire d'analyses fonctionnelles",
        "Produits pharmaceutiques (médicaments, vaccins, tests...)",
        "Consommables médicaux",
        "Distribution de médicaments",
      ],
      extra: { label: "Nos atouts", items: ["Notoriété & fiabilité reconnues", "Disponibilité & compétitivité", "Partenaires internationaux (SMV Inde...)"] },
    },
  ]

  return (
    <section
      id="services"
      style={{
        background: DARK,
        padding: '100px 40px 120px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* BG glow */}
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%', pointerEvents: 'none',
        width: '55%', height: '65%',
        background: `radial-gradient(ellipse, ${GREEN}0B 0%, transparent 65%)`,
        filter: 'blur(80px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
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
              background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>prestations</span>
          </h2>
          <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
        </Reveal>

        {/* ── Expanding panels ── */}
        <div className="svc-panels" style={{ display: 'flex', gap: 12, height: 560 }}>
          {services.map((s, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="svc-panel"
              style={{
                flex: active === i ? '5 1 0' : '1 1 0',
                borderRadius: 24,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                minWidth: 72,
                background: active === i
                  ? `linear-gradient(150deg, rgba(0,169,157,0.16) 0%, rgba(255,255,255,0.03) 100%)`
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active === i ? GREEN + '55' : 'rgba(255,255,255,0.09)'}`,
                transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1), border-color 0.35s ease, background 0.35s ease',
              }}
            >
              {/* Accent bar top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                opacity: active === i ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }} />

              {/* Inner glow */}
              <div style={{
                position: 'absolute', top: '-20%', left: '-10%', pointerEvents: 'none',
                width: '60%', height: '60%',
                background: `radial-gradient(ellipse, ${GREEN}14 0%, transparent 70%)`,
                filter: 'blur(40px)',
                opacity: active === i ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }} />

              {/* ── Collapsed state ── */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 14, padding: '20px 0',
                opacity: active === i ? 0 : 1,
                transition: 'opacity 0.2s ease',
                pointerEvents: active === i ? 'none' : 'auto',
              }}>
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <p style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: 12, fontWeight: 700,
                  color: 'rgba(255,255,255,0.42)',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.05em',
                  margin: 0, whiteSpace: 'nowrap',
                }}>{s.title}</p>
                <span style={{
                  fontSize: 11, fontWeight: 800,
                  color: `${GREEN}66`,
                  fontFamily: "'Inter', sans-serif",
                }}>{s.num}</span>
              </div>

              {/* ── Expanded state ── */}
              <div
                className="svc-panel-scroll"
                style={{
                  position: 'absolute', inset: 0,
                  padding: '36px 32px',
                  overflowY: 'auto',
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'translateX(0)' : 'translateX(18px)',
                  transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
                  pointerEvents: active === i ? 'auto' : 'none',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Icon + watermark number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                    background: `${GREEN}22`, border: `1px solid ${GREEN}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                  }}>{s.icon}</div>
                  <span style={{
                    fontSize: 72, fontWeight: 900,
                    fontFamily: "'Playfair Display', serif",
                    color: `${GREEN}14`, lineHeight: 0.85, userSelect: 'none',
                  }}>{s.num}</span>
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24, fontWeight: 700, color: 'white', margin: '0 0 6px',
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12, color: `${GREEN}AA`, margin: '0 0 24px', lineHeight: 1.55,
                }}>{s.subtitle}</p>

                {/* Content grid */}
                <div style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: s.extra ? '1fr 1fr' : '1fr',
                  gap: 20, alignContent: 'start',
                }}>
                  {/* Prestations */}
                  <div>
                    <p style={{
                      fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                      fontFamily: "'Inter', sans-serif", marginBottom: 12,
                    }}>Prestations</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {s.prestations.map((p, j) => (
                        <li key={j} style={{
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55,
                        }}>
                          <span style={{ flexShrink: 0, marginTop: 6, width: 5, height: 5, borderRadius: '50%', background: GREEN_LIGHT }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extra */}
                  {s.extra && (
                    <div>
                      <p style={{
                        fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                        fontFamily: "'Inter', sans-serif", marginBottom: 12,
                      }}>{s.extra.label}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {s.extra.items.map((it, j) => (
                          <div key={j} style={{
                            padding: '11px 16px', borderRadius: 11,
                            background: `${GREEN}1A`, border: `1px solid ${GREEN}33`,
                            fontFamily: "'Inter', sans-serif", fontSize: 13,
                            color: GREEN_PALE, fontWeight: 500,
                            display: 'flex', alignItems: 'center', gap: 8,
                          }}>
                            <span style={{ color: GREEN_LIGHT, fontSize: 12, flexShrink: 0 }}>✓</span>
                            {it}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 28 : 8, height: 8,
                borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0,
                background: active === i ? GREEN : 'rgba(255,255,255,0.22)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .svc-panel-scroll::-webkit-scrollbar { width: 4px; }
        .svc-panel-scroll::-webkit-scrollbar-track { background: transparent; }
        .svc-panel-scroll::-webkit-scrollbar-thumb { background: ${GREEN}55; border-radius: 2px; }
        @media (max-width: 860px) {
          .svc-panels { flex-direction: column !important; height: auto !important; }
          .svc-panel  { flex: unset !important; min-width: unset !important; height: 440px; }
        }
      `}</style>
    </section>
  )
}

// ─── NOS RÉALISATIONS ────────────────────────────────────────────────────────
const REALISATIONS = [
  { src: '/medical/IMG_0482.JPG.jpeg', label: 'Unité d\'hémodialyse — CHU Yalgado',     lieu: 'Ouagadougou' },
  { src: '/medical/IMG_0495.JPG.jpeg', label: 'Installation générateurs de dialyse',    lieu: 'CHU Bogodogo' },
  { src: '/medical/IMG_0161.JPG.jpeg', label: 'Centrale d\'oxygène — CHU Souro Sanou',  lieu: 'Bobo-Dioulasso' },
  { src: '/medical/IMG_0281.JPG.jpeg', label: 'Équipements de laboratoire',              lieu: 'CHR Ouahigouya' },
  { src: '/medical/IMG_4221.JPG.jpeg', label: 'Formation des praticiens',                lieu: 'Ouagadougou' },
]

const RealisationCard = ({ src, label, lieu, style }) => {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: 20, cursor: 'pointer',
        ...style,
      }}
    >
      <motion.img
        src={src} alt={label}
        animate={{ scale: hov ? 1.07 : 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Overlay permanent bas */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(to top, rgba(3,32,31,0.88) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Overlay survol */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(160deg, ${GREEN}22 0%, rgba(3,32,31,0.55) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Texte */}
      <motion.div
        animate={{ y: hov ? 0 : 8, opacity: hov ? 1 : 0.85 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '18px 20px',
        }}
      >
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, fontWeight: 700, color: 'white',
          margin: '0 0 4px', lineHeight: 1.3,
        }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN_LIGHT, flexShrink: 0 }} />
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, color: `${GREEN_LIGHT}CC`,
            margin: 0,
          }}>{lieu}</p>
        </div>
      </motion.div>

      {/* Coin déco */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: 14, right: 14,
          width: 32, height: 32, borderRadius: '50%',
          background: `${GREEN}33`, border: `1px solid ${GREEN}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN_LIGHT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}

const NosRealisations = () => (
  <section id="realisations" style={{
    background: 'white',
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Glow déco */}
    <div style={{
      position: 'absolute', top: '-10%', left: '-5%', pointerEvents: 'none',
      width: '45%', height: '55%',
      background: `radial-gradient(ellipse, ${GREEN}09 0%, transparent 65%)`,
      filter: 'blur(80px)',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <Reveal className="mb-14">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Tag>Portfolio</Tag>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700, color: '#0d1f14',
              margin: '14px 0 0',
            }}>
              Nos{' '}
              <span style={{
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>réalisations</span>
            </h2>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: '#64748b',
            maxWidth: 360, lineHeight: 1.75, margin: 0,
          }}>
            Des projets concrets déployés sur l'ensemble du territoire national au service de la santé publique.
          </p>
        </div>
        <div style={{ width: 56, height: 3, borderRadius: 2, marginTop: 24, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
      </Reveal>

      {/* Bento grid */}
      <Reveal delay={0.05}>
        <div className="real-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr 1fr',
          gridTemplateRows: '280px 280px',
          gap: 14,
        }}>
          {/* Image 1 — grande, span 2 lignes */}
          <RealisationCard
            {...REALISATIONS[0]}
            style={{ gridRow: 'span 2' }}
          />
          {/* Images 2 & 3 — colonne 2 */}
          <RealisationCard {...REALISATIONS[1]} style={{}} />
          <RealisationCard {...REALISATIONS[2]} style={{}} />
          {/* Images 4 & 5 — colonne 3 */}
          <RealisationCard {...REALISATIONS[3]} style={{}} />
          <RealisationCard {...REALISATIONS[4]} style={{}} />
        </div>
      </Reveal>

      {/* Compteur */}
      <Reveal delay={0.15}>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48,
          marginTop: 52, paddingTop: 40,
          borderTop: `1px solid ${GREEN}18`,
          flexWrap: 'wrap',
        }}>
          {[
            { val: '6',  label: 'Centres de dialyse opérationnels' },
            { val: '5',  label: 'Centrales d\'oxygène installées' },
            { val: '300K+', label: 'Kits de dialyse fournis' },
          ].map(s => (
            <div key={s.val} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 700, margin: '0 0 6px',
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.val}</p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12, color: '#94a3b8',
                margin: 0, textTransform: 'uppercase',
                letterSpacing: '0.07em', fontWeight: 600,
              }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>

    <style>{`
      @media (max-width: 860px) {
        .real-grid {
          grid-template-columns: 1fr 1fr !important;
          grid-template-rows: repeat(3, 220px) !important;
        }
        .real-grid > :first-child { grid-row: span 1 !important; }
      }
      @media (max-width: 560px) {
        .real-grid {
          grid-template-columns: 1fr !important;
          grid-template-rows: repeat(5, 200px) !important;
        }
      }
    `}</style>
  </section>
)

// ─── PROJETS FUTURS ───────────────────────────────────────────────────────────
const PROJETS = [
  {
    icon: '🏗️',
    num: '01',
    status: 'En cours',
    statusColor: GREEN_LIGHT,
    annee: '2025 – 2026',
    title: 'Extension du réseau de dialyse',
    desc: 'Déploiement de 3 nouveaux centres d\'hémodialyse dans les CHR de Gaoua, Koudougou et Fada N\'Gourma pour couvrir l\'ensemble du territoire.',
  },
  {
    icon: '🎓',
    num: '02',
    status: 'Planifié',
    statusColor: '#F0D080',
    annee: '2026',
    title: 'Centre de formation biomédicale',
    desc: 'Création d\'un centre régional dédié à la formation continue des techniciens biomédicaux et des praticiens de santé au Burkina Faso.',
  },
  {
    icon: '💻',
    num: '03',
    status: 'En étude',
    statusColor: '#6DE8E0',
    annee: '2026 – 2027',
    title: 'Plateforme numérique santé',
    desc: 'Développement d\'une solution digitale de gestion des équipements, du suivi des patients et de la traçabilité des consommables médicaux.',
  },
  {
    icon: '🌍',
    num: '04',
    status: 'Planifié',
    statusColor: '#F0D080',
    annee: '2027',
    title: 'Expansion sous-régionale',
    desc: 'Extension des activités de Sibiri Bio Médical Services aux marchés voisins de la zone UEMOA : Côte d\'Ivoire, Mali et Niger.',
  },
]

const ProjetsFuturs = () => (
  <section style={{
    background: DARK,
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* BG glows */}
    <div style={{
      position: 'absolute', top: '-15%', right: '-8%', pointerEvents: 'none',
      width: '50%', height: '60%',
      background: `radial-gradient(ellipse, ${GREEN}0C 0%, transparent 65%)`,
      filter: 'blur(80px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-10%', left: '-5%', pointerEvents: 'none',
      width: '35%', height: '45%',
      background: `radial-gradient(ellipse, ${GREEN_LIGHT}08 0%, transparent 65%)`,
      filter: 'blur(70px)',
    }} />

    {/* Grille texture */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(rgba(0,169,157,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,169,157,0.04) 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

      {/* Header */}
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
            background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>futurs</span>
        </h2>
        <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
      </Reveal>

      {/* Cards grid */}
      <div className="projets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {PROJETS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -5, borderColor: `${GREEN}66` }}
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
              {/* Accent top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                opacity: 0.6,
              }} />

              {/* Watermark */}
              <div style={{
                position: 'absolute', top: 14, right: 22,
                fontSize: 72, fontWeight: 900,
                fontFamily: "'Playfair Display', serif",
                color: `${GREEN}10`, lineHeight: 1, userSelect: 'none',
              }}>{p.num}</div>

              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* Icon */}
                  <div style={{
                    width: 50, height: 50, borderRadius: 15, flexShrink: 0,
                    background: `${GREEN}1A`, border: `1px solid ${GREEN}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24,
                  }}>{p.icon}</div>

                  {/* Année */}
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em',
                  }}>{p.annee}</span>
                </div>

                {/* Badge statut */}
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

              {/* Titre */}
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 19, fontWeight: 700, color: 'white',
                margin: '0 0 12px', lineHeight: 1.3,
              }}>{p.title}</h3>

              {/* Séparateur */}
              <div style={{
                width: '100%', height: 1, marginBottom: 16,
                background: `linear-gradient(90deg, ${GREEN}33, transparent)`,
              }} />

              {/* Description */}
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

// ─── ATOUTS ───────────────────────────────────────────────────────────────────
const ATOUTS_ITEMS = [
  {
    icon: "🌍",
    num: "01",
    stat: "50+",
    title: "Marques partenaires mondiales",
    desc: "Collaboration avec plus de 50 marques internationales reconnues pour offrir les meilleures solutions en biomédicale et pharmaceutiques.",
    badge: "Référence mondiale",
  },
  {
    icon: "🔄",
    num: "02",
    stat: "Continue",
    title: "Formation du personnel",
    desc: "Formation continue de nos équipes et des praticiens de santé pour maintenir le plus haut niveau d'excellence.",
    badge: "Équipes & praticiens",
  },
  {
    icon: "🛠️",
    num: "03",
    stat: "24 / 7",
    title: "Service après-vente",
    desc: "SAV qualifié disponible 24h/24, 7j/7, 365 jours par an pour tous les équipements installés.",
    badge: "365 jours / an",
  },
  {
    icon: "🚀",
    num: "04",
    stat: "5+",
    title: "Présence régionale établie",
    desc: "Implantés dans plus de 5 pays d'Afrique de l'Ouest avec un réseau de distribution robuste et fiable pour servir les acteurs de santé.",
    badge: "UEMOA",
  },
]

const Atouts = () => (
  <section style={{
    background: 'white',
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Glows déco */}
    <div style={{
      position: 'absolute', top: '-15%', right: '-10%', pointerEvents: 'none',
      width: '50%', height: '70%',
      background: `radial-gradient(ellipse, ${GREEN}0A 0%, transparent 60%)`,
      filter: 'blur(90px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-10%', left: '-8%', pointerEvents: 'none',
      width: '40%', height: '50%',
      background: `radial-gradient(ellipse, ${GREEN_LIGHT}0A 0%, transparent 60%)`,
      filter: 'blur(80px)',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

      {/* Header splitté */}
      <Reveal className="mb-16">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Tag>Pourquoi nous choisir</Tag>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700, color: '#0d1f14',
              margin: '14px 0 0',
            }}>
              Nos{' '}
              <span style={{
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>atouts</span>
            </h2>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: '#64748b',
            maxWidth: 380, lineHeight: 1.75, margin: 0,
          }}>
            Une entreprise reconnue pour son professionnalisme et sa fiabilité dans le secteur biomédical au Burkina Faso.
          </p>
        </div>
        <div style={{
          width: 56, height: 3, borderRadius: 2, marginTop: 24,
          background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
        }} />
      </Reveal>

      {/* Grille de cards */}
      <div className="atouts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {ATOUTS_ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -7, boxShadow: `0 20px 56px ${GREEN}1E` }}
              transition={{ duration: 0.28 }}
              style={{
                borderRadius: 24,
                background: 'white',
                border: `1px solid ${GREEN}1E`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                position: 'relative',
                padding: '36px 28px 32px',
                cursor: 'default',
                height: '100%',
              }}
            >
              {/* Barre accent top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
              }} />

              {/* Numéro watermark */}
              <div style={{
                position: 'absolute', top: 10, right: 18,
                fontSize: 72, fontWeight: 900,
                fontFamily: "'Playfair Display', serif",
                color: `${GREEN}0C`, lineHeight: 1, userSelect: 'none',
              }}>{item.num}</div>

              {/* Icône */}
              <div style={{
                width: 52, height: 52, borderRadius: 15, marginBottom: 24,
                background: `linear-gradient(135deg, ${GREEN}22, ${GREEN_LIGHT}18)`,
                border: `1px solid ${GREEN}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>{item.icon}</div>

              {/* Stat principale */}
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.3rem, 2vw, 1.85rem)',
                fontWeight: 700, margin: '0 0 10px',
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.15,
              }}>{item.stat}</p>

              {/* Titre */}
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15, fontWeight: 700,
                color: '#0d1f14', margin: '0 0 10px',
              }}>{item.title}</h3>

              {/* Description */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: '#64748b',
                lineHeight: 1.68, margin: '0 0 22px',
              }}>{item.desc}</p>

              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 13px', borderRadius: 99,
                background: GREEN_PALE, border: `1px solid ${GREEN}33`,
                fontFamily: "'Inter', sans-serif",
                fontSize: 11, fontWeight: 700, color: GREEN,
                letterSpacing: '0.03em',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
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

// ─── ACTUALITÉ ────────────────────────────────────────────────────────────────
const ACTUS = [
  {
    date: 'Mars 2025',
    tag: 'Partenariat',
    title: 'Renouvellement du partenariat avec NIPRO',
    desc: 'Sibiri Bio Médical Services renouvelle et renforce son accord de distribution exclusive avec NIPRO pour les générateurs de dialyse au Burkina Faso.',
  },
  {
    date: 'Janvier 2025',
    tag: 'Inauguration',
    title: 'Ouverture du centre de dialyse — CHU Tengandogo',
    desc: 'Mise en service du 6ème centre d\'hémodialyse équipé par Sibiri Bio Médical, renforçant ainsi l\'accès aux soins dans la capitale.',
  },
  {
    date: 'Novembre 2024',
    tag: 'Installation',
    title: '5ème centrale d\'oxygène — CHU Souro Sanou',
    desc: 'Livraison et mise en service de la 5ème centrale PSA VPSA MIL\'S au CHU Souro Sanou de Bobo-Dioulasso, garantissant une autonomie complète en oxygène médical.',
  },
]

const Actualite = () => (
  <section id="actualite" style={{
    background: 'white',
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', bottom: '-10%', right: '-5%', pointerEvents: 'none',
      width: '45%', height: '55%',
      background: `radial-gradient(ellipse, ${GREEN}09 0%, transparent 65%)`,
      filter: 'blur(90px)',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal className="mb-14">
        <Tag>Actualité</Tag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700, color: '#0d1f14',
          margin: '14px 0 0',
        }}>
          Dernières{' '}
          <span style={{
            background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>nouvelles</span>
        </h2>
        <div style={{ width: 56, height: 3, borderRadius: 2, marginTop: 24, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ACTUS.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: 0,
                padding: '32px 0',
                borderBottom: `1px solid ${GREEN}16`,
                cursor: 'default',
                position: 'relative',
              }}
            >
              {/* Ligne accent gauche au hover */}
              <motion.div
                whileHover={{ scaleY: 1 }}
                initial={{ scaleY: 0 }}
                style={{
                  position: 'absolute', left: -24, top: 0, bottom: 0, width: 3,
                  background: `linear-gradient(180deg, ${GREEN}, ${GREEN_LIGHT})`,
                  borderRadius: 2, transformOrigin: 'top',
                }}
              />

              {/* Date + tag */}
              <div style={{ paddingTop: 4 }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12, color: '#94a3b8', margin: '0 0 8px',
                  fontWeight: 600, letterSpacing: '0.06em',
                }}>{a.date}</p>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px', borderRadius: 99,
                  background: `${GREEN}18`, border: `1px solid ${GREEN}33`,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10.5, fontWeight: 700, color: GREEN,
                  letterSpacing: '0.05em',
                }}>{a.tag}</span>
              </div>

              {/* Contenu */}
              <div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20, fontWeight: 700,
                  color: '#0d1f14', margin: '0 0 10px',
                }}>{a.title}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14, color: '#64748b',
                  lineHeight: 1.72, margin: 0, maxWidth: 640,
                }}>{a.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 640px) {
        .actu-row { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
)

// ─── FORMATION ────────────────────────────────────────────────────────────────
const FORMATIONS = [
  {
    icon: '🩺',
    duree: '3 jours',
    niveau: 'Praticiens',
    title: 'Hémodialyse clinique',
    desc: 'Formation théorique et pratique sur la prise en charge du patient dialysé : réglages, surveillance, complications.',
    public: 'Infirmier(e)s · Néphrologues',
  },
  {
    icon: '🔧',
    duree: '5 jours',
    niveau: 'Technique',
    title: 'Maintenance des générateurs NIPRO',
    desc: 'Entretien préventif et correctif, diagnostic de pannes, remplacement de pièces sur les générateurs de dialyse.',
    public: 'Techniciens biomédicaux',
  },
  {
    icon: '🫧',
    duree: '2 jours',
    niveau: 'Technique',
    title: 'Gestion des centrales d\'oxygène',
    desc: 'Surveillance opérationnelle, sécurité, maintenance des centrales PSA VPSA MIL\'S en conditions réelles.',
    public: 'Techniciens · Responsables SAV',
  },
  {
    icon: '📊',
    duree: '1 jour',
    niveau: 'Gestion',
    title: 'Traçabilité & gestion des stocks',
    desc: 'Bonnes pratiques de gestion des consommables médicaux, suivi des kits de dialyse et optimisation des stocks.',
    public: 'Gestionnaires · Pharmaciens',
  },
]

const Formation = () => (
  <section id="formation" style={{
    background: DARK,
    padding: '100px 40px 120px',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '-10%', left: '-5%', pointerEvents: 'none',
      width: '45%', height: '55%',
      background: `radial-gradient(ellipse, ${GREEN}0C 0%, transparent 65%)`,
      filter: 'blur(80px)',
    }} />
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(rgba(0,169,157,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,169,157,0.04) 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
    }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

      <Reveal className="mb-14">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Tag light>Renforcement des capacités</Tag>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700, color: 'white',
              margin: '14px 0 0',
            }}>
              Nos{' '}
              <span style={{
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>formations</span>
            </h2>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.45)',
            maxWidth: 340, lineHeight: 1.75, margin: 0,
          }}>
            Des programmes adaptés aux besoins des équipes médicales et techniques du secteur de la santé.
          </p>
        </div>
        <div style={{ width: 56, height: 3, borderRadius: 2, marginTop: 24, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
      </Reveal>

      <div className="formation-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {FORMATIONS.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -5, borderColor: `${GREEN}55` }}
              transition={{ duration: 0.28 }}
              style={{
                borderRadius: 22,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                padding: '32px 28px',
                position: 'relative', overflow: 'hidden',
                cursor: 'default', height: '100%',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
                opacity: 0.55,
              }} />

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${GREEN}1A`, border: `1px solid ${GREEN}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{f.icon}</div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 99,
                    background: `${GREEN}1A`, border: `1px solid ${GREEN}33`,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10.5, fontWeight: 700, color: GREEN_LIGHT,
                  }}>{f.duree}</span>
                  <span style={{
                    padding: '3px 10px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                  }}>{f.niveau}</span>
                </div>
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18, fontWeight: 700, color: 'white',
                margin: '0 0 10px',
              }}>{f.title}</h3>

              <div style={{ width: '100%', height: 1, marginBottom: 14, background: `linear-gradient(90deg, ${GREEN}33, transparent)` }} />

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13.5, color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7, margin: '0 0 20px',
              }}>{f.desc}</p>

              {/* Public cible */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
                }}>Public :</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12, fontWeight: 600,
                  color: `${GREEN}CC`,
                }}>{f.public}</span>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.25}>
        <div style={{
          marginTop: 56, padding: '40px 48px', borderRadius: 24,
          background: `linear-gradient(135deg, ${GREEN}18 0%, rgba(255,255,255,0.03) 100%)`,
          border: `1px solid ${GREEN}33`,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700, color: 'white',
              margin: '0 0 8px',
            }}>Intéressé par une formation ?</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, color: 'rgba(255,255,255,0.48)',
              margin: 0,
            }}>Contactez-nous pour planifier une session sur mesure pour votre équipe.</p>
          </div>
          <a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 99, textDecoration: 'none',
              background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`,
              color: 'white', fontFamily: "'Inter', sans-serif",
              fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
              boxShadow: `0 8px 28px ${GREEN}44`,
            }}
          >
            Nous contacter →
          </a>
        </div>
      </Reveal>
    </div>

    <style>{`
      @media (max-width: 860px) { .formation-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
)

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-16 px-6" style={{ background: `linear-gradient(135deg, ${DARK}, #1a3a22)` }}>
    <div className="max-w-3xl mx-auto text-center">
      <Reveal>
        <span className="text-3xl">📍</span>
        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Nous contacter</h2>
        <div className="w-12 h-0.5 mx-auto mt-3 mb-8" style={{ background: GREEN_LIGHT }} />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid sm:grid-cols-3 gap-4 text-left">
          {[
            { icon: "📍", label: "Adresse",    value: "Ouaga 2000 zone C, Bd Mouammar Kadhafi, Burkina Faso" },
            { icon: "📞", label: "Téléphone",  value: "+ 226 25 37 69 49" },
            { icon: "✉️", label: "Emails",     value: "secretariatbiomed@sibiri.group\nlamine.ouedraogo@sibiri.group" },
          ].map(c => (
            <div key={c.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="text-xl">{c.icon}</span>
              <p className="text-xs text-slate-400 mt-2 mb-1 uppercase tracking-wider font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{c.label}</p>
              <p className="text-sm text-white whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif" }}>{c.value}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.2} className="mt-8">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3" style={{ color: "#6DE8E0", fontFamily: "'Inter', sans-serif" }}>
          <IconArrowLeft size={14} /> Retour au Groupe SIBIRI
        </a>
      </Reveal>
    </div>
  </section>
)

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────
// ─── Carousel Banner ─────────────────────────────────────────────────────────
const CAROUSEL_IMGS = [
  '/medical/microscope-black-man-scientist-laboratory-260nw-2614183693.webp',
  '/medical/science-research-black-man-test-260nw-2269473963.webp',
  '/medical/scientist-black-woman-beaker-microscope-600nw-2555614553.webp',
]

const MedicalCarouselBanner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % CAROUSEL_IMGS.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>

      {/* ── Images en carrousel crossfade ── */}
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={CAROUSEL_IMGS[current]}
          alt={`Sibiri Bio Medical ${current + 1}`}
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

      {/* ── Overlay dark teal dégradé (= première bannière) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(
          135deg,
          rgba(3,32,31,0.88) 0%,
          rgba(3,32,31,0.72) 50%,
          rgba(0,60,55,0.60) 100%
        )`,
      }} />

      {/* ── Grille texture ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: `linear-gradient(rgba(0,169,157,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,169,157,0.06) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }} />

      {/* ── Glow ambiant gauche animé ── */}
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: '50%', height: '70%',
          background: `radial-gradient(ellipse, ${GREEN}55 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Contenu texte ── */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 820, margin: '0 auto' }}>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 28 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 18px', borderRadius: 99,
            background: `${GREEN}20`, border: `1px solid ${GREEN}55`,
            fontFamily: "'Inter', sans-serif",
            fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: `${GREEN}EE`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
            Sibiri Bio Medical Services
          </span>
        </motion.div>

        {/* Titre */}
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
          Excellence médicale,<br />
          <span style={{
            background: `linear-gradient(90deg, ${GREEN} 0%, ${GREEN_LIGHT} 60%, ${GREEN} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            au service de la santé africaine
          </span>
        </motion.h2>

        {/* Sous-titre */}
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
          Importation, distribution et maintenance d'équipements biomédicaux —
          agréée A1 à B4 par le Ministère de la Santé.
        </motion.p>

        {/* Indicateurs dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 10 }}
        >
          {CAROUSEL_IMGS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 28 : 8,
                height: 8, borderRadius: 99, border: 'none', cursor: 'pointer',
                background: i === current ? GREEN : 'rgba(255,255,255,0.28)',
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

export const MedicalPage = () => (
  <div className="w-full">
    <MedicalNav />
    <MedicalTailarkHeroSection />
    <Presentation />
    <MissionVision />
    <Services />
    <Atouts />
    <NeoMinimalFooter variant="medical" />
  </div>
)
