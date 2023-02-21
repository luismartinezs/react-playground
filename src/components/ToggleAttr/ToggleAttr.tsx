import { FC, useState } from 'react'

const ToggleAttr: FC = (): JSX.Element => {
  const [ariaDescribedBy, setAriaDescribedBy] = useState<string | undefined>('description')
  const handleClick = () => {
    setAriaDescribedBy(ariaDescribedBy ? undefined : 'description')
  }
  return (
    <div>
      <h2>ToggleAttr</h2>
      <p>
        Click the button to toggle the value of <code>aria-describedby</code> to <code>undefined</code>
      </p>
      <button className="button block" onClick={handleClick}>
        Toggle
      </button>
      <input aria-describedby={ariaDescribedBy} className="block mt-2" />
      <p className="mt-2">Input description</p>
    </div>
  )
}

export default ToggleAttr
