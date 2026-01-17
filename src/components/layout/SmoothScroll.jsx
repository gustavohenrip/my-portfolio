import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { useStore } from '../../lib/store'

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const { isLoading } = useStore()

  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isLoading])

  return <>{children}</>
}
