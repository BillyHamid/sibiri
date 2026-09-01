import { ArrowRight, Globe, Hexagon, Mail, Phone } from "lucide-react"

// Fond noir uniforme pour tous les footers — seul l'accent de couleur change par filiale.
const BLACK = "#000000"

const THEMES = {
  home: {
    border: "rgba(255,255,255,0.10)",
    accent: "#c9a84c",
    title: "GROUPE SIBIRI HOLDING",
    status: "Ecosystem Active",
  },
  medical: {
    border: "rgba(125, 235, 160, 0.22)",
    accent: "#3daa52",
    title: "SIBIRI BIO MEDICAL SERVICES",
    subtitle: "Solutions sante, equipements medicaux et accompagnement hospitalier.",
    status: "Health Systems Operational",
  },
  energy: {
    border: "rgba(249, 115, 22, 0.25)",
    accent: "#E62630",
    title: "SIBIRI ENERGY",
    logo: "/Sibiri-Energy.png",
    status: "Energy Network Stable",
  },
  agro: {
    border: "rgba(126, 231, 135, 0.25)",
    accent: "#1f9d55",
    title: "SIBIRI AGRO CHEMICAL",
    subtitle: "Intrants agricoles et accompagnement des chaines de production.",
    status: "Agro Supply Online",
  },
  construction: {
    border: "rgba(166, 77, 66, 0.25)",
    accent: "#A64D42",
    title: "SIBIRI GLOBAL CONSTRUCTION ET RÉNOVATION",
    subtitle: "Excellence en construction, rénovation et infrastructures majeures en Afrique de l'Ouest.",
    status: "Projects On Schedule",
  },
  logistic: {
    border: "rgba(103, 232, 249, 0.25)",
    accent: "#0ea5e9",
    title: "SIBIRI TRANSPORT & LOGISTIC",
    subtitle: "Transport, coordination logistique et fluidite des operations.",
    status: "Logistics Flow Normal",
  },
}

// Liens vers chaque filiale — affichés dans la section "Groupe" du footer de
// TOUTES les filiales, pour permettre une navigation directe entre elles.
const FILIALES_LINKS = [
  { label: "SIBIRI Holding", href: "/" },
  { label: "Bio Medical", href: "/medical" },
  { label: "Energy", href: "/energy" },
  { label: "Global Construction", href: "/global-construction" },
  { label: "Transport & Logistic", href: "/transport-logistic" },
  { label: "Agro Chemical", href: "/agro-chemical" },
]

const QUICK_LINKS_BY_VARIANT = {
  home: [
    { title: "Groupe", links: FILIALES_LINKS },
    { title: "Ressources", links: [
      { label: "sibiri.group", href: "/" },
      { label: "Mentions legales", href: "/contact" },
      { label: "Support", href: "/contact" },
    ] },
  ],
  medical: [
    { title: "Groupe", links: FILIALES_LINKS },
    { title: "Ressources", links: [
      { label: "Actualite", href: "/medical/actualite" },
      { label: "Formation", href: "/medical/formation" },
      { label: "Contact", href: "/contact" },
    ] },
  ],
  energy: [
    { title: "Groupe", links: FILIALES_LINKS },
    { title: "Ressources", links: [
      { label: "À propos", href: "/energy/a-propos" },
      { label: "Contact", href: "/energy/contact" },
      { label: "Actualite", href: "/energy/actualite" },
    ] },
  ],
  construction: [
    { title: "Groupe", links: FILIALES_LINKS.filter(l => l.label !== "Global Construction") },
    { title: "Ressources", links: [
      { label: "Notre philosophie", href: "/global-construction" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/contact" },
    ] },
  ],
  logistic: [
    { title: "Groupe", links: FILIALES_LINKS },
    { title: "Ressources", links: [
      { label: "Conformite", href: "/transport-logistic" },
      { label: "Projets futurs", href: "/transport-logistic" },
      { label: "Contact", href: "/contact" },
    ] },
  ],
  agro: [
    { title: "Groupe", links: FILIALES_LINKS },
    { title: "Ressources", links: [
      { label: "Realisation", href: "/agro-chemical" },
      { label: "Partenaires", href: "/agro-chemical" },
      { label: "Contact", href: "/contact" },
    ] },
  ],
}

export function NeoMinimalFooter({ variant = "home" }) {
  const theme = THEMES[variant] || THEMES.home
  const quickLinks = QUICK_LINKS_BY_VARIANT[variant] || QUICK_LINKS_BY_VARIANT.home

  return (
    <footer
      className="w-full border-t flex flex-wrap pt-14 pb-8 px-6 relative overflow-hidden"
      style={{ background: BLACK, borderColor: theme.border }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14">
          <div className="col-span-1 md:col-span-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Hexagon style={{ color: theme.accent, fill: `${theme.accent}22` }} size={24} />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">{theme.title}</h2>
            </div>
            {theme.logo ? (
              <img src={theme.logo} alt={theme.title} className="h-14 w-auto" draggable={false} />
            ) : theme.subtitle ? (
              <p className="text-sm text-slate-300 leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {theme.subtitle}
              </p>
            ) : null}

            <div className="flex items-center gap-2 mt-1">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="email"
                  placeholder="Entrer votre email pour recevoir les nouvelles"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${theme.border}` }}
                />
              </div>
              <button
                className="p-2.5 rounded-lg text-white transition-colors"
                style={{ background: theme.accent }}
                aria-label="S'abonner"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {quickLinks.map((section) => (
            <div key={section.title} className="col-span-6 md:col-span-3 flex flex-col gap-4">
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest">{section.title}</h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 w-fit">
                      <span className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: `${theme.accent}99` }} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
            {`// ${theme.title.replaceAll(" ", "_")}`}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 border-r border-white/10 pr-6">
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="Social">
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: `${theme.accent}11`, border: `1px solid ${theme.accent}55` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
              <span className="text-[10px] uppercase tracking-wider" style={{ color: theme.accent }}>
                {theme.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
