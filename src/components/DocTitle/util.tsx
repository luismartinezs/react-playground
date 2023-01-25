import { useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'

import { DEBUG } from './constants'

function useId(): string {
  return useMemo(() => v4(), [])
}

function debug(...args: unknown[]) {
  if (DEBUG) {
    console.debug(...args)
  }
}

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState)
  const toggle = () => setState((state) => !state)
  return [state, toggle] as const
}

const useDebug = (args: unknown[], deps: unknown[]) => {
  useEffect(() => {
    debug(...args)
  }, deps)
}

export { useId, debug, useToggle, useDebug }
