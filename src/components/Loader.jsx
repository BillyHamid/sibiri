import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GOLD   = '#C9A84C'
const GOLD_L = '#F0D080'
const GOLD_D = '#A07830'

export const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [leaving,  setLeaving]  = useState(false)

  // ── Progression simulée ──────────────────────────────────────────────────
  useEffect(() => {
    let val = 0
    const tick = () => {
      // Accélère au début, ralentit vers 90%, puis saute à 100%
      const step = val < 60 ? Math.random() * 14 + 4
                 : val < 88 ? Math.random() * 5  + 1.5
                 :            0
      val = Math.min(val + step, 90)
      setProgress(val)
      if (val < 90) setTimeout(tick, 120)
    }
    tick()

    // Forcer 100% après 2.2s puis déclencher l'animation de sortie
    const finish = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setLeaving(true), 340)
    }, 2200)

    return () => clearTimeout(finish)
  }, [onDone])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#06050a',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {/* ── Glow ambiant pulsant ── */}
          <motion.div
            animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 420, height: 420,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${GOLD}2E 0%, transparent 68%)`,
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Second halo plus étroit, décalé ── */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{
              position: 'absolute',
              width: 240, height: 240,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${GOLD_L}28 0%, transparent 70%)`,
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Logo wrapper (shimmer inclus) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.78, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
            style={{ position: 'relative', zIndex: 1, marginBottom: 36 }}
          >
            <img
              src="/logo.png"
              alt="SIBIRI GROUP"
              style={{ width: 110, height: 'auto', display: 'block' }}
            />

            {/* Shimmer sweep */}
            <motion.div
              initial={{ x: '-130%' }}
              animate={{ x: '230%' }}
              transition={{ duration: 1.4, delay: 0.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 }}
              style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(105deg, transparent 30%, ${GOLD_L}55 50%, transparent 70%)`,
                borderRadius: 4,
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* ── Nom du groupe ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              position: 'relative', zIndex: 1,
              fontFamily: "'Inter', sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: `${GOLD}99`,
              margin: '0 0 48px',
            }}
          >
            SIBIRI&nbsp;&nbsp;GROUP
          </motion.p>

          {/* ── Barre de progression ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'relative', zIndex: 1,
              width: 200,
            }}
          >
            {/* Track */}
            <div style={{
              width: '100%', height: 1,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 1, overflow: 'hidden',
            }}>
              {/* Fill */}
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  borderRadius: 1,
                  background: `linear-gradient(90deg, ${GOLD_D}, ${GOLD}, ${GOLD_L})`,
                  boxShadow: `0 0 8px ${GOLD}88`,
                }}
              />
            </div>

            {/* Pourcentage */}
            <motion.p
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10, fontWeight: 600,
                color: `${GOLD}66`,
                letterSpacing: '0.12em',
                textAlign: 'right',
                margin: '8px 0 0',
              }}
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>

          {/* ── Traits déco latéraux ── */}
          {[{ left: 40 }, { right: 40 }].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.7 + i * 0.1 }}
              style={{
                position: 'absolute', bottom: 48, ...pos,
                width: 80, height: 1,
                background: `linear-gradient(${i === 0 ? '90deg' : '270deg'}, ${GOLD}55, transparent)`,
                transformOrigin: i === 0 ? 'left' : 'right',
              }}
            />
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  )
}
