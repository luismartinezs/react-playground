import React, { useContext } from 'react'
import { useCountDispatch } from './countProvider'

const DecreaseButton = () => {
  const dispatch = useCountDispatch()

  return (
    <button className="button" onClick={() => dispatch({ type: 'decrement' })}>
      Decrease
    </button>
  )
}

export default DecreaseButton
