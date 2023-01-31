import { useId } from '@/util'
import classNames from 'classnames'
import { createContext, useContext, useState } from 'react'
import { createScopedKeydownHandler } from './util'

const lorem = [
  'Anim culpa in incididunt exercitation irure ad deserunt ea exercitation. Id in exercitation in eiusmod sit culpa aliqua commodo. Ipsum est do occaecat excepteur consectetur irure qui ipsum. Eiusmod quis veniam sunt ipsum non. Nisi sit mollit adipisicing veniam nisi amet nulla exercitation sint dolor laborum exercitation mollit minim.',
  'Dolore consectetur nulla anim cillum do eu. Irure adipisicing velit esse in non. Voluptate eiusmod laborum do eu proident officia commodo id dolore proident et aute cupidatat. Sint voluptate nisi aute sit.',
  'Non aliquip cupidatat incididunt eiusmod nostrud culpa nulla sit labore eiusmod nisi voluptate. Aute deserunt ullamco ex minim mollit ipsum ea. Amet cupidatat elit exercitation irure ex sint proident incididunt mollit excepteur aliqua magna dolor.',
]

function getTabId(id: string, value: string) {
  return `${id}-${value}-tab`
}

function getPanelId(id: string, value: string) {
  return `${id}-${value}-panel`
}

const TabsContext = createContext({
  value: '',
  onTabChange: (value: string) => {},
  id: '',
})

function TabsProvider({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  const [value, onChange] = useState(defaultValue)
  const id = useId()

  return <TabsContext.Provider value={{ value, onTabChange: onChange, id }}>{children}</TabsContext.Provider>
}

function TabPanel({ children, value }: { children: React.ReactNode; value: string }) {
  const ctx = useContext(TabsContext)
  const active = ctx.value === value

  return (
    <div
      role="tabpanel"
      id={getPanelId(ctx.id, ctx.value)}
      className={classNames(active ? 'block' : 'hidden')}
      aria-labelledby={getTabId(ctx.id, ctx.value)}
      tabIndex={active ? 0 : -1}
    >
      {children}
    </div>
  )
}

function Tab({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)
  if (ctx === null) {
    throw new Error('Tab must be used within a TabsProvider')
  }

  function activateTab(value: string) {
    ctx.onTabChange(value)
  }

  return (
    <button
      className="button"
      role="tab"
      tabIndex={ctx.value === value ? 0 : -1}
      onClick={() => activateTab(value)}
      aria-controls={getPanelId(ctx.id, value)}
      id={getTabId(ctx.id, value)}
      onKeyDown={createScopedKeydownHandler({
        parentSelector: '[role="tablist"]',
        siblingSelector: '[role="tab"]',
        activateOnFocus: true,
      })}
    >
      {children}
    </button>
  )
}

function TabsList({ children, className = 'flex gap-2' }: { children: React.ReactNode; className?: string }) {
  return (
    <div role="tablist" aria-orientation="horizontal" className={className}>
      {children}
    </div>
  )
}

function App() {
  const [value, onTabChange] = useState<string>('one')

  function activateTab(value: string) {
    onTabChange(value)
  }

  return (
    <TabsProvider defaultValue="one">
      <TabsList>
        <Tab value="one">Tab 1</Tab>
        <Tab value="two">Tab 2</Tab>
        <Tab value="three">Tab 3</Tab>
      </TabsList>
      <TabPanel value="one">
        <h2>Tab 1 content</h2>
        <p>{lorem[0]}</p>
      </TabPanel>
      <TabPanel value="two">
        <h2>Tab 2 content</h2>
        <p>{lorem[1]}</p>
      </TabPanel>
      <TabPanel value="three">
        <h2>Tab 3 content</h2>
        <p>{lorem[2]}</p>
      </TabPanel>
    </TabsProvider>
  )
}

export default App
