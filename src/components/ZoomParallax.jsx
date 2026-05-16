import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const POSITIONS = [
  { h: '25vh', w: '25vw', top: '0',       left: '0'       }, // 0 : centre
  { h: '30vh', w: '35vw', top: '-30vh',   left: '5vw'     }, // 1
  { h: '45vh', w: '20vw', top: '-10vh',   left: '-25vw'   }, // 2
  { h: '25vh', w: '25vw', top: '0',       left: '27.5vw'  }, // 3
  { h: '25vh', w: '20vw', top: '27.5vh',  left: '5vw'     }, // 4
  { h: '25vh', w: '30vw', top: '27.5vh',  left: '-22.5vw' }, // 5
  { h: '15vh', w: '15vw', top: '22.5vh',  left: '25vw'    }, // 6
]

export function ZoomParallax({ images }) {
  const container = useRef(null)

  const { scrollYProgress: rawProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  // Spring pour lisser le parallax
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 400,
    damping: 90,
    restDelta: 0.001,
  })

  // Tous les hooks au niveau racine — pas de map()
  const scale4  = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5  = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6  = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale5b = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6b = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8  = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9  = useTransform(scrollYProgress, [0, 1], [1, 9])

  const scales = [scale4, scale5, scale6, scale5b, scale6b, scale8, scale9]

  return (
    <div ref={container} style={{ position: 'relative', height: '200vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {images.slice(0, 7).map(({ src, alt }, i) => {
          const pos = POSITIONS[i] || POSITIONS[0]
          return (
            <motion.div
              key={i}
              style={{
                scale: scales[i],
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                position: 'relative',
                height: pos.h,
                width: pos.w,
                top: pos.top,
                left: pos.left,
                overflow: 'hidden',
              }}>
                <img
                  src={src}
                  alt={alt || `Image médicale ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
