import { createContext } from 'react'

export const ContentContext = createContext({ content: {}, loading: false, error: '', refresh: async () => {}, update: () => {} })
