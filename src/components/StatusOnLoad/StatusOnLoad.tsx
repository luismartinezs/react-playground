import React, { useEffect, useState } from 'react'

const MSG = 'Status Bob'

const StatusOnLoad = () => {
  const [bob, setBob] = useState(MSG)

  useEffect(() => {
    setBob('')
    setBob(MSG)
  })

  return (
    <div>
      <h2>Status</h2>
      <div>
        <div role="status" aria-live="polite">
          Status Alice
        </div>
        <div role="status" aria-live="polite">
          {bob}
        </div>
      </div>
    </div>
  )
}

export default StatusOnLoad
