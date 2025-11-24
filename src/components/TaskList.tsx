/**
 * Task list component displaying all tasks
 */

import { useState } from 'react'
import { useTasks } from '@/hooks/useTasks'
import { Task } from '@/types/task'
import { TaskItem } from './TaskItem'
import { EmptyState } from './EmptyState'
import { TaskForm } from './TaskForm'
import { TaskFormData } from '@/types/task'

export function TaskList() {
  const {
    filteredAndSortedTasks,
    createTask,
    editTask,
    removeTask,
    toggleCompletion,
  } = useTasks()

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleCreateTask = (data: TaskFormData) => {
    createTask(data)
    setShowForm(false)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleUpdateTask = (data: TaskFormData) => {
    if (editingTask) {
      editTask(editingTask.id, data)
      setEditingTask(null)
      setShowForm(false)
    }
  }

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      removeTask(id)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  return (
    <div className="space-y-6">
      {showForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCancel}
          initialData={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description,
                  priority: editingTask.priority,
                  dueDate: editingTask.dueDate,
                  category: editingTask.category,
                }
              : undefined
          }
        />
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-lg bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700 transition-colors dark:bg-purple-700 dark:hover:bg-purple-600"
        >
          + Add New Task
        </button>
      )}

      {filteredAndSortedTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description="Create a new task or adjust your filters to see tasks"
        />
      ) : (
        <div className="space-y-3">
          {filteredAndSortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleCompletion={toggleCompletion}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}
