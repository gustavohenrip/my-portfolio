'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  blur?: boolean
}

export function Reveal({ children, className = '', delay = 0, direction = 'up', blur = false }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { x: 60, y: 0 },
        right: { x: -60, y: 0 }
      }

      gsap.fromTo(containerRef.current,
        { 
          ...directions[direction], 
          opacity: 0,
          filter: blur ? 'blur(10px)' : 'none'
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [delay, direction, blur])

  return (
    <div ref={containerRef} className={`smooth-transform ${className}`}>
      {children}
    </div>
  )
}
