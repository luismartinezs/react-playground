import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function timerMessage(minutes: number, seconds: number) {
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const INTERVAL = 10 // in seconds

function Timer() {
  let [searchParams] = useSearchParams()
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [srMinutes, setSRMinutes] = useState(0)
  const [srSeconds, setSRSeconds] = useState(0)

  const timer1 = searchParams.get('timer1') || 'timer'
  const timer2 = searchParams.get('timer2') || 'alert'
  const interval = parseInt(searchParams.get('interval') || '') || INTERVAL

  useEffect(() => {
    const interval1 = setInterval(() => {
      setMinutes((minutes) => {
        if (seconds === 59) {
          return minutes + 1
        }
        return minutes
      })
      setSeconds((seconds) => {
        if (seconds === 59) {
          return 0
        }
        return seconds + 1
      })
    }, 1000)
    return () => clearInterval(interval1)
  }, [])

  useEffect(() => {
    const interval2 = setInterval(() => {
      setSRMinutes((minutes) => {
        if (seconds === 59) {
          return minutes + 1
        }
        return minutes
      })
      setSRSeconds((seconds) => {
        if (seconds === 59) {
          return 0
        }
        return seconds + interval
      })
    }, interval * 1_000)
    return () => clearInterval(interval2)
  }, [])

  return (
    <div>
      <h2>Timer</h2>
      <p>Use query params timer1 and timer2 to determine the role of each respectively</p>
      <p>Use interval to determine how many seconds for changing timer2 (more or less)</p>
      <p>Defaults: ?timer1=timer&timer2=alert&interval=10</p>
      <div>
        <span>Timer 1: this is a {timer1}: </span>
        <span id="timer" className="timer" role={timer1}>
          {timerMessage(minutes, seconds)}
        </span>
      </div>
      <div>
        <span>Timer 2: this is a {timer2}: </span>
        <span id="alert" role={timer2} aria-live="assertive">
          {timerMessage(srMinutes, srSeconds)}
        </span>
      </div>
    </div>
  )
}

export default Timer
