/**
 * Application state management for tasks
 */

import { create } from 'zustand'
import { Task, TaskFilter, SortBy } from '@/types/task'
import { filterTasks, sortTasks } from '@/utils/taskUtils'

const STORAGE_KEY = 'taskmaster_tasks'

interface AppState {
  tasks: Task[]
  filter: TaskFilter
  sortBy: SortBy
  filteredAndSortedTasks: Task[]

  // Actions
  addTask: (task: Task) => void
  updateTask: (id: string, task: Task) => void
  deleteTask: (id: string) => void
  toggleTaskCompletion: (id: string) => void
  setFilter: (filter: TaskFilter) => void
  setSortBy: (sortBy: SortBy) => void
  loadFromLocalStorage: () => void
  saveToLocalStorage: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  tasks: [],
  filter: {
    status: 'all',
    searchQuery: '',
  },
  sortBy: 'createdDate',
  filteredAndSortedTasks: [],

  addTask: (task: Task) => {
    set((state) => {
      const newTasks = [...state.tasks, task]
      const filtered = filterTasks(newTasks, state.filter)
      const sorted = sortTasks(filtered, state.sortBy)
      return {
        tasks: newTasks,
        filteredAndSortedTasks: sorted,
      }
    })
    get().saveToLocalStorage()
  },

  updateTask: (id: string, updatedTask: Task) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? updatedTask : task
      )
      const filtered = filterTasks(newTasks, state.filter)
      const sorted = sortTasks(filtered, state.sortBy)
      return {
        tasks: newTasks,
        filteredAndSortedTasks: sorted,
      }
    })
    get().saveToLocalStorage()
  },

  deleteTask: (id: string) => {
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id)
      const filtered = filterTasks(newTasks, state.filter)
      const sorted = sortTasks(filtered, state.sortBy)
      return {
        tasks: newTasks,
        filteredAndSortedTasks: sorted,
      }
    })
    get().saveToLocalStorage()
  },

  toggleTaskCompletion: (id: string) => {
    set((state) => {
      const newTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
            status: !task.completed ? 'completed' : 'active',
            updatedAt: new Date().toISOString(),
          }
        }
        return task
      })
      const filtered = filterTasks(newTasks, state.filter)
      const sorted = sortTasks(filtered, state.sortBy)
      return {
        tasks: newTasks,
        filteredAndSortedTasks: sorted,
      }
    })
    get().saveToLocalStorage()
  },

  setFilter: (filter: TaskFilter) => {
    set((state) => {
      const filtered = filterTasks(state.tasks, filter)
      const sorted = sortTasks(filtered, state.sortBy)
      return {
        filter,
        filteredAndSortedTasks: sorted,
      }
    })
  },

  setSortBy: (sortBy: SortBy) => {
    set((state) => {
      const sorted = sortTasks(state.filteredAndSortedTasks, sortBy)
      return {
        sortBy,
        filteredAndSortedTasks: sorted,
      }
    })
  },

  loadFromLocalStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const tasks = JSON.parse(stored)
        set((state) => {
          const filtered = filterTasks(tasks, state.filter)
          const sorted = sortTasks(filtered, state.sortBy)
          return {
            tasks,
            filteredAndSortedTasks: sorted,
          }
        })
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error)
    }
  },

  saveToLocalStorage: () => {
    try {
      const state = get()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error)
    }
  },
}))
