import { useEffect } from 'react'

const useDocumentTitle = (title: string) => {
  const oldTitle = document.title

  useEffect(() => {
    document.title = title
    return () => {
      document.title = oldTitle
    }
  }, [title])
}

export default useDocumentTitle
