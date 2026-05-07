import Cookies from 'js-cookie'

export const CONSENT_STORAGE_KEY = 'site_cookie_consent_v1'
export const CONSENT_COOKIE_KEY = 'site_consent'
export const CONSENT_CHANGE_EVENT = 'cookie-consent-changed'

export type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
}

type ConsentCookieRecord = {
  version: string
  timestamp: string
  analytics: boolean
  marketing: boolean
}

export type ConsentChoices = Pick<ConsentState, 'analytics' | 'marketing'>

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: '',
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function parseConsent(value: string | null): ConsentState {
  if (!value) return DEFAULT_CONSENT

  try {
    const parsed = JSON.parse(value) as Partial<ConsentState>

    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      timestamp: typeof parsed.timestamp === 'string' ? parsed.timestamp : '',
    }
  } catch {
    return DEFAULT_CONSENT
  }
}

function notifyConsentChange() {
  if (!isBrowser()) return
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT))
}

export function hasStoredConsent(): boolean {
  const consent = getConsent()
  return consent.timestamp.length > 0
}

export function getConsent(): ConsentState {
  if (!isBrowser()) return DEFAULT_CONSENT

  return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY))
}

export function setConsent(choices: ConsentChoices): ConsentState {
  const timestamp = new Date().toISOString()

  const consent: ConsentState = {
    necessary: true,
    analytics: Boolean(choices.analytics),
    marketing: Boolean(choices.marketing),
    timestamp,
  }

  if (!isBrowser()) return consent

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))

  const cookieValue: ConsentCookieRecord = {
    version: '1',
    timestamp,
    analytics: consent.analytics,
    marketing: consent.marketing,
  }

  Cookies.set(CONSENT_COOKIE_KEY, JSON.stringify(cookieValue), {
    expires: 365,
    sameSite: 'Lax',
    secure: window.location.protocol === 'https:',
  })

  notifyConsentChange()

  return consent
}

export function clearConsent() {
  if (!isBrowser()) return

  window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  Cookies.remove(CONSENT_COOKIE_KEY)
  Cookies.remove(CONSENT_COOKIE_KEY, { path: '/' })
  notifyConsentChange()
}

export function exportConsent(): string {
  return JSON.stringify(
    {
      key: CONSENT_STORAGE_KEY,
      exportedAt: new Date().toISOString(),
      consent: getConsent(),
    },
    null,
    2,
  )
}

export function downloadConsentExport(fileName = 'cookie-consent-export.json') {
  if (!isBrowser()) return

  const blob = new Blob([exportConsent()], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  window.URL.revokeObjectURL(url)
}
