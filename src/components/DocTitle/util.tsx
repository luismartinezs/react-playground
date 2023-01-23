import { useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'

function useId(): string {
  return useMemo(() => v4(), [])
}

function useFlicker(condition: boolean, timeout = 250) {
  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    if (condition) {
      setFlicker(true)
      const timer = setTimeout(() => {
        setFlicker(false)
      }, timeout)
      return () => clearTimeout(timer)
    }
  }, [condition])

  return flicker
}

/**
 * Flick the SR visibility of the children for `timeout` ms (default: 250) when condition switches to true
 */
function SRFlicker({
  children,
  timeout = 250,
  condition = false,
}: {
  children?: React.ReactNode
  timeout?: number
  condition?: boolean
}) {
  const flicker = useFlicker(condition, timeout)

  return <span aria-hidden={flicker}>{children}</span>
}

export { useId, useFlicker, SRFlicker }
