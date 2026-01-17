'use client'

import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
  text?: string
}

export function ScrollIndicator({ text = '[SCROLL_TO_EXPLORE]' }: ScrollIndicatorProps) {
  return (
    <motion.div
      className="absolute bottom-8 left-0 right-0 mx-auto w-fit z-30 flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent/60">
        {text}
      </span>
      
      <motion.div 
        className="relative w-6 h-10 border border-accent/40 flex justify-center overflow-hidden"
        animate={{ 
          borderColor: ['rgb(0, 212, 255, 0.4)', 'rgb(0, 212, 255, 0.8)', 'rgb(0, 212, 255, 0.4)'],
          boxShadow: ['0 0 5px rgba(0, 212, 255, 0.2)', '0 0 15px rgba(0, 212, 255, 0.4)', '0 0 5px rgba(0, 212, 255, 0.2)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-3 bg-accent mt-2"
          animate={{
            y: [0, 16, 0],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ boxShadow: '0 0 10px rgb(0, 212, 255)' }}
        />
      </motion.div>
    </motion.div>
  )
}
