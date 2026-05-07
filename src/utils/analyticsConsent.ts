import Cookies from 'js-cookie'

import type { ConsentState } from '@/utils/consent'

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>
  }
}

const GTM_SCRIPT_ID = 'gtm-script-consent'
const GTM_NOSCRIPT_ID = 'gtm-noscript-consent'

const ANALYTICS_COOKIES = ['_ga', '_gid', '_gat', '_gcl_au']

function removeCookieAcrossDomains(cookieName: string) {
  Cookies.remove(cookieName)
  Cookies.remove(cookieName, { path: '/' })

  if (typeof window === 'undefined') return

  const host = window.location.hostname
  Cookies.remove(cookieName, { path: '/', domain: host })

  if (host.includes('.')) {
    const rootDomain = `.${host.split('.').slice(-2).join('.')}`
    Cookies.remove(cookieName, { path: '/', domain: rootDomain })
  }
}

function removeAnalyticsCookies() {
  for (const name of ANALYTICS_COOKIES) {
    removeCookieAcrossDomains(name)
  }
}

export function enableAnalytics(tagId: string) {
  if (typeof window === 'undefined' || !tagId) return
  if (document.getElementById(GTM_SCRIPT_ID)) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'gtm.js',
    'gtm.start': new Date().getTime(),
  })

  const script = document.createElement('script')
  script.id = GTM_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${tagId}`
  document.head.appendChild(script)

  if (!document.getElementById(GTM_NOSCRIPT_ID)) {
    const iframe = document.createElement('iframe')
    iframe.id = GTM_NOSCRIPT_ID
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${tagId}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.display = 'none'
    iframe.style.visibility = 'hidden'
    document.body.appendChild(iframe)
  }
}

export function disableAnalytics() {
  if (typeof window === 'undefined') return

  document.getElementById(GTM_SCRIPT_ID)?.remove()
  document.getElementById(GTM_NOSCRIPT_ID)?.remove()
  window.dataLayer = []
  removeAnalyticsCookies()
}

export function applyAnalyticsConsent(consent: ConsentState, tagId?: string) {
  if (!tagId) {
    disableAnalytics()
    return
  }

  if (consent.analytics) {
    enableAnalytics(tagId)
    return
  }

  disableAnalytics()
}
