'use client'

import { useEffect } from 'react'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Navigation } from '@/components/layout/Navigation'
import { Preloader } from '@/components/ui/Preloader'
import { CustomCursor } from '@/components/ui/CustomCursor'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll>
        <Navigation />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </SmoothScroll>
    </>
  )
}
