import React from 'react'

import { Tab } from './Tab/Tab'
import { TabsList } from './TabsList/TabsList'
import { TabsPanel } from './TabsPanel/TabsPanel'
import { TabsProvider, TabsProviderProps } from './TabsProvider'

type TabsProps = TabsProviderProps

type TabsComponent = ((props: TabsProps) => React.ReactElement) & {
  List: typeof TabsList
  Tab: typeof Tab
  Panel: typeof TabsPanel
}

const Tabs: TabsComponent = ({ defaultValue, children }: TabsProps) => {
  return <TabsProvider defaultValue={defaultValue}>{children}</TabsProvider>
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabsPanel

export { Tabs }
