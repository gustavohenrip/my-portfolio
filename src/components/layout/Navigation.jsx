import { useRef, useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'
import { useStore } from '../../lib/store'
import { GlitchText } from '../ui/GlitchText'
import data from '../../data/portfolio.json'

const menuItems = [
  { title: 'Home', href: '#hero', chapter: '00' },
  { title: 'About', href: '#about', chapter: '01' },
  { title: 'Projects', href: '#projects', chapter: '02' },
  { title: 'Contact', href: '#contact', chapter: '03' },
]

export const Navigation = memo(function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [glitchLogo, setGlitchLogo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef(null)
  const { setCursorType } = useStore()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isMobile) return
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitchLogo(true)
        setTimeout(() => setGlitchLogo(false), 150)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isMobile])

  const menuVariants = {
    closed: {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  }

  const itemVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    })
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 md:py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'glass border-b border-accent/10' : ''}`}>
        <MagneticButton>
          <a 
            href="#" 
            className="relative group"
            onClick={(e) => handleNavClick(e, '#hero')}
            onMouseEnter={() => {
              if (!isMobile) {
                setCursorType('pointer')
                setGlitchLogo(true)
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                setCursorType('default')
                setGlitchLogo(false)
              }
            }}
          >
            <span className={`text-xl md:text-2xl font-display font-bold tracking-tighter relative ${glitchLogo && !isMobile ? 'animate-glitch' : ''}`}>
              <span className="text-foreground">Monay</span>
              <span className="text-accent">zera</span>
              {glitchLogo && !isMobile && (
                <>
                  <span className="absolute inset-0 text-glitch-1 opacity-70" style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translateX(-2px)' }}>
                    Monayzera
                  </span>
                  <span className="absolute inset-0 text-glitch-2 opacity-70" style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(2px)' }}>
                    Monayzera
                  </span>
                </>
              )}
            </span>
          </a>
        </MagneticButton>

        <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-foreground/70">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>SYSTEM ACTIVE</span>
          </div>
          <MagneticButton strength={0.4}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] flex items-center gap-2 md:gap-4 group"
              onMouseEnter={() => !isMobile && setCursorType('pointer')}
              onMouseLeave={() => !isMobile && setCursorType('default')}
            >
              <span className={`hidden md:block text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-500 ${isOpen ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'} text-foreground/80`}>
                {isOpen ? 'Close' : 'Menu'}
              </span>
              <div className="flex flex-col items-end gap-1.5 w-7 md:w-8 overflow-hidden">
                <span className={`block h-[2px] bg-foreground transition-all duration-500 ease-[0.76,0,0.24,1] ${isOpen ? 'w-7 md:w-8 rotate-45 translate-y-[7px]' : 'w-7 md:w-8'}`} style={{ boxShadow: '0 0 5px rgba(255, 255, 255, 0.6)' }} />
                <span className={`block h-[2px] bg-foreground transition-all duration-500 ease-[0.76,0,0.24,1] ${isOpen ? 'w-0 opacity-0' : 'w-4 md:w-5'}`} style={{ boxShadow: '0 0 5px rgba(255, 255, 255, 0.6)' }} />
                <span className={`block h-[2px] bg-foreground transition-all duration-500 ease-[0.76,0,0.24,1] ${isOpen ? 'w-7 md:w-8 -rotate-45 -translate-y-[7px]' : 'w-7 md:w-8'}`} style={{ boxShadow: '0 0 5px rgba(255, 255, 255, 0.6)' }} />
              </div>
            </button>
          </MagneticButton>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-cyber-grid opacity-5" />
            
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            
            <div className="relative h-full flex flex-col md:flex-row">
              <nav className="flex-1 flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-0">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="overflow-hidden border-b border-accent/10 last:border-0"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group flex items-baseline gap-3 md:gap-8 py-3 md:py-6"
                      onMouseEnter={() => !isMobile && setCursorType('pointer')}
                      onMouseLeave={() => !isMobile && setCursorType('default')}
                    >
                      <span className="text-xs md:text-sm font-mono text-accent/50 group-hover:text-accent transition-colors">
                        [{item.chapter}]
                      </span>
                      <span className="text-3xl md:text-8xl font-display font-medium uppercase tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-accent relative">
                        <GlitchText text={item.title} glitchOnHover />
                      </span>
                      <span className="hidden md:block text-sm font-mono text-accent/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        {'>>'}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0 }}
                className="flex-shrink-0 p-6 md:p-24 flex flex-col justify-end border-t md:border-t-0 md:border-l border-accent/10"
              >
                <div className="space-y-4 md:space-y-8">
                  <div>
                    <p className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent mb-1 md:mb-2">[LOCATION]</p>
                    <p className="text-sm md:text-lg">{data.profile.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent mb-1 md:mb-2">[CONTACT]</p>
                    <a href={`mailto:${data.profile.email}`} className="text-sm md:text-lg hover:text-accent transition-colors break-all">{data.profile.email}</a>
                  </div>
                  <div className="flex flex-wrap gap-4 md:gap-6 pt-2 md:pt-4">
                    <a
                      href={data.profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm font-mono text-muted hover:text-accent transition-all group"
                      onMouseEnter={() => !isMobile && setCursorType('pointer')}
                      onMouseLeave={() => !isMobile && setCursorType('default')}
                    >
                      <span className="text-accent/50 group-hover:text-accent">[</span>
                      LinkedIn
                      <span className="text-accent/50 group-hover:text-accent">]</span>
                    </a>
                    <a
                      href={data.profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm font-mono text-muted hover:text-accent transition-all group"
                      onMouseEnter={() => !isMobile && setCursorType('pointer')}
                      onMouseLeave={() => !isMobile && setCursorType('default')}
                    >
                      <span className="text-accent/50 group-hover:text-accent">[</span>
                      GitHub
                      <span className="text-accent/50 group-hover:text-accent">]</span>
                    </a>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-12 text-[9px] md:text-[10px] font-mono text-accent/30 hidden md:block">
                  <div>{'>'} SECURE CONNECTION</div>
                  <div>{'>'} ENCRYPTION: ACTIVE</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})
