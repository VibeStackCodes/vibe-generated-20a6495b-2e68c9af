/**
 * Empty state component displayed when no tasks exist
 */

import { CheckCircle2 } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No tasks yet',
  description = 'Create your first task to get started',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 dark:border-gray-600 dark:bg-gray-900">
      <CheckCircle2 className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-600" />
      <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
