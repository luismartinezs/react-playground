import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const MsgBox = ({ children }: { children?: React.ReactNode }) => {
  return <div className="p-2 m-1 border rounded-md border-sky-500 w-fit min-w-[150px] min-h-[42px]">{children}</div>
}

const MSG = {
  bob: 'Status Bob',
  charles: 'Status Charles',
  diane: 'Status Diane',
  elrond: 'Status Elrond',
  feanor: 'Status Feanor',
}

const StatusOnLoad = () => {
  let [searchParams] = useSearchParams()
  const initTime = Number(searchParams.get('time')) || 0
  const duration = Number(searchParams.get('duration')) || 0

  const [bob, setBob] = useState(MSG.bob)
  const [charles, setCharles] = useState(MSG.charles)
  const [diane, setDiane] = useState(MSG.diane)
  const [elrond, setElrond] = useState('')
  const [feanor, setFeanor] = useState(MSG.feanor)

  useEffect(() => {
    setBob('')
    setBob(MSG.bob)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCharles('')
      setCharles(MSG.charles)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDiane('')
      setDiane(MSG.diane)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setElrond(MSG.elrond)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let timer2: number
    const timer = setTimeout(() => {
      setFeanor('')
      timer2 = setTimeout(() => {
        setFeanor(MSG.feanor)
      }, duration)
    }, initTime)
    return () => {
      clearTimeout(timer2)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      <h2>Status</h2>
      <p>
        Alice message is rendered as is. Bob message is rendered, then set to empty, then rendered, immediately on
        mount. Charles message is like Bob, but with 500ms delay. Diane, after 5000ms. Elrond pops up after 5000ms.
        Feanor is rendered after {initTime}ms, then set to empty, then rendered after {duration}ms. You can define the
        time and duration with the "time" and "duration" query parameters.
      </p>
      <div>
        <MsgBox>
          <div role="status" aria-live="polite">
            Status Alice
          </div>
        </MsgBox>
        <MsgBox>
          <div role="status" aria-live="polite">
            {bob}
          </div>
        </MsgBox>
        <MsgBox>
          <div role="status" aria-live="polite">
            {charles}
          </div>
        </MsgBox>
        <MsgBox>
          <div role="status" aria-live="polite">
            {diane}
          </div>
        </MsgBox>
        <MsgBox>
          <div role="status" aria-live="polite">
            {elrond}
          </div>
        </MsgBox>
        <MsgBox>
          <div role="status" aria-live="polite">
            {feanor}
          </div>
        </MsgBox>
      </div>
    </div>
  )
}

export default StatusOnLoad
