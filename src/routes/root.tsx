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
    path: 'none',
    label: 'None',
  },
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
