'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MarqueeProps {
  children: string
  speed?: number
  className?: string
  direction?: 'left' | 'right'
}

export function Marquee({ children, speed = 30, className = '', direction = 'left' }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState(1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = textRef.current
      const container = containerRef.current
      if (!text || !container) return

      const baseDirection = direction === 'left' ? -1 : 1
      let xPercent = 0
      let lastScrollY = window.scrollY

      const animate = () => {
        const targetPercent = baseDirection * 50
        xPercent += (baseDirection * scrollDirection * 0.5)
        
        if (baseDirection === -1 && xPercent <= -50) xPercent = 0
        if (baseDirection === 1 && xPercent >= 50) xPercent = 0
        
        gsap.set(text, { xPercent })
        requestAnimationFrame(animate)
      }

      const handleScroll = () => {
        const currentScrollY = window.scrollY
        const diff = currentScrollY - lastScrollY
        setScrollDirection(diff > 0 ? 1 : -1)
        lastScrollY = currentScrollY
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      const animationId = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        cancelAnimationFrame(animationId)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [direction, scrollDirection])

  const repeatedText = Array(10).fill(children).join(' — ')

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap py-8 ${className}`}>
      <div ref={textRef} className="inline-block smooth-transform">
        <span className="text-[15vw] md:text-[10vw] font-display font-bold uppercase tracking-tighter text-[rgb(var(--foreground)/0.04)] dark:text-white/5 select-none">
          {repeatedText}
        </span>
      </div>
    </div>
  )
}
