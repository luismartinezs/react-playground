import { FC, useLayoutEffect, useRef, useState, useId } from 'react'

function getRandomSize(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
  const r = getRandomSize(0, 255)
  const g = getRandomSize(0, 255)
  const b = getRandomSize(0, 255)
  return `rgb(${r} ${g} ${b})`
}

const Rectangle: FC = (): JSX.Element => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [color, setColor] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const { height, width } = ref.current.getBoundingClientRect()
    setWidth(width)
    setHeight(height)
    setColor(ref.current.style.backgroundColor)
  }, [])

  return (
    <div>
      <div
        ref={ref}
        style={{
          height: getRandomSize(10, 200),
          width: getRandomSize(10, 200),
          backgroundColor: getRandomColor(),
        }}
      ></div>
      <div>
        <p>
          Size: {width}, {height}
        </p>
        <p>Color: {color}</p>
      </div>
    </div>
  )
}

const ElSizeLayoutEffect: FC = (): JSX.Element => {
  const [key, setKey] = useState(0)
  return (
    <div>
      <h2>ElSizeLayoutEffect</h2>
      <button
        className="button mb-2"
        onClick={() => {
          setKey((prev) => prev + 1)
        }}
      >
        Rerender
      </button>
      <Rectangle key={key} />
    </div>
  )
}

export default ElSizeLayoutEffect
