/**
 * Custom hook for dark mode state management
 */

import { useEffect } from 'react'
import { useUIStore } from '@/stores/ui-store'

/**
 * Hook for managing dark mode
 */
export function useDarkMode() {
  const darkMode = useUIStore((state) => state.darkMode)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)

  useEffect(() => {
    const htmlElement = document.documentElement
    if (darkMode) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [darkMode])

  return { darkMode, toggleDarkMode }
}
