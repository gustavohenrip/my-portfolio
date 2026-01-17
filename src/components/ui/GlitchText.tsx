'use client'

import { useEffect, useRef, useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  glitchOnHover?: boolean
  decryptEffect?: boolean
  delay?: number
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'

export const GlitchText = memo(function GlitchText({ 
  text, 
  className = '', 
  as: Component = 'span',
  glitchOnHover = false,
  decryptEffect = false,
  delay = 0
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(decryptEffect ? text.replace(/./g, () => chars[Math.floor(Math.random() * chars.length)]) : text)
  const [isHovering, setIsHovering] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(!decryptEffect)
  const [isMobile, setIsMobile] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const decrypt = useCallback(() => {
    if (isMobile) {
      setDisplayText(text)
      setIsDecrypted(true)
      return
    }

    let iteration = 0
    const originalText = text
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return originalText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      
      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsDecrypted(true)
      }
      
      iteration += 0.6
    }, 35)
  }, [text, isMobile])

  const triggerGlitch = useCallback(() => {
    if (isMobile) return
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    let glitchCount = 0
    intervalRef.current = setInterval(() => {
      setDisplayText(text
        .split('')
        .map((char) => {
          if (char === ' ') return ' '
          if (Math.random() > 0.35) return char
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      )
      
      glitchCount++
      if (glitchCount > 8) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
      }
    }, 60)
  }, [text, isMobile])

  useEffect(() => {
    if (decryptEffect && !isDecrypted) {
      const timer = setTimeout(() => {
        decrypt()
      }, delay)
      return () => clearTimeout(timer)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [decryptEffect, isDecrypted, decrypt, delay])

  useEffect(() => {
    if (glitchOnHover && isHovering && !isMobile) {
      triggerGlitch()
    }
  }, [isHovering, glitchOnHover, triggerGlitch, isMobile])

  const MotionComponent = motion[Component] as any

  return (
    <MotionComponent
      ref={elementRef}
      className={`${className} ${glitchOnHover && !isMobile ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => glitchOnHover && !isMobile && setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setDisplayText(text)
      }}
      onTouchStart={() => glitchOnHover && triggerGlitch()}
      data-text={text}
      style={{ willChange: 'auto' }}
    >
      {displayText}
    </MotionComponent>
  )
})

interface DataCorruptionTextProps {
  text: string
  className?: string
  trigger?: boolean
}

export function DataCorruptionText({ text, className = '', trigger = false }: DataCorruptionTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isCorrupting, setIsCorrupting] = useState(false)

  useEffect(() => {
    if (trigger && !isCorrupting) {
      setIsCorrupting(true)
      let count = 0
      const interval = setInterval(() => {
        setDisplayText(text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (Math.random() > 0.8) {
              return chars[Math.floor(Math.random() * chars.length)]
            }
            return char
          })
          .join('')
        )
        count++
        if (count > 5) {
          clearInterval(interval)
          setDisplayText(text)
          setIsCorrupting(false)
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [trigger, text, isCorrupting])

  return (
    <span className={`${className} ${isCorrupting ? 'animate-data-corruption' : ''}`}>
      {displayText}
    </span>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
  cursor?: boolean
}

export function TypewriterText({ 
  text, 
  className = '', 
  speed = 50, 
  delay = 0,
  onComplete,
  cursor = true 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          if (onComplete) onComplete()
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, speed, delay, onComplete])

  useEffect(() => {
    if (cursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)
      return () => clearInterval(cursorInterval)
    }
  }, [cursor])

  return (
    <span className={className}>
      {displayText}
      {cursor && <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-accent`}>|</span>}
    </span>
  )
}

interface ScrambleTextProps {
  text: string
  className?: string
  scrambleOnMount?: boolean
  delay?: number
}

export function ScrambleText({ text, className = '', scrambleOnMount = true, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(scrambleOnMount ? '' : text)
  const [isScrambling, setIsScrambling] = useState(scrambleOnMount)

  useEffect(() => {
    if (!scrambleOnMount) return

    const timer = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )

        if (iteration >= text.length) {
          clearInterval(interval)
          setIsScrambling(false)
        }

        iteration += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, scrambleOnMount, delay])

  return <span className={className}>{displayText}</span>
}
