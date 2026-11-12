import type { Payload } from 'payload'

import { content, upsert } from '../../seed/lib'

export interface BannerSource {
  tone: 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900' | 'light'
  heading: string
  lead: string | null
  text: string
  actions: ActionSource[]
  collage: 'wind' | 'thermalpower' | 'biz'
  breakout: boolean
}

export interface ActionSource {
  label: string
  href: string
  emphasis: 'primary' | 'secondary'
  newTab: boolean
}

interface EventsContent {
  eventsPage: { cta: Record<string, BannerSource> }
}

export const toolsBannerKey = 'discuss-tools'

export const seedBanner = async (payload: Payload, key: string, banner: BannerSource) => {
  const saved = await upsert(
    payload,
    'cta-banners',
    { key: { equals: key } },
    {
      key,
      tone: banner.tone,
      heading: banner.heading,
      lead: banner.lead,
      text: banner.text,
      actions: banner.actions,
      collage: banner.collage,
      breakout: banner.breakout,
    },
  )
  return saved.id
}

export const seedEventBanners = async (payload: Payload) => {
  const { eventsPage } = await content<EventsContent>('events')
  for (const [key, banner] of Object.entries(eventsPage.cta)) await seedBanner(payload, key, banner)
}
