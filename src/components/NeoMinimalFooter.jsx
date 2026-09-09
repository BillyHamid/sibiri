import { Link } from "react-router-dom"
import { ArrowRight, Globe, Hexagon, Mail, Phone } from "lucide-react"

// Fond noir uniforme pour tous les footers — seul l'accent de couleur change par filiale.
const BLACK = "#000000"

// Affiche un logo OFFICIEL sans le modifier, en n'en montrant que la marque.
// Certains fichiers livrés sont majoritairement du vide transparent : demander
// une hauteur donne alors un logo bien plus petit que prévu. On sert donc
// l'image en fond, agrandie et décalée pour que la marque — et elle seule —
// remplisse le cadre. `h` est la hauteur voulue POUR LA MARQUE.
const cropStyle = (src, { W, H, X, Y, MW, MH }, h) => {
  const u = v => `${(v * h) / MH}px`
  return {
    display: "block",
    width: u(MW),
    height: `${h}px`,
    backgroundImage: `url("${src}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${u(W)} ${u(H)}`,
    backgroundPosition: `${u(-X)} ${u(-Y)}`,
  }
}

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
    // Quand `logo` est défini, il remplace le bloc hexagone + titre texte.
    // Fichier officiel, jamais retouché. `logoCrop` décrit la position de la
    // marque à l'intérieur du PNG : celui-ci mesure 594×420 mais le logo n'y
    // occupe que 527×138 à partir de (40, 119) — le reste est du vide
    // transparent, écarté à l'affichage (voir cropStyle).
    logo: "/Sibiri-Energy.png",
    logoCrop: { W: 594, H: 420, X: 40, Y: 119, MW: 527, MH: 138 },
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

// Le prop surface (optionnel) permet à une filiale de proposer son propre habillage
// de pied de page : { bg, fg, muted, line, light }. Sans lui, on garde le noir
// historique commun à toutes les autres filiales.
export function NeoMinimalFooter({ variant = "home", surface }) {
  const theme = THEMES[variant] || THEMES.home
  const quickLinks = QUICK_LINKS_BY_VARIANT[variant] || QUICK_LINKS_BY_VARIANT.home
  const s = surface || { bg: BLACK, fg: '#FFFFFF', muted: 'rgba(255,255,255,0.62)', line: theme.border, light: false }
  const grid = s.light ? 'rgba(12,12,15,0.05)' : 'rgba(255,255,255,0.03)'

  return (
    <footer
      className="w-full border-t flex flex-wrap pt-14 pb-8 px-6 relative overflow-hidden"
      style={{ background: s.bg, borderColor: s.line }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14">
          <div className="col-span-1 md:col-span-6 flex flex-col gap-5">
            {/* Une filiale qui fournit un `logo` l'affiche à la place du bloc
                hexagone + titre. `self-start` est indispensable : dans un
                conteneur flex en colonne, une image sans cette règle est
                étirée sur toute la largeur (align-items: stretch) et son
                ratio est détruit. */}
            {theme.logo ? (
              /* Logo posé directement sur le pied de page, sans plaque ni fond.
                 `self-start` est indispensable : dans un conteneur flex en
                 colonne, un enfant sans cette règle est étiré sur toute la
                 largeur et son ratio est détruit. */
              <span className="self-start inline-flex">
                {theme.logoCrop ? (
                  <span role="img" aria-label={theme.title} style={cropStyle(theme.logo, theme.logoCrop, 48)} />
                ) : (
                  <img src={theme.logo} alt={theme.title} className="w-52 max-w-full h-auto" draggable={false} />
                )}
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <Hexagon style={{ color: theme.accent, fill: `${theme.accent}22` }} size={24} />
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: s.fg }}>{theme.title}</h2>
              </div>
            )}
            {theme.subtitle ? (
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: s.muted, fontFamily: "'Inter', sans-serif" }}>
                {theme.subtitle}
              </p>
            ) : null}

            <div className="flex items-center gap-2 mt-1">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="email"
                  placeholder="Entrer votre email pour recevoir les nouvelles"
                  className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                  style={{ background: s.light ? "#FFFFFF" : "rgba(255,255,255,0.05)", color: s.fg, border: `1px solid ${s.line}` }}
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
              <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: s.muted }}>{section.title}</h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm transition-colors flex items-center gap-2 w-fit" style={{ color: s.muted }}
                      onMouseEnter={e => (e.currentTarget.style.color = s.fg)}
                      onMouseLeave={e => (e.currentTarget.style.color = s.muted)}>
                      <span className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: `${theme.accent}99` }} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t" style={{ borderColor: s.line }}>
          <p className="text-xs" style={{ color: s.muted, fontFamily: "'Inter', sans-serif" }}>
            {`// ${theme.title.replaceAll(" ", "_")}`}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 border-r pr-6" style={{ borderColor: s.line }}>
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a key={i} href="#" className="transition-colors" style={{ color: s.muted }} aria-label="Social">
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
