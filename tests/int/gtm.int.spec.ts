import { afterEach, describe, expect, it } from 'vitest'

import { injectGtm } from '@/lib/gtm'

describe('injectGtm', () => {
  afterEach(() => {
    document.head.querySelectorAll('script[data-gtm-injected-by]').forEach((script) => script.remove())
    ;(window as Window & { dataLayer?: unknown[] }).dataLayer = undefined
  })

  it('injects GTM script and pushes consent event once', () => {
    const injected = injectGtm('GTM-TEST123')

    expect(injected).toBe(true)

    const script = document.head.querySelector(
      'script[data-gtm-injected-by="GTM-TEST123"]',
    ) as HTMLScriptElement | null
    expect(script).not.toBeNull()
    expect(script?.src).toContain('https://www.googletagmanager.com/gtm.js?id=GTM-TEST123')

    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer
    expect(Array.isArray(dataLayer)).toBe(true)

    const gtmStartEvent = dataLayer?.find(
      (entry) => (entry as { event?: string } | undefined)?.event === 'gtm.js',
    ) as { event?: string } | undefined
    expect(gtmStartEvent?.event).toBe('gtm.js')
    expect(dataLayer?.some((entry) => (entry as { event?: string })?.event === 'consent_granted')).toBe(
      true,
    )
  })

  it('does not inject the same GTM script twice', () => {
    expect(injectGtm('GTM-TEST123')).toBe(true)
    expect(injectGtm('GTM-TEST123')).toBe(false)

    const scripts = document.head.querySelectorAll('script[data-gtm-injected-by="GTM-TEST123"]')
    expect(scripts).toHaveLength(1)
  })
})
