/**
 * Main App component with task management layout
 */

import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { VibeStackBadge } from '@/components/vibestack-badge'
import { TaskList } from '@/components/TaskList'
import { SearchBar } from '@/components/SearchBar'
import { FilterBar } from '@/components/FilterBar'
import { SortBar } from '@/components/SortBar'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { useAppStore } from '@/stores/app-store'
import { useDarkMode } from '@/hooks/useDarkMode'

/**
 * Main App component with routing and task management
 */
function App() {
  const loadFromLocalStorage = useAppStore(
    (state) => state.loadFromLocalStorage
  )
  const { darkMode } = useDarkMode()

  // Load tasks from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage()
  }, [])

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        }
      >
        <div className={`min-h-screen transition-colors ${darkMode ? 'dark' : ''}`}>
          <div className="bg-white dark:bg-gray-900">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      TaskMaster
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your tasks efficiently
                    </p>
                  </div>
                  <DarkModeToggle />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="space-y-6">
                {/* Controls Section */}
                <div className="space-y-4">
                  {/* Search Bar */}
                  <SearchBar />

                  {/* Filter and Sort Controls */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                    <div className="flex-1">
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Filter by Status
                      </label>
                      <FilterBar />
                    </div>
                    <div className="lg:w-auto">
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sort by
                      </label>
                      <SortBar />
                    </div>
                  </div>
                </div>

                {/* Task List */}
                <TaskList />
              </div>
            </main>
          </div>
        </div>
        <Outlet />
        <VibeStackBadge />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
