import classnames from 'classnames'

function Button({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
  return (
    <button
      className={classnames(
        'absolute top-1 right-1 p-2 m-2 text-sm font-bold text-white rounded-full',
        enabled ? 'bg-green-400' : 'bg-red-400'
      )}
      onClick={onClick}
    >
      <span aria-hidden="true">{enabled ? 'ON' : 'OFF'}</span>
    </button>
  )
}

function Card({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div
      className={classnames(
        'flex flex-col p-4 m-2 border rounded-xl border-sky-500',
        muted && 'text-zinc-500 border-zinc-400'
      )}
    >
      {children}
    </div>
  )
}

export { Card, Button }
