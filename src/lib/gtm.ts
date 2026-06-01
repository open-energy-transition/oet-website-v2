type InjectGtmOptions = {
  debug?: boolean
  dataLayerName?: string
  consent?: {
    analytics?: boolean
    marketing?: boolean
  }
}

type ConsentGrantedEvent = {
  event: 'consent_granted'
  source: 'klaro'
  grantedAt: string
  consent: {
    analytics: boolean
    marketing: boolean
  }
}

const GTM_SCRIPT_ATTRIBUTE = 'data-gtm-injected-by'

export const injectGtm = (gtmId: string, options: InjectGtmOptions = {}): boolean => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  const trimmedId = gtmId.trim()
  if (!trimmedId) {
    return false
  }

  const debug = options.debug === true
  const dataLayerName = options.dataLayerName || 'dataLayer'
  const existingScript = document.querySelector(
    `script[${GTM_SCRIPT_ATTRIBUTE}="${trimmedId}"][data-layer-name="${dataLayerName}"]`,
  )

  if (existingScript) {
    if (debug) {
      console.debug('[GTM] Script already injected, skipping.', { gtmId: trimmedId, dataLayerName })
    }
    return false
  }

  const windowWithDataLayer = window as unknown as Window & Record<string, unknown>
  const dataLayer = ((windowWithDataLayer[dataLayerName] as unknown[]) || []) as unknown[]
  windowWithDataLayer[dataLayerName] = dataLayer

  dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  })

  const consentEvent: ConsentGrantedEvent = {
    event: 'consent_granted',
    source: 'klaro',
    grantedAt: new Date().toISOString(),
    consent: {
      analytics: options.consent?.analytics === true,
      marketing: options.consent?.marketing === true,
    },
  }

  dataLayer.push(consentEvent)

  const script = document.createElement('script')
  script.async = true
  script.setAttribute(GTM_SCRIPT_ATTRIBUTE, trimmedId)
  script.setAttribute('data-layer-name', dataLayerName)
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(trimmedId)}${
    dataLayerName === 'dataLayer' ? '' : `&l=${encodeURIComponent(dataLayerName)}`
  }`

  document.head.appendChild(script)

  if (debug) {
    console.debug('[GTM] Script injected after consent.', {
      gtmId: trimmedId,
      dataLayerName,
      consentEvent,
    })
  }

  return true
}

type RevokeGtmConsentOptions = {
  debug?: boolean
  dataLayerName?: string
}

export const revokeGtmConsent = (options: RevokeGtmConsentOptions = {}): void => {
  if (typeof window === 'undefined') return

  const debug = options.debug === true
  const dataLayerName = options.dataLayerName || 'dataLayer'
  const windowWithDataLayer = window as unknown as Window & Record<string, unknown>
  const dataLayer = ((windowWithDataLayer[dataLayerName] as unknown[]) || []) as unknown[]
  windowWithDataLayer[dataLayerName] = dataLayer

  dataLayer.push({
    event: 'consent_revoked',
    source: 'klaro',
    revokedAt: new Date().toISOString(),
  })

  if (debug) {
    console.debug('[GTM] Consent revoked. Denied state pushed to dataLayer.', { dataLayerName })
  }
}
