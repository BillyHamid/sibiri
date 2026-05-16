import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A84C'
const DARK = '#1D1D1B'

// ── Palettes par niveau ──────────────────────────────────────────────────────
const L = {
  1: { border: '#C9A84C', glow: 'rgba(201,168,76,0.45)', bg: 'rgba(201,168,76,0.09)', tag: '#92720F' },
  2: { border: 'rgba(201,168,76,0.75)', glow: 'rgba(201,168,76,0.28)', bg: 'rgba(201,168,76,0.05)', tag: '#7a6012' },
  3: { border: 'rgba(201,168,76,0.50)', glow: 'rgba(201,168,76,0.18)', bg: 'rgba(201,168,76,0.03)', tag: '#6b5510' },
  4: { border: 'rgba(201,168,76,0.32)', glow: 'rgba(201,168,76,0.12)', bg: 'transparent', tag: '#5a4a0e' },
}

// ── Carte ────────────────────────────────────────────────────────────────────
const Card = ({ title, role, level = 2, delay = 0, dashed = false, icon = '👤', wide = false }) => {
  const [hov, setHov] = useState(false)
  const lv = L[level]

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: 'default',
        borderRadius: 18,
        background: hov ? `rgba(201,168,76,0.10)` : lv.bg,
        border: `${level === 1 ? 2 : 1.5}px ${dashed ? 'dashed' : 'solid'} ${hov ? GOLD : lv.border}`,
        boxShadow: hov
          ? `0 20px 56px -8px ${lv.glow}, 0 4px 16px rgba(0,0,0,0.07)`
          : `0 2px 14px rgba(0,0,0,0.05)`,
        padding: level === 1 ? '22px 32px' : level === 4 ? '12px 16px' : '16px 22px',
        width: level === 1 ? 260 : level === 4 ? 110 : wide ? 230 : 210,
        minHeight: level === 1 ? 108 : level === 4 ? 72 : 88,
        display: 'flex',
        flexDirection: 'column',
        alignItems: level === 4 ? 'center' : 'flex-start',
        gap: level === 4 ? 4 : 8,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateY(-4px) scale(1.025)' : 'translateY(0) scale(1)',
        textAlign: level === 4 ? 'center' : 'left',
        flexShrink: 0,
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Accent top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: level === 1 ? 3 : 2,
        background: hov
          ? `linear-gradient(90deg, ${GOLD}, ${GOLD}80, ${GOLD}30)`
          : `linear-gradient(90deg, ${lv.border}, transparent)`,
        transition: 'all 0.3s ease',
        borderRadius: '18px 18px 0 0',
      }} />

      {/* Shine hover */}
      {hov && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          borderRadius: 18,
        }} />
      )}


      {/* Titre */}
      <div>
        <p style={{
          margin: 0,
          fontSize: level === 1 ? 15 : level === 4 ? 10 : 12.5,
          fontWeight: 700,
          color: level === 1 ? GOLD : DARK,
          fontFamily: level === 1 ? "'Playfair Display', serif" : "'Inter', sans-serif",
          lineHeight: 1.3,
        }}>{title}</p>

        {/* Sous-label niveau 4 */}
        {level === 4 && role && (
          <p style={{
            margin: '2px 0 0',
            fontSize: 9.5,
            fontWeight: 700,
            color: GOLD,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.04em',
          }}>{role}</p>
        )}
      </div>

      {/* Badge rôle */}
      {level !== 4 && role && (
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: lv.tag,
          fontFamily: "'Inter', sans-serif",
          background: `${GOLD}14`,
          border: `1px solid ${GOLD}22`,
          padding: '2px 8px',
          borderRadius: 99,
        }}>{role}</span>
      )}
    </motion.div>
  )
}

// ── Connecteur vertical ──────────────────────────────────────────────────────
const VLine = ({ h = 32, dashed = false, delay = 0 }) => (
  <motion.div
    initial={{ scaleY: 0, opacity: 0 }}
    whileInView={{ scaleY: 1, opacity: 1 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    style={{
      width: 2,
      height: h,
      background: dashed ? 'transparent' : `linear-gradient(to bottom, ${GOLD}80, ${GOLD}30)`,
      borderLeft: dashed ? `2px dashed rgba(201,168,76,0.45)` : 'none',
      margin: '0 auto',
      transformOrigin: 'top',
      flexShrink: 0,
    }}
  />
)

// ── Barre horizontale de branchement ────────────────────────────────────────
const HBar = ({ delay = 0 }) => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    style={{
      height: 2,
      background: `linear-gradient(90deg, ${GOLD}20, ${GOLD}80, ${GOLD}20)`,
      borderRadius: 99,
      transformOrigin: 'center',
      width: '100%',
    }}
  />
)

// ── Ligne pointillée horizontale ─────────────────────────────────────────────
const DashH = ({ side = 'left', delay = 0 }) => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    style={{
      flex: 1,
      height: 2,
      borderTop: `2px dashed rgba(201,168,76,0.40)`,
      transformOrigin: side === 'left' ? 'right' : 'left',
      alignSelf: 'center',
      margin: '0 10px',
      minWidth: 40,
    }}
  />
)

// ── Organigramme ─────────────────────────────────────────────────────────────
export const OrgChart = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const DAF = [
    { title: 'DAF 1', role: 'SH'   },
    { title: 'DAF 2', role: 'SBMS' },
    { title: 'DAF 3', role: 'SE'   },
    { title: 'DAF 4', role: 'STL'  },
    { title: 'DAF 5', role: 'SGCR' },
  ]

  return (
    <section style={{
      background: 'linear-gradient(160deg, #faf8f3 0%, #fff 55%, #faf8f3 100%)',
      padding: '100px 0 112px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Grille de points déco */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        opacity: 0.5,
      }} />

      {/* Halos */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 400,
        background: `radial-gradient(ellipse, rgba(201,168,76,0.09), transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 68 }}
        >
          <p style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.34em',
            textTransform: 'uppercase', color: 'rgba(201,168,76,0.9)',
            fontFamily: "'Inter', sans-serif", margin: '0 0 14px',
          }}>Gouvernance</p>

          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700,
            color: DARK, margin: '0 0 14px',
            fontFamily: "'Playfair Display', serif", lineHeight: 1.15,
          }}>Organigramme Hiérarchique</h2>

          <p style={{
            fontSize: 14.5, color: '#9ca3af', maxWidth: 440,
            margin: '0 auto', lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          }}>
            Structure organisationnelle de SIBIRI Holding, reflet de
            notre engagement pour une gouvernance rigoureuse.
          </p>

          <div style={{
            width: 48, height: 2,
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
            margin: '20px auto 0', borderRadius: 99,
          }} />
        </motion.div>

        {/* ══════════════════ ARBRE ═══════════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          {/* ── Niveau 1 ─────────────────────────────────────────────── */}
          <Card title="Administrateur Général" role="Direction Générale" level={1} icon="👑" delay={0.1} />
          <VLine h={36} delay={0.3} />

          {/* ── Niveau 2 : Conseillers ↔ Secrétaire Général ─────────── */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 900, gap: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.38 }}
              style={{ display: 'flex', alignItems: 'center', flex: 1 }}
            >
              <Card title="Conseiller Spécial" role="Conseil" level={2} icon="🎯" delay={0.38} dashed />
              <DashH side="left" delay={0.52} />
            </motion.div>

            <Card title="Secrétaire Général" role="Secrétariat Général" level={2} icon="🏛️" delay={0.42} />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.38 }}
              style={{ display: 'flex', alignItems: 'center', flex: 1 }}
            >
              <DashH side="right" delay={0.52} />
              <Card title="Conseillère Spéciale" role="Conseil" level={2} icon="🎯" delay={0.38} dashed />
            </motion.div>
          </div>

          <VLine h={36} delay={0.6} />

          {/* ── Connecteur 3 branches ─────────────────────────────────── */}
          <div style={{ width: '80%', maxWidth: 720 }}>
            <HBar delay={0.65} />
          </div>

          {/* ── Niveau 3 : 3 managers ────────────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 20,
            width: '100%',
            maxWidth: 840,
            alignItems: 'start',
          }}>

            {/* ── Col 1 : Contrôleur ─────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <VLine h={28} delay={0.7} />
              <Card title="Contrôleur Général et Financier" role="Finance & Contrôle" level={3} icon="📊" delay={0.75} wide />
              <VLine h={20} dashed delay={0.9} />

              {/* Connecteur DAF */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.95 }}
                style={{
                  width: '95%', height: 2,
                  borderTop: '2px dashed rgba(201,168,76,0.40)',
                  transformOrigin: 'center',
                }}
              />

              {/* Descentes vers DAF */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.0 }}
                style={{
                  width: '95%', display: 'flex',
                  justifyContent: 'space-between',
                  position: 'relative', height: 20,
                }}
              >
                {DAF.map((_, i) => (
                  <div key={i} style={{
                    width: 2, height: 20,
                    borderLeft: '2px dashed rgba(201,168,76,0.40)',
                  }} />
                ))}
              </motion.div>

              {/* 5 DAF */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap', justifyContent: 'center' }}>
                {DAF.map(({ title, role }, i) => (
                  <Card key={title} title={title} role={role} level={4} delay={1.05 + i * 0.07} />
                ))}
              </div>
            </div>

            {/* ── Col 2 : Responsable Juridique ──────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <VLine h={28} delay={0.72} />
              <Card title="Responsable Juridique et RH" role="Juridique & RH" level={3} icon="⚖️" delay={0.77} wide />
            </div>

            {/* ── Col 3 : Assistante de Direction ────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <VLine h={28} delay={0.74} />
              <Card title="Assistante de Direction" role="Direction" level={3} icon="📋" delay={0.79} wide />
              <VLine h={28} delay={0.93} />
              <Card title="Secrétaire" role="Secrétariat" level={3} icon="✉️" delay={0.99} />
              <VLine h={28} delay={1.1} />
              <Card title="Agent de liaison" role="Coordination" level={3} icon="🔗" delay={1.16} />
            </div>

          </div>
        </div>
        {/* ═══════════════════════════════════════════════════════════════════ */}

        {/* Légende */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex', gap: 32, justifyContent: 'center',
            marginTop: 56, flexWrap: 'wrap', alignItems: 'center',
          }}
        >
          {[
            { style: 'solid',  label: 'Lien hiérarchique direct', color: `${GOLD}90` },
            { style: 'dashed', label: 'Lien fonctionnel / conseil', color: `rgba(201,168,76,0.50)` },
          ].map(({ style, label, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 2,
                borderTop: `2px ${style} ${color}`,
              }} />
              <span style={{
                fontSize: 11.5, color: '#9ca3af',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}>{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
