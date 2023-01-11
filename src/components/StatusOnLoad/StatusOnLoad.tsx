import React, { useEffect, useState } from 'react'

const MSG = { bob: 'Status Bob', charles: 'Status Charles', diane: 'Status Diane' }

const StatusOnLoad = () => {
  const [bob, setBob] = useState(MSG.bob)
  const [charles, setCharles] = useState(MSG.charles)
  const [diane, setDiane] = useState(MSG.diane)

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
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDiane('')
      setDiane(MSG.diane)
    }, 5000)
    return () => clearTimeout(timer)
  })

  return (
    <div>
      <h2>Status</h2>
      <p>
        Alice message is rendered as is. Bob message is rendered, then set to empty, then rendered, immediately on
        mount. Charles message is like Bob, but with 500ms delay. Diane, after 5000ms
      </p>
      <div>
        <div role="status" aria-live="polite">
          Status Alice
        </div>
        <div role="status" aria-live="polite">
          {bob}
        </div>
        <div role="status" aria-live="polite">
          {charles}
        </div>
        <div role="status" aria-live="polite">
          {diane}
        </div>
      </div>
    </div>
  )
}

export default StatusOnLoad
