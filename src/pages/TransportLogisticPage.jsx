import { motion } from "framer-motion"
import { NeoMinimalFooter } from "../components/NeoMinimalFooter"
import { TransportNav } from "../components/TransportNav"

// ─── Couleurs Transport & Logistique (Bleu) ───────────────────────────────────
const PRIMARY = "#0ea5e9"
const ACCENT  = "#67e8f9"
const DARK    = "#0f1720"

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 20, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
    className={className}
  >
    {children}
  </motion.div>
)

const Tag = ({ children, light = false }) => (
  <span
    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
    style={
      light
        ? { background: `${PRIMARY}55`, color: ACCENT, border: `1px solid ${ACCENT}55` }
        : { background: `${PRIMARY}18`, color: PRIMARY, border: `1px solid ${PRIMARY}44` }
    }
  >
    {children}
  </span>
)

const GradientTitle = ({ children, dark = false }) => (
  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: dark ? "white" : "#0f1720", margin: "14px 0 20px" }}>
    {children}
  </h2>
)

const GradientSpan = ({ children }) => (
  <span style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
    {children}
  </span>
)

// ─── Données (structure alignée sur maquette_sibiri_transport_logistics.html) ─
const IDENTITY = [
  { label: "Forme juridique", value: "Société Anonyme (SA)" },
  { label: "Capital social", value: "110 000 000 F CFA" },
  { label: "RCCM", value: "BF OUA 2022 M 1379" },
  { label: "Siège", value: "Secteur 30, Ouagadougou" },
]

const ACTIVITES = [
  { img: "https://images.unsplash.com/photo-1720811559337-c59b75acc4de?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Transport d'hydrocarbures", desc: "Acheminement de carburants (essence, gasoil) via des camions-citernes certifiés." },
  { img: "https://images.unsplash.com/photo-1711012604128-8339024a3e12?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Transport de minerais", desc: "Convoyage de matières premières (minerais, clinker) des mines vers les ports ou usines." },
  { img: "https://images.unsplash.com/photo-1708193203896-ba0630862bb6?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Marchandises conteneurisées", desc: "Transport de marchandises diverses en conteneurs." },
  { img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Logistique intégrée", desc: "Gestion des flux, livraison et optimisation de la supply chain." },
  { img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Gestion de flotte", desc: "Maintenance, suivi GPS et optimisation des véhicules." },
]

const MOYENS = [
  { icon: "🛢️", title: "Camions-citernes", desc: "Certifiés matières dangereuses" },
  { icon: "🚛", title: "Camions bennes", desc: "Transport de minerais" },
  { icon: "📦", title: "Camions plateaux", desc: "Marchandises diverses" },
  { icon: "📡", title: "Géolocalisation GPS", desc: "Suivi en temps réel" },
  { icon: "🏭", title: "Parc logistique", desc: "Stockage du matériel roulant" },
  { icon: "🛠️", title: "Maintenance", desc: "Suivi et entretien de la flotte" },
]

const NORMES = [
  { label: "Normes HSE (Hygiène, Sécurité, Environnement)", danger: false },
  { label: "Réglementation ADR — matières dangereuses", danger: true },
  { label: "Standards de qualité & traçabilité", danger: false },
  { label: "Formations régulières des chauffeurs", danger: false },
]

const VALEURS = [
  { title: "Sécurité", desc: "Priorité absolue, surtout pour les matières dangereuses." },
  { title: "Fiabilité", desc: "Respect des délais, engagements tenus." },
  { title: "Intégrité", desc: "Transparence et éthique professionnelle." },
  { title: "Excellence opérationnelle", desc: "Performance et amélioration continue." },
  { title: "Responsabilité environnementale", desc: "Réduction de l'impact écologique." },
  { title: "Innovation", desc: "Géolocalisation, digitalisation, optimisation." },
]

const CLIENTS = ["Compagnies pétrolières", "Sociétés minières", "Industries & entreprises commerciales", "Distributeurs de carburant"]

const CONTACT_INFO = [
  { icon: "📍", label: "Siège social", value: "Secteur 30, Ouagadougou" },
  { icon: "👤", label: "Représentant", value: "Conseiller Spécial de Direction — M. OUEDRAOGO Mahamadou Lamine" },
  { icon: "📮", label: "Boîte postale", value: "01 BP 5096 Ouagadougou 01" },
  { icon: "📄", label: "RCCM", value: "BF OUA 2022 M 1379" },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="home" style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
    <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
      <source src="/transport/istockphoto-2194913184-640_adpp_is.mp4" type="video/mp4" />
    </video>
    <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(100deg, rgba(15,23,32,.92) 0%, rgba(15,23,32,.7) 55%, rgba(15,23,32,.3) 100%)` }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 2, backgroundImage: `linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
    <motion.div
      animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "-10%", left: "-8%", width: "50%", height: "70%", background: `radial-gradient(ellipse, ${PRIMARY}55 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(80px)", zIndex: 2, pointerEvents: "none" }}
    />

    <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "150px 40px 70px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
        <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 3, background: PRIMARY, color: DARK, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 22 }}>
          Transport &amp; logistique · Hydrocarbures · Minerais
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.2vw, 3.2rem)", fontWeight: 700, lineHeight: 1.18, color: "white", margin: "0 0 18px", maxWidth: 700 }}
      >
        Le transport{" "}
        <span style={{ background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          sécurisé
        </span>{" "}
        des ressources qui font avancer l'Afrique de l'Ouest
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, lineHeight: 1.7, color: "#dbe2e8", maxWidth: 540, margin: "0 0 28px" }}
      >
        SIBIRI TRANSPORT & LOGISTICS (STL) assure le transport d'hydrocarbures, de minerais et de marchandises
        diverses, avec une gestion complète de la chaîne d'approvisionnement, depuis la production jusqu'à la distribution.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.52 }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="#activites" style={{ padding: "12px 24px", borderRadius: 3, background: PRIMARY, color: DARK, fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>
          Nos activités
        </a>
        <a href="#contact" style={{ padding: "12px 24px", borderRadius: 3, border: "1.5px solid #fff", color: "white", fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>
          Nous contacter
        </a>
      </motion.div>
    </div>
  </section>
)

// ─── Bandeau identité ─────────────────────────────────────────────────────────
const IdentityStrip = () => (
  <div className="identity-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: DARK }}>
    {IDENTITY.map((it, i) => (
      <Reveal key={it.label} delay={i * 0.06}>
        <div style={{ padding: "24px 28px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
          <b style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: ACCENT, marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>{it.label}</b>
          <span style={{ fontSize: 13, color: "white", fontFamily: "'Inter', sans-serif" }}>{it.value}</span>
        </div>
      </Reveal>
    ))}
    <style>{`@media (max-width: 768px) { .identity-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
  </div>
)

// ─── Introduction ──────────────────────────────────────────────────────────────
const Introduction = () => (
  <section id="presentation" className="py-20 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <Tag>Introduction</Tag>
        <GradientTitle>Un maillon stratégique de <GradientSpan>la chaîne d'approvisionnement</GradientSpan></GradientTitle>
        <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "#3d5a75", fontFamily: "'Inter', sans-serif" }}>
          Spécialisée dans le transport et la logistique des produits pétroliers, des ressources minières et de
          marchandises diverses, STL intervient principalement en Afrique de l'Ouest et assure la gestion complète
          de la chaîne d'approvisionnement, depuis les sites de production jusqu'aux zones de distribution ou d'exportation.
        </p>
      </Reveal>
    </div>
  </section>
)

// ─── Nos activités (grille 3, avec images) ────────────────────────────────────
const Activites = () => (
  <section id="activites" className="py-24 px-6" style={{ background: "#e9edf1" }}>
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Nos activités</Tag>
        <GradientTitle>Cinq activités <GradientSpan>clés</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACTIVITES.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.07}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} className="rounded-xl overflow-hidden h-full bg-white" style={{ border: `1px solid ${PRIMARY}20`, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <img src={a.img} alt={a.title} className="w-full object-cover" style={{ height: 160 }} />
              <div className="p-5">
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#0f1720", margin: "0 0 6px" }}>{a.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "#3d5a75", lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Moyens & équipements (Flotte) ─────────────────────────────────────────────
const Flotte = () => (
  <section id="flotte" className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Moyens &amp; équipements</Tag>
        <GradientTitle>Une flotte adaptée à <GradientSpan>chaque type de transport</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {MOYENS.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.06}>
            <div className="rounded-lg p-5 text-center" style={{ border: `1px solid ${PRIMARY}22`, background: `${PRIMARY}06` }}>
              <div className="mx-auto mb-2.5 flex items-center justify-center rounded-lg" style={{ width: 38, height: 38, background: "#fdf3e0", fontSize: 18 }}>{m.icon}</div>
              <b className="block text-sm" style={{ color: "#0f1720", fontFamily: "'Inter', sans-serif" }}>{m.title}</b>
              <p className="mt-1 text-xs" style={{ color: "#3d5a75", fontFamily: "'Inter', sans-serif" }}>{m.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Engagements & normes ──────────────────────────────────────────────────────
const Engagements = () => (
  <section id="engagements" className="py-24 px-6" style={{ background: "#e9edf1" }}>
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-8">
        <Tag>Engagements &amp; normes</Tag>
        <GradientTitle>La sécurité, une <GradientSpan>priorité absolue</GradientSpan></GradientTitle>
        <p className="max-w-2xl text-sm" style={{ color: "#3d5a75", fontFamily: "'Inter', sans-serif" }}>
          STL respecte les normes internationales et forme régulièrement ses chauffeurs pour réduire les risques d'accident.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="flex flex-wrap gap-3.5 gap-[14px]">
        {NORMES.map((n) => (
          <span
            key={n.label}
            className="rounded-full px-4.5 px-[18px] py-2 text-xs font-semibold"
            style={n.danger
              ? { background: "white", border: "1px solid #c1442c", color: "#c1442c" }
              : { background: "white", border: "1px solid #e1e4e8", color: "#132a45" }}
          >
            {n.label}
          </span>
        ))}
      </Reveal>
    </div>
  </section>
)

// ─── Vision / Mission (bandeau simple) ─────────────────────────────────────────
const VisionMission = () => (
  <section style={{ background: `linear-gradient(120deg, ${DARK}, #0c1826)`, padding: "70px 24px" }}>
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <Reveal>
        <Tag light>Notre vision</Tag>
        <p style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: "white" }}>
          « Devenir un leader régional du transport logistique des ressources minières, reconnu pour sa fiabilité,
          sa sécurité et son innovation à l'horizon 2027. »
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <Tag light>Notre mission</Tag>
        <p style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: "white" }}>
          « Assurer le transport sécurisé, efficace et fiable des hydrocarbures, minerais et produits divers, avec
          des solutions logistiques adaptées aux industries extractives, énergétiques et commerciales. »
        </p>
      </Reveal>
    </div>
  </section>
)

// ─── Nos valeurs (grille, style value-item) ────────────────────────────────────
const Valeurs = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Nos valeurs</Tag>
        <GradientTitle>Ce qui guide chacune de <GradientSpan>nos opérations</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VALEURS.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            <div className="rounded-md p-4" style={{ background: "white", borderLeft: `3px solid ${PRIMARY}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <b className="block text-sm mb-1" style={{ color: "#0f1720", fontFamily: "'Inter', sans-serif" }}>🔹 {v.title}</b>
              <p className="text-xs" style={{ color: "#3d5a75", fontFamily: "'Inter', sans-serif" }}>{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Clients & partenaires ──────────────────────────────────────────────────────
const Clients = () => (
  <section className="py-24 px-6" style={{ background: "#e9edf1" }}>
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Clients &amp; partenaires</Tag>
        <GradientTitle>Ils nous font <GradientSpan>confiance</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CLIENTS.map((c, i) => (
          <Reveal key={c} delay={i * 0.06}>
            <div className="rounded-lg p-4 text-center bg-white" style={{ border: "1px solid #e1e4e8" }}>
              <span className="text-sm font-semibold" style={{ color: "#132a45", fontFamily: "'Inter', sans-serif" }}>{c}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Contact (infos + carte) ───────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Contact</Tag>
        <GradientTitle>Contactez <GradientSpan>STL</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        <Reveal delay={0.05} className="space-y-3">
          {CONTACT_INFO.map((c) => (
            <div key={c.label} className="rounded-lg p-4" style={{ background: "white", border: "1px solid #e1e4e8" }}>
              <b style={{ display: "block", fontSize: 11, textTransform: "uppercase", color: "#b97e0f", letterSpacing: "0.05em", marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>{c.icon} {c.label}</b>
              <span className="text-sm" style={{ color: "#374151", fontFamily: "'Inter', sans-serif" }}>{c.value}</span>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-lg overflow-hidden h-full" style={{ minHeight: 220 }}>
            <img
              src="https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=900&auto=format&fit=crop"
              alt="Localisation STL"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

// ─── Page (ordre des sections aligné sur maquette_sibiri_transport_logistics.html) ─
export const TransportLogisticPage = () => (
  <div style={{ background: DARK }}>
    <TransportNav />
    <Hero />
    <IdentityStrip />
    <Introduction />
    <Activites />
    <Flotte />
    <Engagements />
    <VisionMission />
    <Valeurs />
    <Clients />
    <Contact />
    <NeoMinimalFooter variant="logistic" />
  </div>
)
