// https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
import classNames from 'classnames'
import { FC, useState } from 'react'

function getReverseIndex(idx: number, arrLength: number): number {
  return arrLength - idx - 1
}

function List({ items }: { items: string[] }) {
  const [isReverse, setIsReverse] = useState(false)
  const [selection, setSelection] = useState<number[] | null>(null)

  const [prevItems, setPrevItems] = useState(items)

  // NOTE the idea here is that if items props changes some of the state is reset, and this is the way to accomplish it rather than using useEffect
  if (prevItems !== items) {
    setPrevItems(items)
    setSelection(null)
  }

  function handleClick(idx: number) {
    if (!selection) {
      setSelection([idx])
      return
    }
    if (selection?.includes(idx)) {
      setSelection(selection.filter((i) => i !== idx))
      return
    }
    setSelection([...selection, idx])
  }

  function reverse() {
    setIsReverse(!isReverse)
    const reversedSelection = selection?.map((idx) => getReverseIndex(idx, items.length))
    setSelection(reversedSelection || null)
  }

  const itemsToDisplay = isReverse ? [...items].reverse() : items

  return (
    <>
      <button onClick={reverse}>Reverse</button>
      <ul className="flex gap-2">
        {itemsToDisplay.map((item, idx) => (
          <li
            key={idx}
            className={classNames(
              'px-2 py-1 border border-primary-500 max-w-min whitespace-nowrap rounded-lg hover:bg-primary-200',
              selection?.includes(idx) && 'bg-primary-500 text-white hover:bg-primary-600'
            )}
          >
            <button onClick={() => handleClick(idx)}>{item}</button>
          </li>
        ))}
      </ul>
    </>
  )
}

const StateOnPropChange: FC = (): JSX.Element => {
  return (
    <div>
      <h2>StateOnPropChange</h2>
      <button></button>
      <List items={['Item 1', 'Item 2', 'Item 3']} />
    </div>
  )
}

export default StateOnPropChange
