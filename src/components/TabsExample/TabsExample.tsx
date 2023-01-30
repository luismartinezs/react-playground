import { FC } from 'react'

import { Tabs } from '@/components/Tabs'

const TabsExample: FC = (): JSX.Element => {
  return (
    <div>
      <h2>TabsExample</h2>
      <Tabs defaultValue="goku">The tabz</Tabs>
    </div>
  )
}

export default TabsExample
