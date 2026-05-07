'use client'

import { useEffect, useMemo, useState } from 'react'

import { useCookieConsent } from '@/hooks/useCookieConsent'
import { applyAnalyticsConsent } from '@/utils/analyticsConsent'
import { downloadConsentExport } from '@/utils/consent'

import { cookieConsentLabels as labels } from './cookieConsentLabels'

export const COOKIE_SETTINGS_OPEN_EVENT = 'cookie-consent-open'

export function CookieSettingsButton({ className = '' }: { className?: string }) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_OPEN_EVENT))}
      type="button"
    >
      {labels.cookieSettings}
    </button>
  )
}

export function CookieConsent() {
  const { consent, hasConsent, saveConsent, revokeConsent } = useCookieConsent()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [analytics, setAnalytics] = useState(consent.analytics)
  const [marketing, setMarketing] = useState(consent.marketing)

  const analyticsTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID

  const showBanner = useMemo(() => !hasConsent, [hasConsent])

  useEffect(() => {
    setAnalytics(consent.analytics)
    setMarketing(consent.marketing)
  }, [consent.analytics, consent.marketing])

  useEffect(() => {
    applyAnalyticsConsent(consent, analyticsTagId)
  }, [analyticsTagId, consent])

  useEffect(() => {
    const openModal = () => setIsModalOpen(true)
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, openModal)
    window.addEventListener('keydown', onEscape)

    return () => {
      window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, openModal)
      window.removeEventListener('keydown', onEscape)
    }
  }, [])

  const onAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true })
    setIsModalOpen(false)
  }

  const onRejectAll = () => {
    saveConsent({ analytics: false, marketing: false })
    setIsModalOpen(false)
  }

  const onSavePreferences = () => {
    saveConsent({ analytics, marketing })
    setIsModalOpen(false)
  }

  return (
    <>
      {showBanner && (
        <section
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 z-[9999] rounded-md border border-gray-300 bg-white p-4 shadow-lg md:left-auto md:max-w-xl"
          role="region"
        >
          <h2 className="text-base font-semibold text-gray-900">{labels.bannerTitle}</h2>
          <p className="mt-2 text-sm text-gray-700">{labels.bannerDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded bg-crimson-red px-3 py-2 text-sm font-medium text-white"
              onClick={onAcceptAll}
              type="button"
            >
              {labels.acceptAll}
            </button>
            <button
              className="rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900"
              onClick={onRejectAll}
              type="button"
            >
              {labels.rejectAll}
            </button>
            <button
              className="rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900"
              onClick={() => setIsModalOpen(true)}
              type="button"
            >
              {labels.managePreferences}
            </button>
          </div>
        </section>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4">
          <div
            aria-describedby="cookie-consent-description"
            aria-labelledby="cookie-consent-title"
            aria-modal="true"
            className="w-full max-w-lg rounded-md bg-white p-6"
            role="dialog"
          >
            <h2 className="text-lg font-semibold text-gray-900" id="cookie-consent-title">
              {labels.modalTitle}
            </h2>
            <p className="mt-2 text-sm text-gray-700" id="cookie-consent-description">
              {labels.modalDescription}
            </p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">{labels.necessary}</p>
                  <p className="text-xs text-gray-600">{labels.alwaysEnabled}</p>
                </div>
                <input aria-label={labels.necessary} checked disabled type="checkbox" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="font-medium text-gray-900" htmlFor="analytics-consent-toggle">
                  {labels.analytics}
                </label>
                <input
                  aria-label={labels.analytics}
                  checked={analytics}
                  id="analytics-consent-toggle"
                  onChange={(event) => setAnalytics(event.target.checked)}
                  type="checkbox"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="font-medium text-gray-900" htmlFor="marketing-consent-toggle">
                  {labels.marketing}
                </label>
                <input
                  aria-label={labels.marketing}
                  checked={marketing}
                  id="marketing-consent-toggle"
                  onChange={(event) => setMarketing(event.target.checked)}
                  type="checkbox"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                className="rounded bg-crimson-red px-3 py-2 text-sm font-medium text-white"
                onClick={onSavePreferences}
                type="button"
              >
                {labels.savePreferences}
              </button>
              <button
                className="rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                {labels.cancel}
              </button>
              <button
                className="rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900"
                onClick={downloadConsentExport}
                type="button"
              >
                {labels.exportConsent}
              </button>
              <button
                className="rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900"
                onClick={() => {
                  revokeConsent()
                  setIsModalOpen(false)
                }}
                type="button"
              >
                {labels.revokeConsent}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
