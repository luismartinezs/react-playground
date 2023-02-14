import { FC } from 'react'

import Divider from '@/components/Divider'

const RadioInput = ({
  name,
  value,
  label,
  ...rest
}: {
  name: string
  value: string
  label: string
  [key: string]: any
}) => {
  return (
    <div>
      <input type="radio" id={name} name={name} value={value} {...rest} />
      <label htmlFor={name} className="ml-2">
        {label}
      </label>
    </div>
  )
}

const RadioGroup = ({ legend, children }: { legend: string; children: React.ReactNode }) => {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div>{children}</div>
    </fieldset>
  )
}

const Form = () => {
  return (
    <form>
      <RadioGroup legend="Select one option">
        <RadioInput name="radio" value="1" label="Radio 1" />
        <RadioInput name="radio" value="2" label="Radio 2" />
        <RadioInput name="radio" value="3" label="Radio 3" />
        <RadioInput name="radio" value="4" label="Radio 4" />
        <RadioInput name="radio" value="5" label="Radio 5" />
      </RadioGroup>
    </form>
  )
}

const RadioGroupRhf: FC = (): JSX.Element => {
  return (
    <div>
      <h2>RadioGroupRhf</h2>
      <Divider />
      <Form />
    </div>
  )
}

export default RadioGroupRhf
