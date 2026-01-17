'use client'

import { useRef, useEffect, useState, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useStore } from '@/lib/store'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlitchText, TypewriterText } from '@/components/ui/GlitchText'

export const ContactSection = memo(function ContactSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { setCursorType } = useStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section ref={containerRef} id="contact" className="relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-3" />
      <motion.div 
        className="absolute top-24 left-6 md:left-12 pointer-events-none select-none"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="text-[12rem] md:text-[18rem] font-mono font-bold leading-none text-accent/[0.03]">03</span>
      </motion.div>

      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent origin-left" 
        initial={{ scaleX: 0 }} 
        animate={isInView ? { scaleX: 1 } : {}} 
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }} 
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">[CHAPTER_03]</span>
              <motion.span 
                className="h-[1px] bg-accent" 
                initial={{ width: 0 }} 
                animate={isInView ? { width: 64 } : {}} 
                transition={{ duration: 0.8, delay: 0.3 }} 
              />
            </div>
          </motion.div>

          <div className="mb-16 overflow-hidden">
            {['Let\'s create', 'something', 'amazing'].map((text, i) => (
              <div key={text} className="overflow-hidden">
                <motion.h2
                  className={`text-5xl md:text-8xl lg:text-[10rem] font-display font-bold uppercase leading-[0.85] tracking-tighter ${i === 2 ? 'text-accent glow-text' : ''}`}
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <GlitchText text={text} glitchOnHover />
                </motion.h2>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
              <div className="border-l-2 border-accent/30 pl-6">
                <p className="text-lg md:text-xl font-light leading-relaxed text-muted">
                  <span className="text-accent font-mono">{'>'}</span> I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>
              <div className="mt-8 text-xs font-mono text-accent/40 space-y-1">
                <div>{'>'} RESPONSE_TIME: {'<'}24H</div>
                <div>{'>'} AVAILABILITY: OPEN</div>
                <div>{'>'} TIMEZONE: BRT (UTC-3)</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }}>
              <div className="space-y-8">
                <MagneticButton strength={0.2}>
                  <motion.a
                    href="mailto:gustavohpuhlmann@hotmail.com"
                    className="group flex items-center gap-2 md:gap-4 p-3 md:p-4 border border-accent/30 hover:border-accent transition-all hover:bg-accent/5"
                    onMouseEnter={() => !isMobile && setCursorType('pointer')}
                    onMouseLeave={() => !isMobile && setCursorType('default')}
                    whileHover={isMobile ? {} : { x: 8 }}
                  >
                    <span className="text-sm md:text-2xl font-mono group-hover:text-accent transition-colors break-all">
                      <GlitchText text="gustavohpuhlmann@hotmail.com" glitchOnHover />
                    </span>
                    <motion.svg 
                      className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" 
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

                <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
                  {[
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gustavohpuhlmann/' },
                    { name: 'GitHub', url: 'https://github.com/gustavohenrip' },
                    { name: 'Instagram', url: 'https://www.instagram.com/monayzera/' }
                  ].map((social, i) => (
                    <motion.div 
                      key={social.name} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={isInView ? { opacity: 1, y: 0 } : {}} 
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    >
                      <MagneticButton strength={0.3}>
                        <motion.a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs md:text-sm font-mono uppercase tracking-wider text-muted hover:text-accent transition-all px-3 md:px-4 py-2 border border-accent/20 hover:border-accent/50 group inline-block"
                          onMouseEnter={() => !isMobile && setCursorType('pointer')}
                          onMouseLeave={() => !isMobile && setCursorType('default')}
                          whileHover={isMobile ? {} : { scale: 1.05 }}
                        >
                          <span className="text-accent/50 group-hover:text-accent">[</span>
                          {social.name}
                          <span className="text-accent/50 group-hover:text-accent">]</span>
                        </motion.a>
                      </MagneticButton>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-right" 
        initial={{ scaleX: 0 }} 
        animate={isInView ? { scaleX: 1 } : {}} 
        transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }} 
      />
    </section>
  )
})
