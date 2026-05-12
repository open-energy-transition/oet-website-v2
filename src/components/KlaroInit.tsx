'use client'

import { injectGtm } from '@/lib/gtm'
import { useEffect, useRef } from 'react'

type KlaroInitProps = {
  gtmId?: string
  debug?: boolean
}

type KlaroService = {
  name: string
  purposes?: string[]
}

type KlaroConfig = {
  version: number
  elementID: string
  storageName: string
  mustConsent: boolean
  acceptAll: boolean
  hideDeclineAll: boolean
  noAutoLoad: boolean
  services: Array<{
    name: string
    title: string
    purposes: string[]
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
      }
      purposes: {
        analytics: string
        marketing: string
      }
    }
  }
}

declare global {
  interface Window {
    klaroConfig?: KlaroConfig
  }
}

const GTM_SERVICE_NAME = 'google-tag-manager'
const hasPurpose = (service: KlaroService | undefined, purpose: string): boolean =>
  service?.purposes?.includes(purpose) === true

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
      log('Consent changed.', {
        service: service?.name,
        consent,
        purposes: service?.purposes,
      })

      if (!consent || service?.name !== GTM_SERVICE_NAME) {
        return
      }

      if (!gtmId) {
        console.warn('[KlaroInit] NEXT_PUBLIC_GTM_ID is not set. GTM injection skipped.')
        return
      }

      const injected = injectGtm(gtmId, {
        debug: debugMode,
        consent: {
          analytics: hasPurpose(service, 'analytics'),
          marketing: hasPurpose(service, 'marketing'),
        },
      })
      log(injected ? 'GTM script injected.' : 'GTM script already present.')
    }

    const klaroConfig: KlaroConfig = {
      version: 1,
      elementID: 'klaro',
      storageName: 'klaro',
      mustConsent: true,
      acceptAll: true,
      hideDeclineAll: false,
      noAutoLoad: false,
      services: [
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
            title: 'Privacy preferences',
            description:
              'You can choose whether analytics and marketing services are allowed on this website.',
          },
          consentNotice: {
            description:
              'We use analytics and marketing services to improve our website. You can manage your preferences at any time.',
            learnMore: 'Manage preferences',
          },
          purposes: {
            analytics: 'Analytics',
            marketing: 'Marketing',
          },
        },
      },
    }

    window.klaroConfig = klaroConfig
    log('Klaro config registered on window.')

    ;(async () => {
      try {
        await import('klaro/dist/klaro.css')
        log('Klaro CSS loaded.')

        const klaroImported = await import('klaro/dist/klaro-no-css')
        if (!isMounted) return

        log('Klaro module loaded.')

        klaroImported.setup(klaroConfig)
        log('Klaro initialized.')

        const manager = klaroImported.getManager(klaroConfig)
        const hasConsent = manager.getConsent(GTM_SERVICE_NAME) === true
        log('Current consent state read from manager.', { hasConsent })
        if (hasConsent) {
          const configuredService = klaroConfig.services.find((service) => service.name === GTM_SERVICE_NAME)
          onConsentChanged(true, {
            name: GTM_SERVICE_NAME,
            purposes: configuredService?.purposes,
          })
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
