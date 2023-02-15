import { FC } from 'react'
import Divider from '@/components/Divider'

const steps = [1, 2, 3, 4]

const SrOutline: FC = (): JSX.Element => {
  return (
    <div>
      <h2>SR Outline</h2>
      <p>SR only element outline should overlap with the element it describes</p>
      <Divider />
      <div className="flex gap-4">
        {steps.map((step) => (
          <div aria-label={`Step ${step}`} key={step} className="rounded-full bg-sky-500 text-white font-bold px-2">
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SrOutline
