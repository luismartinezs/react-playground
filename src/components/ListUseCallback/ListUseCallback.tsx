import { FC, useCallback, useEffect, useRef, useState } from 'react'

const generateItems = (): Promise<string[]> => {
  const randomDelay = Math.floor(Math.random() * 1000) + 1000
  // This function generates some items with a delay to emulate fetching data.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`))
    }, randomDelay)
  })
}
const ListUseCallback: FC = (): JSX.Element => {
  const listRef = useRef<HTMLUListElement>(null)
  const [items, setItems] = useState<string[]>([])
  const [fetching, setFetching] = useState(false)

  const fetchMoreItems = useCallback(async () => {
    setFetching(true)
    const newItems = await generateItems()
    setItems((items) => [...items, ...newItems])
    setFetching(false)
  }, [setItems, setFetching])

  useEffect(() => {
    fetchMoreItems()
  }, [fetchMoreItems])

  useEffect(() => {
    function onScroll() {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current
        console.log(scrollHeight - (scrollTop + clientHeight))
        if (!fetching && scrollHeight - (scrollTop + clientHeight) <= 0) {
          fetchMoreItems()
        }
      }
    }
    if (listRef.current) {
      listRef.current.addEventListener('scroll', onScroll)
    }
    return () => listRef.current?.removeEventListener('scroll', onScroll)
  }, [fetching, fetchMoreItems])

  return (
    <div>
      <h2>ListUseCallback</h2>
      <p>Memoized filtered list</p>
      <ul
        className="max-h-[300px] overflow-auto bg-primary-200 rounded-xl border border-primary-500 mt-4 px-2 py-1"
        ref={listRef}
      >
        {items.map((el) => (
          <li key={el}>{el}</li>
        ))}
        {fetching && <li>Loading {items.length > 0 && 'more'}...</li>}
      </ul>
    </div>
  )
}

export default ListUseCallback
