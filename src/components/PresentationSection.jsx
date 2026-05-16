import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedText } from "./AnimatedText"
import { MagicText } from "./MagicText"

const GOLD = "#C9A84C"

const FILIALES = [
  { name: "SIBIRI AGRO CHEMICAL",         icon: "🌱", desc: "Solutions agrochimiques et accompagnement agricole",   tag: "Agro",      href: "/agro-chemical" },
  { name: "SIBIRI GLOBAL CONSTRUCTION",   icon: "🏗️", desc: "Construction, genie civil et infrastructures",         tag: "Construction", href: "/global-construction" },
  { name: "SIBIRI TRANSPORT & LOGISTIC",  icon: "🚚", desc: "Transport de marchandises et logistique integree",     tag: "Logistic",  href: "/transport-logistic" },
  { name: "SIBIRI BIO MEDICAL SERVICES",  icon: "🏥", desc: "Solutions de sante et equipements medicaux",            tag: "Medical",   href: "/medical" },
  { name: "SIBIRI ENERGY",                icon: "⚡", desc: "Distribution de produits petroliers et energie",         tag: "Energy",    href: "/energy" },
]

// ─── Mots à mettre en or (partagés entre tous les paragraphes) ────────────────
const HIGHLIGHTS = [
  "SIBIRI", "GROUP", "HOLDING",
  "Burkina", "Faso",
  "El", "Hadj", "Ousmane", "Sibiri", "Ouédraogo", "(1906–1966)",
  "Haute-Volta",
  "co-président", "Chambre",
  "175", "500", "000", "FCFA",
  "Mahamadou", "Lamine", "Ouédraogo,",
  "Afrique", "moderne,", "dynamique", "compétitive",
]

// ─── Séparateur fin animé ─────────────────────────────────────────────────────
const ThinDivider = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, originX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-12 h-px my-2"
      style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }}
    />
  )
}

// ─── Carte filiale ────────────────────────────────────────────────────────────
const FilialeCard = ({ filiale, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
      className="group relative rounded-2xl p-6 cursor-pointer overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(201,168,76,0.25)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
      whileHover={{ scale: 1.03, borderColor: `${GOLD}55` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${GOLD}18 0%, transparent 70%)` }}
      />
      <div className="relative z-10">
        <span className="text-3xl">{filiale.icon}</span>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}44` }}
          >
            {filiale.tag}
          </span>
        </div>
        <h3
          className="mt-2 text-lg font-semibold text-slate-800"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {filiale.name}
        </h3>
        <p
          className="mt-1 text-sm text-slate-500 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {filiale.desc}
        </p>
        <motion.a
          href={filiale.href}
          className="inline-flex items-center gap-1 mt-4 text-xs font-semibold"
          style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
          whileHover={{ gap: "8px" }}
        >
          Découvrir
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )
}

// ─── Section principale ───────────────────────────────────────────────────────
export const PresentationSection = () => {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: "-100px" })

  const baseClass = "justify-start text-sm md:text-base font-normal text-slate-600"

  return (
    <section
      id="presentation"
      className="relative w-full py-24 px-5"
      style={{ background: "#ffffff" }}
    >
      {/* Ligne dorée décorative */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: `linear-gradient(to bottom, transparent, ${GOLD})` }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Titre animé ── */}
        <div ref={headRef} className="text-center mb-10">
          {inView && (
            <AnimatedText
              text="Présentation globale"
              textClassName="text-3xl md:text-5xl font-bold text-slate-900"
              underlineGradient="from-yellow-600 via-yellow-400 to-yellow-600"
              underlineHeight="h-0.5"
              underlineOffset="-bottom-3"
              delay={0.06}
              duration={0.04}
            />
          )}
        </div>

        {/* ── Bloc texte historique (MagicText par paragraphe) ── */}
        <div className="max-w-3xl mx-auto space-y-5">

          <MagicText
            highlightWords={HIGHLIGHTS}
            className={baseClass}
            text="L'histoire du Groupe SIBIRI GROUP s'inscrit dans une tradition entrepreneuriale profondément enracinée dans l'histoire économique du Burkina Faso. Elle trouve son origine dans l'héritage laissé par une figure emblématique du commerce national : El Hadj Ousmane Sibiri Ouédraogo (1906–1966)."
          />

          <MagicText
            highlightWords={HIGHLIGHTS}
            className={baseClass}
            text="Pionnier du développement économique du pays, il a joué un rôle déterminant dans la structuration du commerce moderne en Haute-Volta, aujourd'hui Burkina Faso. En tant que co-président de la première Chambre de commerce de la Haute-Volta, il a contribué à poser les fondements d'un environnement économique organisé, favorisant les échanges commerciaux tant au niveau local qu'international. Son implication dans les circuits d'exportation vers l'Europe, à une époque charnière entre le commerce colonial et post-colonial, témoigne de sa vision et de son influence dans l'essor du tissu économique national."
          />

          <ThinDivider />

          <MagicText
            highlightWords={HIGHLIGHTS}
            className={baseClass}
            text="C'est dans la continuité de cet héritage que s'inscrit la création de SIBIRI HOLDING, une société anonyme de droit burkinabè, dotée d'un capital social de 175 500 000 FCFA. La holding a été fondée par Mahamadou Lamine Ouédraogo, Administrateur Général, entrepreneur reconnu dans la sous-région ouest-africaine et ancien consul honoraire du Burkina Faso au Bénin."
          />

          <MagicText
            highlightWords={HIGHLIGHTS}
            className={baseClass}
            text="La création de la holding répond à une vision stratégique claire : fédérer, structurer et piloter un ensemble d'activités économiques diversifiées au sein d'une entité unique, capable d'assurer cohérence, performance et croissance durable. Cette logique d'unité d'action permet aujourd'hui au Groupe de consolider ses positions dans plusieurs secteurs clés et de renforcer son impact à l'échelle nationale et sous-régionale."
          />

          <MagicText
            highlightWords={HIGHLIGHTS}
            className={baseClass}
            text="En tant que holding, SIBIRI HOLDING joue un rôle central dans l'organisation et le développement du Groupe. Elle agit à la fois comme :"
          />

          {/* Liste à puces — chaque item est un MagicText indépendant */}
          <div className="space-y-3 pl-1">
            {[
              "une société d'investissement, orientée vers l'identification et le développement d'opportunités stratégiques ;",
              "une structure de gestion et de valorisation des actifs, garantissant une allocation optimale des ressources ;",
              "un organe de pilotage stratégique, assurant la coordination, la gouvernance et la performance des différentes filiales.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-3 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: GOLD }}
                />
                <MagicText
                  highlightWords={HIGHLIGHTS}
                  className={`${baseClass} flex-1`}
                  text={item}
                />
              </div>
            ))}
          </div>

          <MagicText
            highlightWords={[...HIGHLIGHTS, "rigueur,", "d'excellence", "d'engagement,"]}
            className={`${baseClass} font-medium text-slate-700`}
            text="Grâce à cette structuration, le Groupe SIBIRI GROUP s'affirme aujourd'hui comme un acteur économique majeur, porté par des valeurs de rigueur, d'excellence et d'engagement, et résolument tourné vers la construction d'une Afrique moderne, dynamique et compétitive."
          />

        </div>

        {/* ── Séparateur ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          className="w-20 h-px mx-auto my-12"
          style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
        />

        {/* ── Chiffres clés ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mb-16 text-center"
        >
          {[
            { value: "5",   label: "Filiales" },
            { value: "10+", label: "Pays" },
            { value: "20+", label: "Années d'expérience" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-3xl md:text-4xl font-bold"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs md:text-sm text-slate-400 mt-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Titre filiales ── */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-xl md:text-2xl font-bold text-slate-900 mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Nos{" "}
          <span style={{ color: GOLD }}>5 filiales</span>
        </motion.h2>

        {/* ── Grille filiales ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FILIALES.map((f, i) => (
            <FilialeCard key={f.name} filiale={f} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="/groupe"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-black transition-all hover:brightness-110 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #e6c76b)`,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            En savoir plus sur le Groupe
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
