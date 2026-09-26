import { useEffect, useState } from 'react'
import { readJson, writeJson } from '../utils/storage'

/**
 * useState that persists to localStorage.
 * - The initializer runs once, on mount, and reads the saved value (lazy init).
 * - A useEffect writes the value back to localStorage whenever it changes.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readJson(key, initialValue))

  useEffect(() => {
    writeJson(key, value)
  }, [key, value])

  return [value, setValue]
}
