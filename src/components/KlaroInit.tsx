'use client'

import { injectGtm, revokeGtmConsent } from '@/lib/gtm'
import { useEffect, useRef } from 'react'

type KlaroInitProps = {
  gtmId?: string
  debug?: boolean
}

type KlaroService = {
  name: string
}

type KlaroPurpose = 'necessary' | 'analytics' | 'marketing'

type KlaroConfig = {
  version: number
  elementID: string
  storageName: string
  mustConsent: boolean
  acceptAll: boolean
  hideDeclineAll: boolean
  groupByPurpose: boolean
  noAutoLoad: boolean
  services: Array<{
    name: string
    title: string
    purposes: KlaroPurpose[]
    default: boolean
    required: boolean
    onlyOnce: boolean
    callback: (consent: boolean, service: KlaroService) => void
  }>
  translations: {
    en: {
      consentModal: {
        title: string
        description: string
      }
      consentNotice: {
        description: string
        learnMore: string
        changeDescription: string
      }
      purposes: Record<KlaroPurpose, string>
      purposeDescriptions?: Record<KlaroPurpose, string>
    }
  }
}

declare global {
  interface Window {
    klaroConfig?: KlaroConfig
  }
}

const GTM_SERVICE_NAME = 'google-tag-manager'

export default function KlaroInit({ gtmId, debug }: KlaroInitProps) {
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) {
      return
    }
    initializedRef.current = true

    let isMounted = true
    const debugMode = debug === true || process.env.NEXT_PUBLIC_KLARO_DEBUG === 'true'
    const log = (message: string, details?: unknown) => {
      if (debugMode) {
        console.debug(`[KlaroInit] ${message}`, details ?? '')
      }
    }

    const onConsentChanged = (consent: boolean, service: KlaroService) => {
      log('Consent changed.', { service: service?.name, consent })

      if (service?.name !== GTM_SERVICE_NAME) {
        return
      }

      if (!consent) {
        // Only reload if GTM script is actually running in the DOM.
        // Without this check, every page load with denied consent would trigger
        // an infinite reload loop.
        const gtmScriptPresent = !!document.querySelector('script[data-gtm-injected-by]')
        revokeGtmConsent({ debug: debugMode })
        log('GTM consent revoked.')
        if (gtmScriptPresent) {
          log('GTM was active — reloading page to fully unload it.')
          window.location.reload()
        }
        return
      }

      if (!gtmId) {
        console.warn('[KlaroInit] NEXT_PUBLIC_GOOGLE_TAG_ID is not set. GTM injection skipped.')
        return
      }

      const injected = injectGtm(gtmId, {
        debug: debugMode,
        consent: { analytics: true, marketing: true },
      })
      log(injected ? 'GTM script injected.' : 'GTM script already present.')
    }

    const klaroConfig: KlaroConfig = {
      version: 1,
      elementID: 'klaro',
      storageName: 'klaro',
      mustConsent: false,
      acceptAll: true,
      hideDeclineAll: false,
      groupByPurpose: true,
      noAutoLoad: false,
      htmlTexts: true,
      services: [
        {
          name: 'necessary',
          title: 'Necessary Technologies',
          purposes: ['necessary'],
          default: true,
          required: true,
          onlyOnce: false,
          callback: () => {
            log('Necessary technologies consent — always active.')
          },
        },
        {
          name: GTM_SERVICE_NAME,
          title: 'Google Tag Manager',
          purposes: ['analytics', 'marketing'],
          default: false,
          required: false,
          onlyOnce: true,
          callback: onConsentChanged,
        },
      ],
      translations: {
        en: {
          consentModal: {
            title: 'May we offer you a cookie?',
            description: `
<p>We use cookies and similar technologies on our website.</p>
<p><strong>Necessary technologies</strong> are required to provide the website, ensure its basic functions, remember your privacy settings, maintain security, and display the website correctly.</p>
<p>With your consent, we use <strong>analytics technologies</strong> to understand how visitors use our website, and <strong>marketing technologies</strong> to evaluate conversions and advertising.</p>
<p>Personal data, such as online identifiers, usage data, and device information, may be processed by us and by third-party providers, including Google Ireland Limited. Data may also be transferred to countries outside the European Union or the European Economic Area where an adequacy decision applies or appropriate safeguards are in place.</p>
<p>The legal basis for processing personal data is Section 25 TDDDG and Article 6(1) GDPR.</p>
<p>You can change or withdraw your consent at any time, with effect for the future, via the privacy settings link in the footer of this website.</p>
<p><a href="#" class="klaro-privacy-notice-link" onclick="event.preventDefault(); var k=window.klaro; if(k&&k.show){k.show(window.klaroConfig)}">Read privacy notice</a></p>
            `.trim(),
          },
          consentNotice: {
            description: `
              <p><b>May we offer you a cookie?</b></p>
              <p>We use cookies and similar technologies on our website.</p>
              <p>Necessary technologies are required to provide the website, ensure its basic functions, remember your privacy settings, maintain security, and display the website correctly.</p>
              <p>With your consent, we use analytics technologies to understand how visitors use our website, and marketing technologies to evaluate conversions and advertising.</p>
              <p>Personal data, such as online identifiers, usage data, and device information, may be processed by us and by third-party providers, including Google Ireland Limited. Data may also be transferred to countries outside the European Union or the European Economic Area where an adequacy decision applies or appropriate safeguards are in place.</p>
              <p>The legal basis for processing personal data is Section 25 TDDDG and Article 6(1) GDPR.</p>
              <p>You can change or withdraw your consent at any time, with effect for the future, via the privacy settings link in the footer of this website.</p>
              <p><a href="/privacy-statement" class="klaro-privacy-notice-link" onclick="event.preventDefault(); var k=window.klaro; if(k&&k.show){k.show(window.klaroConfig)}">Read privacy notice</a></p>
              `,
            learnMore: 'Manage preferences',
            changeDescription: '.',
          },
          purposes: {
            necessary: 'Necessary',
            analytics: 'Analytics',
            marketing: 'Marketing',
          },
          purposeDescriptions: {
            necessary:
              'Necessary technologies are required to provide the website, ensure its basic functions, remember your privacy settings, maintain security, and display the website correctly.',
            analytics:
              'Analytics technologies help us understand how visitors use our website, enabling us to improve our content and user experience.',
            marketing:
              'Marketing technologies help us evaluate conversions and advertising to deliver relevant content.',
          },
        },
      },
    }

    window.klaroConfig = klaroConfig
    log('Klaro config registered on window.')
    ;(async () => {
      try {
        await import('klaro/dist/klaro.css')
        const style = document.createElement('style')
        style.textContent = `
          #klaro .klaro .cookie-modal,
          #klaro .klaro .cookie-notice {
            font-family: inherit;
          }
          #klaro .klaro .cookie-modal .cm-btn.cm-btn-success,
          #klaro .klaro .cookie-notice .cn-btn.cm-btn-success {
            background: #d8262e;
            color: #fff;
          }
          #klaro .klaro .cookie-modal .cm-btn.cm-btn-success-all,
          #klaro .klaro .cookie-notice .cn-btn.cm-btn-success-all {
            background: #d8262e;
            color: #fff;
          }
          #klaro .klaro .cookie-modal .cm-btn.cm-btn-success-all:hover,
          #klaro .klaro .cookie-modal .cm-btn.cm-btn-success:hover,
          #klaro .klaro .cookie-notice .cn-btn.cm-btn-success:hover {
            background: #b01e25;
          }
          #klaro .klaro .cookie-modal .cm-btn.cm-btn-info,
          #klaro .klaro .cookie-notice .cn-btn.cm-btn-info {
            background: #6c757d;
            color: #fff;
          }
          #klaro .klaro .cookie-modal .cm-btn.cm-btn-danger,
          #klaro .klaro .cookie-notice .cn-btn.cm-btn-danger {
            background: #6c757d;
            color: #fff;
          }
          #klaro .klaro .cm-toggle {
            background: #ccc;
          }
          #klaro .klaro .cm-toggle[aria-checked="true"] {
            background: #d8262e;
          }
          #klaro .klaro .cm-list-input:checked + .cm-list-label .cm-list-label-required {
            background: #d8262e;
          }
          #klaro .klaro .cookie-modal a,
          #klaro .klaro .cookie-notice a {
            color: #d8262e;
          }
          #klaro .klaro .cookie-modal a:hover,
          #klaro .klaro .cookie-notice a:hover {
            color: #b01e25;
          }
          #klaro .klaro .cookie-modal .cm-list-input:checked + .cm-list-label .slider {
            background-color: #d8262e;
          }
          #klaro .klaro .cookie-modal .cm-list-label .slider,
          #klaro .klaro .cookie-notice .slider {
            background-color: #ccc;
          }
          #klaro .klaro .cookie-modal .cm-app-title {
            color: #d8262e;
          }
        `
        document.head.appendChild(style)
        log('Klaro CSS loaded.')

        const klaroImported = await import('klaro/dist/klaro-no-css')
        if (!isMounted) return

        log('Klaro module loaded.')

        klaroImported.setup(klaroConfig)
        ;(window as any).klaro = klaroImported
        log('Klaro initialized.')

        const manager = klaroImported.getManager(klaroConfig)
        const hasConsent = manager.getConsent(GTM_SERVICE_NAME) === true
        log('Current consent state read from manager.', { hasConsent })
        if (hasConsent) {
          onConsentChanged(true, { name: GTM_SERVICE_NAME })
        }
      } catch (error) {
        console.error('[KlaroInit] Failed to initialize Klaro.', error)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [debug, gtmId])

  return null
}
