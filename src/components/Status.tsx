import React from 'react'

const StatusMsg = () => {
  const [showMsg, setShowMsg] = React.useState(true)
  return (
    <>
      <button className="button" onClick={() => setShowMsg(!showMsg)}>
        Toggle msg
      </button>
      {showMsg && <div>This is a status</div>}
    </>
  )
}

const Status = () => {
  return (
    <>
      <h2>Role status</h2>
      <div role="status">
        <StatusMsg />
      </div>
    </>
  )
}

export default Status
