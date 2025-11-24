import { create } from 'zustand'

interface AppState {
  // Add your app state here
}

export const useAppStore = create<AppState>(() => ({
  // Add your app state implementation here
}))
