/**
 * Utility functions for task operations
 */

import { Task, TaskStatus, SortBy, TaskFilter } from '@/types/task'

/**
 * Filter tasks by status and search query
 */
export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  let filtered = tasks

  // Filter by status
  if (filter.status !== 'all') {
    filtered = filtered.filter((task) => task.status === filter.status)
  }

  // Filter by search query
  if (filter.searchQuery.trim()) {
    const query = filter.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
    )
  }

  return filtered
}

/**
 * Sort tasks by specified criteria
 */
export function sortTasks(tasks: Task[], sortBy: SortBy): Task[] {
  const sorted = [...tasks]

  switch (sortBy) {
    case 'priority': {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      sorted.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      )
      break
    }
    case 'dueDate': {
      sorted.sort((a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
      break
    }
    case 'createdDate': {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      break
    }
  }

  return sorted
}

/**
 * Validate task form data
 */
export function validateTaskForm(data: {
  title: string
  description?: string
  priority: string
  dueDate?: string
  category?: string
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required'
  } else if (data.title.length > 100) {
    errors.title = 'Title must be less than 100 characters'
  }

  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be less than 500 characters'
  }

  if (!['low', 'medium', 'high'].includes(data.priority)) {
    errors.priority = 'Invalid priority'
  }

  if (data.dueDate) {
    const dueDate = new Date(data.dueDate)
    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Invalid date format'
    }
  }

  if (data.category && data.category.length > 50) {
    errors.category = 'Category must be less than 50 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Generate unique ID for tasks
 */
export function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

/**
 * Check if date is overdue
 */
export function isOverdue(dueDate: string): boolean {
  try {
    const due = new Date(dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return due < today
  } catch {
    return false
  }
}

/**
 * Get priority color class
 */
export function getPriorityColor(
  priority: string
): 'text-red-600' | 'text-yellow-600' | 'text-green-600' {
  switch (priority) {
    case 'high':
      return 'text-red-600'
    case 'medium':
      return 'text-yellow-600'
    case 'low':
      return 'text-green-600'
    default:
      return 'text-gray-600'
  }
}

/**
 * Get priority badge background class
 */
export function getPriorityBgClass(
  priority: string
): 'bg-red-100' | 'bg-yellow-100' | 'bg-green-100' {
  switch (priority) {
    case 'high':
      return 'bg-red-100'
    case 'medium':
      return 'bg-yellow-100'
    case 'low':
      return 'bg-green-100'
    default:
      return 'bg-gray-100'
  }
}
