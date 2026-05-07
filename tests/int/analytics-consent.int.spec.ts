import { describe, expect, it } from 'vitest'

import { applyAnalyticsConsent } from '@/utils/analyticsConsent'
import type { ConsentState } from '@/utils/consent'

const disabledConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: '2026-01-01T00:00:00.000Z',
}

const enabledConsent: ConsentState = {
  ...disabledConsent,
  analytics: true,
}

describe('analytics consent gating', () => {
  it('blocks analytics before consent and loads after opt-in', () => {
    document.head.innerHTML = ''
    document.body.innerHTML = ''

    applyAnalyticsConsent(disabledConsent, 'GTM-TEST')
    expect(document.getElementById('gtm-script-consent')).toBeNull()

    applyAnalyticsConsent(enabledConsent, 'GTM-TEST')
    const script = document.getElementById('gtm-script-consent') as HTMLScriptElement | null
    expect(script).not.toBeNull()
    expect(script?.src).toContain('googletagmanager.com/gtm.js?id=GTM-TEST')

    applyAnalyticsConsent(disabledConsent, 'GTM-TEST')
    expect(document.getElementById('gtm-script-consent')).toBeNull()
  })
})
