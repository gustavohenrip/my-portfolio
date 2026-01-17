'use client'

import { useRef, useEffect, useState, memo } from 'react'
import gsap from 'gsap'
import { useStore } from '@/lib/store'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export const MagneticButton = memo(function MagneticButton({ children, className = '', strength = 0.3 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const { setCursorType } = useStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const button = buttonRef.current
    if (!button) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: "power2.out"
      })
    }

    const onMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      })
    }

    button.addEventListener('mousemove', onMouseMove)
    button.addEventListener('mouseleave', onMouseLeave)

    return () => {
      button.removeEventListener('mousemove', onMouseMove)
      button.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength, isMobile])

  return (
    <div
      ref={buttonRef}
      className={className}
      onMouseEnter={() => !isMobile && setCursorType('pointer')}
      onMouseLeave={() => !isMobile && setCursorType('default')}
    >
      {children}
    </div>
  )
})

