import { useEffect, useRef, useCallback } from 'react'
import { useStore } from '../../lib/store'

export function CustomCursor() {
  const { cursorType, isLoading } = useStore()
  const dotRef = useRef(null)
  const circleRef = useRef(null)
  const rafRef = useRef(null)
  const circleSize = useRef(40)
  const dotSize = useRef(8)
  const mousePos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const circlePos = useRef({ x: 0, y: 0 })

  const animate = useCallback(() => {
    const dot = dotRef.current
    const circle = circleRef.current
    if (!dot || !circle) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.2
    dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.2
    circlePos.current.x += (mousePos.current.x - circlePos.current.x) * 0.12
    circlePos.current.y += (mousePos.current.y - circlePos.current.y) * 0.12

    dot.style.transform = `translate3d(${dotPos.current.x - dotSize.current / 2}px, ${dotPos.current.y - dotSize.current / 2}px, 0)`
    circle.style.transform = `translate3d(${circlePos.current.x - circleSize.current / 2}px, ${circlePos.current.y - circleSize.current / 2}px, 0)`

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isLoading, animate])

  useEffect(() => {
    const dot = dotRef.current
    const circle = circleRef.current
    if (!dot || !circle) return

    if (cursorType === 'project') {
      circleSize.current = 100
      dotSize.current = 12
      circle.style.width = '100px'
      circle.style.height = '100px'
      circle.style.borderColor = 'rgba(255, 255, 255, 0.8)'
      dot.style.width = '12px'
      dot.style.height = '12px'
    } else if (cursorType === 'pointer') {
      circleSize.current = 60
      dotSize.current = 10
      circle.style.width = '60px'
      circle.style.height = '60px'
      circle.style.borderColor = 'rgba(255, 255, 255, 1)'
      dot.style.width = '10px'
      dot.style.height = '10px'
    } else {
      circleSize.current = 40
      dotSize.current = 8
      circle.style.width = '40px'
      circle.style.height = '40px'
      circle.style.borderColor = 'rgba(255, 255, 255, 0.6)'
      dot.style.width = '8px'
      dot.style.height = '8px'
    }
  }, [cursorType])

  if (isLoading) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[99] hidden md:block mix-blend-difference">
      <div
        ref={circleRef}
        className="absolute rounded-full border border-white/60 transition-[width,height,border-color] duration-200"
        style={{ 
          width: 40, 
          height: 40,
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      />
      <div
        ref={dotRef}
        className="absolute rounded-full bg-white transition-[width,height] duration-200"
        style={{
          width: 8,
          height: 8,
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  )
}
