import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { NeoMinimalFooter } from "./NeoMinimalFooter"

const Reveal = ({ children, delay = 0, y = 18, className = "" }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const SubsidiaryNav = ({ name, highlight, colors, links, contactId }) => (
  <header className="fixed top-0 left-0 right-0 z-50 pt-2">
    <nav
      className="mx-auto max-w-7xl rounded-3xl px-6 lg:px-10"
      style={{
        background: "rgba(8,10,18,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between gap-6 py-3">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-xs font-semibold text-white/70 hover:text-white transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ← SIBIRI GROUP
          </a>
          <div className="w-px h-4 bg-white/20" />
          <span className="text-sm font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            {name} <span style={{ color: colors.accent }}>{highlight}</span>
          </span>
        </div>
        <ul className="hidden lg:flex gap-7 text-sm">
          {links.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="text-white/60 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={contactId}
          className="hidden lg:inline-flex text-sm font-semibold px-5 py-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: "white",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Nous contacter
        </a>
      </div>
    </nav>
  </header>
)

const Hero = ({ id, title, subtitle, badge, colors, ctas }) => (
  <section
    id={id}
    className="min-h-screen px-6 pt-36 pb-24 flex items-center"
    style={{ background: `radial-gradient(circle at 15% 20%, ${colors.glow} 0%, ${colors.bg} 55%)` }}
  >
    <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
      <Reveal>
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5"
          style={{ background: `${colors.accent}2A`, color: colors.accent, border: `1px solid ${colors.accent}55` }}
        >
          {badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h1>
        <p className="mt-5 text-sm md:text-base text-slate-300 max-w-xl leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {ctas.map((cta, i) => (
            <a
              key={cta.label}
              href={cta.href}
              className="inline-flex px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={i === 0
                ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: "white", fontFamily: "'Inter', sans-serif" }
                : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontFamily: "'Inter', sans-serif" }}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <p className="text-xs uppercase tracking-wider text-white/50 mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>Axes stratégiques</p>
          <div className="space-y-3">
            {ctas.slice(0, 3).map((cta, i) => (
              <motion.div
                key={cta.label}
                className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${colors.accent}33`, color: "#e5e7eb", fontFamily: "'Inter', sans-serif" }}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {cta.focus}
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

const SectionBlock = ({ id, title, tag, colors, items }) => (
  <section id={id} className="px-6 py-20" style={{ background: colors.section }}>
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{ background: `${colors.accent}22`, color: colors.accent, border: `1px solid ${colors.accent}55` }}
        >
          {tag}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: colors.accent }} />
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <motion.article
              className="rounded-2xl p-5 h-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
              whileHover={{ y: -4, borderColor: `${colors.accent}88` }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 text-sm font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const AboutBlock = ({ id, colors, about }) => (
  <section id={id} className="px-6 py-20" style={{ background: colors.sectionA }}>
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
      <Reveal>
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{ background: `${colors.accent}22`, color: colors.accent, border: `1px solid ${colors.accent}55` }}
        >
          Identite
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          A Propos
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: colors.accent }} />
        <p className="text-sm md:text-base text-slate-300 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          {about.description}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="space-y-3">
          {about.points.map((point, index) => (
            <div
              key={index}
              className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${colors.accent}33`, color: "#e5e7eb", fontFamily: "'Inter', sans-serif" }}
            >
              {point}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
)

const ContactBlock = ({ id, colors, contacts }) => (
  <section id={id} className="px-6 py-20" style={{ background: colors.bg }}>
    <div className="max-w-4xl mx-auto text-center">
      <Reveal>
        <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Contact filiale</h2>
        <div className="w-12 h-0.5 mx-auto mt-3 mb-8" style={{ background: colors.accent }} />
      </Reveal>
      <Reveal delay={0.08}>
        <div className="grid sm:grid-cols-3 gap-4 text-left">
          {contacts.map((c) => (
            <div key={c.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span className="text-xl">{c.icon}</span>
              <p className="text-xs text-slate-400 mt-2 mb-1 uppercase tracking-wider font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{c.label}</p>
              <p className="text-sm text-white whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif" }}>{c.value}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
)

export const SubsidiaryShowcasePage = ({ config }) => (
  <div className="w-full" style={{ background: config.colors.bg }}>
    <SubsidiaryNav
      name={config.shortName}
      highlight={config.highlight}
      colors={config.colors}
      links={[
        { label: "Accueil", href: `#${config.anchors.home}` },
        { label: "À Propos", href: `#${config.anchors.about}` },
        { label: "Services / Produits", href: `#${config.anchors.services}` },
        { label: "Réalisations", href: `#${config.anchors.realisations}` },
        { label: "Contact", href: `#${config.anchors.contact}` },
      ]}
      contactId={`#${config.anchors.contact}`}
    />
    <Hero
      id={config.anchors.home}
      title={config.hero.title}
      subtitle={config.hero.subtitle}
      badge={config.hero.badge}
      colors={config.colors}
      ctas={config.hero.ctas}
    />
    <AboutBlock id={config.anchors.about} colors={config.colors} about={config.about} />
    <SectionBlock
      id={config.anchors.services}
      title={config.services.title}
      tag="Services / Produits"
      colors={{ ...config.colors, section: config.colors.sectionB }}
      items={config.services.items}
    />
    <SectionBlock
      id={config.anchors.realisations}
      title={config.realisations.title}
      tag="Realisations"
      colors={{ ...config.colors, section: config.colors.sectionA }}
      items={config.realisations.items}
    />
    <ContactBlock id={config.anchors.contact} colors={config.colors} contacts={config.contacts} />
    <NeoMinimalFooter variant={config.footerVariant} />
  </div>
)
