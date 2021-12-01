import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, debounceTimeout: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutHandle = setTimeout(() => {
      setDebouncedValue(value)
    }, debounceTimeout)

    return () => {
      clearTimeout(timeoutHandle)
    }
  }, [value, debounceTimeout])

  return debouncedValue
}
