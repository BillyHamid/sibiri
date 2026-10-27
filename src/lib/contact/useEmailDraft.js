import { useState } from 'react'
import { buildContactMailto } from './emailDraft'

export function useEmailDraft(recipient, form) {
  const [draftHref, setDraftHref] = useState('')
  const [error, setError] = useState('')
  const prepare = event => {
    event.preventDefault()
    setError('')
    try {
      const href = buildContactMailto(recipient, form)
      setDraftHref(href)
      window.location.href = href
    } catch (failure) { setError(failure.message) }
  }
  return { draftHref, error, prepare }
}

