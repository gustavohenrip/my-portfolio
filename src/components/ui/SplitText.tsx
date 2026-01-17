'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  trigger?: boolean
}

export function SplitText({ children, className = '', delay = 0, stagger = 0.02, trigger = true }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = charsRef.current

      if (trigger) {
        gsap.fromTo(chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: stagger,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay
          }
        )
      } else {
        gsap.fromTo(chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: stagger,
            ease: "power4.out",
            delay
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [delay, stagger, trigger])

  const words = children.split(' ')

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const globalIndex = words.slice(0, wordIndex).join(' ').length + charIndex + (wordIndex > 0 ? 1 : 0)
            return (
              <span key={charIndex} className="inline-block overflow-hidden">
                <span
                  ref={el => { if (el) charsRef.current[globalIndex] = el }}
                  className="inline-block"
                >
                  {char}
                </span>
              </span>
            )
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  )
}
