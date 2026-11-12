import type { ImageMetadata } from 'astro'
import type { Locale } from '../i18n/config'
import { findAll, findGlobal, required } from '../lib/cms'
import { image } from '../lib/media'
import { routes } from './routes'

export type HeaderTheme = 'light' | 'dark' | 'solid' | 'on-red'

export type ServiceIcon = 'pylon' | 'government' | 'engineer' | 'column' | 'research' | 'monitor'

export interface NavLink {
  label: string
  href: string
}

export interface NavServiceLink extends NavLink {
  description: string
  icon: ServiceIcon
  thumbnail: ImageMetadata
}

export interface NavListGroup {
  kind: 'list'
  id: string
  label: string
  links: NavLink[]
}

export interface NavMegaGroup {
  kind: 'mega'
  id: string
  label: string
  links: NavServiceLink[]
  more: NavLink & { description: string }
}

export interface NavDirectLink {
  kind: 'link'
  id: string
  label: string
  href: string
}

export type NavGroup = NavListGroup | NavMegaGroup

export type MobileNavEntry = NavGroup | NavDirectLink

export interface Navigation {
  desktop: NavGroup[]
  mobile: MobileNavEntry[]
  contact: NavLink
  legal: NavLink[]
  consentLabel: string
  copyright: string
}

const SERVICE_COLUMNS = 3

export const byColumn = <Item>(items: Item[], columns: number): Item[] => {
  const rows = Math.ceil(items.length / columns)
  const full = items.length - (rows - 1) * columns
  return Array.from({ length: rows }).flatMap((_, row) =>
    Array.from({ length: columns }).flatMap((_, column) => {
      const size = column < full ? rows : rows - 1
      const start = column * rows - Math.max(column - full, 0)
      return row < size ? [items[start + row]] : []
    }),
  )
}

export const links = (
  rows: { label: string; href: string }[] | null | undefined,
  what: string,
): NavLink[] => required(rows, what).map(({ label, href }) => ({ label, href }))

export const loadServiceLinks = async (locale: Locale): Promise<NavServiceLink[]> => {
  const services = await findAll('services', locale, { depth: 1, sort: 'order' })
  return services.map((service) => ({
    label: service.navigation.label,
    description: service.navigation.description,
    icon: service.navigation.icon,
    href: routes.service(service.slug),
    thumbnail: image(service.card.imageMobile, `mobile card image of service ${service.slug}`),
  }))
}

export const serviceLinksByColumn = (services: NavServiceLink[]): NavServiceLink[] =>
  byColumn(services, SERVICE_COLUMNS)

export const loadNavigation = async (locale: Locale): Promise<Navigation> => {
  const [header, footer, services] = await Promise.all([
    findGlobal('site-header', locale, 0),
    findGlobal('site-footer', locale, 0),
    loadServiceLinks(locale),
  ])

  const entries = header.menu.map((block): { desktop: NavGroup[]; mobile: MobileNavEntry[] } => {
    const id = required(block.id, `site-header menu entry "${block.label}" id`)
    if (block.blockType === 'servicesGroup') {
      const mega = (items: NavServiceLink[]): NavMegaGroup => ({
        kind: 'mega',
        id,
        label: block.label,
        links: items,
        more: {
          label: block.more.label,
          description: block.more.description,
          href: block.more.href,
        },
      })
      return {
        desktop: [mega(serviceLinksByColumn(services))],
        mobile: [mega(services)],
      }
    }
    const list: NavListGroup = {
      kind: 'list',
      id,
      label: block.label,
      links: links(block.links, `site-header menu entry "${block.label}" links`),
    }
    const mobile = (): MobileNavEntry[] => {
      if (block.mobile === 'hidden') return []
      if (block.mobile === 'menu') return [list]
      return [
        {
          kind: 'link',
          id,
          label: block.label,
          href: required(block.mobileHref, `site-header menu entry "${block.label}" mobile target`),
        },
      ]
    }
    return { desktop: block.desktop === 'menu' ? [list] : [], mobile: mobile() }
  })

  return {
    desktop: entries.flatMap((entry) => entry.desktop),
    mobile: entries.flatMap((entry) => entry.mobile),
    contact: { label: header.contact.label, href: header.contact.href },
    legal: links(footer.legal, 'site-footer legal links'),
    consentLabel: footer.consentLabelCompact,
    copyright: footer.copyright,
  }
}
