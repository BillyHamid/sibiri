import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const GOLD  = '#C9A84C'
const GOLDF = 'rgba(201,168,76,'

const PARAGRAPHS_SHORT = [
  `C'est avec une grande fierté que je prends la parole au nom du Groupe Sibiri Holding, une organisation bâtie sur une histoire forte, portée par une ambition claire et guidée par des valeurs solides.`,
  `Notre vision est sans équivoque : faire du Groupe Sibiri Holding un acteur économique de référence en Afrique. Nous aspirons à être reconnus non seulement pour la qualité de nos réalisations, mais aussi pour la fiabilité de nos engagements et notre contribution concrète au développement de nos économies.`,
  `Cette vision s'incarne au quotidien à travers notre mission : concevoir, développer et piloter des activités performantes dans des secteurs stratégiques, tout en créant une valeur durable pour nos partenaires, nos clients et les États dans lesquels nous opérons.`,
]

const PARAGRAPHS_FULL = [
  `Nous ne nous contentons pas d'investir ; nous structurons, nous accompagnons, et nous bâtissons des projets qui s'inscrivent dans la durée.`,
  `Mais au-delà des performances économiques, ce sont nos valeurs qui définissent véritablement notre identité. Nous plaçons l'intégrité au cœur de chacune de nos actions, en veillant au respect strict de nos engagements et des normes qui encadrent nos activités.`,
  `Nous poursuivons l'excellence, avec une exigence constante de qualité et de professionnalisme dans tout ce que nous entreprenons. Notre engagement se traduit par une implication totale de nos équipes et une culture orientée vers les résultats.`,
  `Dans un environnement en constante évolution, nous restons résolument tournés vers l'avenir, avec la volonté de consolider notre position, d'élargir notre présence et de contribuer activement à la transformation économique de notre région.`,
  `Je tiens à remercier l'ensemble de nos partenaires et collaborateurs pour leur confiance et leur engagement, qui sont les véritables moteurs de notre réussite collective.`,
]

const VALUES = [
  { label: 'Intégrité',   icon: '⚖️' },
  { label: 'Excellence',  icon: '🏆' },
  { label: 'Engagement',  icon: '🤝' },
  { label: 'Respect',     icon: '🌿' },
]

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

// ── Composant principal ───────────────────────────────────────────────────────
export const PresidentMessage = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState(false)

  return (
    <section style={{
      background: '#08080f',
      position: 'relative',
      overflow: 'hidden',
      padding: '108px 0 120px',
    }}>

      {/* ── Halos de fond ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: 600, height: 600,
        background: `radial-gradient(circle, ${GOLDF}0.07), transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 500, height: 500,
        background: `radial-gradient(circle, ${GOLDF}0.05), transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Grille de points */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${GOLDF}0.12) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.35,
      }} />

      <div ref={ref} style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

        {/* ── Header centré ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <p style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.34em',
            textTransform: 'uppercase', color: `${GOLDF}0.85)`,
            fontFamily: "'Inter', sans-serif", margin: '0 0 14px',
          }}>Gouvernance</p>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700,
            color: '#ffffff', margin: '0 0 14px',
            fontFamily: "'Playfair Display', serif", lineHeight: 1.12,
          }}>
            Mot du{' '}
            <span style={{
              background: `linear-gradient(135deg, ${GOLD}, #F5DFA0)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Président</span>
          </h2>

          <div style={{
            width: 56, height: 2,
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            margin: '0 auto', borderRadius: 99,
          }} />
        </motion.div>

        {/* ── Layout 2 colonnes ──────────────────────────────────────────────── */}
        <div className="president-layout">

          {/* ══ Colonne gauche : Photo ══════════════════════════════════════════ */}
          <motion.div {...fadeLeft(0.15)} className="president-photo-col">

            {/* Cadre photo */}
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>

              {/* Déco : carré doré en haut à gauche */}
              <motion.div
                {...fadeLeft(0.05)}
                style={{
                  position: 'absolute', top: -18, left: -18, zIndex: 0,
                  width: 80, height: 80,
                  border: `2px solid ${GOLDF}0.35)`,
                  borderRadius: 6,
                }}
              />
              {/* Déco : carré doré en bas à droite */}
              <motion.div
                {...fadeRight(0.1)}
                style={{
                  position: 'absolute', bottom: 70, right: -18, zIndex: 0,
                  width: 56, height: 56,
                  border: `2px solid ${GOLDF}0.25)`,
                  borderRadius: 6,
                }}
              />

              {/* Photo principale */}
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: 24,
                overflow: 'hidden',
                border: `2px solid ${GOLDF}0.35)`,
                boxShadow: `0 32px 80px -16px rgba(0,0,0,0.8), 0 0 0 1px ${GOLDF}0.15)`,
                aspectRatio: '3/4',
                maxWidth: 400,
                width: '100%',
                margin: '0 auto',
              }}>
                <img
                  src="/presi.jpg"
                  alt="Administrateur Général — SIBIRI Holding"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    filter: 'contrast(1.04) brightness(0.96)',
                  }}
                />

                {/* Dégradé bas */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '42%',
                  background: 'linear-gradient(to top, rgba(8,8,15,0.92) 0%, rgba(8,8,15,0.5) 55%, transparent 100%)',
                }} />

                {/* Badge nom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '24px 24px 26px',
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: 18, fontWeight: 700,
                    color: '#ffffff',
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1.2,
                  }}>Administrateur Général</p>
                  <div style={{
                    width: 36, height: 2, borderRadius: 99,
                    background: GOLD,
                    margin: '8px 0 6px',
                  }} />
                  <p style={{
                    margin: 0, fontSize: 11,
                    color: `${GOLDF}0.85)`,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>SIBIRI Holding</p>
                </div>
              </div>

              {/* Badge flottant "Depuis 2009" */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  position: 'absolute', top: 28, right: -16, zIndex: 10,
                  background: `linear-gradient(135deg, ${GOLD}, #F5DFA0)`,
                  borderRadius: 14,
                  padding: '10px 18px',
                  boxShadow: `0 8px 28px ${GOLDF}0.45)`,
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1D1D1B', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>15+</p>
                <p style={{ margin: '2px 0 0', fontSize: 9, fontWeight: 700, color: '#5a3e00', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Ans d'expérience</p>
              </motion.div>
            </div>
          </motion.div>

          {/* ══ Colonne droite : Message ════════════════════════════════════════ */}
          <div className="president-text-col">

            {/* Grand guillemet décoratif */}
            <motion.div
              {...fadeRight(0.2)}
              style={{
                fontSize: 140, lineHeight: 1,
                color: `${GOLDF}0.15)`,
                fontFamily: "'Playfair Display', serif",
                userSelect: 'none',
                marginBottom: -28,
                marginLeft: -8,
              }}
            >"</motion.div>

            {/* Salutation */}
            <motion.p {...fadeRight(0.25)} style={{
              fontSize: 13, fontStyle: 'italic',
              color: `${GOLDF}0.70)`,
              fontFamily: "'Playfair Display', serif",
              margin: '0 0 24px',
              lineHeight: 1.6,
            }}>
              Mesdames et Messieurs,<br />
              Chers partenaires, chers collaborateurs,
            </motion.p>

            {/* Paragraphes principaux */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {PARAGRAPHS_SHORT.map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeRight(0.3 + i * 0.08)}
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.85,
                    color: 'rgba(220,220,230,0.82)',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                  }}
                >{p}</motion.p>
              ))}

              {/* Paragraphes supplémentaires */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 18 }}
                  >
                    {PARAGRAPHS_FULL.map((p, i) => (
                      <p key={i} style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.85,
                        color: 'rgba(220,220,230,0.82)',
                        fontFamily: "'Inter', sans-serif",
                      }}>{p}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bouton lire la suite */}
            <motion.button
              {...fadeRight(0.55)}
              onClick={() => setExpanded(v => !v)}
              style={{
                marginTop: 20,
                background: 'transparent',
                border: `1px solid ${GOLDF}0.38)`,
                borderRadius: 99,
                padding: '9px 22px',
                color: GOLD,
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 7,
                transition: 'all 0.25s ease',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${GOLDF}0.10)`
                e.currentTarget.style.borderColor = `${GOLDF}0.65)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = `${GOLDF}0.38)`
              }}
            >
              {expanded ? 'Réduire' : 'Lire le message complet'}
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
              >
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Séparateur */}
            <motion.div
              {...fadeRight(0.6)}
              style={{
                margin: '32px 0 28px',
                height: 1,
                background: `linear-gradient(90deg, ${GOLDF}0.40), transparent)`,
              }}
            />

            {/* Valeurs */}
            <motion.div {...fadeRight(0.65)}>
              <p style={{
                fontSize: 9.5, fontWeight: 800, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: `${GOLDF}0.55)`,
                fontFamily: "'Inter', sans-serif", margin: '0 0 14px',
              }}>Nos valeurs fondamentales</p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {VALUES.map(({ label, icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.68 + i * 0.07 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '7px 16px',
                      borderRadius: 99,
                      border: `1px solid ${GOLDF}0.28)`,
                      background: `${GOLDF}0.07)`,
                      fontSize: 12, fontWeight: 600,
                      color: 'rgba(240,230,200,0.88)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{icon}</span>
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Signature */}
            <motion.div
              {...fadeRight(0.75)}
              style={{
                marginTop: 36,
                display: 'flex', alignItems: 'center', gap: 16,
              }}
            >
              <div style={{
                width: 48, height: 48,
                borderRadius: 12,
                overflow: 'hidden',
                border: `2px solid ${GOLDF}0.40)`,
                flexShrink: 0,
              }}>
                <img
                  src="/presi.jpg"
                  alt="Président"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontSize: 15, fontWeight: 700,
                  color: '#ffffff',
                  fontFamily: "'Playfair Display', serif",
                }}>Administrateur Général</p>
                <p style={{
                  margin: '3px 0 0',
                  fontSize: 11, color: `${GOLDF}0.70)`,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>SIBIRI Holding</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`
        .president-layout {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 80px;
          align-items: start;
        }
        .president-photo-col { position: relative; }
        .president-text-col  { padding-top: 8px; }

        @media (max-width: 960px) {
          .president-layout {
            grid-template-columns: 1fr;
            gap: 52px;
          }
          .president-photo-col {
            max-width: 380px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
