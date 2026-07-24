import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AgroNav } from "../components/AgroNav"
import { NeoMinimalFooter } from "../components/NeoMinimalFooter"

// ─── Identité Agro Chemical (cohérente avec SubsidiariesReel / footer) ────────
const GREEN       = "#1f9d55"
const GREEN_LIGHT = "#7ee787"
const GREEN_PALE  = "#eaf6ec"
const DARK        = "#0b1a12"

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Reveal déclaratif (whileInView/viewport directement sur l'élément animé —
// pattern le plus robuste de framer-motion, pas de ref/état manuel à synchroniser).
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
        ? { background: `${GREEN}55`, color: GREEN_LIGHT, border: `1px solid ${GREEN_LIGHT}55` }
        : { background: `${GREEN}18`, color: GREEN, border: `1px solid ${GREEN}44` }
    }
  >
    {children}
  </span>
)

const GradientTitle = ({ children, dark = false }) => (
  <h2
    style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(2rem, 3.5vw, 3rem)",
      fontWeight: 700,
      color: dark ? "white" : "#0d1f14",
      margin: "14px 0 20px",
    }}
  >
    {children}
  </h2>
)

const GradientSpan = ({ children }) => (
  <span
    style={{
      background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {children}
  </span>
)

const Underline = ({ center = false }) => (
  <div style={{ width: 56, height: 3, borderRadius: 2, margin: center ? "0 auto" : 0, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
)

// ─── Données (structure alignée sur maquette_sibiri_agro.html) ────────────────
const PRESENTATION_CARDS = [
  { icon: "🌾", title: "Intrants agricoles", desc: "Importation & distribution d'engrais, pesticides, semences" },
  { icon: "🚜", title: "Aménagement", desc: "Aménagement de sites agricoles" },
  { icon: "🥬", title: "Maraîchage", desc: "Production maraîchère" },
  { icon: "🤝", title: "Appui-conseil", desc: "Accompagnement des producteurs" },
]

const VMV = [
  { tag: "Vision", icon: "🎯", text: "Contribuer à une agriculture performante, durable et résiliente." },
  { tag: "Mission", icon: "🌍", text: "Fournir des intrants de qualité et un accompagnement technique adapté pour améliorer les rendements agricoles." },
  { tag: "Valeurs", icon: "💎", text: "Qualité — Innovation — Proximité — Durabilité" },
]

const STATS = [
  { value: "Burkina Faso", label: "Zone principale" },
  { value: "Sous-région", label: "Afrique de l'Ouest" },
  { value: "Amont & aval", label: "Intrants + production" },
]

const EXPERTISE = [
  { icon: "📦", title: "Approvisionnement", desc: "Intrants agricoles certifiés" },
  { icon: "🧭", title: "Conseil agronomique", desc: "Accompagnement technique" },
  { icon: "💧", title: "Hydro-agricole", desc: "Aménagement & irrigation" },
  { icon: "🥬", title: "Maraîchage", desc: "Techniques de production" },
]

const SERVICES = [
  { img: "https://images.unsplash.com/photo-1655130944329-b3a63166f6b5?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Intrants agricoles", desc: "Engrais minéraux et organiques · Produits phytosanitaires · Semences" },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Appui-conseil", desc: "Formation des producteurs · Suivi des cultures · Recommandations techniques" },
  { img: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Aménagements agricoles", desc: "Forages · Systèmes d'irrigation · Bassins de stockage · Équipements" },
  { img: "https://images.unsplash.com/photo-1563030932-b26f45cd6064?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Production maraîchère", desc: "Exploitation de périmètres irrigués · Cultures à haute valeur ajoutée" },
]

const REALISATIONS = [
  { title: "Distribution à grande échelle", desc: "Volumes d'intrants livrés aux producteurs et coopératives" },
  { title: "Périmètres maraîchers", desc: "Mise en place de périmètres irrigués productifs" },
  { title: "Systèmes d'irrigation", desc: "Installation de solutions d'irrigation performantes" },
]

const REALISATIONS_GALLERY = [
  { img: "https://images.unsplash.com/photo-1655130944329-b3a63166f6b5?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Distribution d'intrants" },
  { img: "https://images.unsplash.com/photo-1563030932-b26f45cd6064?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Périmètre maraîcher" },
  { img: "https://images.unsplash.com/photo-1743742566156-f1745850281a?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Irrigation" },
  { img: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Aménagement hydraulique" },
]

const AVANTAGES = [
  { icon: "📍", title: "Expertise locale", desc: "Connaissance fine des filières et saisons du Burkina Faso" },
  { icon: "✅", title: "Qualité certifiée", desc: "Produits et intrants garantis" },
  { icon: "🤝", title: "Accompagnement complet", desc: "Intrants + conseil + aménagement, un seul interlocuteur" },
]

const VISUELS = [
  { img: "https://images.unsplash.com/photo-1655130944329-b3a63166f6b5?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Intrants" },
  { img: "https://images.unsplash.com/photo-1563030932-b26f45cd6064?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Champs / périmètres" },
  { img: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Forages / irrigation" },
  { img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=700&auto=format&fit=crop", label: "Équipe terrain" },
]

const CONTACTS = [
  { icon: "📍", label: "Adresse", value: "À compléter" },
  { icon: "📞", label: "Téléphone", value: "Ligne filiale AGRO\nSIBIRI GROUP" },
  { icon: "✉️", label: "Email", value: "agro@sibiri.group" },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  useEffect(() => {
    const id = "agro-hero-fonts"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap"
    document.head.appendChild(link)
  }, [])

  return (
    <section id="home" style={{ position: "relative", width: "100%", minHeight: 620, overflow: "hidden", display: "flex", alignItems: "center" }}>
      <img
        src="/agro/engrais-haute-qualite.jpg"
        alt="Épandage d'engrais de haute qualité sur une jeune pousse"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(100deg, rgba(11,26,18,0.92) 0%, rgba(11,26,18,0.7) 55%, rgba(15,45,25,0.25) 100%)` }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "150px 40px 70px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
          <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 3, background: GREEN, color: "white", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 22 }}>
            Agriculture &amp; intrants
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, color: "white", margin: "0 0 18px", maxWidth: 680 }}
        >
          Des intrants de qualité et un accompagnement pour une agriculture performante et durable
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, lineHeight: 1.7, color: "#dcdfd8", maxWidth: 520, margin: "0 0 28px" }}
        >
          SIBIRI AGRO CHEMICAL importe, distribue et accompagne les producteurs du Burkina Faso et de la sous-région
          à travers des intrants certifiés, un appui technique et des aménagements agricoles.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.52 }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#services" style={{ padding: "12px 24px", borderRadius: 99, background: GREEN, color: "white", fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>
            Découvrir nos services
          </a>
          <a href="#realisations" style={{ padding: "12px 24px", borderRadius: 99, border: "1.5px solid #fff", color: "white", fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>
            Voir nos réalisations
          </a>
          <a href="#contact" style={{ padding: "12px 24px", borderRadius: 99, border: "1.5px solid #fff", color: "white", fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>
            Nous contacter
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Présentation (texte + 4 cartes + Vision/Mission/Valeurs + stats) ─────────
const Presentation = () => (
  <section id="presentation" className="py-20 px-6 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <Tag>Présentation de la filiale</Tag>
        <GradientTitle>Qui est <GradientSpan>SIBIRI AGRO CHEMICAL</GradientSpan></GradientTitle>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="max-w-2xl text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
          Filiale spécialisée dans la vente et la commercialisation d'intrants agricoles ainsi que l'accompagnement
          technique des producteurs — acteur clé de la chaîne de valeur, en amont (intrants) comme en aval (production).
        </p>
      </Reveal>

      <Reveal delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {PRESENTATION_CARDS.map((c) => (
          <div key={c.title} className="rounded-lg p-4" style={{ background: GREEN_PALE, border: `1px solid ${GREEN}22` }}>
            <span className="text-xl">{c.icon}</span>
            <h3 className="mt-2 text-sm font-bold" style={{ color: "#0d1f14", fontFamily: "'Inter', sans-serif" }}>{c.title}</h3>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "#5c655c", fontFamily: "'Inter', sans-serif" }}>{c.desc}</p>
          </div>
        ))}
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        {VMV.map((v, i) => (
          <Reveal key={v.tag} delay={0.15 + i * 0.06} className="pl-4" y={16}>
            <div style={{ borderLeft: `3px solid ${GREEN}` }} className="pl-4">
              <span className="text-lg">{v.icon}</span>
              <Tag>{v.tag}</Tag>
              <p className="text-sm" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="flex flex-wrap gap-4 mt-8">
        {STATS.map((s) => (
          <div key={s.label} className="flex-1 min-w-[160px] text-center rounded-lg px-3 py-4" style={{ border: `1px solid ${GREEN}22`, background: GREEN_PALE }}>
            <p className="text-lg font-bold" style={{ color: "#1f4d2b", fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
            <p className="text-xs" style={{ color: "#5c655c", fontFamily: "'Inter', sans-serif" }}>{s.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
)

// ─── Expertise & savoir-faire ─────────────────────────────────────────────────
const Expertise = () => (
  <section id="expertise" style={{ background: DARK, padding: "90px 24px 100px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", bottom: "-20%", right: "-10%", pointerEvents: "none", width: "55%", height: "65%", background: `radial-gradient(ellipse, ${GREEN}0F 0%, transparent 65%)`, filter: "blur(80px)" }} />
    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <Reveal className="mb-10">
        <Tag light>Expertise &amp; savoir-faire</Tag>
        <GradientTitle dark>Notre <GradientSpan>savoir-faire</GradientSpan></GradientTitle>
      </Reveal>

      <div className="expertise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
        {EXPERTISE.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -5, borderColor: `${GREEN}66` }}
              transition={{ duration: 0.25 }}
              style={{ borderRadius: 18, padding: "24px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", height: "100%" }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, marginBottom: 14, background: `${GREEN}22`, border: `1px solid ${GREEN}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{e.icon}</div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{e.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: 0 }}>{e.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
    <style>{`@media (max-width: 860px) { .expertise-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
  </section>
)

// ─── Services / Produits ──────────────────────────────────────────────────────
const Services = () => (
  <section id="services" className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Services / Produits</Tag>
        <GradientTitle>Nos <GradientSpan>solutions</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} className="rounded-2xl overflow-hidden h-full" style={{ border: `1px solid ${GREEN}20`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
              <img src={s.img} alt={s.title} className="w-full object-cover" style={{ height: 150 }} />
              <div className="p-5">
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#0d1f14", margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Réalisations (cartes + galerie) ──────────────────────────────────────────
const GalleryShot = ({ img, label }) => (
  <div className="rounded-lg overflow-hidden relative" style={{ height: 130 }}>
    <img src={img} alt={label} className="w-full h-full object-cover" />
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${DARK}cc, transparent 55%)` }} />
    <p style={{ position: "absolute", bottom: 8, left: 10, right: 10, fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 700, color: "white", margin: 0 }}>{label}</p>
  </div>
)

const Realisations = () => (
  <section id="realisations" style={{ background: DARK, padding: "90px 24px 100px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "-10%", left: "-5%", pointerEvents: "none", width: "45%", height: "55%", background: `radial-gradient(ellipse, ${GREEN}12 0%, transparent 65%)`, filter: "blur(80px)" }} />
    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <Reveal className="mb-10">
        <Tag light>Réalisations</Tag>
        <GradientTitle dark>Réalisations &amp; <GradientSpan>impact terrain</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        {REALISATIONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08}>
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{r.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: 0 }}>{r.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {REALISATIONS_GALLERY.map((g) => <GalleryShot key={g.label} {...g} />)}
      </Reveal>
    </div>
  </section>
)

// ─── Avantages compétitifs ─────────────────────────────────────────────────────
const Avantages = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Avantages compétitifs</Tag>
        <GradientTitle>Pourquoi nous <GradientSpan>choisir</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-5">
        {AVANTAGES.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <div className="rounded-xl p-5" style={{ background: GREEN_PALE, border: `1px solid ${GREEN}22` }}>
              <span className="text-xl">{a.icon}</span>
              <h3 className="mt-2 text-sm font-bold" style={{ color: "#0d1f14", fontFamily: "'Inter', sans-serif" }}>{a.title}</h3>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "#5c655c", fontFamily: "'Inter', sans-serif" }}>{a.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Galerie visuelle ──────────────────────────────────────────────────────────
const GalerieVisuelle = () => (
  <section className="py-24 px-6" style={{ background: "#eef6ee" }}>
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Contenus visuels</Tag>
        <GradientTitle>En <GradientSpan>images</GradientSpan></GradientTitle>
      </Reveal>

      <Reveal delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {VISUELS.map((g) => <GalleryShot key={g.label} {...g} />)}
      </Reveal>
    </div>
  </section>
)

// ─── Contact (infos + carte) ───────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Contact</Tag>
        <GradientTitle>Contact <GradientSpan>filiale</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        <Reveal delay={0.05} className="space-y-3">
          {CONTACTS.map((c) => (
            <div key={c.label} className="rounded-lg p-4" style={{ background: GREEN_PALE, border: `1px solid ${GREEN}22` }}>
              <span className="text-lg">{c.icon}</span>
              <p className="mt-1 text-sm font-bold" style={{ color: "#0d1f14", fontFamily: "'Inter', sans-serif" }}>{c.label}</p>
              <p className="text-xs whitespace-pre-line" style={{ color: "#5c655c", fontFamily: "'Inter', sans-serif" }}>{c.value}</p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-lg overflow-hidden h-full" style={{ minHeight: 220 }}>
            <img
              src="https://images.unsplash.com/photo-1743742566156-f1745850281a?fm=jpg&q=80&w=900&auto=format&fit=crop"
              alt="Localisation"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

// ─── Page (ordre des sections aligné sur maquette_sibiri_agro.html) ───────────
export const AgroChemicalPage = () => (
  <div style={{ background: DARK }}>
    <AgroNav />
    <Hero />
    <Presentation />
    <Expertise />
    <Services />
    <Realisations />
    <Avantages />
    <GalerieVisuelle />
    <Contact />
    <NeoMinimalFooter variant="agro" />
  </div>
)
