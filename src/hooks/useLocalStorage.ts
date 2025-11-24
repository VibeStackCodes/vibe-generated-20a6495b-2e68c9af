/**
 * Custom hook for managing localStorage operations with type safety
 */

import { useState, useEffect } from 'react'

/**
 * Hook for managing localStorage with type safety
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Hook for managing localStorage with expiration
 */
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  expiryMs?: number
): [T | null, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      if (!item) return initialValue

      const data = JSON.parse(item)
      if (expiryMs && data.expiry && new Date().getTime() > data.expiry) {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key)
        }
        return null
      }
      return data.value
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      const dataToStore = {
        value,
        expiry: expiryMs ? new Date().getTime() + expiryMs : null,
      }
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(dataToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      setStoredValue(null)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}
