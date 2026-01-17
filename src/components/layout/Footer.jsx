import { useRef, useState, useEffect, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'
import { useStore } from '../../lib/store'

export const Footer = memo(function Footer() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const { setCursorType } = useStore()
  const currentYear = new Date().getFullYear()
  const [time, setTime] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
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
    <footer ref={containerRef} className="relative py-8 md:py-16 border-t border-accent/20 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-3" />
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          <motion.div 
            className="flex flex-col gap-1 md:gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl md:text-3xl font-display font-bold tracking-tighter">
              <span className="text-foreground">Monay</span>
              <span className="text-accent glow-text">zera</span>
            </span>
            <span className="text-[10px] md:text-xs font-mono text-accent/60">
              [DRIVEN_BY_LOGIC // DESIGNED_FOR_SPEED]
            </span>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 md:gap-4">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <MagneticButton key={item} strength={0.3}>
                  <motion.a
                    href={item === 'Home' ? '#hero' : `#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item === 'Home' ? '#hero' : `#${item.toLowerCase()}`)}
                    className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-muted hover:text-accent transition-all group"
                    onMouseEnter={() => !isMobile && setCursorType('pointer')}
                    onMouseLeave={() => !isMobile && setCursorType('default')}
                    whileHover={isMobile ? {} : { scale: 1.1 }}
                  >
                    <span className="text-accent/30 group-hover:text-accent">[</span>
                    {item}
                    <span className="text-accent/30 group-hover:text-accent">]</span>
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[9px] md:text-[10px] font-mono text-muted uppercase tracking-[0.15em] md:tracking-[0.2em] text-center md:text-left">
            {currentYear} MONAYZERA // ALL RIGHTS RESERVED
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] md:text-[10px] font-mono text-accent/40">
            <span>SYS.TIME: {time}</span>
            <span className="hidden md:inline">NODE: ACTIVE</span>
            <span>v2.0.26</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </footer>
  )
})
