import { motion } from 'framer-motion'

const FILIALES = [
  { name: 'Medical', logo: '/Sibiri-Medical.jpg', color: '#00A99D', glowColor: 'rgba(0, 169, 157, 0.3)' },
  { name: 'Energy', logo: '/Sibiri-Energy.png', color: '#E62630', glowColor: 'rgba(230, 38, 48, 0.3)' },
  { name: 'Construction', logo: '/Sibiri-Construction.jpg', color: '#A64D42', glowColor: 'rgba(166, 77, 66, 0.3)' },
  { name: 'Transport', logo: '/Sibiri-Transport.png', color: '#0ea5e9', glowColor: 'rgba(14, 165, 233, 0.3)' },
  { name: 'Agro', logo: '/Sibiri-Agro.png', color: '#1f9d55', glowColor: 'rgba(31, 157, 85, 0.3)' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const LogosTransition = () => {
  return (
    <div style={{
      background: '#ffffff',
      padding: '60px 40px 50px',
      marginTop: '-100px',
      position: 'relative',
      zIndex: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
      flexWrap: 'wrap',
      gap: '40px',
    }}>
      {/* Background gradient accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(201, 168, 76, 0.05) 0%, transparent 50%, rgba(201, 168, 76, 0.05) 100%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 40,
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {FILIALES.map((filiale) => (
          <motion.div
            key={filiale.name}
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
              y: -8,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            {/* Glow background */}
            <div
              style={{
                position: 'absolute',
                inset: -15,
                background: filiale.glowColor,
                borderRadius: '16px',
                filter: 'blur(20px)',
                opacity: 0,
                zIndex: -1,
              }}
              className="glow-bg"
            />

            {/* Main container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 90,
                aspectRatio: '3/2',
                padding: '16px 24px',
                background: 'rgba(255, 255, 255, 0.6)',
                border: `1.5px solid ${filiale.color}22`,
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)'
                e.currentTarget.style.borderColor = filiale.color + '44'
                e.currentTarget.style.boxShadow = `0 12px 40px ${filiale.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.8)`
                e.currentTarget.parentElement.querySelector('.glow-bg').style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)'
                e.currentTarget.style.borderColor = filiale.color + '22'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                e.currentTarget.parentElement.querySelector('.glow-bg').style.opacity = '0'
              }}
            >
              <img
                src={filiale.logo}
                alt={filiale.name}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.05))',
                }}
                onError={(e) => {
                  e.target.style.opacity = '0.5'
                }}
              />
            </div>

            {/* Filiale name label */}
            <motion.div
              style={{
                marginTop: '12px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: filiale.color,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: 0.7,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
            >
              {filiale.name}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
