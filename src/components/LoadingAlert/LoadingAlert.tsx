import { useState } from 'react'

import SROnly from '../SROnly'

type LoadingState = 'pending' | 'idle'
export type TLoadingAlertContext = Readonly<{
  useLoadingAlert: () => void
  useSubscribeLoadingAlert: () => LoadingState
}>

const THROTTLE_TIME = 1_000
const INITIAL_LOADING_TIME = 100

function LoadingMessage() {
  const loadingState = useState('pending')

  return <>{/* loadingState === "pending" && 'Content is loading' */}</>
}

export function LoadingAlert() {
  return (
    <div
      id="loading"
      // role="alert"
    >
      <SROnly>
        <LoadingMessage />
      </SROnly>
    </div>
  )
}
