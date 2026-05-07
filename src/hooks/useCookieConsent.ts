'use client'

import { useCallback, useEffect, useState } from 'react'

import {
  clearConsent,
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  DEFAULT_CONSENT,
  getConsent,
  hasStoredConsent,
  type ConsentChoices,
  type ConsentState,
  setConsent,
} from '@/utils/consent'

export function useCookieConsent() {
  const [consent, setConsentState] = useState<ConsentState>(DEFAULT_CONSENT)
  const [hasConsent, setHasConsent] = useState(false)

  const refresh = useCallback(() => {
    setConsentState(getConsent())
    setHasConsent(hasStoredConsent())
  }, [])

  useEffect(() => {
    refresh()

    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key === CONSENT_STORAGE_KEY) {
        refresh()
      }
    }

    const onConsentChange = () => {
      refresh()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange)
    }
  }, [refresh])

  const saveConsent = useCallback((choices: ConsentChoices) => {
    const next = setConsent(choices)
    setConsentState(next)
    setHasConsent(true)
  }, [])

  const revokeConsent = useCallback(() => {
    clearConsent()
    setConsentState(DEFAULT_CONSENT)
    setHasConsent(false)
  }, [])

  return {
    consent,
    hasConsent,
    saveConsent,
    revokeConsent,
    refresh,
  }
}
