import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/*
línea del tiempo de cómo se comporta el usuario:

0ms -> user type - 'h' -> value
   useEffect ... Linea 6
150ms -> user type 'he' -> value
   clear useEffect - Linea 11
   useEffect ... Linea 6
300ms -> user type 'hel'  -> value
   clear useEffect - Linea 11
   useEffect ... Linea 6
400ms -> user type 'hell'  -> value
    clear useEffect - Linea 11
    useEffect ... Linea 6
900ms -> Linea 8 -> setDebouncedValue('hell') -> debounceValue Linea 14
*/
