'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import gsap from 'gsap'

const bootSequence = [
  { text: 'BIOS Version 4.2.1 - Monayzera Systems', delay: 50 },
  { text: 'Copyright (C) 2026 Monayzera Corp.', delay: 30 },
  { text: '', delay: 100 },
  { text: 'Initializing system...', delay: 80 },
  { text: 'CPU: Neural Core i9-13900K @ 5.8GHz', delay: 40 },
  { text: 'Memory Test: 64GB DDR5 ... OK', delay: 60 },
  { text: 'GPU: RTX 5090 Ti 24GB ... OK', delay: 50 },
  { text: '', delay: 50 },
  { text: '> Loading kernel modules...', delay: 70 },
  { text: '  [OK] graphics.ko', delay: 30 },
  { text: '  [OK] network.ko', delay: 25 },
  { text: '  [OK] audio.ko', delay: 25 },
  { text: '  [OK] three-fiber.ko', delay: 30 },
  { text: '  [OK] gsap-engine.ko', delay: 25 },
  { text: '', delay: 40 },
  { text: '> Mounting filesystems...', delay: 60 },
  { text: '  /dev/portfolio mounted on /home/monayzera', delay: 40 },
  { text: '  /dev/projects mounted on /var/www', delay: 35 },
  { text: '', delay: 50 },
  { text: '> Starting services...', delay: 70 },
  { text: '  [STARTED] nginx.service', delay: 30 },
  { text: '  [STARTED] node.service', delay: 25 },
  { text: '  [STARTED] react.service', delay: 30 },
  { text: '  [STARTED] animation.service', delay: 25 },
  { text: '', delay: 40 },
  { text: '> Establishing secure connection...', delay: 80 },
  { text: '  Encrypting channel: AES-256-GCM', delay: 50 },
  { text: '  Handshake complete', delay: 40 },
  { text: '', delay: 30 },
  { text: '> Loading portfolio assets...', delay: 60 },
  { text: '  [##########] 100% - 3D Models', delay: 50 },
  { text: '  [##########] 100% - Textures', delay: 40 },
  { text: '  [##########] 100% - Shaders', delay: 35 },
  { text: '', delay: 50 },
  { text: '========================================', delay: 30 },
  { text: '', delay: 20 },
  { text: '  SYSTEM READY', delay: 100 },
  { text: '', delay: 20 },
  { text: '  Welcome, visitor.', delay: 80 },
  { text: '  Launching interface...', delay: 100 },
  { text: '', delay: 200 },
]

export function Preloader() {
  const { isLoading, setIsLoading } = useStore()
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const lineIndex = useRef(0)
  const charIndex = useRef(0)
  const charDelay = 2
  const lineDelay = 12

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 500)

    return () => clearInterval(cursorBlink)
  }, [])

  useEffect(() => {
    if (!isLoading) return

    const typeWriter = () => {
      if (lineIndex.current >= bootSequence.length) {
        setShowCursor(false)
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.25,
          delay: 0.05,
          onComplete: () => setIsLoading(false)
        })
        return
      }

      const currentItem = bootSequence[lineIndex.current]

      if (charIndex.current < currentItem.text.length) {
        setCurrentLine(prev => prev + currentItem.text[charIndex.current])
        charIndex.current++
        setTimeout(typeWriter, charDelay)
      } else {
        setLines(prev => [...prev, currentItem.text])
        setCurrentLine('')
        charIndex.current = 0
        lineIndex.current++
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
        
        setTimeout(typeWriter, lineDelay)
      }
    }

    const startDelay = setTimeout(typeWriter, 0)
    return () => clearTimeout(startDelay)
  }, [isLoading, setIsLoading])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines, currentLine])

  if (!isLoading) return null

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0c] flex flex-col overflow-hidden"
      initial={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a1a1e] border-b border-white/10 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 text-xs font-mono text-white/50">monayzera@portfolio:~</span>
      </div>

      <div 
        ref={terminalRef}
        className="flex-1 mt-8 p-6 overflow-y-auto scrollbar-hide"
      >
        <div className="font-mono text-sm leading-relaxed">
          {lines.map((line, index) => (
            <div 
              key={index} 
              className={`
                ${line.includes('[OK]') || line.includes('[STARTED]') ? 'text-[#28c840]' : ''}
                ${line.includes('Error') || line.includes('FAIL') ? 'text-[#ff5f57]' : ''}
                ${line.includes('>') && !line.includes('[') ? 'text-[#00d4ff]' : ''}
                ${line.includes('SYSTEM READY') ? 'text-[#00d4ff] text-center text-lg font-bold' : ''}
                ${line.includes('Welcome') ? 'text-white/80 text-center' : ''}
                ${line.includes('Launching') ? 'text-white/60 text-center' : ''}
                ${line.includes('===') ? 'text-white/30 text-center' : ''}
                ${line.includes('Copyright') || line.includes('BIOS') ? 'text-white/40' : ''}
                ${!line.includes('[') && !line.includes('>') && !line.includes('===') && !line.includes('SYSTEM') && !line.includes('Welcome') && !line.includes('Launching') && !line.includes('Copyright') && !line.includes('BIOS') ? 'text-white/70' : ''}
                min-h-[1.5em]
              `}
            >
              {line || '\u00A0'}
            </div>
          ))}
          
          <div className="flex">
            <span className={`
              ${currentLine.includes('[OK]') || currentLine.includes('[STARTED]') ? 'text-[#28c840]' : ''}
              ${currentLine.includes('>') ? 'text-[#00d4ff]' : ''}
              ${!currentLine.includes('[') && !currentLine.includes('>') ? 'text-white/70' : ''}
            `}>
              {currentLine}
            </span>
            {showCursor && (
              <span 
                className={`
                  inline-block w-2 h-5 ml-[1px] translate-y-[2px]
                  ${cursorVisible ? 'bg-[#00d4ff]' : 'bg-transparent'}
                `}
              />
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#1a1a1e] border-t border-white/10 flex items-center justify-between px-4">
        <span className="text-xs font-mono text-white/40">
          MONAYZERA TERMINAL v2.0.26
        </span>
        <span className="text-xs font-mono text-[#00d4ff]/60">
          {lines.length}/{bootSequence.length} processes
        </span>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }}
      />
    </motion.div>
  )
}
