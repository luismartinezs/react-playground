import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import SROnly from '../SROnly'

type LoadingState = 'pending' | 'idle'
export type TLoadingAlertContext = Readonly<{
  useLoadingAlert: () => void
  useSubscribeLoadingAlert: () => LoadingState
}>

function LoadingMessage() {
  const [loadingState, setLoadingState] = useState('idle')
  let [searchParams] = useSearchParams()

  const initTime = (parseInt(searchParams.get('init_time') || '') || 5) * 1_000
  const loadingTime = (parseInt(searchParams.get('loading_time') || '') || 3) * 1_000

  useEffect(() => {
    let timer1: number
    let timer2: number
    timer1 = setTimeout(() => {
      setLoadingState('pending')
    }, initTime)
    timer2 = setTimeout(() => {
      setLoadingState('idle')
    }, initTime + loadingTime)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return <>{loadingState === 'pending' && 'This is an invisible alert'}</>
}

export function LoadingAlert() {
  useDocumentTitle('Loading alert - React Playground')
  let [searchParams] = useSearchParams()

  const loading = searchParams.get('loading') === 'true'
  const alert = searchParams.get('alert') === 'true'

  return (
    <>
      <h2>Loading alert</h2>
      <p>It will toggle on after 1s and toggle off 3s later -- sr only</p>
      <p>
        Message is: <em>This is an invisible alert</em>
      </p>
      <p>Valid query params:</p>
      <ul>
        <li>loading=true: mounts and unmounts the sr-only message</li>
        <li>alert=true: wraps message in a role="alert"</li>
        <li>init_time=5: sets the time in seconds before the message is toggled on</li>
        <li>loading_time=3: sets the time in seconds before the message is toggled off</li>
      </ul>
      <div id="loading" role={alert ? 'alert' : 'presentation'}>
        {loading && (
          <SROnly>
            <LoadingMessage />
          </SROnly>
        )}
      </div>
    </>
  )
}
