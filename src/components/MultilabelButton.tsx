import React from 'react'

const MultilabelButton = () => {
  return (
    <div>
      <h2>MultilabelButton</h2>
      <p>Button with two spans inside</p>
      <button className="button">
        <span>Click me</span>
        <span className="sr-only">screen reader only</span>
      </button>
      <p>Button with two divs inside</p>
      <button className="button">
        <div>Click me</div>
        <div className="sr-only">screen reader only</div>
      </button>
    </div>
  )
}

export default MultilabelButton
