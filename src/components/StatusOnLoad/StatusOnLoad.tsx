import React, { useEffect, useState } from 'react'

const MSG = { bob: 'Status Bob', charles: 'Status Charles' }

const StatusOnLoad = () => {
  const [bob, setBob] = useState(MSG.bob)
  const [charles, setCharles] = useState(MSG.charles)

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

  return (
    <div>
      <h2>Status</h2>
      <p>
        Alice message is rendered as is. Bob message is rendered, then set to empty, then rendered, immediately on
        mount. Charles message is like Bob, but with 500ms delay
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
      </div>
    </div>
  )
}

export default StatusOnLoad
