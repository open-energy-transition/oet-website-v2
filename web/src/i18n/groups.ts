import type { Locale } from './config'
import { t, type UiKey } from './ui'

export type SortValue = 'a-z' | 'z-a' | 'newest' | 'oldest'

const sortKeys: Record<SortValue, UiKey> = {
  'a-z': 'sort.aToZ',
  'z-a': 'sort.zToA',
  newest: 'sort.newest',
  oldest: 'sort.oldest',
}

export const sortOptions = (locale: Locale, values: readonly SortValue[]) =>
  values.map((value) => ({ value, label: t(locale, sortKeys[value]) }))

export const eventLabels = (locale: Locale) => ({
  upcoming: t(locale, 'event.upcoming'),
  highlighted: t(locale, 'event.highlighted'),
  register: t(locale, 'event.register'),
  recap: t(locale, 'event.recap'),
  registrationCloses: t(locale, 'event.registrationCloses'),
  empty: t(locale, 'event.empty'),
  eventDetails: t(locale, 'event.details'),
  contributors: t(locale, 'event.contributors'),
  markCalendar: t(locale, 'event.markCalendar'),
  joinEvent: t(locale, 'event.joinEvent'),
  openMap: t(locale, 'event.openMap'),
  minutes: t(locale, 'event.minutes'),
  published: t(locale, 'event.published'),
  location: t(locale, 'event.location'),
  about: t(locale, 'event.about'),
  documentation: t(locale, 'event.documentation'),
  playVideo: t(locale, 'event.playVideo'),
  galleryImage: t(locale, 'event.galleryImage'),
})

export const sidebarLabels = (locale: Locale) => ({
  contact: t(locale, 'sidebar.contact'),
  partners: t(locale, 'sidebar.partners'),
  funders: t(locale, 'sidebar.funders'),
  authors: t(locale, 'sidebar.authors'),
  tableOfContents: t(locale, 'sidebar.tableOfContents'),
  relatedProjects: t(locale, 'sidebar.relatedProjects'),
  relatedPublications: t(locale, 'sidebar.relatedPublications'),
})

export const detailLabels = (locale: Locale) => ({
  highlights: t(locale, 'detail.highlights'),
  tools: t(locale, 'detail.tools'),
  service: t(locale, 'detail.service'),
  authors: t(locale, 'detail.authors'),
  date: t(locale, 'detail.date'),
  region: t(locale, 'detail.region'),
  tags: t(locale, 'detail.tags'),
})
