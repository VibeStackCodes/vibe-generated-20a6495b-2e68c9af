/**
 * Custom hook for task management logic
 */

import { useCallback } from 'react'
import { useAppStore } from '@/stores/app-store'
import { Task, TaskFormData, TaskFilter, SortBy } from '@/types/task'
import { generateTaskId } from '@/utils/taskUtils'

/**
 * Hook for task management operations
 */
export function useTasks() {
  const tasks = useAppStore((state) => state.tasks)
  const filter = useAppStore((state) => state.filter)
  const sortBy = useAppStore((state) => state.sortBy)
  const addTask = useAppStore((state) => state.addTask)
  const updateTask = useAppStore((state) => state.updateTask)
  const deleteTask = useAppStore((state) => state.deleteTask)
  const toggleTaskCompletion = useAppStore(
    (state) => state.toggleTaskCompletion
  )
  const setFilter = useAppStore((state) => state.setFilter)
  const setSortBy = useAppStore((state) => state.setSortBy)
  const filteredAndSortedTasks = useAppStore(
    (state) => state.filteredAndSortedTasks
  )

  const createTask = useCallback(
    (data: TaskFormData) => {
      const now = new Date().toISOString()
      const task: Task = {
        id: generateTaskId(),
        title: data.title,
        description: data.description,
        status: 'active',
        priority: data.priority,
        dueDate: data.dueDate,
        category: data.category,
        createdAt: now,
        updatedAt: now,
        completed: false,
      }
      addTask(task)
      return task
    },
    [addTask]
  )

  const editTask = useCallback(
    (id: string, data: Partial<TaskFormData>) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      const updatedTask: Task = {
        ...task,
        ...data,
        updatedAt: new Date().toISOString(),
      }
      updateTask(id, updatedTask)
      return updatedTask
    },
    [tasks, updateTask]
  )

  const removeTask = useCallback(
    (id: string) => {
      deleteTask(id)
    },
    [deleteTask]
  )

  const toggleCompletion = useCallback(
    (id: string) => {
      toggleTaskCompletion(id)
    },
    [toggleTaskCompletion]
  )

  const updateFilter = useCallback(
    (newFilter: Partial<TaskFilter>) => {
      setFilter({ ...filter, ...newFilter })
    },
    [filter, setFilter]
  )

  const updateSortBy = useCallback(
    (newSortBy: SortBy) => {
      setSortBy(newSortBy)
    },
    [setSortBy]
  )

  return {
    tasks,
    filteredAndSortedTasks,
    filter,
    sortBy,
    createTask,
    editTask,
    removeTask,
    toggleCompletion,
    updateFilter,
    updateSortBy,
  }
}
