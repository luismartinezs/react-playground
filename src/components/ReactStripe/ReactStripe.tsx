import { FC } from 'react'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { loadStripe, type Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY)
  }
  return stripePromise
}

getStripe()

const CheckoutForm = () => {
  const commonOptions = {
    classes: {
      focus: 'outline-none ring-2 ring-sky-500',
    },
  }
  return (
    <form>
      <CardNumberElement
        id="card-number"
        className="px-4 py-2 my-2 bg-white border rounded-md"
        options={commonOptions}
      />
      <CardExpiryElement className="px-4 py-2 my-2 bg-white border rounded-md" options={commonOptions} />
      <CardCvcElement className="px-4 py-2 my-2 bg-white border rounded-md" options={commonOptions} />
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
