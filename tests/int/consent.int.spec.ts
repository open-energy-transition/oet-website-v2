import { beforeEach, describe, expect, it, vi } from 'vitest'

const cookieStore = new Map<string, string>()

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn((key: string) => cookieStore.get(key)),
    set: vi.fn((key: string, value: string) => {
      cookieStore.set(key, value)
    }),
    remove: vi.fn((key: string) => {
      cookieStore.delete(key)
    }),
  },
}))

import {
  clearConsent,
  CONSENT_COOKIE_KEY,
  CONSENT_STORAGE_KEY,
  exportConsent,
  getConsent,
  setConsent,
} from '@/utils/consent'

describe('cookie consent utility', () => {
  beforeEach(() => {
    cookieStore.clear()
    window.localStorage.clear()
  })

  it('stores and reads consent with timestamp', () => {
    const result = setConsent({ analytics: true, marketing: false })

    expect(result.necessary).toBe(true)
    expect(result.analytics).toBe(true)
    expect(result.marketing).toBe(false)
    expect(result.timestamp).toBeTruthy()

    const stored = getConsent()
    expect(stored).toEqual(result)
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeTruthy()
    expect(cookieStore.get(CONSENT_COOKIE_KEY)).toBeTruthy()
  })

  it('clears consent values', () => {
    setConsent({ analytics: true, marketing: true })

    clearConsent()

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull()
    expect(cookieStore.get(CONSENT_COOKIE_KEY)).toBeUndefined()
    expect(getConsent().timestamp).toBe('')
  })

  it('exports consent as readable json', () => {
    setConsent({ analytics: false, marketing: true })

    const exported = exportConsent()
    const parsed = JSON.parse(exported)

    expect(parsed.key).toBe(CONSENT_STORAGE_KEY)
    expect(parsed.exportedAt).toBeTruthy()
    expect(parsed.consent.necessary).toBe(true)
    expect(parsed.consent.marketing).toBe(true)
  })
})
