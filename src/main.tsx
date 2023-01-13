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
import ReactStripe from './components/ReactStripe';
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
      {
        path: 'none',
        element: <></>,
      },
      // new component route here
      { path: 'react-stripe', element: <ReactStripe /> },
      { path: 'status-no-flash', element: <StatusNoFlash /> },
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
