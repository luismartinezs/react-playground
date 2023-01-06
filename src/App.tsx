import React, { useReducer } from 'react'
import CounterGame from '@/components/CounterGame'
import ThemeSelector from '@/components/ThemeSelector'
import { ThemeContext } from '@/context/theme'
import { countReducer, initialState } from '@/store/counter'
import CountProvider from '@/providers/count'
import TheThing from '@/components/TheThing'
import ScrollToMe from '@/components/ScrollToMe'
import SwApi from '@/components/SwApi'
import MapTest from '@/components/MapTest'
import TransformEffect from '@/components/TransformEffect'
// import LiveAnnouncer from "@/components/Announcer";
import Input from '@/components/Input'
import Disclosure from '@/components/Disclosure'
import PostDate from '@/components/PostDate'
import IntlWithValues from '@/components/IntlWithValues'
import AccessibleName from '@/components/AccessibleName'
import NestedIntl from '@/components/nestedIntl'
import StylesTest from '@/components/StylesTest'
import FakeBtn from '@/components/FakeBtn'
import Video from '@/components/Video'
import AriaProps from '@/components/AriaProps'
import LinkName from '@/components/LinkName'
import Form from '@/components/Form'
import FieldArray from '@/components/FieldArray'
import AriaDescribedby from '@/components/AriaDescribedby'
import StackingOrder from '@/components/StackingOrder'
import RadioButtons from '@/components/RadioButtons'
import CustomRadioGroup from '@/components/CustomRadioGroup'
import FieldsetExperiments from '@/components/FieldsetExperiments'
import FieldsetUsage from '@/components/FieldsetUsage'
import RadixRadioGroup from '@/components/RadixRadioGroup'
import FieldsetBasic from '@/components/FieldsetBasic'
import FocusManager from '@/components/FocusManager'
import Dialog from '@/components/Dialog'
import DateInput from '@/components/DateInput'
import { SROnlyToast } from '@/components/ScreenReader'
import ReactMask from '@/components/ReactMask'
import Parent from '@/components/Context'
import NestedContext from '@/components/NestedContext'
import BlurredInput from '@/components/BlurredInput'
import DelayedTooltip from '@/components/DelayedTooltip'
import AlertManager from '@/components/AlertManager'
import StepIndicator from '@/components/StepIndicator'
import Status from '@/components/Status'
import Alert from '@/components/Alert'
import LiveRegion from '@/components/LiveRegion'
import MultilabelButton from '@/components/MultilabelButton'
import Table from '@/components/Table'
import FocusScope from '@/components/ReactAria/FocusScope'
import ReactAriaDialog from '@/components/ReactAria/Dialog'
import AccessibleButton from '@/components/AccessibleButton'
import useDocumentTitle from './hooks/useDocumentTitle'

function App(): JSX.Element {
  useDocumentTitle('App - React Playground')

  return (
    <>
      <RadioButtons />
      <AccessibleButton onClick={() => console.log('clicked a11y button')}>A11y button</AccessibleButton>
      <ReactAriaDialog />
      <FocusScope />
      <Table />
      <MultilabelButton />
      <LiveRegion politeness="assertive" />
      <LiveRegion politeness="polite" />
      <Alert />
      <Status />
      <StepIndicator />
      <AlertManager />
      <DelayedTooltip />
      <BlurredInput />
      <NestedContext />
      <Parent />
      <ReactMask />
      <SROnlyToast timeout={5000}>
        <div aria-live="assertive">Hello world React Playground</div>
      </SROnlyToast>
      <DateInput />
      <Dialog />
      <FocusManager />
      <FieldsetBasic />
      <RadixRadioGroup />
      <FieldsetUsage />
      <FieldsetExperiments />
      <CustomRadioGroup />
      <StackingOrder />
      <AriaDescribedby />
      <FieldArray />
      <Form />
      <LinkName />
      <AriaProps />
      <Video />
      <FakeBtn />
      <StylesTest />
      <StylesTest useAccessibleStyles />
      <ThemeSelector />
      <NestedIntl />
      <AccessibleName />
      <IntlWithValues />
      <PostDate date={new Date(1e6)} />
      <Input />
      <Disclosure />
      {/* <LiveAnnouncer /> */}
      <ThemeContext.Provider value={'green'}>
        <CountProvider>
          <CounterGame />
        </CountProvider>
      </ThemeContext.Provider>
      <TransformEffect />
      <TheThing />
      <SwApi />
      <MapTest />
      <div className="h-80"></div>
      <ScrollToMe />
    </>
  )
}

export default App
