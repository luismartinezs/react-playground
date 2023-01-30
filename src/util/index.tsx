import { useMemo } from 'react'
import { v4 } from 'uuid'

function useId(): string {
  return useMemo(() => v4(), [])
}

export { useId }
