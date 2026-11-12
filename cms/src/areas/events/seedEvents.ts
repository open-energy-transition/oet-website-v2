import type { Payload } from 'payload'

import { content, findId, lexical, upload, upsert, type Asset } from '../../seed/lib'

interface ImageSource {
  image: Asset
  alt: string
}

interface ContributorSource {
  name: string
  title: string
  photo: Asset
}

interface VideoSource {
  embedUrl: string
  watchUrl: string
  title: string
}

interface HighlightSource extends ImageSource {
  video: VideoSource | null
}

interface EventSource {
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
  contributors: ContributorSource[]
  poster: ImageSource
  posterFit: 'cover' | 'contain'
  highlight: HighlightSource | null
  gallery: ImageSource[]
}

interface TabSource {
  id: string
  label: string
}

interface EventsContent {
  eventTypes: TabSource[]
  events: EventSource[]
  eventsPage: {
    meta: { title: string; description: string }
    hero: {
      title: string
      link: { label: string; href: string }
      image: { desktop: Asset; mobile: Asset }
    }
    listing: { id: string; title: string; description: string }
    stateTabs: TabSource[]
    cta: Record<string, unknown>
  }
}

const emptyVideo = { embedUrl: null, watchUrl: null, title: null }

const highlightOf = async (payload: Payload, highlight: HighlightSource | null) =>
  highlight === null
    ? { image: null, video: emptyVideo }
    : {
        image: await upload(payload, highlight.image, highlight.alt),
        video: highlight.video === null ? emptyVideo : highlight.video,
      }

const stateLabel = (tabs: TabSource[], id: string) => {
  const tab = tabs.find((item) => item.id === id)
  if (!tab) throw new Error(`Seed content has no state tab "${id}"`)
  return tab.label
}

export const seedEvents = async (payload: Payload) => {
  const { eventTypes, events, eventsPage } = await content<EventsContent>('events')

  const typeIds = new Map<string, number>()
  for (const [index, type] of eventTypes.entries()) {
    const saved = await upsert(
      payload,
      'event-types',
      { slug: { equals: type.id } },
      { slug: type.id, label: type.label, order: index + 1 },
    )
    typeIds.set(type.id, saved.id)
  }

  for (const event of events) {
    const type = typeIds.get(event.type)
    if (type === undefined)
      throw new Error(`Event ${event.slug} has the unknown type ${event.type}`)

    const contributors = []
    for (const person of event.contributors)
      contributors.push({
        blockType: 'external' as const,
        name: person.name,
        title: person.title,
        photo: await upload(payload, person.photo, ''),
      })

    const gallery = []
    for (const item of event.gallery)
      gallery.push({ image: await upload(payload, item.image, item.alt) })

    await upsert(
      payload,
      'events',
      { slug: { equals: event.slug } },
      {
        _status: 'published',
        title: event.title,
        slug: event.slug,
        type,
        excerpt: event.excerpt,
        brief: event.brief,
        description: await lexical(payload, event.descriptionHtml),
        start: event.start,
        end: event.end,
        timeZone: event.timeZone,
        publishedAt: event.publishedAt,
        registrationClosesAt: event.registrationClosesAt,
        featuredAsHighlight: event.featuredAsHighlight,
        locationRegion: event.locationRegion,
        locationAddress: event.locationAddress,
        mapHref: event.mapHref,
        calendarHref: event.calendarHref,
        joinHref: event.joinHref,
        contributors,
        poster: await upload(payload, event.poster.image, event.poster.alt),
        posterFit: event.posterFit,
        highlight: await highlightOf(payload, event.highlight),
        gallery,
      },
    )
  }

  const { hero, listing, stateTabs, cta, meta } = eventsPage
  if (hero.link.href !== `#${listing.id}`)
    throw new Error(`The events hero chip links to ${hero.link.href}, not to the event list`)
  if (stateTabs.length !== 3)
    throw new Error(`Expected three state tabs, the seed content has ${stateTabs.length}`)
  const bannerKeys = Object.keys(cta)
  if (bannerKeys.join() !== 'support,discuss,updates')
    throw new Error(`Unexpected event banners in the seed content: ${bannerKeys.join(', ')}`)

  await payload.updateGlobal({
    slug: 'news-events-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: hero.title,
        linkLabel: hero.link.label,
        image: await upload(payload, hero.image.desktop, ''),
        imageMobile: await upload(payload, hero.image.mobile, ''),
      },
      listing: {
        title: listing.title,
        description: listing.description,
        stateLabels: {
          all: stateLabel(stateTabs, 'all'),
          highlighted: stateLabel(stateTabs, 'highlighted'),
          upcoming: stateLabel(stateTabs, 'upcoming'),
        },
      },
      cta: {
        support: await findId(payload, 'cta-banners', { key: { equals: 'support' } }),
        discuss: await findId(payload, 'cta-banners', { key: { equals: 'discuss' } }),
        updates: await findId(payload, 'cta-banners', { key: { equals: 'updates' } }),
      },
      meta,
    },
  })
}
