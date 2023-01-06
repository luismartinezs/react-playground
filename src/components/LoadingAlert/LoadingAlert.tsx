import { useEffect, useState } from 'react'

import SROnly from '../SROnly'

type LoadingState = 'pending' | 'idle'
export type TLoadingAlertContext = Readonly<{
  useLoadingAlert: () => void
  useSubscribeLoadingAlert: () => LoadingState
}>

const LOADING_TIME = 3_000
const INIT_TIME = 1_000

function LoadingMessage() {
  const [loadingState, setLoadingState] = useState('idle')

  useEffect(() => {
    let timer1: number
    let timer2: number
    timer1 = setTimeout(() => {
      setLoadingState('pending')
      timer2 = setTimeout(() => {
        setLoadingState('idle')
      }, LOADING_TIME)
    }, INIT_TIME)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  })

  return <>{loadingState === 'pending' && 'Content is loading'}</>
}

export function LoadingAlert() {
  return (
    <>
      <h2>Loading alert</h2>
      <p>It will toggle on after 1s and toggle off 3s later -- sr only</p>
      <div
        id="loading"
        // role="alert"
      >
        <SROnly>
          <LoadingMessage />
        </SROnly>
      </div>
    </>
  )
}
