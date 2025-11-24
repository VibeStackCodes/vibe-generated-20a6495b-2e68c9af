/**
 * Task type definitions and interfaces
 */

export type TaskStatus = 'active' | 'completed' | 'archived'
export type TaskPriority = 'low' | 'medium' | 'high'
export type SortBy = 'priority' | 'dueDate' | 'createdDate'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  category?: string
  createdAt: string
  updatedAt: string
  completed: boolean
}

export interface TaskFilter {
  status: TaskStatus | 'all'
  searchQuery: string
}

export interface TaskFormData {
  title: string
  description?: string
  priority: TaskPriority
  dueDate?: string
  category?: string
}

export interface BulkActionState {
  selectedIds: Set<string>
  isSelectAll: boolean
}
