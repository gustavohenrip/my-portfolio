'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  intensity?: number
  scale?: number
}

export function FloatingElement({
  children,
  className = '',
  intensity = 0.5,
  scale = 1.02,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: 150, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const moveX = (e.clientX - centerX) * intensity * 0.1
    const moveY = (e.clientY - centerY) * intensity * 0.1
    
    x.set(moveX)
    y.set(moveY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: isHovered ? scale : 1,
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
