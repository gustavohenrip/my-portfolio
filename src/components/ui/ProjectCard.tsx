'use client'

import { useRef, useEffect, useState, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '@/lib/store'
import { Reveal } from '@/components/ui/Reveal'
import { GlitchText } from '@/components/ui/GlitchText'

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  id: string
  title: string
  type: string
  tech: string[]
  year: string
  image: string
  link: string
  index: number
}

export const ProjectCard = memo(function ProjectCard({ id, title, type, tech, year, image, link, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { setCursorType } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const card = cardRef.current
    const imageEl = imageRef.current
    if (!card || !imageEl) return

    const ctx = gsap.context(() => {
      gsap.set(imageEl, { scale: 1.2, opacity: 0, filter: 'blur(10px) brightness(1.5)' })

      const onEnter = () => {
        setIsHovered(true)
        gsap.to(imageEl, {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 0.8,
          ease: "power2.out"
        })
      }

      const onLeave = () => {
        setIsHovered(false)
        gsap.to(imageEl, {
          scale: 1.2,
          opacity: 0,
          filter: 'blur(10px) brightness(1.5)',
          duration: 0.6,
          ease: "power2.out"
        })
      }

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        gsap.to(imageEl, {
          x: (x - rect.width / 2) * 0.15,
          y: (y - rect.height / 2) * 0.15,
          duration: 0.5,
          ease: "power2.out"
        })
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
      card.addEventListener('mousemove', onMove)

      return () => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
        card.removeEventListener('mousemove', onMove)
      }
    }, card)

    return () => ctx.revert()
  }, [isMobile])

  useEffect(() => {
    const imageEl = imageRef.current
    if (!imageEl) return
    if (!isHovered) {
      gsap.killTweensOf(imageEl)
      gsap.set(imageEl, { x: 0, y: 0, scale: 1.2, opacity: 0, filter: 'blur(10px) brightness(1.5)' })
    }
  }, [isHovered])

  return (
    <Reveal delay={index * 0.1}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        ref={cardRef}
        className="group block relative border-t border-accent/20 py-6 md:py-12 cursor-pointer hover:bg-accent/5 transition-colors"
        onMouseEnter={() => !isMobile && setCursorType('project')}
        onMouseLeave={() => !isMobile && setCursorType('default')}
        onPointerEnter={() => !isMobile && setIsHovered(true)}
        onPointerLeave={() => !isMobile && setIsHovered(false)}
      >
        <div
          ref={imageRef}
          className="absolute right-12 top-1/2 -translate-y-1/2 w-[300px] h-[200px] pointer-events-none z-20 hidden md:block"
        >
          <div className="relative w-full h-full overflow-hidden border border-accent/30">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image || '/api/placeholder/300/200'})`, filter: 'saturate(0.8)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-accent/60">
              [IMG_DATA_LOADED]
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-4 md:gap-12">
            <span className="text-4xl md:text-7xl font-mono font-bold text-accent/30 group-hover:text-accent transition-colors duration-500 smooth-transform glow-text">
              {id}
            </span>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-4xl font-display font-medium uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500 smooth-transform truncate md:whitespace-nowrap">
                <GlitchText text={title} glitchOnHover />
              </h3>
              <p className="text-xs md:text-sm font-mono text-accent/60 mt-1 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">[{type}]</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-8 md:ml-auto md:mr-80 pl-14 md:pl-0">
            <div className="flex gap-1 md:gap-2 flex-wrap">
              {tech.slice(0, isMobile ? 3 : tech.length).map((t, i) => (
                <span 
                  key={i} 
                  className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 border border-accent/20 text-muted group-hover:text-accent group-hover:border-accent/50 transition-all duration-300 smooth-transform"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {t}
                </span>
              ))}
              {isMobile && tech.length > 3 && (
                <span className="text-[9px] font-mono text-muted">+{tech.length - 3}</span>
              )}
            </div>
            
            <span className="text-xs md:text-sm font-mono text-muted group-hover:text-accent transition-colors">
              [{year}]
            </span>
            
            <div className="ml-auto md:ml-0 opacity-100 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-700 ease-out" 
          style={{ boxShadow: isHovered ? '0 0 10px rgb(0, 212, 255)' : 'none' }}
        />
      </a>
    </Reveal>
  )
})

