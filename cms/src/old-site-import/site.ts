import type { Payload } from 'payload'

import type { socialKinds } from '../areas/site/SiteSettings'
import { record } from './report'
import type { LegacyFooter } from './source'
import { quiet } from './quiet'

const oldPath = '/organization/partners'
const newPath = '/organization/partners-and-funders'
const newLabel = 'Partners and Funders'

type SocialKind = (typeof socialKinds)[number]

const socialHosts: [RegExp, SocialKind, string][] = [
  [/linkedin\.com/, 'linkedin', 'Open Energy Transition on LinkedIn'],
  [/(^|\.)x\.com|twitter\.com/, 'x', 'Open Energy Transition on X'],
  [/github\.com/, 'github', 'Open Energy Transition on GitHub'],
  [/bsky\.app/, 'bluesky', 'Open Energy Transition on Bluesky'],
  [/youtube\.com/, 'youtube', 'Open Energy Transition on YouTube'],
  [/eventbrite\.com/, 'eventbrite', 'Open Energy Transition on Eventbrite'],
  [/\.eo\.page/, 'newsletter', 'Subscribe to the Open-TYNDP newsletter'],
]

const socialOf = (url: string) => {
  const host = new URL(url).hostname
  const match = socialHosts.find(([pattern]) => pattern.test(host))
  if (!match) throw new Error(`No social network known for ${url}`)
  return { kind: match[1], label: match[2], url }
}

const relink = (value: unknown, changed: { count: number }): unknown => {
  if (Array.isArray(value)) return value.map((item) => relink(item, changed))
  if (value === null || typeof value !== 'object') return value
  const entries = Object.entries(value).map(([key, item]) => [key, relink(item, changed)])
  const object = Object.fromEntries(entries) as Record<string, unknown>
  if (object.href === oldPath) {
    changed.count += 1
    return { ...object, href: newPath, label: newLabel }
  }
  return object
}

const relinkGlobal = async (payload: Payload, slug: 'site-header' | 'site-footer') => {
  const global = await payload.findGlobal({ slug, depth: 0 })
  const changed = { count: 0 }
  const data = relink(global, changed) as typeof global
  if (changed.count === 0) return
  await payload.updateGlobal({ context: quiet(), slug, data, depth: 0 })
  record({
    area: 'Site',
    title: slug,
    action: 'updated',
    status: 'none',
    notes: [`${changed.count} partner links now read "${newLabel}" and point to ${newPath}`],
  })
}

export const migrateSite = async (payload: Payload, footer: LegacyFooter) => {
  const socialLinks = footer.followUs.linkActions.map((action) => socialOf(action.link))
  await payload.updateGlobal({
    context: quiet(),
    slug: 'site-settings',
    data: { socialLinks },
    depth: 0,
  })
  record({
    area: 'Site',
    title: 'site-settings',
    action: 'updated',
    status: 'none',
    notes: [`${socialLinks.length} social profiles from the old footer`],
  })

  await relinkGlobal(payload, 'site-header')
  await relinkGlobal(payload, 'site-footer')

  const page = await payload.findGlobal({ slug: 'partners-page', depth: 0 })
  const title = 'Partners and Funders | Open Energy Transition'
  if (page.meta.title !== title) {
    await payload.updateGlobal({
      context: quiet(),
      slug: 'partners-page',
      data: { _status: 'published', meta: { ...page.meta, title } },
      depth: 0,
    })
    record({
      area: 'Site',
      title: 'partners-page',
      action: 'updated',
      status: 'none',
      notes: [title],
    })
  }

  const redirect = await payload.find({
    collection: 'redirects',
    where: { from: { equals: oldPath } },
    limit: 1,
    depth: 0,
  })
  if (redirect.docs.length === 0) {
    await payload.create({
      context: quiet(),
      collection: 'redirects',
      data: { from: oldPath, to: newPath, statusCode: '301' },
      depth: 0,
    })
    record({
      area: 'Site',
      title: 'redirects',
      action: 'created',
      status: 'none',
      notes: [`${oldPath} → ${newPath} (301)`],
    })
  }
}
