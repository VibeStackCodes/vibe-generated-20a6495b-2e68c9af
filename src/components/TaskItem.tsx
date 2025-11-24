/**
 * Individual task card component
 */

import { Trash2, Edit2, AlertCircle } from 'lucide-react'
import { Task } from '@/types/task'
import { formatDate, isOverdue, getPriorityColor } from '@/utils/taskUtils'
import { TaskBadge } from './TaskBadge'

interface TaskItemProps {
  task: Task
  onToggleCompletion: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  isSelected?: boolean
  onSelect?: (id: string) => void
}

export function TaskItem({
  task,
  onToggleCompletion,
  onEdit,
  onDelete,
  isSelected = false,
  onSelect,
}: TaskItemProps) {
  const overdue = task.dueDate && isOverdue(task.dueDate) && !task.completed

  return (
    <div
      className={`task-item rounded-lg border transition-all ${
        isSelected
          ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-900/20'
          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-start gap-4 p-4">
        {onSelect && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(task.id)}
            className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleCompletion(task.id)}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
                aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base font-semibold transition-all ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-600'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p
                    className={`mt-1 text-sm ${
                      task.completed
                        ? 'text-gray-400 dark:text-gray-600'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(task)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Edit task"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="rounded-lg p-2 text-gray-600 hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                task.priority === 'high'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              }`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>

            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                  overdue
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                }`}
              >
                {overdue && <AlertCircle className="h-3 w-3" />}
                {formatDate(task.dueDate)}
              </span>
            )}

            {task.category && <TaskBadge category={task.category} />}
          </div>
        </div>
      </div>
    </div>
  )
}
