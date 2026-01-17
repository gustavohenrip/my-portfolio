'use client'

import { useRef, useEffect, useState, memo } from 'react'
import { motion, useInView } from 'framer-motion'

interface Skill {
  category: string
  tech: string[]
}

interface SkillGridProps {
  skills: Skill[]
}

export const SkillGrid = memo(function SkillGrid({ skills }: SkillGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {skills.map((skill, categoryIndex) => (
        <motion.div
          key={skill.category}
          className="group p-3 md:p-6 border border-accent/20 hover:border-accent/50 transition-all hover:bg-accent/5"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: categoryIndex * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={isMobile ? {} : { boxShadow: '0 0 30px rgba(0, 212, 255, 0.15)' }}
        >
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
            <span className="text-[10px] md:text-xs font-mono text-accent">
              [{String(categoryIndex + 1).padStart(2, '0')}]
            </span>
            <h4 className="text-[10px] md:text-sm font-mono uppercase tracking-wider text-foreground truncate">
              {skill.category}
            </h4>
          </div>
          
          <div className="flex flex-wrap gap-1 md:gap-2">
            {skill.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-1.5 md:px-3 py-0.5 md:py-1.5 text-[9px] md:text-xs font-mono border border-accent/30 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: isMobile ? 0 : categoryIndex * 0.15 + techIndex * 0.05 }}
                whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <div className="mt-2 md:mt-4 text-[7px] md:text-[8px] font-mono text-accent/40">
            {'>'} {skill.tech.length} MODULES
          </div>
        </motion.div>
      ))}
    </div>
  )
})
