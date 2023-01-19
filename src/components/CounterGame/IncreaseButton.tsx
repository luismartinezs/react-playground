import React, { useEffect } from 'react'
import { useCountIncrement } from './countProvider'

const IncreaseButton = () => {
  const increment = useCountIncrement()

  return (
    <button className="button" onClick={increment}>
      Increase
    </button>
  )
}

export default IncreaseButton
