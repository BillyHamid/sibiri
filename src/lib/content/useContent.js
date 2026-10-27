import { useCallback, useContext } from 'react'
import { ContentContext } from './ContentContext'
import { readContentValue } from './contentModel'

export function useContentValue(key, fallback) {
  const { content } = useContext(ContentContext)
  return readContentValue(content, key, fallback)
}

export function useContentReader() {
  const { content } = useContext(ContentContext)
  return useCallback((key, fallback) => readContentValue(content, key, fallback), [content])
}

export const useContentStore = () => useContext(ContentContext)
