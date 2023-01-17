import { Outlet } from 'react-router-dom'

const routes = [
  {
    path: '/',
    label: 'App',
  },
  {
    path: 'alert',
    label: 'Alert',
  },
  {
    path: 'status',
    label: 'Status',
  },
  {
    path: 'timer',
    label: 'Timer',
  },
  {
    path: 'react-intl',
    label: 'React-intl',
  },
  {
    path: 'none',
    label: 'None',
  },
  // new component link here
  { path: 'css-scope', label: 'CssScope' },
  { path: 'classnames-test', label: 'ClassnamesTest' },
  { path: 'react-stripe', label: 'ReactStripe' },
  { path: 'status-no-flash', label: 'StatusNoFlash' },
]

export default function Root() {
  return (
    <>
      <h1 className="text-lg font-bold">React playground</h1>
      <nav className="pb-2 mb-2 border-b border-sky-500">
        <ul className="flex space-x-2">
          {routes.map((route) => (
            <li key={route.path}>
              <a href={route.path}>{route.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
