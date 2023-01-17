import { FC } from 'react'
import Left from './left'
import Right from './right'

const CssScope: FC = (): JSX.Element => {
  return (
    <div>
      <h2>CssScope</h2>
      <p>
        testing css scope, a component tree, where one css class is imported in one end, and a class with the same name
        is used somewhere else. If the css is scoped, then the class styles should not apply
      </p>
      <p>Left uses non scoped classes whereas right uses scoped css modules</p>
      <Left />
      <Right />
    </div>
  )
}

export default CssScope
