import { FC } from 'react'

import Tabs from './Tabs'
import RadioGroup from './RadioGroup'

const TabsExample: FC = (): JSX.Element => {
  return (
    <div>
      <h2>TabsExample</h2>
      <Tabs />
      <h2>Radio group example</h2>
      <RadioGroup />
    </div>
  )
}

export default TabsExample
