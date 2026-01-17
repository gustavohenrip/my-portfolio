import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  cursorType: 'default' | 'pointer' | 'text' | 'project' | 'glitch'
  setCursorType: (type: 'default' | 'pointer' | 'text' | 'project' | 'glitch') => void
  activeChapter: number
  setActiveChapter: (chapter: number) => void
  mousePosition: { x: number; y: number }
  setMousePosition: (pos: { x: number; y: number }) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: true,
      setIsLoading: (loading) => set({ isLoading: loading }),
      cursorType: 'default',
      setCursorType: (type) => set({ cursorType: type }),
      activeChapter: 0,
      setActiveChapter: (chapter) => set({ activeChapter: chapter }),
      mousePosition: { x: 0, y: 0 },
      setMousePosition: (pos) => set({ mousePosition: pos }),
    }),
    {
      name: 'monayzera-portfolio-storage',
      partialize: () => ({}),
    }
  )
)
