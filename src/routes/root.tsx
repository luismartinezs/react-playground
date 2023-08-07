import SkipToContent from '@/components/SkipToContent'
import { useRef } from 'react'
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

  // new component link here
  { path: 'suspense-transition', label: 'SuspenseTransition' },
  { path: 'list-use-callback', label: 'ListUseCallback' },
  { path: 'list-use-memo', label: 'ListUseMemo' },
  { path: 'el-size-layout-effect', label: 'ElSizeLayoutEffect' },
  { path: 'input-imperative-handle', label: 'InputImperativeHandle' },
  { path: 'focus-use-ref', label: 'FocusUseRef' },
  { path: 'theme-switch-use-context', label: 'ThemeSwitchUseContext' },
  { path: 'counter-use-reducer', label: 'CounterUseReducer' },
  { path: 'quiz-timer', label: 'QuizTimer' },
  { path: 'state-on-prop-change', label: 'StateOnPropChange' },
  { path: 'rhf-submit', label: 'RhfSubmit' },
  { path: 'toggle-attr', label: 'ToggleAttr' },
  { path: 'sr-outline', label: 'SrOutline' },
  { path: 'radio-group-rhf', label: 'RadioGroupRhf' },
  { path: 'dupe-props', label: 'DupeProps' },
  { path: 'rhf-delay', label: 'RhfDelay' },
  { path: 'tabs-example', label: 'TabsExample' },
  { path: 'doc-title', label: 'DocTitle' },
  { path: 'counter-game', label: 'CounterGame' },
  { path: 'react-hook-form', label: 'ReactHookForm' },
  { path: 'iframe-input', label: 'IframeInput' },
  { path: 'css-scope', label: 'CssScope' },
  { path: 'classnames-test', label: 'ClassnamesTest' },
  { path: 'react-stripe', label: 'ReactStripe' },
  { path: 'status-no-flash', label: 'StatusNoFlash' },
  {
    path: 'none',
    label: 'None',
  },
]

export default function Root() {
  const mainContentRef = useRef<HTMLElement>(null)
  return (
    <>
      <SkipToContent mainContentRef={mainContentRef} />
      <header>
        <h1 className="text-lg font-bold">React playground</h1>
        <nav className="pb-2 mb-2 border-b border-sky-500">
          <ul className="flex flex-wrap w-full space-x-2">
            {routes.map((route, idx) => (
              <li key={route.path}>
                <a href={route.path} className="whitespace-nowrap">
                  {route.label}
                </a>
                {idx < routes.length - 1 && <span className="inline-block ml-2">-</span>}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main ref={mainContentRef} tabIndex={-1}>
        <Outlet />
      </main>
    </>
  )
}
