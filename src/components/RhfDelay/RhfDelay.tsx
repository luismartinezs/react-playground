import { ChangeEvent, FC, FocusEvent, forwardRef, ReactNode } from 'react'
import {
  type RegisterOptions,
  useForm,
  type UseFormReturn,
  type SubmitHandler,
  Controller,
  Control,
} from 'react-hook-form'

interface IFormInputs {
  hopla: string
  firstName: string
  lastName: string
  mail: string
}

const Error = ({ children, ...otherProps }: { children: ReactNode; [key: string]: any }) => {
  return (
    <p className="text-red-500" {...otherProps}>
      {children}
    </p>
  )
}

const Input = forwardRef<
  HTMLInputElement,
  {
    label: string
    name: string
    onBlur: (event: FocusEvent<HTMLInputElement>) => void
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: string
    error?: string
    invalid?: boolean
    className?: string
  }
>((props, ref) => {
  const { label, name, error, invalid, ...otherProps } = props
  return (
    <>
      <label htmlFor={name}>
        {label}
        <input {...otherProps} aria-invalid={invalid} id={name} ref={ref} />
      </label>
      {error && <Error id={`errors-${name}`}>{error}</Error>}
    </>
  )
})

function registerField(form: UseFormReturn<IFormInputs>, key: keyof IFormInputs, options?: RegisterOptions) {
  console.log(key)
  return form.register(key, options)
}

function ControlledInput({
  control,
  name,
  label,
  rules,
  className,
}: {
  control: Control<IFormInputs, any>
  name: keyof IFormInputs
  label: string
  rules?: RegisterOptions
  className?: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <Input
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          label={label}
          name={name}
          ref={ref}
          error={error?.message}
          invalid={invalid}
          className={className}
        />
      )}
      rules={rules}
    />
  )
}

const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

const RhfDelay: FC = (): JSX.Element => {
  const form = useForm<IFormInputs>()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = form

  return (
    <div>
      <h2>RhfDelay</h2>
      <p>
        React Hook Forms form where the first input calls the register function last. If one component is `Controlled`,
        it will be registered last. Focus on invalid required inputs when submitting happens on registration focus. I.e.
        if the first input is controlled and required, the first uncontrolled invalid required input would receive focus
        instead. To fix this, the only option for now is to turn all inputs into Controlled inputs
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div>
          <ControlledInput
            control={control}
            name="hopla"
            label="Hopla"
            rules={{ required: 'Hopla is required' }}
            className="mt-0"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="firstName"
            label="First Name"
            rules={{ required: true }}
            className="mt-2"
          />
        </div>

        <div>
          <ControlledInput
            control={control}
            name="lastName"
            label="Last Name"
            rules={{ required: true }}
            className="mt-2"
          />
        </div>

        <div>
          <ControlledInput
            control={control}
            name="mail"
            label="Mail"
            rules={{ required: 'Email Address is required' }}
            className="mt-2"
          />
        </div>

        <div>
          <input type="submit" className="mt-2 button" />
        </div>
      </form>
    </div>
  )
}

export default RhfDelay
