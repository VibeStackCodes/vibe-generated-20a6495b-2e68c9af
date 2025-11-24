/**
 * Sort bar component for sorting tasks
 */

import { ArrowUpDown } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'
import { SortBy } from '@/types/task'

const SORT_OPTIONS: Array<{ value: SortBy; label: string }> = [
  { value: 'createdDate', label: 'Created Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'dueDate', label: 'Due Date' },
]

export function SortBar() {
  const { sortBy, updateSortBy } = useTasks()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSortBy(e.target.value as SortBy)
  }

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-purple-900"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
