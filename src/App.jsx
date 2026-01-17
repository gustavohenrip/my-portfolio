import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from './data/portfolio.json'
import { useStore } from './lib/store'
import { MagneticButton } from './components/ui/MagneticButton'
import { ProjectCard } from './components/ui/ProjectCard'
import { SkillGrid } from './components/ui/SkillGrid'
import { ContactSection } from './components/layout/ContactSection'
import { Footer } from './components/layout/Footer'
import { ChapterNav } from './components/ui/ChapterNav'
import { ScrollIndicator } from './components/ui/ScrollIndicator'
import { GlitchText, TypewriterText } from './components/ui/GlitchText'
import { Navigation } from './components/layout/Navigation'
import { Preloader } from './components/ui/Preloader'
import { CustomCursor } from './components/ui/CustomCursor'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { HeroBackground } from './components/3d/HeroBackground'

gsap.registerPlugin(ScrollTrigger)

const resolveAssetUrl = (path) => {
  if (!path) return path
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL || '/'
  if (path.startsWith('/')) return `${base}${path.slice(1)}`
  return `${base}${path}`
}

function AnimatedCounter({ value, suffix = '+' }) {
  const ref = useRef(null)
  const count = useMotionValue(0)
  const springValue = useSpring(count, { stiffness: 60, damping: 20, restDelta: 0.01 })
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const numValue = parseInt(value.replace(/\D/g, ''))

  useEffect(() => {
    count.set(isInView ? numValue : 0)
  }, [isInView, numValue, count])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

function TextReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-50px" })

  return (
    <span ref={ref} className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function ParallaxSection({ children, speed = 0.5 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  return <motion.div ref={ref} style={{ y: smoothY }}>{children}</motion.div>
}

function FadeInWhenVisible({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-80px" })
  const directions = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { x: 60, y: 0 }, right: { x: -60, y: 0 } }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function CyberMarquee({ children, direction = 'left' }) {
  const text = Array(8).fill(children).join(' // ')
  return (
    <div className="overflow-hidden py-8 border-y border-accent/20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <motion.div
        className="whitespace-nowrap"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <span className="text-[10vw] md:text-[6vw] font-mono font-bold uppercase tracking-tight text-accent/[0.08] select-none">
          {text}
        </span>
      </motion.div>
    </div>
  )
}

function ScreenGlitch() {
  const [glitchArea, setGlitchArea] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const x = Math.random() * 70
        const y = Math.random() * 70
        const w = 15 + Math.random() * 25
        const h = 12 + Math.random() * 22
        const sliceCount = 8 + Math.floor(Math.random() * 12)
        const slices = []
        for (let i = 0; i < sliceCount; i++) {
          slices.push({
            id: i,
            offsetY: (i / sliceCount) * 100,
            shiftX: (Math.random() - 0.5) * 30,
            skew: (Math.random() - 0.5) * 8,
            scaleX: 0.95 + Math.random() * 0.12,
            chromaShift: (Math.random() - 0.5) * 6
          })
        }
        setGlitchArea({ active: true, x, y, w, h, slices })
        setTimeout(() => setGlitchArea(null), 180 + Math.random() * 280)
      }
    }, 1200)
    return () => clearInterval(interval)
  }, [isMobile])

  if (!glitchArea || isMobile) return null

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${glitchArea.x}%`,
          top: `${glitchArea.y}%`,
          width: `${glitchArea.w}%`,
          height: `${glitchArea.h}%`
        }}
      >
        {glitchArea.slices.map(s => (
          <div
            key={s.id}
            className="absolute left-0 right-0"
            style={{
              top: `${s.offsetY}%`,
              height: `${100 / glitchArea.slices.length}%`,
              transform: `translateX(${s.shiftX}px) skewX(${s.skew}deg) scaleX(${s.scaleX})`,
              backdropFilter: `blur(1px) hue-rotate(${s.chromaShift}deg) saturate(1.3)`,
              WebkitBackdropFilter: `blur(1px) hue-rotate(${s.chromaShift}deg) saturate(1.3)`,
              borderTop: Math.random() > 0.7 ? '1px solid rgba(0,212,255,0.15)' : 'none',
              borderBottom: Math.random() > 0.7 ? '1px solid rgba(255,0,100,0.1)' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  )
}

function Home() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const { setCursorType, isLoading, mousePosition } = useStore()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (isLoading) return
    const ctx = gsap.context(() => {
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [isLoading])

  if (isLoading) return null

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden">
      <ScreenGlitch />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] origin-left" 
        style={{ scaleX, boxShadow: '0 0 10px rgb(0, 212, 255), 0 0 20px rgb(0, 212, 255, 0.5)' }} 
      />
      <ChapterNav />
      
      <section ref={heroRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="parallax-bg absolute inset-0 z-0 pointer-events-none"><HeroBackground /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none z-5">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        </div>

        <div className="relative z-20 text-center px-6 w-full max-w-none mx-auto">
          <motion.div 
            className="mb-6" 
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
            transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-block text-xs md:text-sm font-mono text-accent uppercase tracking-[0.3em] border border-accent/30 px-4 py-2 backdrop-blur-sm relative overflow-hidden group">
              <span className="relative z-10">[{data.profile.role}]</span>
              <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </span>
          </motion.div>

          <h1 className="text-[12vw] md:text-[10.5vw] lg:text-[9vw] font-display font-bold uppercase leading-[0.92] tracking-tighter mb-6 md:mb-8">
            <span className="block overflow-visible">
              <motion.span 
                className="inline-flex items-baseline relative" 
                initial={{ y: '120%', rotateX: -80 }} 
                animate={{ y: 0, rotateX: 0 }} 
                transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <GlitchText text="MONAY" className="text-foreground inline-block" glitchOnHover />
                <GlitchText text="ZERA" className="text-accent glow-text inline-block" glitchOnHover />
              </motion.span>
            </span>
          </h1>

          <motion.div 
            className="text-sm md:text-xl font-mono text-muted max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 px-2" 
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-accent">{'>'}</span> <TypewriterText text={data.profile.headline} delay={1500} speed={30} />
          </motion.div>

          <motion.div 
            className="flex justify-center gap-4 md:gap-8" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton strength={0.3}>
              <a 
                href="#projects" 
                className="group relative flex items-center gap-2 md:gap-4 text-xs md:text-sm font-mono uppercase tracking-[0.15em] md:tracking-[0.2em] px-4 md:px-8 py-3 md:py-4 bg-transparent border border-accent/50 overflow-hidden transition-all duration-500 hover:border-accent cyber-border"
                onMouseEnter={() => setCursorType('pointer')} 
                onMouseLeave={() => setCursorType('default')}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <div className="absolute inset-0 bg-accent/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
                <span className="relative z-10 group-hover:text-accent transition-colors duration-500">[VIEW_WORK]</span>
                <motion.svg 
                  className="relative z-10 w-3 h-3 md:w-4 md:h-4 text-accent" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  animate={{ y: [0, 4, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <ScrollIndicator />

        <motion.div 
          className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 z-20 hidden md:block" 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col gap-4 text-[10px] font-mono text-accent/60 -rotate-90 origin-left translate-x-4">
            <span>[2026]</span>
            <span className="w-8 h-[1px] bg-accent/40" />
            <span>[PORTFOLIO.v2]</span>
          </div>
        </motion.div>

        <motion.div 
          className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-20 hidden md:flex flex-col gap-6" 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[
            { name: 'LI', url: 'https://www.linkedin.com/in/gustavohpuhlmann/' }, 
            { name: 'GH', url: 'https://github.com/gustavohenrip' }, 
            { name: 'IG', url: 'https://www.instagram.com/monayzera/' }
          ].map((social) => (
            <MagneticButton key={social.name} strength={0.5}>
              <motion.a 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-mono uppercase text-foreground/70 hover:text-accent transition-colors group" 
                onMouseEnter={() => setCursorType('pointer')} 
                onMouseLeave={() => setCursorType('default')} 
                whileHover={{ scale: 1.2 }}
              >
                <span className="group-hover:animate-glitch">[{social.name}]</span>
              </motion.a>
            </MagneticButton>
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-8 text-[10px] font-mono text-accent/30 hidden md:block">
          <div>{'>'} SYS.STATUS: ONLINE</div>
          <div>{'>'} ENCRYPT: AES-256</div>
        </div>

        <div className="absolute bottom-8 right-8 text-[10px] font-mono text-accent/30 hidden md:block text-right">
          <div>COORDS: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}</div>
          <div>NODE: ACTIVE</div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-y border-accent/20 overflow-hidden relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5" />
        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
            {[
              { label: 'Years Exp', value: data.stats.years_experience },
              { label: 'Projects', value: data.stats.projects_shipped },
              { label: 'Technologies', value: data.stats.technologies },
              { label: 'Clients', value: data.stats.clients_happy }
            ].map((stat, i) => (
              <FadeInWhenVisible key={stat.label} delay={i * 0.1}>
                <motion.div 
                  className="text-center group cursor-default p-3 md:p-6 border border-transparent hover:border-accent/30 transition-all duration-300" 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 212, 255, 0.05)' }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-3xl md:text-6xl font-mono font-bold text-accent block group-hover:scale-110 transition-transform glow-text">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <p className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-muted mt-1 md:mt-2">[{stat.label}]</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-3" />
        <motion.div 
          className="absolute top-24 left-4 md:left-12 pointer-events-none select-none" 
          initial={{ opacity: 0, x: -100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[8rem] md:text-[18rem] font-mono font-bold leading-none text-accent/[0.03]">01</span>
        </motion.div>

        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <FadeInWhenVisible>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="text-[10px] md:text-xs font-mono text-accent uppercase tracking-widest">[CHAPTER_01]</span>
              <motion.span 
                className="h-[1px] bg-accent" 
                initial={{ width: 0 }} 
                whileInView={{ width: 64 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8, delay: 0.3 }} 
              />
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1}>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight mb-10 md:mb-16">
              <GlitchText text="About" decryptEffect delay={500} className="glow-text" />
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
            <FadeInWhenVisible direction="left">
              <ParallaxSection speed={0.2}>
                <div className="relative w-full aspect-[4/5] max-w-sm md:max-w-md mx-auto lg:mx-0">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-secondary/20 blur-3xl" 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} 
                    transition={{ duration: 4, repeat: Infinity }} 
                  />
                  <motion.div 
                    className="relative w-full h-full overflow-hidden border border-accent/30 bg-surface shadow-2xl scanline-overlay" 
                    whileHover={{ scale: 1.02 }} 
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img 
                      src={resolveAssetUrl(data.profile.photo)} 
                      alt={data.profile.name} 
                      className="w-full h-full object-cover object-top animate-pixel-render" 
                      style={{ filter: 'contrast(1.1) brightness(0.95) saturate(0.9)' }} 
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 glass p-4 border border-accent/20">
                      <p className="text-xs font-mono text-accent uppercase tracking-wider">[LOCATION]</p>
                      <p className="text-sm font-medium">{data.profile.location}</p>
                    </div>
                    <div className="absolute top-4 right-4 text-[8px] font-mono text-accent/50">
                      <div>RES: 1920x1080</div>
                      <div>STATUS: ONLINE</div>
                    </div>
                  </motion.div>
                </div>
              </ParallaxSection>
            </FadeInWhenVisible>

            <div>
              <FadeInWhenVisible delay={0.2} direction="right">
                <p className="text-lg md:text-2xl font-light leading-relaxed mb-6 md:mb-8 text-foreground/90">
                  <span className="text-accent font-mono">{'>'}</span> {data.profile.summary}
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.3} direction="right">
                <p className="text-sm md:text-base text-muted leading-relaxed mb-6 md:mb-8 font-mono">
                  {data.profile.about}
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.4} direction="right">
                <div className="space-y-3 md:space-y-4">
                  {data.experience.map((exp, i) => (
                    <motion.div 
                      key={i} 
                      className="group border-l-2 border-accent/30 pl-4 md:pl-6 py-3 md:py-4 hover:border-accent transition-colors hover:bg-accent/5" 
                      whileHover={{ x: 8 }} 
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 md:mb-2 gap-1">
                        <h4 className="text-base md:text-lg font-display font-medium group-hover:text-accent transition-colors">
                          <GlitchText text={exp.role} glitchOnHover />
                        </h4>
                        <span className="text-[10px] md:text-xs font-mono text-accent">[{exp.period}]</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted font-mono">{exp.company}</p>
                      <p className="text-xs md:text-sm text-muted/70 mt-1 md:mt-2">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeInWhenVisible>
            </div>
          </div>

          <div className="mt-20 md:mt-32">
            <FadeInWhenVisible>
              <h3 className="text-xs md:text-sm font-mono text-accent uppercase tracking-widest mb-6 md:mb-8">[WHY_WORK_WITH_ME]</h3>
            </FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
              {data.highlights.map((highlight, i) => (
                <FadeInWhenVisible key={highlight.title} delay={i * 0.1}>
                  <motion.div 
                    className="p-4 md:p-6 bg-surface/50 border border-accent/20 h-full hover:border-accent/50 transition-all group" 
                    whileHover={{ y: -8, boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)' }} 
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-accent/50 font-mono text-[10px] md:text-xs mb-1 md:mb-2">[0{i + 1}]</div>
                    <h4 className="text-base md:text-lg font-display font-medium mb-1 md:mb-2 group-hover:text-accent transition-colors">{highlight.title}</h4>
                    <p className="text-xs md:text-sm text-muted">{highlight.description}</p>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>
            <FadeInWhenVisible>
              <h3 className="text-xs md:text-sm font-mono text-accent uppercase tracking-widest mb-8 md:mb-12">[TECH_STACK]</h3>
            </FadeInWhenVisible>
            <SkillGrid skills={data.skills} />
          </div>
        </div>
      </section>

      <CyberMarquee>DEVELOPER // ENGINEER // CREATIVE</CyberMarquee>

      <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-3" />
        <motion.div 
          className="absolute top-24 left-4 md:left-12 pointer-events-none select-none" 
          initial={{ opacity: 0, x: -100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[8rem] md:text-[18rem] font-mono font-bold leading-none text-accent/[0.03]">02</span>
        </motion.div>

        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <FadeInWhenVisible>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="text-[10px] md:text-xs font-mono text-accent uppercase tracking-widest">[CHAPTER_02]</span>
              <motion.span 
                className="h-[1px] bg-accent" 
                initial={{ width: 0 }} 
                whileInView={{ width: 64 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8, delay: 0.3 }} 
              />
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1}>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight mb-10 md:mb-16">
              <GlitchText text="Selected Works" decryptEffect delay={500} className="glow-text" />
            </h2>
          </FadeInWhenVisible>

          <div className="flex flex-col">
            {data.projects.map((project, index) => (
              <FadeInWhenVisible key={project.id} delay={index * 0.1}>
                <ProjectCard {...project} index={index} />
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible delay={0.2}>
            <div className="mt-12 md:mt-16 flex justify-center">
              <MagneticButton strength={0.3}>
                <motion.a 
                  href={data.profile.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-2 md:gap-4 px-4 md:px-8 py-3 md:py-4 border border-accent/30 hover:border-accent transition-all cyber-border" 
                  onMouseEnter={() => setCursorType('pointer')} 
                  onMouseLeave={() => setCursorType('default')} 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 212, 255, 0.1)' }}
                >
                  <span className="text-xs md:text-sm font-mono uppercase tracking-wider">[VIEW_ALL_PROJECTS]</span>
                  <motion.svg 
                    className="w-3 h-3 md:w-4 md:h-4 text-accent" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    animate={{ x: [0, 4, 0] }} 
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.a>
              </MagneticButton>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <CyberMarquee direction="right">PRECISION // PERFORMANCE // EXCELLENCE</CyberMarquee>

      <ContactSection />
      <Footer />
    </div>
  )
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll>
        <Navigation />
        <main className="relative z-10 min-h-screen">
          <Home />
        </main>
      </SmoothScroll>
    </>
  )
}

export default App
