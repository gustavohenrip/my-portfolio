import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../lib/store'

const chapters = [
  { id: 'hero', number: '00', title: 'HOME', href: '#' },
  { id: 'about', number: '01', title: 'ABOUT', href: '#about' },
  { id: 'projects', number: '02', title: 'PROJECTS', href: '#projects' },
  { id: 'contact', number: '03', title: 'CONTACT', href: '#contact' },
]

export function ChapterNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(false)
  const { setCursorType } = useStore()

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > 300)
    
    const sections = chapters.map(ch => ({
      id: ch.id,
      element: ch.id === 'hero' ? document.body : document.getElementById(ch.id)
    }))

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if (section.element) {
        const rect = section.id === 'hero' 
          ? { top: -window.scrollY } 
          : section.element.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2) {
          setActiveSection(section.id)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleClick = (e, href) => {
    e.preventDefault()
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-5"
        >
          <motion.div
            className="absolute right-1 top-0 w-[1px] bg-accent/20 h-full -z-10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          
          {chapters.map((chapter, index) => (
            <motion.a
              key={chapter.id}
              href={chapter.href}
              onClick={(e) => handleClick(e, chapter.href)}
              className="group flex items-center gap-3 cursor-pointer"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.span
                className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 border border-transparent transition-all duration-300"
                animate={{
                  opacity: activeSection === chapter.id ? 1 : 0.4,
                  color: activeSection === chapter.id ? 'rgb(0, 212, 255)' : 'rgb(var(--muted))',
                  x: activeSection === chapter.id ? -4 : 0,
                  borderColor: activeSection === chapter.id ? 'rgba(0, 212, 255, 0.3)' : 'transparent',
                  textShadow: activeSection === chapter.id ? '0 0 10px rgba(0, 212, 255, 0.5)' : 'none'
                }}
                whileHover={{ opacity: 1, x: -8 }}
                transition={{ duration: 0.3 }}
              >
                [{chapter.number}] {chapter.title}
              </motion.span>
              
              <div className="relative flex items-center justify-center w-3 h-3">
                <motion.div
                  className="absolute w-full h-full border"
                  animate={{
                    scale: activeSection === chapter.id ? 1.4 : 1,
                    borderColor: activeSection === chapter.id ? 'rgb(0, 212, 255)' : 'rgba(0, 212, 255, 0.2)',
                    backgroundColor: activeSection === chapter.id ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                    boxShadow: activeSection === chapter.id ? '0 0 10px rgba(0, 212, 255, 0.4)' : 'none'
                  }}
                  whileHover={{ scale: 1.4, borderColor: 'rgba(0, 212, 255, 0.6)' }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-accent"
                  animate={{
                    scale: activeSection === chapter.id ? 1 : 0,
                    boxShadow: activeSection === chapter.id ? '0 0 8px rgb(0, 212, 255)' : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
