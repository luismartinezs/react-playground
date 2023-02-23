import { useState, useEffect } from 'react'

import Styles from './QuizTimer.module.scss'

type Props = {
  timeLimit: number
  onQuizTimeout: () => void
  quizStartTime: number
}

const MS_IN_1_SEC = 1_000
const MS_IN_A_MINUTE = MS_IN_1_SEC * 60
const MS_IN_A_HOUR = MS_IN_A_MINUTE * 60
const MS_IN_30_SEC = 30_000

function nearestTimeBlock(time: number, timeBlockSize: number) {
  return Math.ceil(time / timeBlockSize) * timeBlockSize
}

function formatTimeLeft(timeLeftMs: number) {
  const minutes = Math.floor((timeLeftMs % MS_IN_A_HOUR) / MS_IN_A_MINUTE)
  const seconds = Math.floor((timeLeftMs % MS_IN_A_MINUTE) / MS_IN_1_SEC)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function getNow(): number {
  return new Date().getTime()
}

function useNow(): number {
  const [now, setNow] = useState(getNow)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getNow())
    }, MS_IN_1_SEC)
    return () => clearInterval(interval)
  }, [])
  return now
}

function log(obj: Record<string, unknown>) {
  console.log('------------------')
  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
  })
  console.log('------------------')
}

function QuizTimer({ timeLimit, quizStartTime, onQuizTimeout }: Props) {
  const now = useNow()
  const endDate = quizStartTime + timeLimit
  const isTimedOut = now >= endDate

  useEffect(() => {
    if (isTimedOut) {
      onQuizTimeout()
    }
  }, [isTimedOut])

  if (isTimedOut) {
    return <div>Timed out</div>
  }

  const timeLeftMs = endDate - now

  const timeLeftForMsSr = nearestTimeBlock(timeLeftMs, MS_IN_30_SEC)

  const formattedTimeLeft = formatTimeLeft(timeLeftMs)
  const formattedTimeLeftSr = formatTimeLeft(timeLeftForMsSr)

  log({
    quizStartTime,
    timeLimit,
    now,
    endDate,
    timeLeftMs,
    timeLeftForMsSr,
    formattedTimeLeft,
    formattedTimeLeftSr,
  })

  return (
    <>
      <div className={timeLeftMs < 20_000 ? Styles.quizTimerWarning : Styles.quizTimer}>
        Timer: {formattedTimeLeft} left
      </div>
      <span className="" role="timer" aria-live="assertive">
        Alert: Less than {formattedTimeLeftSr} left
      </span>
    </>
  )
}

function Container() {
  return (
    <>
      <h2>Quiz Timer</h2>
      <p>Timer and the corresponding timer alert, which changes every 30 seconds</p>
      <QuizTimer
        timeLimit={120_000}
        quizStartTime={new Date().getTime()}
        onQuizTimeout={() => console.log('Time is up!')}
      />
    </>
  )
}

export default Container
