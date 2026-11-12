import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import type { Locale } from '../i18n/config'
import { sortOptions, type SortValue } from '../i18n/groups'
import { t, type UiKey } from '../i18n/ui'
import { findAll, required, resolved, richHtml, texts, type Doc } from '../lib/cms'
import { icon, image, optionalImage } from '../lib/media'
import { routes } from './routes'
import { personSocialLabels, type PersonSocialKind } from './socials'

export interface Testimonial {
  quote: string
  name: string
  role: string
  portrait: ImageMetadata
  logo: ImageMetadata
  company: string
  paragraphs: string[]
}

export interface LinkLabelPart {
  text: string
  underline: boolean
}

export interface LinkGroup {
  title: string
  links: {
    label: LinkLabelPart[]
    truncate: boolean
    href: string
    disabled: boolean
    newTab: boolean
  }[]
}

export interface Person {
  name: string
  title: string | null
  photo: ImageMetadata
  role: string | null
  links: { kind: PersonSocialKind; href: string; label: string }[]
}

export interface SidebarPartner {
  name: string
  logo: ImageMetadata | null
  href: string | null
}

export type ServiceSlug = string

export interface ServiceCta {
  icon: SvgComponent
  iconTone: 'brand-500' | 'brand-600' | 'brand-700' | 'brand-800'
  frame: 'brand-500' | 'brand-600'
  title: string
  paragraphs: string[]
  link: { label: string; href: string }
  image: ImageMetadata
  imageMobile: ImageMetadata | null
}

export interface CtaContent {
  heading: string
  primary: string
  secondary: string
  actions: { label: string; href: string; emphasis: 'primary' | 'secondary' }[]
}

export interface FilterOption {
  value: string
  label: string
}

export interface Filter {
  id: string
  facet: string
  label: string
  selected: string
  options: FilterOption[]
}

export type PersonSource = Doc<'publications'>['authors'][number]

const filter = (
  locale: Locale,
  prefix: string,
  facet: string,
  label: UiKey,
  all: UiKey,
  options: FilterOption[],
): Filter => ({
  id: `${prefix}-filter-${facet}`,
  facet,
  label: t(locale, label),
  selected: 'all',
  options: [{ value: 'all', label: t(locale, all) }, ...options],
})

export const loadFilters = async (locale: Locale, prefix: string): Promise<Filter[]> => {
  const [regions, services, tools, tags] = await Promise.all([
    findAll('regions', locale, { depth: 0, sort: 'name' }),
    findAll('services', locale, { depth: 0, sort: 'order' }),
    findAll('tools', locale, { depth: 0, sort: 'order' }),
    findAll('tags', locale, { depth: 0, sort: 'name' }),
  ])
  const named = ({ slug, name }: { slug: string; name: string }) => ({ value: slug, label: name })
  return [
    filter(locale, prefix, 'region', 'filter.region', 'filter.region.all', regions.map(named)),
    filter(
      locale,
      prefix,
      'service',
      'filter.services',
      'filter.services.all',
      services.map(named),
    ),
    filter(
      locale,
      prefix,
      'product',
      'filter.products',
      'filter.products.all',
      tools.map(({ id, name }) => ({ value: String(id), label: name })),
    ),
    filter(locale, prefix, 'tag', 'filter.tags', 'filter.tags.all', tags.map(named)),
  ]
}

export const sort = (locale: Locale, prefix: string, selected: SortValue) => ({
  id: `${prefix}-sort`,
  label: t(locale, 'filter.sort'),
  prefix: t(locale, 'filter.sort'),
  selected,
  options: sortOptions(locale, ['a-z', 'z-a', 'newest', 'oldest']),
})

export const longDate = (locale: Locale, value: string): string =>
  new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))

export const monthOfYear = (value: string): string => {
  const date = new Date(value)
  return `${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`
}

export const articleHtml = (value: string | null | undefined, what: string): string =>
  richHtml(value, what).replace(
    /<(h[1-6])>([\s\S]*?)<\/\1>/g,
    (_, tag: string, inner: string) =>
      `<${tag}>${inner.replace(/\s*<br\s*\/?>/g, ' <br class="max-lg:hidden">')}</${tag}>`,
  )

export const tagLabel = (tag: number | Doc<'tags'>, what: string): string =>
  `#${resolved(tag, what).name}`

export const testimonial = (source: number | Doc<'testimonials'>, what: string): Testimonial => {
  const doc = resolved(source, what)
  return {
    quote: doc.quote,
    name: doc.name,
    role: doc.role,
    portrait: image(doc.portrait, `${what} portrait`),
    logo: image(doc.logo, `${what} logo`),
    company: doc.company,
    paragraphs: texts(doc.paragraphs, `${what} paragraphs`),
  }
}

export const linkGroups = (source: Doc<'projects'>['linkGroups'], what: string): LinkGroup[] =>
  required(source, what).map((group) => ({
    title: group.title,
    links: group.links.map((link) => ({
      label: link.parts.map(({ text, underline }) => ({ text, underline })),
      truncate: link.truncate,
      href: link.href,
      disabled: link.disabled,
      newTab: link.newTab,
    })),
  }))

export const ctaContent = (source: Doc<'projects'>['cta'], what: string): CtaContent => ({
  heading: source.heading,
  primary: source.primary,
  secondary: source.secondary,
  actions: required(source.actions, `${what} actions`).map(({ label, href, emphasis }) => ({
    label,
    href,
    emphasis,
  })),
})

export const serviceCta = (source: number | Doc<'services'>, what: string): ServiceCta => {
  const service = resolved(source, what)
  const card = service.ctaCard
  return {
    icon: icon(card.icon),
    iconTone: card.iconTone,
    frame: card.frame,
    title: card.title,
    paragraphs: texts(card.paragraphs, `${what} card paragraphs`),
    link: { label: card.linkLabel, href: routes.service(service.slug) },
    image: image(card.image, `${what} card image`),
    imageMobile: optionalImage(card.imageMobile, `${what} card mobile image`),
  }
}

interface PersonLink {
  kind: PersonSocialKind
  href: string
}

const personLinks = (locale: Locale, name: string, links: PersonLink[]): Person['links'] =>
  links.map(({ kind, href }) => ({
    kind,
    href,
    label: `${t(locale, personSocialLabels[kind])}: ${name}`,
  }))

const present = <Value>(value: Value | null | undefined): Value | null =>
  value === undefined ? null : value

export const personName = (source: PersonSource, what: string): string =>
  source.kind === 'team-member'
    ? resolved(source.member, `${what} team member`).name
    : required(source.name, `${what} name`)

export const person = (
  locale: Locale,
  source: PersonSource,
  role: string | null,
  what: string,
): Person | null => {
  if (source.kind === 'team-member') {
    const member = resolved(source.member, `${what} team member`)
    const photo = optionalImage(member.photo, `${what} head photo`)
    if (!photo) return null
    return {
      name: member.name,
      title: member.role,
      photo,
      role,
      links: personLinks(locale, member.name, required(member.socialLinks, `${what} social links`)),
    }
  }
  const name = required(source.name, `${what} name`)
  const photo = optionalImage(source.photo, `${what} photo`)
  if (!photo) return null
  return {
    name,
    title: present(source.title),
    photo,
    role,
    links: personLinks(locale, name, required(source.socialLinks, `${what} social links`)),
  }
}
