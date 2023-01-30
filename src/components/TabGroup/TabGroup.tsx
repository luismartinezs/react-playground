import { FC } from 'react'
import TabButton from './TabButton'
import TabRow from './TabRow'

const TabGroup: FC = (): JSX.Element => {
  return (
    <div>
      <h2>TabGroup</h2>
      <TabRow>
        <TabButton
          title="Tab 1"
          content={
            <>
              <h2>Heading 1</h2>
              <p>
                Quis amet aliquip officia deserunt occaecat. Magna et sint veniam et enim. Sunt occaecat cupidatat dolor
                eiusmod cupidatat commodo est est enim adipisicing ex sint. Veniam deserunt minim eiusmod reprehenderit.
                Labore culpa occaecat tempor ea laborum eu. Id cillum labore voluptate pariatur ut quis pariatur officia
                incididunt duis.
              </p>
            </>
          }
        />
        <TabButton
          title="Tab 2"
          content={
            <>
              <h2>Heading 2</h2>
              <p>
                Laboris quis enim eu velit aliqua. Qui sint incididunt ex qui cillum. Adipisicing nisi pariatur eu
                cupidatat duis elit consectetur anim mollit sit aute quis deserunt labore. Elit reprehenderit aliqua
                dolor ex minim non commodo ea aute deserunt enim veniam nulla veniam. Eiusmod enim magna aliqua pariatur
                deserunt esse magna est veniam est enim. Sit sint duis ipsum voluptate anim eiusmod ex nulla.
              </p>
            </>
          }
        />
      </TabRow>
    </div>
  )
}

export default TabGroup
