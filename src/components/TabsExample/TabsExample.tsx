import { FC } from 'react'

import { Tabs } from '@/components/Tabs'
import App from './Diy'

const TabsExample: FC = (): JSX.Element => {
  return (
    <div>
      <h2>TabsExample</h2>
      {/* <Tabs defaultValue="goku">The tabz</Tabs> */}
      <App />
    </div>
  )
}

export default TabsExample
