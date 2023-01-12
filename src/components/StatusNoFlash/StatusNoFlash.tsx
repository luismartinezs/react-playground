import React, { FC, useState, useEffect } from 'react'

const StatusNoFlash: FC = (): JSX.Element => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(false)
    }, 250)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <h2>StatusNoFlash</h2>
      <div role="status">
        <div aria-hidden={hidden}>New Feanor Status</div>
      </div>
    </div>
  )
}

export default StatusNoFlash
