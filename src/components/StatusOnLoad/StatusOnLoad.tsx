import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import classnames from 'classnames'

const ENABLED = {
  alice: false,
  bob: false,
  charles: false,
  diane: false,
  elrond: false,
  feanor: true,
}

function FlashingContent({
  children,
  init = 250,
  duration = 150,
}: {
  children: React.ReactNode
  init?: number
  duration?: number
}) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShow(false)
      const timer2 = setTimeout(() => {
        setShow(true)
      }, duration)
      return () => clearTimeout(timer2)
    }, init)
    return () => clearTimeout(timer1)
  }, [])

  return <span style={{ visibility: show ? 'visible' : 'hidden' }}>{children}</span>
}

const MsgBox = ({ children, isStatus }: { children?: React.ReactNode; isStatus?: boolean }) => {
  return (
    <div
      role={isStatus ? 'status' : 'none'}
      aria-live={isStatus ? 'polite' : 'off'}
      className={classnames(
        'p-2 m-1 border rounded-md border-sky-500 w-fit min-w-[150px] min-h-[42px]',
        isStatus ? 'text-sky-900' : 'text-zinc-400'
      )}
    >
      {children}
    </div>
  )
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

  return (
    <div>
      <h2>Status</h2>
      <p>
        Alice message is rendered as is. Bob message is rendered, then set to empty, then rendered, immediately on
        mount. Charles message is like Bob, but with 500ms delay. Diane, after 5000ms. Elrond pops up after 5000ms.
        Feanor is rendered after {initTime}ms, then set to empty, then rendered after {duration}ms. You can define the
        time and duration with the "time" and "duration" query parameters.
      </p>
      <p>Elrond off, because it just works</p>
      <div>
        <MsgBox isStatus={ENABLED.alice}>Status Alice</MsgBox>
        <MsgBox isStatus={ENABLED.bob}>{bob}</MsgBox>
        <MsgBox isStatus={ENABLED.charles}>{charles}</MsgBox>
        <MsgBox isStatus={ENABLED.diane}>{diane}</MsgBox>
        <MsgBox isStatus={ENABLED.elrond}>{elrond}</MsgBox>
        <MsgBox isStatus={ENABLED.feanor}>
          <FlashingContent init={initTime} duration={duration}>
            {MSG.feanor}
          </FlashingContent>
        </MsgBox>
      </div>
    </div>
  )
}

export default StatusOnLoad
