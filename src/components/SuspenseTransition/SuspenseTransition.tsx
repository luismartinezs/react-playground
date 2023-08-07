// NOTE this isn't a good example of a transition (it was generated by chatGPT)
import { FC, Suspense, useEffect, useState, useTransition } from 'react'

const fetchItems = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry'].filter((item) => item.includes(query.toLowerCase())))
    }, 1000)
  })
}

const SuspenseTransition: FC = (): JSX.Element => {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    fetchItems(query).then((result) => setItems(result))
  }, [query])

  return (
    <div>
      <h2>SuspenseTransition</h2>
      <div>
        <input
          value={query}
          onChange={(e) => {
            const value = e.target.value
            startTransition(() => {
              setQuery(value)
            })
          }}
          placeholder="Search..."
        />
        <Suspense fallback={<p>Loading...</p>}>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Suspense>
        {isPending && <p>Fetching new results...</p>}
      </div>
    </div>
  )
}

export default SuspenseTransition
