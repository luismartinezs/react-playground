import { FC, useState } from 'react'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import classNames from 'classnames'
import classnames from 'classnames'

let stripePromise: Promise<Stripe | null> | null
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY)
  }
  return stripePromise
}

getStripe()

const StripeElementWrapper = ({ stripeOptions, StripeElement, id }) => {
  const [wrapperClasses, setWrapperClasses] = useState('')
  const handleFocus = () => {
    console.log('focused')
    setWrapperClasses('outline-none ring-2 ring-sky-500')
  }
  const handleBlur = () => {
    console.log('blurred')
    setWrapperClasses('')
  }
  return (
    <div className={classnames(wrapperClasses, '')}>
      <StripeElement
        id={id}
        className="px-4 py-2 bg-white border rounded-md"
        options={stripeOptions}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  )
}

const CheckoutForm = () => {
  const commonOptions = {
    classes: {
      // focus: 'outline-none ring-2 ring-sky-500',
    },
    style: {
      // focus: {
      //   boxShadow: 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      //   outline: '0',
      // },
    },
  }
  return (
    <form>
      <div className="max-w-xl my-2">
        <label htmlFor="cardNumber">
          Card number:
          <StripeElementWrapper StripeElement={CardNumberElement} stripeOptions={commonOptions} id="cardNumber" />
        </label>
      </div>
      <div className="max-w-xl my-2">
        <label htmlFor="cardExpiry">
          Card expiry:
          <StripeElementWrapper StripeElement={CardExpiryElement} stripeOptions={commonOptions} id="cardExpiry" />
        </label>
      </div>
      <div className="max-w-xl my-2">
        <label htmlFor="cardCvc">
          CVC:
          <StripeElementWrapper StripeElement={CardCvcElement} stripeOptions={commonOptions} id="cardCvc" />
        </label>
      </div>
      <button className="button">Submit</button>
    </form>
  )
}

const StripeForm = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_1JKShm2tXu0CfXKwUpP6oYR1_secret_iAr1THsXXryu1c5y6gxtgu0RA',
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}

const ReactStripe: FC = (): JSX.Element => {
  return (
    <div>
      <h2>ReactStripe</h2>
      <p>Playing around with Stripe React library</p>
      <StripeForm />
    </div>
  )
}

export default ReactStripe
