import classNames from 'classnames'
import { useState } from 'react'

const lorem = [
  'Anim culpa in incididunt exercitation irure ad deserunt ea exercitation. Id in exercitation in eiusmod sit culpa aliqua commodo. Ipsum est do occaecat excepteur consectetur irure qui ipsum. Eiusmod quis veniam sunt ipsum non. Nisi sit mollit adipisicing veniam nisi amet nulla exercitation sint dolor laborum exercitation mollit minim.',
  'Dolore consectetur nulla anim cillum do eu. Irure adipisicing velit esse in non. Voluptate eiusmod laborum do eu proident officia commodo id dolore proident et aute cupidatat. Sint voluptate nisi aute sit.',
  'Non aliquip cupidatat incididunt eiusmod nostrud culpa nulla sit labore eiusmod nisi voluptate. Aute deserunt ullamco ex minim mollit ipsum ea. Amet cupidatat elit exercitation irure ex sint proident incididunt mollit excepteur aliqua magna dolor.',
]

function getPreviousIndex(current: number, elements: HTMLButtonElement[]) {
  for (let i = current - 1; i >= 0; i -= 1) {
    if (!elements[i].disabled) {
      return i
    }
  }

  for (let i = elements.length - 1; i > -1; i -= 1) {
    if (!elements[i].disabled) {
      return i
    }
  }

  return current
}

function getNextIndex(current: number, elements: HTMLButtonElement[]) {
  for (let i = current + 1; i < elements.length; i += 1) {
    if (!elements[i].disabled) {
      return i
    }
  }

  for (let i = 0; i < elements.length; i += 1) {
    if (!elements[i].disabled) {
      return i
    }
  }

  return current
}

function App() {
  const [value, onTabChange] = useState<string>('one')

  function activateTab(value: string) {
    onTabChange(value)
  }

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

  return (
    <div>
      <div role="tablist" aria-orientation="horizontal" className="flex gap-2">
        <button
          className="button"
          role="tab"
          tabIndex={value === 'one' ? 0 : -1}
          onClick={() => activateTab('one')}
          aria-controls="tabs-one-panel"
          id="tabs-one-tab"
          onKeyDown={(e) => handleKeyDown(e)}
        >
          Tab 1
        </button>
        <button
          className="button"
          role="tab"
          tabIndex={value === 'two' ? 0 : -1}
          onClick={() => activateTab('two')}
          aria-controls="tabs-two-panel"
          id="tabs-two-tab"
          onKeyDown={(e) => handleKeyDown(e)}
        >
          Tab 2
        </button>
        <button
          className="button"
          role="tab"
          tabIndex={value === 'three' ? 0 : -1}
          onClick={() => activateTab('three')}
          aria-controls="tabs-three-panel"
          id="tabs-three-tab"
          onKeyDown={(e) => handleKeyDown(e)}
        >
          Tab 3
        </button>
      </div>
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
    </div>
  )
}

export default App
