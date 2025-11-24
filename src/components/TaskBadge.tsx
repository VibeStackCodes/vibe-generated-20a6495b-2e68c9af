/**
 * Task badge component for displaying categories/tags
 */

import { X } from 'lucide-react'

interface TaskBadgeProps {
  category: string
  onRemove?: () => void
  variant?: 'default' | 'outline'
}

export function TaskBadge({
  category,
  onRemove,
  variant = 'default',
}: TaskBadgeProps) {
  const baseClasses =
    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors'

  const variantClasses =
    variant === 'default'
      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
      : 'border border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300'

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {category}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70"
          aria-label={`Remove ${category} tag`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}
