import React from 'react'
import classnames from 'classnames'
import Styles from './TextEllipsis.module.css'

const TextOfLength = (length: number) => {
  let text = ''
  for (let i = 0; i < length; i++) {
    text += 'a'
  }
  return text
}

const Dot = () => {
  return <span className="inline-block w-[5px] h-[5px] mr-2 rounded-full bg-sky-500"></span>
}

const TextEllipsis = () => {
  return (
    <div>
      <h2>TextEllipsis</h2>

      {/* <ul className="max-w-[200px] h-[27px] border border-sky-500">
        <li className="w-full">
          <button className="flex w-full">
            <div className="w-[25px] h-[25px] bg-sky-500"></div>
            <span className="w-full">
              <span className={classnames(Styles.p, 'w-full')}>{TextOfLength(200)}</span>
            </span>
          </button>
        </li>
      </ul> */}

      <ul className="max-w-[200px] border border-sky-500">
        <li>
          <button className="max-w-[200px] flex items-center">
            <Dot />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              <span className="">{TextOfLength(200)}</span>
              <span className="">{TextOfLength(100)}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default TextEllipsis
