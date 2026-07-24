import { motion } from "framer-motion"
import { NeoMinimalFooter } from "../components/NeoMinimalFooter"
import { ConstructionNav } from "../components/ConstructionNav"

// ─── Couleurs Global Construction (Rouge/Marron Brick du Logo) ──────────────────
const PRIMARY = "#A64D42"
const ACCENT  = "#D4756B"
const DARK    = "#2D2D2D"

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Reveal déclaratif (whileInView/viewport directement sur l'élément animé).
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
  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: dark ? "white" : "#1F2937", margin: "14px 0 20px" }}>
    {children}
  </h2>
)

const GradientSpan = ({ children }) => (
  <span style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
    {children}
  </span>
)

// ─── Données (structure alignée sur maquette_sibiri_construction_1.html) ──────
const IDENTITY = [
  { label: "Forme juridique", value: "Société Anonyme (SA) — droit OHADA" },
  { label: "Capital social", value: "10 000 000 F CFA" },
  { label: "RCCM", value: "BF OUA 2020M 3310" },
  { label: "Filiale de", value: "SIBIRI HOLDING" },
]

const ACTIVITES = [
  { img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Construction neuve", desc: "Bâtiments tous corps d'état : aggloméré de ciment, matériaux locaux, construction métallique." },
  { img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Rénovation de bâtiment", desc: "Réhabilitation en aggloméré de ciment, matériaux locaux ou construction métallique." },
  { img: "https://images.unsplash.com/photo-1780389098001-e641e50aeebd?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Routes & ouvrages d'art", desc: "Construction de routes en terre, ouvrages d'art et reprofilage." },
  { img: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Assainissement", desc: "Drainage des eaux pluviales, réseaux d'égouts." },
  { img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Adduction d'eau potable", desc: "Conception et réalisation de réseaux d'accès à l'eau potable." },
  { img: "https://images.unsplash.com/photo-1743742566156-f1745850281a?fm=jpg&q=80&w=900&auto=format&fit=crop", title: "Aménagement de plaines agricoles", desc: "Aménagements hydro-agricoles au service de la production locale." },
]

const ATOUTS = [
  { title: "Solidité financière", desc: "Adossée au groupe SIBIRI HOLDING, une synergie forte entre les filiales." },
  { title: "Équipe pluridisciplinaire", desc: "Une organisation complète, du conducteur de travaux aux ouvriers spécialisés." },
  { title: "Parc matériel étoffé", desc: "Adapté aux chantiers BTP comme aux aménagements hydro-agricoles." },
  { title: "Maîtrise réglementaire", desc: "Bonne connaissance des procédures administratives et des marchés publics." },
]

const VALEURS = ["Intégrité", "Loyauté", "Endurance dans l'action", "Qualité"]

const CONTACT_INFO = [
  { icon: "📍", label: "Siège", value: "Nationale 5, Zone Wend Panga, Kouba — Commune de Koubri" },
  { icon: "📞", label: "Téléphone", value: "+226 25 50 27 24 / +226 25 37 69 56" },
  { icon: "✉️", label: "Email", value: "sibirigcr@sibiri.group" },
  { icon: "📮", label: "Boîte postale", value: "01 BP 5096 Ouaga 01" },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="home" style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
    <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
      <source src="/construction/3741-174188012_large.mp4" type="video/mp4" />
    </video>
    <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(100deg, rgba(20,22,26,.90) 0%, rgba(20,22,26,.68) 55%, rgba(20,22,26,.3) 100%)` }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 2, backgroundImage: `linear-gradient(rgba(166,77,66,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(166,77,66,0.06) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
    <motion.div
      animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "-10%", left: "-8%", width: "50%", height: "70%", background: `radial-gradient(ellipse, ${PRIMARY}55 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(80px)", zIndex: 2, pointerEvents: "none" }}
    />

    <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "150px 40px 70px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
        <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 3, background: PRIMARY, color: "white", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 22 }}>
          BTP · Génie civil · Aménagement hydro-agricole
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.15, color: "white", margin: "0 0 18px", maxWidth: 680 }}
      >
        Tout passe, mais la{" "}
        <span style={{ background: `linear-gradient(90deg, ${ACCENT}, ${PRIMARY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          qualité demeure
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, lineHeight: 1.7, color: "#dcdcdc", maxWidth: 520, margin: "0 0 28px" }}
      >
        SIBIRI GLOBAL CONSTRUCTION ET RENOVATION (SGCR) participe au développement du Burkina Faso à travers la
        construction, la rénovation, les infrastructures routières et l'aménagement hydro-agricole.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.52 }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="#activites" style={{ padding: "12px 24px", borderRadius: 3, background: PRIMARY, color: "white", fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>
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
        <div style={{ padding: "26px 30px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
          <b style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: ACCENT, marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>{it.label}</b>
          <span style={{ fontSize: 13.5, color: "white", fontFamily: "'Inter', sans-serif" }}>{it.value}</span>
        </div>
      </Reveal>
    ))}
    <style>{`@media (max-width: 768px) { .identity-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
  </div>
)

// ─── Notre mission (Objectifs) ────────────────────────────────────────────────
const Objectifs = () => (
  <section id="presentation" className="py-20 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <Tag>Notre mission</Tag>
        <GradientTitle>Participer au <GradientSpan>développement du Burkina Faso</GradientSpan></GradientTitle>
        <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>
          Entreprise de construction en génie civil (Bâtiment et Travaux Publics) et d'aménagement hydro-agricole,
          SGCR met à disposition son savoir-faire et son parc matériel pour accompagner les acteurs publics et privés
          dans leurs projets d'infrastructures.
        </p>
      </Reveal>
    </div>
  </section>
)

// ─── Nos activités (grille 3, avec images) ────────────────────────────────────
const Activites = () => (
  <section id="activites" className="py-24 px-6" style={{ background: "#ebe9e3" }}>
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Nos activités</Tag>
        <GradientTitle>Un savoir-faire complet, <GradientSpan>du bâtiment à l'hydraulique</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACTIVITES.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.07}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} className="rounded-xl overflow-hidden h-full bg-white" style={{ border: `1px solid ${PRIMARY}20`, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <img src={a.img} alt={a.title} className="w-full object-cover" style={{ height: 160 }} />
              <div className="p-5">
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#1F2937", margin: "0 0 6px" }}>{a.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Nos atouts (grille 2, style value-item) ──────────────────────────────────
const Atouts = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Nos atouts</Tag>
        <GradientTitle>Pourquoi choisir <GradientSpan>SGCR</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-8">
        {ATOUTS.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <div className="pl-4" style={{ borderLeft: `3px solid ${PRIMARY}` }}>
              <b className="block text-base font-bold mb-1" style={{ color: "#1F2937", fontFamily: "'Inter', sans-serif" }}>{a.title}</b>
              <p className="text-sm" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>{a.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Organisation (organigramme simplifié) ────────────────────────────────────
const OrgNode = ({ children, top = false, mid = false }) => (
  <div
    className="rounded-md text-center"
    style={{
      padding: "10px 16px",
      fontSize: 12.5,
      fontFamily: "'Inter', sans-serif",
      background: top ? DARK : "white",
      color: top ? "white" : "#1F2937",
      fontWeight: top || mid ? 700 : 500,
      border: mid ? `1.5px solid ${PRIMARY}` : "1px solid #e3e1db",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}
  >
    {children}
  </div>
)

const Organisation = () => (
  <section id="organisation" className="py-24 px-6" style={{ background: "#ebe9e3" }}>
    <div className="max-w-5xl mx-auto">
      <Reveal className="mb-10 text-center">
        <Tag>Organisation</Tag>
        <GradientTitle>Une équipe structurée <GradientSpan>pour chaque chantier</GradientSpan></GradientTitle>
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col items-center gap-2.5">
        <OrgNode top>Administrateur Général — SIBIRI HOLDING</OrgNode>
        <div style={{ width: 2, height: 16, background: `${PRIMARY}55` }} />
        <OrgNode top>Secrétaire Général</OrgNode>
        <div style={{ width: 2, height: 16, background: `${PRIMARY}55` }} />
        <OrgNode top>Directeur Général Délégué</OrgNode>
        <div style={{ width: 2, height: 16, background: `${PRIMARY}55` }} />
        <div className="flex flex-wrap justify-center gap-3.5 gap-[14px]">
          {["Assistante", "Resp. Administratif & Financier", "Resp. Logistique", "Directeur Technique"].map((n) => (
            <OrgNode key={n} mid>{n}</OrgNode>
          ))}
        </div>
        <div style={{ width: 2, height: 16, background: `${PRIMARY}30` }} />
        <div className="flex flex-wrap justify-center gap-3.5 gap-[14px]">
          {["Conducteurs de travaux", "Chefs de chantier", "Chefs d'équipe (gros œuvre, électricité, plomberie...)", "Ouvriers spécialisés", "Magasiniers", "Gardiens"].map((n) => (
            <OrgNode key={n}>{n}</OrgNode>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
)

// ─── Slogan ───────────────────────────────────────────────────────────────────
const Slogan = () => (
  <section style={{ background: `linear-gradient(120deg, ${DARK}, #1b1d22)`, padding: "90px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "-15%", right: "-10%", pointerEvents: "none", width: "50%", height: "70%", background: `radial-gradient(ellipse, ${PRIMARY}18 0%, transparent 65%)`, filter: "blur(90px)" }} />
    <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
      <Reveal>
        <Tag light>Notre slogan</Tag>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)", color: "white", margin: "0 0 16px" }}>
          « Tout passe mais la qualité demeure »
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#c8c8c8", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Nous faisons de la qualité notre priorité : que la qualité de vos ouvrages demeure dans le temps, bien au-delà de l'effort financier consenti lors de leur réalisation.
        </p>
      </Reveal>
    </div>
  </section>
)

// ─── Nos valeurs (grille 4 simple) ─────────────────────────────────────────────
const Valeurs = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Nos valeurs</Tag>
        <GradientTitle>Ce qui <GradientSpan>guide nos actions</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {VALEURS.map((v, i) => (
          <Reveal key={v} delay={i * 0.06}>
            <div className="rounded-lg text-center p-5" style={{ border: `1px solid ${PRIMARY}22`, background: `${PRIMARY}08` }}>
              <b style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#1F2937" }}>{v}</b>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ─── Contact (infos + carte) ───────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-24 px-6" style={{ background: "#ebe9e3" }}>
    <div className="max-w-6xl mx-auto">
      <Reveal className="mb-10">
        <Tag>Contact</Tag>
        <GradientTitle>Contactez <GradientSpan>SGCR</GradientSpan></GradientTitle>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        <Reveal delay={0.05} className="space-y-3">
          {CONTACT_INFO.map((c) => (
            <div key={c.label} className="rounded-lg p-4 bg-white" style={{ border: "1px solid #e3e1db" }}>
              <b style={{ display: "block", fontSize: 11, textTransform: "uppercase", color: PRIMARY, letterSpacing: "0.05em", marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>{c.icon} {c.label}</b>
              <span className="text-sm" style={{ color: "#374151", fontFamily: "'Inter', sans-serif" }}>{c.value}</span>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-lg overflow-hidden h-full" style={{ minHeight: 220 }}>
            <img
              src="https://images.unsplash.com/photo-1541888698598-4096432cd70e?fm=jpg&q=80&w=900&auto=format&fit=crop"
              alt="Localisation SGCR"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

// ─── Page (ordre des sections aligné sur maquette_sibiri_construction_1.html) ─
export const GlobalConstructionPage = () => (
  <div style={{ background: DARK }}>
    <ConstructionNav />
    <Hero />
    <IdentityStrip />
    <Objectifs />
    <Activites />
    <Atouts />
    <Organisation />
    <Slogan />
    <Valeurs />
    <Contact />
    <NeoMinimalFooter variant="construction" />
  </div>
)
