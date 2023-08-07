import { FC, useMemo, useState } from 'react'

const hugeListWithRandomStrings = [
  ...Array.from({ length: 10000 }, () => Math.random().toString(36).substring(7)),
  'car',
  'scarlet',
  'carbon',
  'jotaro',
  'josuke',
  'joseph',
  'jolyne',
  'giorno',
]

const ListUseMemo: FC = (): JSX.Element => {
  const [search, setSearch] = useState('')

  // NOTE filteredList will only be recalculated when search changes, else, the value is memoized
  // this still does not prevent slow rendering, for speedy render, "windowing" should be used
  const filteredList = useMemo(() => hugeListWithRandomStrings.filter((el) => el.includes(search)), [search])

  return (
    <div>
      <h2>ListUseMemo</h2>
      <p>Memoized filtered list</p>
      <label>
        Search
        <input type="search" className="input ml-2" value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <ul className="max-h-[300px] overflow-auto bg-primary-200 rounded-xl border border-primary-500 mt-4 px-2 py-1">
        {filteredList.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListUseMemo
