import { ArrowRight, Globe, Hexagon, Mail, Phone } from "lucide-react"

const THEMES = {
  home: {
    bg: "#1D1D1B",
    panel: "rgba(15, 23, 42, 0.45)",
    border: "rgba(255,255,255,0.10)",
    accent: "#c9a84c",
    title: "SIBIRI GROUP",
    subtitle: "Un groupe multi-sectoriel tourne vers la performance durable.",
    status: "Ecosystem Active",
  },
  medical: {
    bg: "#0f1f14",
    panel: "rgba(28, 56, 35, 0.45)",
    border: "rgba(125, 235, 160, 0.22)",
    accent: "#3daa52",
    title: "SIBIRI BIO MEDICAL SERVICES",
    subtitle: "Solutions sante, equipements medicaux et accompagnement hospitalier.",
    status: "Health Systems Operational",
  },
  energy: {
    bg: "#09090b",
    panel: "rgba(39, 20, 7, 0.45)",
    border: "rgba(249, 115, 22, 0.25)",
    accent: "#E62630",
    title: "SIBIRI ENERGY",
    subtitle: "Distribution petroliere, stations-service et partenariats strategiques.",
    status: "Energy Network Stable",
  },
  agro: {
    bg: "#0b1a12",
    panel: "rgba(16, 47, 26, 0.45)",
    border: "rgba(126, 231, 135, 0.25)",
    accent: "#1f9d55",
    title: "SIBIRI AGRO CHEMICAL",
    subtitle: "Intrants agricoles et accompagnement des chaines de production.",
    status: "Agro Supply Online",
  },
  construction: {
    bg: "#111418",
    panel: "rgba(24, 36, 56, 0.45)",
    border: "rgba(147, 197, 253, 0.25)",
    accent: "#3b82f6",
    title: "SIBIRI GLOBAL CONSTRUCTION",
    subtitle: "Projets BTP, infrastructures et execution terrain maitrisee.",
    status: "Projects On Schedule",
  },
  logistic: {
    bg: "#0f1720",
    panel: "rgba(9, 36, 49, 0.45)",
    border: "rgba(103, 232, 249, 0.25)",
    accent: "#0ea5e9",
    title: "SIBIRI TRANSPORT & LOGISTIC",
    subtitle: "Transport, coordination logistique et fluidite des operations.",
    status: "Logistics Flow Normal",
  },
}

const QUICK_LINKS = [
  { title: "Filiale", links: ["Presentation", "Services", "Contact"] },
  { title: "Groupe", links: ["A propos", "Filiales", "Vision"] },
  { title: "Ressources", links: ["Actualites", "Partenaires", "Support"] },
]

export function NeoMinimalFooter({ variant = "home" }) {
  const theme = THEMES[variant] || THEMES.home

  return (
    <footer
      className="max-w-7xl mx-auto border-t rounded-t-2xl flex flex-wrap pt-14 pb-8 px-6 relative overflow-hidden"
      style={{ background: theme.panel, borderColor: theme.border }}
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
          <div className="col-span-1 md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Hexagon style={{ color: theme.accent, fill: `${theme.accent}22` }} size={24} />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">{theme.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              {theme.subtitle}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="email"
                  placeholder="Votre email..."
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

          {QUICK_LINKS.map((section) => (
            <div key={section.title} className="col-span-6 md:col-span-2 flex flex-col gap-4">
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest">{section.title}</h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 w-fit">
                      <span className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: `${theme.accent}99` }} />
                      {link}
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

      <div className="absolute inset-0 -z-10" style={{ background: theme.bg }} />
    </footer>
  )
}
