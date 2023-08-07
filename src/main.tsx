import React from 'react'
import ReactDOM from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Root from './routes/root'

import translations from '@/intl/translations'

import App from './App'
import './index.css'
import LoadingAlert from './components/LoadingAlert'
import StatusOnLoad from './components/StatusOnLoad'
import Timer from './components/Timer'
import ReactIntl from './components/ReactIntl'
// new component import here
import ListUseCallback from './components/ListUseCallback';
import ListUseMemo from './components/ListUseMemo';
import ElSizeLayoutEffect from './components/ElSizeLayoutEffect';
import InputImperativeHandle from './components/InputImperativeHandle';
import FocusUseRef from './components/FocusUseRef';
import ThemeSwitchUseContext from './components/ThemeSwitchUseContext';
import CounterUseReducer from './components/CounterUseReducer';
import QuizTimer from './components/QuizTimer'
import StateOnPropChange from './components/StateOnPropChange'
import RhfSubmit from './components/RhfSubmit'
import ToggleAttr from './components/ToggleAttr'
import SrOutline from './components/SrOutline'
import RadioGroupRhf from './components/RadioGroupRhf'
import DupeProps from './components/DupeProps'
import RhfDelay from './components/RhfDelay'
import TabsExample from './components/TabsExample'
import DocTitle from './components/DocTitle'
import CounterGame from './components/CounterGame'
import ReactHookForm from './components/ReactHookForm'
import IframeInput from './components/IframeInput'
import CssScope from './components/CssScope'
import ClassnamesTest from './components/ClassnamesTest'
import ReactStripe from './components/ReactStripe'
import StatusNoFlash from './components/StatusNoFlash'

const usersLocale = 'en'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'alert',
        element: <LoadingAlert />,
      },
      {
        path: 'status',
        element: <StatusOnLoad />,
      },
      {
        path: 'timer',
        element: <Timer />,
      },
      {
        path: 'react-intl',
        element: <ReactIntl />,
      },
      // new component route here
      { path: 'list-use-callback', element: <ListUseCallback /> },
      { path: 'list-use-memo', element: <ListUseMemo /> },
      { path: 'el-size-layout-effect', element: <ElSizeLayoutEffect /> },
      { path: 'input-imperative-handle', element: <InputImperativeHandle /> },
      { path: 'focus-use-ref', element: <FocusUseRef /> },
      { path: 'theme-switch-use-context', element: <ThemeSwitchUseContext /> },
      { path: 'counter-use-reducer', element: <CounterUseReducer /> },
      { path: 'quiz-timer', element: <QuizTimer /> },
      { path: 'state-on-prop-change', element: <StateOnPropChange /> },
      { path: 'rhf-submit', element: <RhfSubmit /> },
      { path: 'toggle-attr', element: <ToggleAttr /> },
      { path: 'sr-outline', element: <SrOutline /> },
      { path: 'radio-group-rhf', element: <RadioGroupRhf /> },
      { path: 'dupe-props', element: <DupeProps /> },
      { path: 'rhf-delay', element: <RhfDelay /> },
      { path: 'tabs-example', element: <TabsExample /> },
      { path: 'doc-title', element: <DocTitle /> },
      { path: 'counter-game', element: <CounterGame /> },
      { path: 'react-hook-form', element: <ReactHookForm /> },
      { path: 'iframe-input', element: <IframeInput /> },
      { path: 'css-scope', element: <CssScope /> },
      { path: 'classnames-test', element: <ClassnamesTest /> },
      { path: 'react-stripe', element: <ReactStripe /> },
      { path: 'status-no-flash', element: <StatusNoFlash /> },
      {
        path: 'none',
        element: <></>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <IntlProvider locale={usersLocale} messages={translations[usersLocale]}>
    <RouterProvider router={router} />
  </IntlProvider>
  // </React.StrictMode>
)
