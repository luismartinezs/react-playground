import { FC, forwardRef } from 'react'

import Divider from '@/components/Divider'
import { useForm } from 'react-hook-form'

const RadioInput = forwardRef<
  HTMLInputElement,
  {
    name: string
    value: string
    label: string
    [key: string]: any
  }
>(({ name, value, label, ...rest }, ref) => {
  return (
    <div>
      <input type="radio" id={name} name={name} value={value} ref={ref} {...rest} />
      <label htmlFor={name} className="ml-2">
        {label}
      </label>
    </div>
  )
})

const RadioGroup = ({ legend, children }: { legend: string; children: React.ReactNode }) => {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div>{children}</div>
    </fieldset>
  )
}

const Form = () => {
  const form = useForm()
  const options = [
    { value: '1', label: 'Radio 1' },
    { value: '2', label: 'Radio 2' },
    { value: '3', label: 'Radio 3' },
    { value: '4', label: 'Radio 4' },
    { value: '5', label: 'Radio 5' },
  ]

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <RadioGroup legend="Select one option">
        {options.map((option, idx) => {
          const isFocusable = (!form.watch('options') && idx === 0) || form.watch('options') === option.value

          return (
            <RadioInput
              key={option.value}
              value={option.value}
              label={option.label}
              {...form.register('options')}
              {...(!isFocusable && { tabIndex: -1 })}
            />
          )
        })}
      </RadioGroup>
      <button className="button mt-2" type="submit">
        Submit
      </button>
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
