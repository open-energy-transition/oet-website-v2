import type { Payload } from 'payload'

import { iconNames, type IconName } from '../../fields/iconNames'
import { content, findId, upload, type Asset, type IconRef } from '../../seed/lib'

export type FrameTone =
  | 'bright'
  | 'brand-500'
  | 'brand-600'
  | 'brand-700'
  | 'brand-800'
  | 'brand-900'
  | 'neutral-800'
  | 'neutral-900'
  | 'neutral-950'

export interface MetaSource {
  title: string
  description: string
}

export interface LinkSource {
  label: string
  href: string
}

export interface LinkGroupSource {
  title: string
  links: {
    label: { text: string; underline: boolean }[]
    truncate: boolean
    href: string
    disabled: boolean
    newTab: boolean
  }[]
}

export interface PersonSource {
  name: string
  title: string
  photo: Asset
  role: string | null
  links: { kind: 'profile' | 'github' | 'linkedin'; href: string; label: string }[]
}

export interface CtaSource {
  heading: string
  primary: string
  secondary: string
  actions: { label: string; href: string; emphasis: 'primary' | 'secondary' }[]
}

export interface TestimonialSource {
  quote: string
  name: string
  role: string
  portrait: Asset
  logo: Asset
  company: string
  paragraphs: string[]
}

interface RoutesContent {
  routes: { successStories: string; publications: string }
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const dayPattern = /^([A-Z][a-z]+) (\d{1,2}), (\d{4})$/

export const dayOf = (written: string): string => {
  const match = dayPattern.exec(written)
  if (!match) throw new Error(`"${written}" is not a date written like "May 1, 2026"`)
  const month = months.indexOf(match[1])
  if (month === -1) throw new Error(`Unknown month in "${written}"`)
  return new Date(Date.UTC(Number(match[3]), month, Number(match[2]), 12)).toISOString()
}

export const slugOf = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const tagNameOf = (written: string) => {
  if (!written.startsWith('#')) throw new Error(`Tag "${written}" does not start with #`)
  return written.slice(1)
}

export const unique = <Item>(items: Item[]) => [...new Set(items)]

export const iconName = (ref: IconRef): IconName => {
  const found = iconNames.find((name) => name === ref.__icon)
  if (!found) throw new Error(`Icon ${ref.__icon} is not in the site icon set`)
  return found
}

export const routePrefixes = async () => {
  const { routes } = await content<RoutesContent>('routes')
  return { project: `${routes.successStories}/`, publication: `${routes.publications}/` }
}

export const slugFromHref = (href: string, prefix: string) => {
  if (!href.startsWith(prefix)) throw new Error(`${href} is not under ${prefix}`)
  return href.slice(prefix.length)
}

export const linkGroupsOf = (groups: LinkGroupSource[]) =>
  groups.map((group) => ({
    title: group.title,
    links: group.links.map((link) => ({
      parts: link.label.map(({ text, underline }) => ({ text, underline })),
      href: link.href,
      truncate: link.truncate,
      newTab: link.newTab,
      disabled: link.disabled,
    })),
  }))

export const ctaOf = ({ heading, primary, secondary, actions }: CtaSource) => ({
  heading,
  primary,
  secondary,
  actions: actions.map(({ label, href, emphasis }) => ({ label, href, emphasis })),
})

export const idsBySlug = async (
  payload: Payload,
  collection: 'regions' | 'tags' | 'services' | 'departments' | 'projects' | 'publications',
  slugs: string[],
) => {
  const ids: number[] = []
  for (const slug of slugs) ids.push(await findId(payload, collection, { slug: { equals: slug } }))
  return ids
}

export const teamMemberWithPhoto = async (payload: Payload, name: string) => {
  const found = await payload.find({
    collection: 'team-members',
    where: { and: [{ name: { equals: name } }, { photo: { exists: true } }] },
    limit: 1,
    depth: 0,
  })
  return found.docs.length === 1 ? found.docs[0].id : null
}

const socialKindOf = (link: PersonSource['links'][number]) => {
  if (link.kind !== 'profile') return link.kind
  if (!link.href.startsWith('mailto:'))
    throw new Error(`Profile link ${link.href} is not an email address`)
  return 'email' as const
}

export const externalPerson = async (payload: Payload, person: PersonSource) => ({
  kind: 'external' as const,
  name: person.name,
  title: person.title,
  photo: await upload(payload, person.photo, person.name),
  socialLinks: person.links.map((link) => ({ kind: socialKindOf(link), href: link.href })),
})
