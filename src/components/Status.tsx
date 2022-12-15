import React from 'react'

const StatusMsg = () => {
  const [showMsg, setShowMsg] = React.useState(true)
  return (
    <>
      {showMsg && <div>This is a status</div>}
      <button className="button" onClick={() => setShowMsg(!showMsg)}>
        Toggle msg
      </button>
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
