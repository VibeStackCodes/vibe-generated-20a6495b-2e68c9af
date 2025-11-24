/**
 * Dark mode toggle button component
 */

import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '@/hooks/useDarkMode'

export function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  )
}
