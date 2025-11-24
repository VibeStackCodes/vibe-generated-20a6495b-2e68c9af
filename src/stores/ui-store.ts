import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // Add your UI state here
}

export const useUIStore = create<UIState>()(
  persist(
    () => ({
      // Add your UI state implementation here
    }),
    {
      name: 'ui-storage',
    }
  )
)
