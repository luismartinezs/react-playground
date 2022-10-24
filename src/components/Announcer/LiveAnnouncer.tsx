import React, { useEffect, useState } from 'react'

const LiveAnnouncer = () => {
  const [ message, setMessage ] = useState('')
  useEffect(() => {
    console.log('Render live announcer');
    const timer = setTimeout(() => {
      setMessage('Hello world')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  // this works, so apparently the live region gets announced even if it gets rendered anew
  if (!message) {
    return null
  }
  return (
    <div aria-live="polite">{message}</div>
  )
}

export default LiveAnnouncer