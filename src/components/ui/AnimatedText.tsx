'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  animation?: 'words' | 'chars' | 'lines' | 'fade-up' | 'blur-in'
  delay?: number
  stagger?: number
  duration?: number
  once?: boolean
}

export function AnimatedText({
  children,
  className = '',
  animation = 'words',
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const text = container.innerText
    let elements: HTMLSpanElement[] = []

    if (animation === 'chars') {
      container.innerHTML = ''
      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.innerHTML = char === ' ' ? '&nbsp;' : char
        span.style.display = 'inline-block'
        span.style.willChange = 'transform, opacity'
        container.appendChild(span)
        elements.push(span)
      })
    } else if (animation === 'words') {
      container.innerHTML = ''
      text.split(' ').forEach((word, i, arr) => {
        const span = document.createElement('span')
        span.innerHTML = word
        span.style.display = 'inline-block'
        span.style.willChange = 'transform, opacity'
        container.appendChild(span)
        elements.push(span)
        if (i < arr.length - 1) {
          container.appendChild(document.createTextNode(' '))
        }
      })
    } else if (animation === 'lines') {
      elements = [container as any]
    } else {
      elements = [container as any]
    }

    gsap.set(elements, {
      opacity: 0,
      y: animation === 'fade-up' || animation === 'words' || animation === 'chars' ? 30 : 0,
      filter: animation === 'blur-in' ? 'blur(10px)' : 'none',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill()
      })
    }
  }, [animation, delay, duration, once, stagger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
