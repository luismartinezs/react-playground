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
