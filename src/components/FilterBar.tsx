/**
 * Filter bar component for filtering tasks by status
 */

import { useTasks } from '@/hooks/useTasks'
import { TaskStatus } from '@/types/task'

const FILTER_OPTIONS: Array<{ value: TaskStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
]

export function FilterBar() {
  const { filter, updateFilter } = useTasks()

  const handleFilterChange = (status: TaskStatus | 'all') => {
    updateFilter({ status })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilterChange(option.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            filter.status === option.value
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
