import React from 'react'

const AlertMsg = () => {
  const [showMsg, setShowMsg] = React.useState(true)
  return (
    <>
      {showMsg && <div>This is an alert</div>}
      <button className="button" onClick={() => setShowMsg(!showMsg)}>
        Toggle msg
      </button>
    </>
  )
}

const Alert = () => {
  return (
    <>
      <h2>Role alert</h2>
      <div role="alert">
        <AlertMsg />
      </div>
    </>
  )
}

export default Alert
