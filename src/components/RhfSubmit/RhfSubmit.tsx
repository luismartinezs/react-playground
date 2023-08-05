import { FC, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

interface IFormInputs {
  name: string
  mail: string
  checkbox: boolean
}

function timeout(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

const Spinner = () => (
  <>
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </>
)

function createCard() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 'fake-card',
      })
    }, 200)
  })
}

function stripe() {
  return {
    createToken: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: {
              id: 'fake-token',
            },
          })
        }, 200)
      })
    },
  }
}

function Form({ disabledCheckbox }: { disabledCheckbox?: boolean }) {
  const [paymentSubmitting, setPaymentSubmitting] = useState(false)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IFormInputs>({
    defaultValues: {
      name: 'Walter',
      mail: 'heisenberg@cook.mth',
      checkbox: true,
    },
  })

  const isLoading = isSubmitting || paymentSubmitting

  const save: SubmitHandler<IFormInputs> = (data) => {
    console.debug('save')
    if (!data) return

    setPaymentSubmitting(true)
    setPaymentError('')

    return timeout(1_000)
      .then(() => {
        setIsPaymentProcessing(true)
        // here there would be some payment logic, let's just throw and error for now
        throw new Error('Ooops!')
      })
      .catch((error) => {
        setPaymentError(error.message)
        setIsPaymentProcessing(false)
        setPaymentSubmitting(false)
        return error
      })
  }

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(save)(e).catch((error) => {
          console.debug('form error')
          setPaymentSubmitting(false)
          setIsPaymentProcessing(false)
          return error
        })
      }
      className="my-4 flex flex-col gap-2"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <div>
        <label htmlFor="name">
          Name
          <input
            id="name"
            {...register('name', { required: true })}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'errors-name' : undefined}
            className="ml-2"
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
            className="ml-2"
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
        <label htmlFor="checkbox" className="ml-2">
          Checkbox
        </label>
      </div>

      <div role="alert">{paymentError && <p className="text-red-500">{paymentError}</p>}</div>
      {isPaymentProcessing && <div>Payment processing...</div>}

      <div>
        <button type="submit" className="mt-2 button flex items-center justify-center !px-4 !py-2">
          {isLoading && <Spinner />}
          Submit
        </button>
      </div>
    </form>
  )
}

const RhfSubmit: FC = (): JSX.Element => {
  return (
    <div>
      <h2>RhfSubmit</h2>
      <h3>Fake payment form</h3>
      <Form />
    </div>
  )
}

export default RhfSubmit
