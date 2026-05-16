import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitingCircles } from './ui/orbiting-circles';

// ─── Three.js particle canvas ─────────────────────────────────────────────────
const LogoParticlesCanvas = ({ logoSrc, className = "absolute inset-0 z-0" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = () => mountRef.current.clientWidth;
    const H = () => mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W() / H(), 0.1, 1000);
    camera.position.z = 5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      console.warn('[LogoParticles] WebGL non disponible, canvas ignoré.');
      return;
    }
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const domElement = renderer.domElement;

    // Récupération gracieuse si le contexte est perdu
    domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      cancelAnimationFrame(animationId);
    }, false);

    mountRef.current.appendChild(domElement);


    let animationId;
    let positions, originalPositions, velocities;
    let geometry, points;
    let particleCount = 0;
    let mounted = true;

    const img = new Image();

    img.onload = () => {
      if (!mounted) return;
      // ── Sampling haute résolution ─────────────────────────────────────────
      const SAMPLE = 400;
      const offscreen = document.createElement('canvas');
      offscreen.width = SAMPLE;
      offscreen.height = SAMPLE;
      const ctx = offscreen.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, SAMPLE, SAMPLE);

      const aspect = img.width / img.height;
      let dw = SAMPLE, dh = SAMPLE;
      if (aspect > 1) dh = SAMPLE / aspect;
      else dw = SAMPLE * aspect;
      const ox = (SAMPLE - dw) / 2;
      const oy = (SAMPLE - dh) / 2;
      ctx.drawImage(img, ox, oy, dw, dh);

      const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);
      const pixels = [];
      const STEP = 1; // résolution max — chaque pixel conservé
      for (let py = 0; py < SAMPLE; py += STEP) {
        for (let px = 0; px < SAMPLE; px += STEP) {
          const i = (py * SAMPLE + px) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          // Garder uniquement les pixels non-blancs (luminance < 92%)
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          if (lum < 0.92) pixels.push({ px, py, lum });
        }
      }

      particleCount = pixels.length;
      positions         = new Float32Array(particleCount * 3);
      originalPositions = new Float32Array(particleCount * 3);
      velocities        = new Float32Array(particleCount * 3);
      const colors      = new Float32Array(particleCount * 3);

      // ── WORLD calibré à la colonne ────────────────────────────────────────
      const colAspect = W() / H();
      const visH  = 2 * Math.tan((75 / 2) * Math.PI / 180) * 5;
      const visW  = visH * colAspect;
      const WORLD = Math.min(visW, visH) * 0.90;

      for (let i = 0; i < particleCount; i++) {
        const { px, py, lum } = pixels[i];
        const wx = (px / SAMPLE - 0.5) * WORLD;
        const wy = -(py / SAMPLE - 0.5) * WORLD;
        const wz = (Math.random() - 0.5) * 0.15;
        positions[i * 3]     = wx;
        positions[i * 3 + 1] = wy;
        positions[i * 3 + 2] = wz;
        originalPositions[i * 3]     = wx;
        originalPositions[i * 3 + 1] = wy;
        originalPositions[i * 3 + 2] = wz;

        // ── Luminance inversée → or lumineux sur fond sombre ──────────────
        // Logo conçu pour fond blanc : pixels sombres = contours/texte → on les rend brillants
        const brightness = Math.pow(1 - lum, 0.6); // courbe douce, min 8% luminosité
        colors[i * 3]     = Math.min(0.88 * brightness + 0.18, 1.0); // R — or chaud
        colors[i * 3 + 1] = Math.min(0.68 * brightness + 0.12, 1.0); // G
        colors[i * 3 + 2] = Math.min(0.18 * brightness + 0.02, 1.0); // B — minimal
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending, // lueur additive sur fond sombre
        depthWrite: false,
        sizeAttenuation: true,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      const SPRING    = 0.12;   // fort → réactivité rapide aux cibles
      const DAMPING   = 0.72;
      const WAVE_AMP  = 0.10;  // amplitude de la vague (unités monde)
      const WAVE_SPD  = 1.6;   // vitesse temporelle
      const WAVE_FREQ = 2.0;   // fréquence spatiale
      const INTRO_MS  = 1800;
      const introStart = Date.now();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsed = Date.now() - introStart;
        const t     = Math.min(elapsed / INTRO_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3); // montée en puissance à l'entrée

        const time = elapsed * 0.001; // en secondes

        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3, iy = ix + 1, iz = ix + 2;
          const ox = originalPositions[ix];
          const oy = originalPositions[iy];

          // Effet vague : chaque particule oscille selon sa position X dans le logo
          const wave   = Math.sin(time * WAVE_SPD + ox * WAVE_FREQ) * WAVE_AMP * eased;
          const waveZ  = Math.cos(time * WAVE_SPD * 0.8 + ox * WAVE_FREQ + oy * 0.5) * WAVE_AMP * 0.4 * eased;

          const targetX = ox;
          const targetY = oy + wave;
          const targetZ = originalPositions[iz] + waveZ;

          velocities[ix] += (targetX - positions[ix]) * SPRING;
          velocities[iy] += (targetY - positions[iy]) * SPRING;
          velocities[iz] += (targetZ - positions[iz]) * SPRING;
          velocities[ix] *= DAMPING;
          velocities[iy] *= DAMPING;
          velocities[iz] *= DAMPING;
          positions[ix] += velocities[ix];
          positions[iy] += velocities[iy];
          positions[iz] += velocities[iz];
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();
    };

    img.onerror = () => { if (mounted) console.error('[LogoParticles] Could not load:', logoSrc); };
    img.src = logoSrc;

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (domElement.parentNode) domElement.parentNode.removeChild(domElement);
      renderer.dispose();
      geometry?.dispose();
    };
  }, [logoSrc]);

  return <div ref={mountRef} className={className} />;
};

// ─── Filiales ─────────────────────────────────────────────────────────────────
const SUBSIDIARIES = [
  { name: "Global Construction",  color: "#8B2020", route: "/global-construction", logo: "/Sibiri-Construction.jpg", icon: "🏗️" },
  { name: "Bio Medical Services", color: "#4CAF50", route: "/medical",             logo: "/Sibiri-Medical.jpg",      icon: "⚕️" },
  { name: "Transport & Logistics",color: "#1E6DA4", route: "/transport-logistic",  logo: "/Sibiri-Transport.png",    icon: "🚛" },
  { name: "Energy",               color: "#E62630", route: "/energy",              logo: "/Sibiri-Energy.png",       icon: "⚡" },
  { name: "Agro Chemical",        color: "#8DAF30", route: "/agro-chemical",       logo: "/Sibiri-Agro.png",         icon: "🌿" },
]

// ─── Logo orbitant cliquable ──────────────────────────────────────────────────
const OrbitLogo = ({ sub, size = 52 }) => {
  const [imgOk, setImgOk] = useState(false)
  return (
    <Link to={sub.route} title={`SIBIRI ${sub.name}`}>
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.15 }}
        className="flex items-center justify-center rounded-xl overflow-hidden cursor-pointer"
        style={{
          width: size, height: size,
          background: '#fff',
          boxShadow: `0 0 0 2px ${sub.color}70`,
          border: `1px solid ${sub.color}50`,
          isolation: 'isolate',
        }}
      >
        <img
          src={sub.logo}
          alt={sub.name}
          onLoad={() => setImgOk(true)}
          onError={() => setImgOk(false)}
          style={{
            width: size - 8, height: size - 8,
            objectFit: 'contain',
            display: imgOk ? 'block' : 'none',
            imageRendering: '-webkit-optimize-contrast',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            filter: 'contrast(1.02)',
          }}
        />
        {!imgOk && <span style={{ fontSize: size * 0.45 }}>{sub.icon}</span>}
      </motion.div>
    </Link>
  )
}

// ─── Orbites concentriques ────────────────────────────────────────────────────
const SubsidiaryOrbits = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.4, duration: 1.0 }}
    className="absolute inset-0 flex items-center justify-center overflow-hidden"
  >
    {/* Centre : logo SIBIRI Holding */}
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.7, duration: 0.8 }}
      className="relative z-10 flex flex-col items-center justify-center rounded-2xl overflow-hidden"
      style={{
        width: 72, height: 72,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(201,168,76,0.35)',
        boxShadow: '0 0 30px 6px rgba(201,168,76,0.15)',
      }}
    >
      <img src="/SIBIRI%20Holding.png" alt="SIBIRI" style={{ width: 58, height: 58, objectFit: 'contain' }} />
    </motion.div>

    {/* Orbite externe : rayon=148, sens horaire */}
    <OrbitingCircles radius={148} speed={0.7} iconSize={62} pathColor="rgba(201,168,76,0.15)">
      <OrbitLogo sub={SUBSIDIARIES[0]} size={58} />
      <OrbitLogo sub={SUBSIDIARIES[2]} size={58} />
      <OrbitLogo sub={SUBSIDIARIES[4]} size={58} />
    </OrbitingCircles>

    {/* Orbite interne : rayon=85, sens anti-horaire */}
    <OrbitingCircles radius={85} speed={1.1} iconSize={54} reverse pathColor="rgba(201,168,76,0.10)">
      <OrbitLogo sub={SUBSIDIARIES[1]} size={50} />
      <OrbitLogo sub={SUBSIDIARIES[3]} size={50} />
    </OrbitingCircles>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.6 }}
      className="absolute bottom-8 left-0 right-0 text-center text-[9px] font-black tracking-[0.3em] uppercase pointer-events-none"
      style={{ color: 'rgba(201,168,76,0.55)', fontFamily: "'Inter', sans-serif" }}
    >
      Nos filiales
    </motion.p>
  </motion.div>
)

// ─── Vague de fin de section (bord bas = vague) ──────────────────────────────
const WaveBorder = () => (
  <div
    className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
    style={{ height: 90 }}
  >
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* Zone sombre sous la vague = transition vers la 2e bannière (#07080f) */}
      <path
        d="M0,45 C240,20 480,70 720,45 C960,20 1200,70 1440,45 L1440,90 L0,90 Z"
        fill="#07080f"
      />
      {/* Ligne dorée sur la crête */}
      <path
        d="M0,45 C240,20 480,70 720,45 C960,20 1200,70 1440,45"
        fill="none"
        stroke="rgba(201,168,76,0.50)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
)

// ─── Hero principal ───────────────────────────────────────────────────────────
export const LogoParticlesHero = () => {
  const textControls   = useAnimation()
  const buttonControls = useAnimation()

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap'
    link.rel  = 'stylesheet'
    document.head.appendChild(link)

    textControls.start(i => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08 + 1.2, duration: 1.0, ease: [0.2, 0.65, 0.3, 0.9] }
    }))
    buttonControls.start({ opacity: 1, transition: { delay: 2.4, duration: 1 } })

    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [textControls, buttonControls])

  return (
    <div
      className="relative h-screen w-full overflow-hidden grid grid-cols-1 md:grid-cols-2"
      style={{ background: '#1D1D1B' }}
    >
      {/* ── Col 1 : Texte ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-12 h-screen md:h-full pb-36 pt-20 md:pt-0 md:pb-0">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-[10px] font-black tracking-[0.35em] uppercase mb-4"
          style={{ color: 'rgba(201,168,76,0.7)', fontFamily: "'Inter', sans-serif" }}
        >
          SIBIRI GROUP
        </motion.p>

        <h1
          className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <motion.span
            className="block fluid-hologram"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            Imaginer aujourd'hui,
          </motion.span>
          <motion.span
            className="block fluid-hologram-line2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            construire l'Afrique
          </motion.span>
          <motion.span
            className="block fluid-hologram-line2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            de demain
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-sm leading-relaxed max-w-xs mb-8"
          style={{ color: '#646363', fontFamily: "'Inter', sans-serif" }}
        >
          Un groupe multisectoriel engagé pour le développement durable de l'Afrique.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 0.8 }}>
          <Link
            to="/global-construction"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.35)',
              color: '#C9A84C',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Explorer nos filiales
          </Link>
        </motion.div>
      </div>

      {/* ── Col 2 : Particules Three.js (desktop uniquement) ──────── */}
      <div className="hidden md:block relative overflow-hidden">
        <LogoParticlesCanvas logoSrc="/SIBIRI%20Holding.png" />
      </div>

      {/* ── Vagues de séparation bas du hero ─────────────────────── */}
      <WaveBorder />
    </div>
  )
}
