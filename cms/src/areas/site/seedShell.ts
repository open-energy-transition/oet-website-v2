import type { Payload } from 'payload'

import { content, findId, rows, upload } from '../../seed/lib'
import type { HomeSource } from './seedHome'

interface LinkSource {
  label: string
  href: string
}

interface MoreSource extends LinkSource {
  description: string
}

interface ListSource {
  kind: 'list'
  id: string
  label: string
  links: LinkSource[]
}

interface MegaSource {
  kind: 'mega'
  id: string
  label: string
  links: LinkSource[]
  more: MoreSource
}

interface DirectSource {
  kind: 'link'
  id: string
  label: string
  href: string
}

type GroupSource = ListSource | MegaSource

interface NavigationSource {
  navigation: {
    desktop: GroupSource[]
    mobile: (GroupSource | DirectSource)[]
    contact: LinkSource
    legal: LinkSource[]
    consentLabel: string
    copyright: string
  }
}

interface FooterSource {
  footer: {
    cta: { headline: string[]; email: LinkSource; action: LinkSource }
    blurb: string
    copyright: string
    legal: LinkSource[]
    consentLabel: string
    consentLabelCompact: string
    columns: { title: string; links: LinkSource[] }[]
  }
}

const servicePrefix = '/services/'

const linkOf = ({ label, href }: LinkSource) => ({ label, href })

const same = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right)

const sorted = (links: LinkSource[]) =>
  links.map(linkOf).sort((left, right) => left.href.localeCompare(right.href))

const assertSame = (left: unknown, right: unknown, what: string) => {
  if (!same(left, right)) throw new Error(`${what} differ between the sources`)
}

const assertServices = async (payload: Payload, links: LinkSource[], what: string) => {
  for (const { href } of links) {
    if (!href.startsWith(servicePrefix))
      throw new Error(`${what}: ${href} is not the page of a service`)
    await findId(payload, 'services', { slug: { equals: href.slice(servicePrefix.length) } })
  }
}

const isServiceList = (links: LinkSource[]) =>
  links.every(({ href }) => href.startsWith(servicePrefix))

const groupOf = (group: GroupSource) => ({
  kind: group.kind,
  label: group.label,
  links: group.links.map(linkOf),
})

const linkGroup = (
  group: ListSource,
  display: { desktop: 'menu' | 'hidden'; mobile: 'menu' | 'link'; mobileHref: string | null },
) => ({
  blockType: 'linkGroup' as const,
  label: group.label,
  links: group.links.map(linkOf),
  desktop: display.desktop,
  mobile: display.mobile,
  mobileHref: display.mobileHref,
})

const menuEntry = async (
  payload: Payload,
  entry: GroupSource | DirectSource,
  desktop: GroupSource | undefined,
) => {
  if (entry.kind === 'link') {
    if (!desktop || desktop.kind !== 'list')
      throw new Error(`Mobile link ${entry.id} has no desktop group with its links`)
    assertSame(entry.label, desktop.label, `Labels of menu entry ${entry.id}`)
    return linkGroup(desktop, { desktop: 'menu', mobile: 'link', mobileHref: entry.href })
  }
  if (entry.kind === 'list') {
    if (!desktop) return linkGroup(entry, { desktop: 'hidden', mobile: 'menu', mobileHref: null })
    assertSame(groupOf(entry), groupOf(desktop), `Desktop and mobile menu entry ${entry.id}`)
    return linkGroup(entry, { desktop: 'menu', mobile: 'menu', mobileHref: null })
  }
  if (!desktop || desktop.kind !== 'mega')
    throw new Error(`Services menu ${entry.id} is missing from the desktop bar`)
  assertSame(entry.label, desktop.label, 'Labels of the services menu')
  assertSame(entry.more, desktop.more, 'Links to all services')
  assertSame(sorted(entry.links), sorted(desktop.links), 'Service links of the two menus')
  await assertServices(payload, entry.links, 'Services menu')
  return {
    blockType: 'servicesGroup' as const,
    label: entry.label,
    more: { label: entry.more.label, description: entry.more.description, href: entry.more.href },
  }
}

const seedHeader = async (payload: Payload, { navigation }: NavigationSource) => {
  const mobileIds = navigation.mobile.map(({ id }) => id)
  const desktopIds = navigation.desktop.map(({ id }) => id)
  assertSame(
    mobileIds.filter((id) => desktopIds.includes(id)),
    desktopIds,
    'The order of the desktop and the mobile menu entries',
  )

  const menu = []
  for (const entry of navigation.mobile)
    menu.push(
      await menuEntry(
        payload,
        entry,
        navigation.desktop.find(({ id }) => id === entry.id),
      ),
    )

  await payload.updateGlobal({
    slug: 'site-header',
    depth: 0,
    data: { menu, contact: linkOf(navigation.contact) },
  })
}

const seedFooter = async (
  payload: Payload,
  { footer }: FooterSource,
  { navigation }: NavigationSource,
) => {
  assertSame(footer.copyright, navigation.copyright, 'Copyright lines of footer and mobile menu')
  assertSame(
    sorted(footer.legal),
    sorted(navigation.legal),
    'Legal links of footer and mobile menu',
  )
  assertSame(
    footer.consentLabelCompact,
    navigation.consentLabel,
    'Cookie settings labels of mobile footer and mobile menu',
  )

  const columns = []
  for (const column of footer.columns) {
    if (isServiceList(column.links)) {
      await assertServices(payload, column.links, `Footer column ${column.title}`)
      columns.push({ blockType: 'servicesColumn' as const, title: column.title })
      continue
    }
    columns.push({
      blockType: 'linkColumn' as const,
      title: column.title,
      links: column.links.map(linkOf),
    })
  }

  await payload.updateGlobal({
    slug: 'site-footer',
    depth: 0,
    data: {
      cta: { headline: rows(footer.cta.headline), action: linkOf(footer.cta.action) },
      blurb: footer.blurb,
      columns,
      copyright: footer.copyright,
      legal: footer.legal.map(linkOf),
      consentLabel: footer.consentLabel,
      consentLabelCompact: footer.consentLabelCompact,
    },
  })
}

interface ConsentSource {
  notice: string
  modalTitle: string
  modalDescription: string
  necessaryTitle: string
  necessaryDescription: string
  analyticsTitle: string
  analyticsDescription: string
}

const seedSettings = async (
  payload: Payload,
  { footer }: FooterSource,
  home: HomeSource,
  consent: ConsentSource,
) => {
  const { email } = footer.cta
  if (email.href !== `mailto:${email.label}`)
    throw new Error(`The footer email link ${email.href} does not open ${email.label}`)

  const [firstSlide] = home.hero.slides
  await payload.updateGlobal({
    slug: 'site-settings',
    depth: 0,
    data: {
      siteName: home.meta.title,
      contactEmail: email.label,
      meta: { title: home.meta.title, description: home.meta.description },
      shareImage: await upload(payload, firstSlide.image, firstSlide.alt),
      consent,
    },
  })
}

export const seedShell = async (payload: Payload) => {
  const navigation = await content<NavigationSource>('navigation')
  const footer = await content<FooterSource>('footer')
  const home = await content<HomeSource>('home')
  await seedHeader(payload, navigation)
  await seedFooter(payload, footer, navigation)
  await seedSettings(payload, footer, home, await content<ConsentSource>('consent'))
}
