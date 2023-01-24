import { useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'

import { DEBUG } from './constants'

type ToastProps = {
  children: React.ReactNode
  /** time in ms to keep the DOM connected */
  timeout?: number
  /** deps to trigger the timeout */
  deps?: any[]
}

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

const liveRegion = (disabledSRAnnounce: boolean) => (disabledSRAnnounce ? 'off' : 'assertive')

const liveRegionContent = (showToast: boolean, title: string) => (!showToast ? '--' : title)

const toastDeps = (title: string, disableSRAnnounce: boolean, announceTitleEvent: boolean) => [
  title,
  disableSRAnnounce,
  announceTitleEvent,
]

const useDebug = (args: unknown[], deps: unknown[]) => {
  useEffect(() => {
    debug(...args)
  }, deps)
}

function useToast(timeout: ToastProps['timeout'] = 5e3, deps: any[] = []) {
  const [showToast, setShowToast] = useState(true)

  useEffect(() => {
    setShowToast(true)
    const timer = setTimeout(() => {
      if (timeout && timeout > 0) {
        setShowToast(false)
      }
    }, timeout)
    return () => {
      clearTimeout(timer)
    }
  }, deps)

  return showToast
}

export { useId, useFlicker, SRFlicker, debug, useToggle, liveRegion, liveRegionContent, toastDeps, useDebug, useToast }
