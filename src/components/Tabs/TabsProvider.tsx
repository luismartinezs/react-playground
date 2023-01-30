import { useState } from 'react'

import { useId } from '@/util'

import { TabsValue } from './Tabs.types'
import { TabsContext } from './Tabs.context'

export interface TabsProviderProps {
  defaultValue: TabsValue
  children: React.ReactNode
}

export function TabsProvider({ defaultValue, children }: TabsProviderProps) {
  const uid = useId()

  const [value, onChange] = useState<TabsValue>(defaultValue)

  return (
    <TabsContext.Provider
      value={{
        id: uid,
        value,
        onTabChange: onChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}
