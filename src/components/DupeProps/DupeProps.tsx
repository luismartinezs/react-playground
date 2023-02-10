import { FC } from 'react'

import { useId } from '@/util'

function Input(props: { value: string; label: string; 'aria-describedby'?: string }) {
  const id = useId()
  return (
    <label htmlFor={id}>
      {props.label}
      <input id={id} {...props} aria-describedby={props['aria-describedby']} />
    </label>
  )
}

const DupeProps: FC = (): JSX.Element => {
  const id = useId()
  return (
    <div>
      <h2>DupeProps</h2>
      <p>Case of React component with duplicate props</p>
      <p>The custom input component has a dupe prop aria-describedby, but it only shows up once in the html</p>
      <Input value="hello" label="Custom Input" aria-describedby={id} />
      <div id={id}>ZA WARUDO!</div>
    </div>
  )
}

export default DupeProps
