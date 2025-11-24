/**
 * Search bar component for filtering tasks by title or description
 */

import { Search, X } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'

export function SearchBar() {
  const { filter, updateFilter } = useTasks()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter({ searchQuery: e.target.value })
  }

  const handleClear = () => {
    updateFilter({ searchQuery: '' })
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={filter.searchQuery}
        onChange={handleSearch}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:ring-purple-900"
      />
      {filter.searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
