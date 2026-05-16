import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const GOLD = "#C9A84C"

// ─── Mot individuel ───────────────────────────────────────────────────────────
const Word = ({ children, progress, range, highlight }) => {
  const opacity = useTransform(progress, range, [0, 1])
  const style = highlight
    ? { opacity, color: GOLD, fontWeight: 600 }
    : { opacity }

  return (
    <span className="relative mt-3 mr-1">
      {/* Ghost — toujours visible en opacité basse */}
      <span
        className="absolute opacity-20"
        style={highlight ? { color: GOLD, fontWeight: 600 } : {}}
      >
        {children}
      </span>
      {/* Mot animé */}
      <motion.span style={style}>{children}</motion.span>
    </span>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────
// highlightWords : Set ou Array de mots à colorer en or
export const MagicText = ({ text, className = "", highlightWords = [] }) => {
  const container = useRef(null)
  const highlightSet = new Set(
    Array.isArray(highlightWords) ? highlightWords : [...highlightWords]
  )

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  })

  const words = text.split(" ")

  return (
    <p
      ref={container}
      className={`flex flex-wrap leading-relaxed p-1 ${className}`}
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end   = start + 1 / words.length
        // Compare en ignorant la ponctuation finale pour la détection
        const bare  = word.replace(/[.,;:!?()\-–—«»''"""]/g, "")
        const isHighlight = highlightSet.has(word) || highlightSet.has(bare)

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            highlight={isHighlight}
          >
            {word}
          </Word>
        )
      })}
    </p>
  )
}
