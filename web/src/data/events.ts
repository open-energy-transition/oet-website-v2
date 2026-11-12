import type { ImageMetadata } from 'astro'
import type { Locale } from '../i18n/config'
import type { SortValue } from '../i18n/groups'
import { findAll, findGlobal, required, resolved, richHtml, type Doc } from '../lib/cms'
import { altOf, image } from '../lib/media'
import type { CtaBanner, Media } from '../lib/payload-types'

export type EventStatus = 'upcoming' | 'highlighted' | 'archived'
export type EventStateId = 'all' | 'highlighted' | 'upcoming'

export type PosterFit = 'cover' | 'contain'

export interface EventType {
  id: string
  label: string
}

export interface EventImage {
  image: ImageMetadata
  alt: string
}

export interface EventContributor {
  name: string
  title: string
  photo: ImageMetadata
}

export interface EventVideo {
  embedUrl: string
  watchUrl: string
  title: string
}

export interface EventHighlight extends EventImage {
  video: EventVideo | null
}

export interface EventItem {
  slug: string
  title: string
  excerpt: string
  brief: string
  descriptionHtml: string
  type: string
  timeZone: string
  start: string
  end: string
  publishedAt: string
  registrationClosesAt: string | null
  featuredAsHighlight: boolean
  locationRegion: string
  locationAddress: string
  mapHref: string
  calendarHref: string
  joinHref: string
  contributors: EventContributor[]
  poster: EventImage
  posterFit: PosterFit
  highlight: EventHighlight | null
  gallery: EventImage[]
}

export interface EventBanner {
  tone: CtaBanner['tone']
  heading: string
  lead: string | null
  text: string
  actions: { label: string; href: string; emphasis: 'primary' | 'secondary'; newTab: boolean }[]
  collage: CtaBanner['collage']
  breakout: boolean
}

export interface EventsPage {
  meta: { title: string; description: string }
  hero: {
    title: string
    link: { label: string; href: string }
    image: { desktop: ImageMetadata; mobile: ImageMetadata }
  }
  listing: { id: string; title: string; description: string }
  stateTabs: { id: EventStateId; label: string }[]
  sort: { selected: SortValue; values: SortValue[] }
  cta: { support: EventBanner; discuss: EventBanner; updates: EventBanner }
}

const listingId = 'news-and-events'

const optional = <Value>(value: Value | null | undefined, what: string): Value | null => {
  if (value === undefined) throw new Error(`${what} is missing from the CMS answer`)
  return value
}

const picture = (media: number | Media, what: string): EventImage => ({
  image: image(media, what),
  alt: altOf(media, what),
})

const contributorOf = (
  block: NonNullable<Doc<'events'>['contributors']>[number],
  what: string,
): EventContributor => {
  if (block.blockType === 'external')
    return { name: block.name, title: block.title, photo: image(block.photo, `${what} photo`) }
  const member = resolved(block.member, `${what} team member`)
  return {
    name: member.name,
    title: member.role,
    photo: image(member.photo, `${what} team member photo`),
  }
}

const videoOf = (
  video: NonNullable<NonNullable<Doc<'events'>['highlight']>['video']>,
  what: string,
): EventVideo | null => {
  const embedUrl = optional(video.embedUrl, `${what} embedUrl`)
  if (embedUrl === null) return null
  return {
    embedUrl,
    watchUrl: required(video.watchUrl, `${what} watchUrl`),
    title: required(video.title, `${what} title`),
  }
}

const highlightOf = (doc: Doc<'events'>, what: string): EventHighlight | null => {
  const highlight = required(doc.highlight, `${what} highlight`)
  const media = optional(highlight.image, `${what} highlight image`)
  if (media === null) return null
  return {
    ...picture(media, `${what} highlight image`),
    video: videoOf(required(highlight.video, `${what} highlight video`), `${what} highlight video`),
  }
}

const eventOf = (doc: Doc<'events'>): EventItem => {
  const what = `Event ${doc.slug}`
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    brief: doc.brief,
    descriptionHtml: richHtml(doc.descriptionHtml, `${what} description`),
    type: resolved(doc.type, `${what} type`).slug,
    timeZone: doc.timeZone,
    start: doc.start,
    end: doc.end,
    publishedAt: doc.publishedAt,
    registrationClosesAt: optional(doc.registrationClosesAt, `${what} registrationClosesAt`),
    featuredAsHighlight: doc.featuredAsHighlight,
    locationRegion: doc.locationRegion,
    locationAddress: doc.locationAddress,
    mapHref: doc.mapHref,
    calendarHref: doc.calendarHref,
    joinHref: doc.joinHref,
    contributors: required(doc.contributors, `${what} contributors`).map((block, index) =>
      contributorOf(block, `${what} contributor ${index + 1}`),
    ),
    poster: picture(doc.poster, `${what} poster`),
    posterFit: doc.posterFit,
    highlight: highlightOf(doc, what),
    gallery: required(doc.gallery, `${what} gallery`).map((row, index) =>
      picture(row.image, `${what} gallery image ${index + 1}`),
    ),
  }
}

const bannerOf = (banner: number | CtaBanner, what: string): EventBanner => {
  const doc = resolved(banner, what)
  return {
    tone: doc.tone,
    heading: doc.heading,
    lead: optional(doc.lead, `${what} lead`),
    text: doc.text,
    actions: required(doc.actions, `${what} actions`).map((action) => ({
      label: action.label,
      href: action.href,
      emphasis: action.emphasis,
      newTab: action.newTab,
    })),
    collage: doc.collage,
    breakout: doc.breakout,
  }
}

export const loadEventTypes = async (locale: Locale): Promise<EventType[]> => {
  const docs = await findAll('event-types', locale, { depth: 0, sort: 'order' })
  return docs.map((doc) => ({ id: doc.slug, label: doc.label }))
}

export const loadEvents = async (locale: Locale): Promise<EventItem[]> => {
  const docs = await findAll('events', locale, { depth: 2, sort: '-start' })
  return docs.map(eventOf)
}

export const loadEventsPage = async (locale: Locale): Promise<EventsPage> => {
  const page = await findGlobal('news-events-page', locale, 1)
  return {
    meta: { title: page.meta.title, description: page.meta.description },
    hero: {
      title: page.hero.title,
      link: { label: page.hero.linkLabel, href: `#${listingId}` },
      image: {
        desktop: image(page.hero.image, 'News and events hero image'),
        mobile: image(page.hero.imageMobile, 'News and events hero mobile image'),
      },
    },
    listing: {
      id: listingId,
      title: page.listing.title,
      description: page.listing.description,
    },
    stateTabs: [
      { id: 'all', label: page.listing.stateLabels.all },
      { id: 'highlighted', label: page.listing.stateLabels.highlighted },
      { id: 'upcoming', label: page.listing.stateLabels.upcoming },
    ],
    sort: { selected: 'a-z', values: ['a-z', 'z-a', 'newest', 'oldest'] },
    cta: {
      support: bannerOf(page.cta.support, 'News and events support banner'),
      discuss: bannerOf(page.cta.discuss, 'News and events discuss banner'),
      updates: bannerOf(page.cta.updates, 'News and events updates banner'),
    },
  }
}

export const eventStatus = (event: EventItem, now: Date): EventStatus => {
  if (new Date(event.end).getTime() > now.getTime()) return 'upcoming'
  return event.featuredAsHighlight ? 'highlighted' : 'archived'
}

const partsOf = (locale: string, options: Intl.DateTimeFormatOptions, iso: string) => {
  const parts = new Intl.DateTimeFormat(locale, options).formatToParts(new Date(iso))
  return (type: Intl.DateTimeFormatPartTypes) => {
    const part = parts.find((item) => item.type === type)
    if (!part) throw new Error(`Date part "${type}" missing for ${iso}`)
    return part.value
  }
}

export const formatEventDay = (locale: string, timeZone: string, iso: string) => {
  const part = partsOf(locale, { timeZone, day: 'numeric', month: 'long', year: 'numeric' }, iso)
  return `${part('day')} ${part('month')} ${part('year')}`
}

export const formatEventWeekday = (locale: string, timeZone: string, iso: string) => {
  const part = partsOf(
    locale,
    { timeZone, weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' },
    iso,
  )
  return `${part('weekday')}, ${part('day')}/${part('month')}/${part('year')}`
}

export const formatEventTimes = (
  locale: string,
  timeZone: string,
  start: string,
  end: string,
  minutesLabel: string,
) => {
  const clock = (iso: string) => {
    const part = partsOf(
      locale,
      { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      iso,
    )
    return `${part('hour')}:${part('minute')}`
  }
  const minutes = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  return `${clock(start)} - ${clock(end)} (${minutes} ${minutesLabel})`
}

export const formatEventPublished = (locale: string, timeZone: string, iso: string) => {
  const part = partsOf(
    locale,
    {
      timeZone,
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    },
    iso,
  )
  return `${part('month')} ${part('day')}, ${part('year')}, ${part('hour')}:${part('minute')} ${part('dayPeriod')} ${part('timeZoneName')}`
}
