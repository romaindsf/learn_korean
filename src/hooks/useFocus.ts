import { useRef, useEffect } from 'react'

// Define a generic hook that works for any focusable element
export const useFocus = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return ref
}
