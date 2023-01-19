import React from 'react'
import { useCountDispatch } from './countProvider'

const IncreaseButton = () => {
  const dispatch = useCountDispatch()

  return (
    <button className="button" onClick={() => dispatch({ type: 'increment' })}>
      Increase
    </button>
  )
}

export default IncreaseButton
