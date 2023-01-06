import { useEffect, useState } from 'react'

import SROnly from '../SROnly'

type LoadingState = 'pending' | 'idle'
export type TLoadingAlertContext = Readonly<{
  useLoadingAlert: () => void
  useSubscribeLoadingAlert: () => LoadingState
}>

const THROTTLE_TIME = 1_000
const INITIAL_LOADING_TIME = 100

function LoadingMessage() {
  const [loadingState, setLoadingState] = useState('idle')

  useEffect(() => {
    let timer1: number
    let timer2: number
    timer1 = setTimeout(() => {
      setLoadingState('pending')
      timer2 = setTimeout(() => {
        setLoadingState('idle')
      }, THROTTLE_TIME)
    }, THROTTLE_TIME)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  })

  return <>{loadingState === 'pending' && 'Content is loading'}</>
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
