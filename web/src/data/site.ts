import type { ImageMetadata } from 'astro'
import type { Locale } from '../i18n/config'
import { findGlobal, required } from '../lib/cms'
import { image } from '../lib/media'

export interface ConsentTexts {
  notice: string
  modalTitle: string
  modalDescription: string
  necessaryTitle: string
  necessaryDescription: string
  analyticsTitle: string
  analyticsDescription: string
}

export interface SiteSettings {
  name: string
  meta: { title: string; description: string }
  shareImage: ImageMetadata
  profiles: string[]
  tagManagerId: string | null
  consent: ConsentTexts
}

export const loadSiteSettings = async (locale: Locale): Promise<SiteSettings> => {
  const settings = await findGlobal('site-settings', locale, 1)
  const tagManagerId = settings.googleTagManagerId
  const { consent } = settings
  return {
    name: settings.siteName,
    meta: settings.meta,
    shareImage: image(settings.shareImage, 'site share image'),
    profiles: required(settings.socialLinks, 'site social links').map((link) => link.url),
    tagManagerId:
      tagManagerId === null || tagManagerId === undefined || tagManagerId === ''
        ? null
        : tagManagerId,
    consent: {
      notice: consent.notice,
      modalTitle: consent.modalTitle,
      modalDescription: consent.modalDescription,
      necessaryTitle: consent.necessaryTitle,
      necessaryDescription: consent.necessaryDescription,
      analyticsTitle: consent.analyticsTitle,
      analyticsDescription: consent.analyticsDescription,
    },
  }
}
