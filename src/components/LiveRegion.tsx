import React, { useState } from 'react'

type Politeness = React.AriaAttributes['aria-live']

function Message({ msg }: { msg: string }) {
  const [showMsg, setShowMsg] = useState(true)
  return (
    <>
      {showMsg && <div>This is a {msg} live region</div>}
      <button className="button" onClick={() => setShowMsg(!showMsg)}>
        Toggle msg
      </button>
    </>
  )
}

export default function LiveRegion({ politeness }: { politeness: Politeness }) {
  return (
    <>
      <h2>Aria Live {politeness}</h2>
      <div aria-live={politeness}>
        <Message msg={politeness as string} />
      </div>
    </>
  )
}
