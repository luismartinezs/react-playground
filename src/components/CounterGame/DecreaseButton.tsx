import React, { useContext } from 'react'
import { useCountDecrement } from './countProvider'

const DecreaseButton = () => {
  const decrement = useCountDecrement()

  return (
    <button className="button" onClick={decrement}>
      Decrease
    </button>
  )
}

export default DecreaseButton
