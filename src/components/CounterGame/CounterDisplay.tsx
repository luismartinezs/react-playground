import React, { useEffect } from 'react'
import { useCount } from './countProvider'

const CounterDisplay = () => {
  const count = useCount()

  return <div className="counter">{count}</div>
}

export default CounterDisplay
