import classNames from 'classnames'
import { createContext, useContext, useState } from 'react'

const lorem = [
  'Anim culpa in incididunt exercitation irure ad deserunt ea exercitation. Id in exercitation in eiusmod sit culpa aliqua commodo. Ipsum est do occaecat excepteur consectetur irure qui ipsum. Eiusmod quis veniam sunt ipsum non. Nisi sit mollit adipisicing veniam nisi amet nulla exercitation sint dolor laborum exercitation mollit minim.',
  'Dolore consectetur nulla anim cillum do eu. Irure adipisicing velit esse in non. Voluptate eiusmod laborum do eu proident officia commodo id dolore proident et aute cupidatat. Sint voluptate nisi aute sit.',
  'Non aliquip cupidatat incididunt eiusmod nostrud culpa nulla sit labore eiusmod nisi voluptate. Aute deserunt ullamco ex minim mollit ipsum ea. Amet cupidatat elit exercitation irure ex sint proident incididunt mollit excepteur aliqua magna dolor.',
]

function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
  const elements = Array.from(event.currentTarget.parentElement?.children || [])
  const parentSelector = '[role="tablist"]'
  const siblingSelector = '[role="tab"]'

  const current = elements.findIndex((el) => event.currentTarget === el)
  const nextIndex = getNextIndex(current, elements)
  const previousIndex = getPreviousIndex(current, elements)

  switch (event.key) {
    case 'ArrowRight':
      event.stopPropagation()
      event.preventDefault()
      elements[nextIndex].focus()
      elements[nextIndex].click()
      break
    case 'ArrowLeft':
      event.stopPropagation()
      event.preventDefault()
      elements[previousIndex].focus()
      elements[previousIndex].click()
      break
    case 'Home':
      event.stopPropagation()
      event.preventDefault()
      !elements[0].disabled && elements[0].focus()
      break
    case 'End':
      event.stopPropagation()
      event.preventDefault()
      const last = elements.length - 1
      !elements[last].disabled && elements[last].focus()
      break
  }
}

const TabsContext = createContext({
  value: '',
  onTabChange: (value: string) => {},
})

function TabsProvider({ defaultValue, children }) {
  const [value, onChange] = useState(defaultValue)

  return <TabsContext.Provider value={{ value, onTabChange: onChange }}>{children}</TabsContext.Provider>
}

function getNextIndex(current: number, elements: HTMLButtonElement[]): number {
  const next = (current + 1) % elements.length

  return elements[next].disabled ? getNextIndex(next, elements) : next
}

function getPreviousIndex(current: number, elements: HTMLButtonElement[]): number {
  const total = elements.length
  const previous = (current + total - 1) % total

  return elements[previous].disabled ? getPreviousIndex(previous, elements) : previous
}

function TabPanel({ children }) {
  return <></>
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
      onClick={() => activateTab('one')}
      aria-controls="tabs-one-panel"
      id="tabs-one-tab"
      onKeyDown={(e) => handleKeyDown(e)}
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
      <div
        role="tabpanel"
        id="tabs-one-panel"
        className={classNames(value === 'one' ? 'block' : 'hidden')}
        aria-labelledby="tabs-one-tab"
        tabIndex={value === 'one' ? 0 : -1}
      >
        <h2>Tab 1 content</h2>
        <p>{lorem[0]}</p>
      </div>
      <div
        role="tabpanel"
        id="tabs-two-panel"
        className={classNames(value === 'two' ? 'block' : 'hidden')}
        aria-labelledby="tabs-two-tab"
        tabIndex={value === 'two' ? 0 : -1}
      >
        <h2>Tab 2 content</h2>
        <p>{lorem[1]}</p>
      </div>
      <div
        role="tabpanel"
        id="tabs-three-panel"
        className={classNames(value === 'three' ? 'block' : 'hidden')}
        aria-labelledby="tabs-three-tab"
        tabIndex={value === 'three' ? 0 : -1}
      >
        <h2>Tab 3 content</h2>
        <p>{lorem[2]}</p>
      </div>
    </TabsProvider>
  )
}

export default App
