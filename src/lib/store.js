import { create } from 'zustand'

export const useStore = create((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
  activeChapter: 0,
  setActiveChapter: (chapter) => set({ activeChapter: chapter }),
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (pos) => set({ mousePosition: pos }),
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))
