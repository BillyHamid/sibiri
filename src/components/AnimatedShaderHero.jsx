import { useRef, useEffect } from 'react'
import { cn } from '../lib/utils'

const DEFAULT_SHADER_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float h(vec2 p){
  p=fract(p*vec2(127.1,311.7));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float n(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),
             mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<6;i++){
    v+=a*n(p);
    p=mat2(1.6,1.2,-1.2,1.6)*p;
    a*=.5;
  }
  return v;
}

void main(){
  vec2 uv=(FC-.5*R)/MN;
  float slow=T*.1;

  // ── Pétrole brut : texture visqueuse sombre ───────────────────
  float f1=fbm(uv*1.3+vec2(slow,slow*.6));
  float f2=fbm(uv*2.1+vec2(f1,f1*.6)+slow*.8);
  float f3=fbm(uv*3.5+f2*vec2(1.,.7)+slow*.5);

  vec3 crude1=vec3(.018,.008,.003);
  vec3 crude2=vec3(.08,.035,.010);
  vec3 crude3=vec3(.18,.07,.020);
  vec3 col=mix(crude1,crude2,f2);
  col=mix(col,crude3,f3*f3*.75);

  // ── Torchère – flamme de raffinerie ───────────────────────────
  float hy=uv.y+.55;
  float hx=uv.x;

  float wNoise=fbm(vec2(hx+T*.06,hy*2.+T*.04))*.3;
  float flameCX=.05+wNoise*(1.-clamp(hy,0.,1.));
  float flameW=.05+.10*max(0.,1.-hy*2.5);
  float fdist=abs(hx-flameCX)/max(flameW,.001);
  float flameH=max(0.,.48-hy*.95);
  float flicker=.75+.25*sin(T*7.5+hy*18.);
  float flameShape=(1.-smoothstep(.4,1.5,fdist))*flameH*flicker;
  float coreShape=(1.-smoothstep(.0,.4,fdist))*flameH;

  float glowH=exp(-max(0.,hy)*2.5)*(.5+.5*fbm(vec2(hx*1.2+T*.03,T*.06)));

  vec3 cEdge=vec3(.902,.149,.188); // #E62630 exact
  vec3 cMid =vec3(.98,.38,.05);
  vec3 cCore=vec3(.99,.90,.45);
  vec3 cGlow=vec3(.50,.05,.07);

  vec3 flamCol=mix(cEdge,cMid,clamp(flameShape*1.2,0.,1.));
  flamCol=mix(flamCol,cCore,coreShape*coreShape);
  col+=flamCol*(flameShape*1.8);
  col+=cGlow*glowH*.7;
  col+=cGlow*exp(-length(vec2(hx-flameCX,hy+.05)*vec2(1.,.6))*2.5)*.3;

  // ── Reflets irisés sur l'huile ────────────────────────────────
  float iri=fbm(uv*3.+T*.03);
  float iriM=smoothstep(.28,.65,f2)*(1.-smoothstep(0.,.55,hy));
  vec3 iridC=.055*(cos(iri*6.283*3.+vec3(0.,2.094,4.189))+1.);
  col+=iridC*iriM;

  // ── Fumée sombre (partie haute) ───────────────────────────────
  float smk=fbm(uv*.75+vec2(T*.03,T*.02));
  float smkM=smoothstep(.05,.7,uv.y+.25);
  col=mix(col,vec3(.015,.008,.006),smk*smkM*.38);

  // ── Vignette + Tone + Gamma ───────────────────────────────────
  float vign=1.-dot(uv*.65,uv*.65);
  col*=smoothstep(0.,.5,vign);
  col=col/(col+.32);
  col=pow(max(col,vec3(0.)),vec3(.80));

  O=vec4(col,1.);
}`

class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas
    this.scale = scale
    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false })
    if (!gl) throw new Error('WebGL2 unavailable')
    this.gl = gl
    gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
    this.shaderSource = DEFAULT_SHADER_SOURCE
    this.program = null
    this.vs = null
    this.fs = null
    this.buffer = null
    this.mouseMove = [0, 0]
    this.mouseCoords = [0, 0]
    this.pointerCoords = [0, 0]
    this.nbrOfPointers = 0
    this.uniforms = {}
    this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`
    this.vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1])
  }

  updateShader(source) {
    this.reset()
    this.shaderSource = source
    this.setup()
    this.init()
  }

  updateMove(deltas) {
    this.mouseMove = deltas
  }

  updateMouse(coords) {
    this.mouseCoords = coords
  }

  updatePointerCoords(coords) {
    this.pointerCoords = coords
  }

  updatePointerCount(nbr) {
    this.nbrOfPointers = nbr
  }

  updateScale(scale) {
    this.scale = scale
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale)
  }

  compile(shader, source) {
    const gl = this.gl
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile:', gl.getShaderInfoLog(shader))
    }
  }

  test(source) {
    const gl = this.gl
    const shader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    let result = null
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader)
    }
    gl.deleteShader(shader)
    return result
  }

  reset() {
    const gl = this.gl
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs)
        gl.deleteShader(this.vs)
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs)
        gl.deleteShader(this.fs)
      }
      gl.deleteProgram(this.program)
    }
    this.program = null
    this.vs = null
    this.fs = null
    this.buffer = null
  }

  setup() {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER)
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)
    this.compile(this.vs, this.vertexSrc)
    this.compile(this.fs, this.shaderSource)
    this.program = gl.createProgram()
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program))
    }
  }

  init() {
    const gl = this.gl
    const program = this.program
    if (!program) return

    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    this.uniforms = {
      resolution: gl.getUniformLocation(program, 'resolution'),
      time: gl.getUniformLocation(program, 'time'),
      move: gl.getUniformLocation(program, 'move'),
      touch: gl.getUniformLocation(program, 'touch'),
      pointerCount: gl.getUniformLocation(program, 'pointerCount'),
      pointers: gl.getUniformLocation(program, 'pointers'),
    }
  }

  render(now = 0) {
    const gl = this.gl
    const program = this.program
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)

    const u = this.uniforms
    if (u.resolution) gl.uniform2f(u.resolution, this.canvas.width, this.canvas.height)
    if (u.time) gl.uniform1f(u.time, now * 1e-3)
    if (u.move) gl.uniform2f(u.move, this.mouseMove[0], this.mouseMove[1])
    if (u.touch) gl.uniform2f(u.touch, this.mouseCoords[0], this.mouseCoords[1])
    if (u.pointerCount) gl.uniform1i(u.pointerCount, this.nbrOfPointers)
    if (u.pointers) {
      const flat = new Float32Array(Math.max(4, this.pointerCoords.length))
      for (let i = 0; i < this.pointerCoords.length; i++) flat[i] = this.pointerCoords[i]
      gl.uniform2fv(u.pointers, flat)
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

class PointerHandler {
  constructor(canvas, scale) {
    this.scale = scale
    this.active = false
    this.pointers = new Map()
    this.lastCoords = [0, 0]
    this.moves = [0, 0]
    this.signal = new AbortController()
    const { signal } = this.signal

    const map = (el, sc, x, y) => [x * sc, el.height - y * sc]

    canvas.addEventListener(
      'pointerdown',
      (e) => {
        this.active = true
        this.pointers.set(e.pointerId, map(canvas, this.getScale(), e.clientX, e.clientY))
      },
      { signal },
    )

    const onUp = (e) => {
      if (this.count === 1) this.lastCoords = this.first
      this.pointers.delete(e.pointerId)
      this.active = this.pointers.size > 0
    }
    canvas.addEventListener('pointerup', onUp, { signal })
    canvas.addEventListener('pointerleave', onUp, { signal })

    canvas.addEventListener(
      'pointermove',
      (e) => {
        if (!this.active) return
        this.lastCoords = [e.clientX, e.clientY]
        this.pointers.set(e.pointerId, map(canvas, this.getScale(), e.clientX, e.clientY))
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY]
      },
      { signal },
    )
  }

  destroy() {
    this.signal.abort()
  }

  getScale() {
    return this.scale
  }

  updateScale(scale) {
    this.scale = scale
  }

  get count() {
    return this.pointers.size
  }

  get move() {
    return this.moves
  }

  get coords() {
    return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]
  }

  get first() {
    const v = this.pointers.values().next().value
    return v || this.lastCoords
  }
}

function useShaderBackground() {
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const pointersRef = useRef(null)
  const animationFrameRef = useRef(null)

  const resize = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    if (rendererRef.current) rendererRef.current.updateScale(dpr)
    if (pointersRef.current) pointersRef.current.updateScale(dpr)
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
    let renderer
    let pointers
    try {
      renderer = new WebGLRenderer(canvas, dpr)
      pointers = new PointerHandler(canvas, dpr)
    } catch {
      console.warn('[AnimatedShaderHero] WebGL2 non disponible')
      return undefined
    }

    rendererRef.current = renderer
    pointersRef.current = pointers

    renderer.setup()
    renderer.init()

    resize()

    if (renderer.test(DEFAULT_SHADER_SOURCE) === null) {
      renderer.updateShader(DEFAULT_SHADER_SOURCE)
    }

    const loop = (now) => {
      if (!rendererRef.current || !pointersRef.current) return
      rendererRef.current.updateMouse(pointersRef.current.first)
      rendererRef.current.updatePointerCount(pointersRef.current.count)
      rendererRef.current.updatePointerCoords(pointersRef.current.coords)
      rendererRef.current.updateMove(pointersRef.current.move)
      rendererRef.current.render(now)
      animationFrameRef.current = requestAnimationFrame(loop)
    }
    animationFrameRef.current = requestAnimationFrame(loop)

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (pointersRef.current) pointersRef.current.destroy()
      if (rendererRef.current) rendererRef.current.reset()
      rendererRef.current = null
      pointersRef.current = null
    }
  }, [])

  return canvasRef
}

const iconColorClass = (index) => {
  if (index === 0) return 'text-red-300'
  if (index === 1) return 'text-rose-200'
  return 'text-orange-200'
}

/**
 * Hero plein écran avec fond shader WebGL2 (port du bloc « animated-shader-hero »).
 *
 * Mode marque : passez `logo` + `brandTagline` pour remplacer titre + sous-titre (ex. filiale Energy).
 */
export function AnimatedShaderHero({
  trustBadge,
  headline,
  subtitle,
  buttons,
  logo,
  brandTagline,
  className = '',
}) {
  const canvasRef = useShaderBackground()
  const useBrand = Boolean(brandTagline)

  return (
    <div className={cn('relative h-screen w-full overflow-hidden bg-black', className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full touch-none object-contain"
        style={{ background: 'black' }}
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-white">
        {trustBadge ? (
          <div className="shader-hero-fade-in-down mb-8">
            <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-6 py-3 text-sm backdrop-blur-md">
              {trustBadge.icons?.length ? (
                <div className="flex gap-1">
                  {trustBadge.icons.map((icon, index) => (
                    <span key={index} className={iconColorClass(index)}>
                      {icon}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="text-white/90">{trustBadge.text}</span>
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-5xl space-y-6 text-center">
          {useBrand ? (
            <div className="flex flex-col items-center gap-8">
              {logo?.src ? (
                <div className="shader-hero-fade-in-down">
                  <img
                    src={logo.src}
                    alt={logo.alt ?? 'Sibiri Energy'}
                    className="h-16 w-auto max-w-[min(92vw,560px)] object-contain select-none md:h-24"
                    draggable={false}
                  />
                </div>
              ) : null}
              <p
                className="shader-hero-fade-in-up shader-hero-delay-200 max-w-4xl text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: '#ffffff',
                  textShadow: '0 0 32px rgba(230,38,48,0.45), 0 0 8px rgba(230,38,48,0.20)',
                }}
              >
                {brandTagline}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h1 className="shader-hero-fade-in-up shader-hero-delay-200 bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
                  {headline?.line1}
                </h1>
                <h1 className="shader-hero-fade-in-up shader-hero-delay-400 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
                  {headline?.line2}
                </h1>
              </div>

              {subtitle ? (
                <div className="shader-hero-fade-in-up shader-hero-delay-600 mx-auto max-w-3xl">
                  <p className="text-lg font-light leading-relaxed text-orange-100/90 md:text-xl lg:text-2xl">
                    {subtitle}
                  </p>
                </div>
              ) : null}
            </>
          )}

          {buttons ? (
            <div
              className={cn(
                'shader-hero-fade-in-up flex flex-col justify-center gap-4 sm:flex-row',
                useBrand ? 'shader-hero-delay-400 mt-10' : 'shader-hero-delay-800 mt-10',
              )}
            >
              {buttons.primary ? (
                <button
                  type="button"
                  onClick={buttons.primary.onClick}
                  className="rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #B01E27, #E62630)', boxShadow: '0 0 0 0 transparent' }}
                >
                  {buttons.primary.text}
                </button>
              ) : null}
              {buttons.secondary ? (
                <button
                  type="button"
                  onClick={buttons.secondary.onClick}
                  className="rounded-full px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid rgba(230,38,48,0.35)', background: 'rgba(230,38,48,0.12)', color: 'rgba(255,180,180,0.95)' }}
                >
                  {buttons.secondary.text}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
