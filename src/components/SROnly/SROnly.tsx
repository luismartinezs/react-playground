import { memo, ReactNode, useEffect, useState } from 'react'

import Styles from './index.module.scss'

function SROnly({ children }: { children: ReactNode }) {
  return <span className={Styles.srOnly}>{children}</span>
}

type ToastProps = {
  children: ReactNode
  /** time in ms to keep the DOM connected */
  timeout?: number
  /** deps to trigger the timeout */
  deps?: any[]
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

function SROnlyToast({ children, timeout = 5e3, deps = [] }: ToastProps) {
  const showToast = useToast(timeout)

  if (showToast) {
    return <SROnly>{children}</SROnly>
  }

  return null
}

const Container = memo(SROnlyToast)

/**
 * Use this component to announce a label to screen readers on mount. After a timeout, the label will be removed from the
 * DOM, to prevent the screen reader from navigating to it.
 */
export { Container as SROnlyToast, useToast }

export default memo(SROnly)
