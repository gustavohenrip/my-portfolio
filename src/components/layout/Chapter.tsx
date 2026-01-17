'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '@/lib/store'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'

gsap.registerPlugin(ScrollTrigger)

interface ChapterProps {
  number: string
  title: string
  children: React.ReactNode
  className?: string
  id?: string
}

export function Chapter({ number, title, children, className = '', id }: ChapterProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { setActiveChapter } = useStore()

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveChapter(parseInt(number) - 1),
        onEnterBack: () => setActiveChapter(parseInt(number) - 1)
      })
    }, containerRef)

    return () => ctx.revert()
  }, [number, setActiveChapter])

  return (
    <section ref={containerRef} id={id} className={`relative min-h-screen py-24 md:py-32 overflow-hidden ${className}`}>
      <motion.div 
        className="absolute top-24 left-6 md:left-12 pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[10rem] md:text-[15rem] font-display font-bold leading-none text-[rgb(var(--foreground)/0.03)] dark:text-white/5 select-none">
            {number}
          </span>
        </div>
      </motion.div>
      
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              Chapter {number}
            </span>
            <motion.span 
              className="h-[1px] bg-accent"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
          <SplitText className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight">
            {title}
          </SplitText>
        </motion.div>
        
        {children}
      </div>
    </section>
  )
}
