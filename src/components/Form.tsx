import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInputs {
  name: string
  mail: string
  checkbox: boolean
}

const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

export default function Form({ disabledCheckbox = true }: { disabledCheckbox?: boolean }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="my-4">
      {/* register your input into the hook by invoking the "register" function */}
      <div>
        <label htmlFor="name">
          Name
          <input
            id="name"
            {...register('name', { required: true })}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'errors-name' : undefined}
          />
        </label>
        {errors.name?.type === 'required' && <p id="errors-name">First name is required</p>}
      </div>

      {/* include validation with required or other standard HTML validation rules */}
      <div>
        <label htmlFor="mail">
          Mail
          <input
            id="mail"
            {...register('mail', { required: 'Email Address is required' })}
            aria-invalid={errors.mail ? 'true' : 'false'}
            aria-describedby={errors.mail ? 'errors-email' : undefined}
            className="mt-2"
          />
        </label>
        {errors.mail && <p id="errors-email">{errors.mail?.message}</p>}
      </div>

      {/* Disabled but focusable checkbox */}
      <div>
        <input
          type="checkbox"
          {...(disabledCheckbox ? { ...register('checkbox'), checked: false } : register('checkbox'))}
          aria-disabled={disabledCheckbox}
        />
        <label htmlFor="checkbox">Checkbox</label>
      </div>

      <div>
        <input type="submit" className="mt-2 button" />
      </div>
    </form>
  )
}
