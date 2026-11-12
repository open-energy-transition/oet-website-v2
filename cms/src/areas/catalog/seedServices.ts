import type { Payload } from 'payload'

import { content, rows, upload, upsert, type Asset, type IconRef } from '../../seed/lib'
import type { Service } from '../../payload-types'
import type { ActionSource } from './seedBanners'

type Tone = 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900'
type OfferingItem = Service['offerings']['items'][number]
type CtaCard = Service['ctaCard']

interface LinkSource {
  label: string
  href: string
}

interface ValueSource {
  thumbnail: Asset
  thumbnailMobile: Asset
  label: string
  title: string
  body: string
}

interface OfferingSource {
  accent: OfferingItem['accent']
  icon: OfferingItem['icon']
  title: string
  text: (string | { list: string[] })[]
  link: LinkSource | null
  deliverables: string[]
}

interface ServiceSource {
  slug: string
  name: string
  meta: { title: string; description: string }
  hero: {
    title: string | { desktop: string; mobile: string }
    lead: string
    image: { desktop: Asset; mobile: Asset }
    background: Tone
  }
  card: {
    title: string
    paragraphs: string[]
    link: LinkSource
    image: { desktop: Asset; mobile: Asset }
  }
  intro: { tag: string; title: string; paragraphs: string[]; image: Asset; alt: string }
  offerings: { tag: string; title: string; items: OfferingSource[] }
  values: { tag: string; title: string; columns: 5 | 6; items: ValueSource[] }
  approach: { tag: string; title: string; paragraphs: string[] } | null
  cta: { heading: string; text: string; background: Tone; collage: Service['cta']['collage'] }
}

interface StepSource {
  number: string
  title: string
  text: string
  image: Asset | null
}

interface ServicesContent {
  approach: { illustration: Asset; steps: StepSource[] }
  ctaActions: ActionSource[]
  serviceDetail: { eyebrow: { label: string } }
  services: ServiceSource[]
  servicesPage: {
    meta: { title: string; description: string }
    hero: { title: string; links: LinkSource[]; image: { desktop: Asset; mobile: Asset } }
    intro: { tag: string; title: string; columns: string[] }
    approach: { tag: string; title: string }
    values: { tag: string; title: string; items: ValueSource[] }
    cta: { heading: string; text: string }
  }
}

interface CtaCardSource {
  icon: IconRef
  iconTone: CtaCard['iconTone']
  frame: CtaCard['frame']
  title: string
  paragraphs: string[]
  link: LinkSource
  image: Asset
  imageMobile: Asset | null
}

interface OutputsContent {
  serviceCtas: Record<string, CtaCardSource>
}

interface AccordionSource {
  title: string
  paragraphs: string[]
  href: string
  image: Asset
  alt: string
}

interface HomeContent {
  services: { items: AccordionSource[] }
}

interface MenuLinkSource {
  label: string
  description: string
  href: string
  icon: Service['navigation']['icon']
}

interface MenuSource {
  kind: string
  links: MenuLinkSource[]
}

interface NavigationContent {
  navigation: { desktop: MenuSource[]; mobile: MenuSource[] }
}

interface FooterContent {
  footer: { columns: { links: LinkSource[] }[] }
}

const pathOf = (slug: string) => `/services/${slug}`

const found = <Value>(value: Value | undefined, what: string): Value => {
  if (value === undefined) throw new Error(`Seed content has no ${what}`)
  return value
}

const megaMenu = (menus: MenuSource[], what: string) =>
  found(
    menus.find((menu) => menu.kind === 'mega'),
    what,
  ).links

const valueRows = async (payload: Payload, items: ValueSource[]) => {
  const result = []
  for (const item of items)
    result.push({
      label: item.label,
      title: item.title,
      body: item.body,
      thumbnail: await upload(payload, item.thumbnail, ''),
      thumbnailMobile: await upload(payload, item.thumbnailMobile, ''),
    })
  return result
}

const offeringRow = (item: OfferingSource) => ({
  title: item.title,
  icon: item.icon,
  accent: item.accent,
  text: item.text.map((part) =>
    typeof part === 'string'
      ? { blockType: 'paragraph' as const, text: part }
      : { blockType: 'list' as const, items: rows(part.list) },
  ),
  link: item.link === null ? { label: null, href: null } : item.link,
  deliverables: rows(item.deliverables),
})

const heroTitle = (title: ServiceSource['hero']['title']) =>
  typeof title === 'string'
    ? { title, titleMobile: null }
    : { title: title.desktop, titleMobile: title.mobile }

const approachOf = (approach: ServiceSource['approach']) =>
  approach === null
    ? { show: false, tag: null, title: null, paragraphs: [] }
    : {
        show: true,
        tag: approach.tag,
        title: approach.title,
        paragraphs: rows(approach.paragraphs),
      }

export const seedServices = async (payload: Payload) => {
  const { approach, ctaActions, serviceDetail, services, servicesPage } =
    await content<ServicesContent>('services')
  const { serviceCtas } = await content<OutputsContent>('outputs')
  const home = await content<HomeContent>('home')
  const { navigation } = await content<NavigationContent>('navigation')
  const { footer } = await content<FooterContent>('footer')

  const desktopMenu = megaMenu(navigation.desktop, 'desktop services menu')
  const mobileMenu = megaMenu(navigation.mobile, 'mobile services menu')
  const footerLinks = footer.columns.flatMap((column) => column.links)

  for (const [index, service] of services.entries()) {
    const path = pathOf(service.slug)
    if (service.card.link.href !== path)
      throw new Error(`The card of ${service.slug} links to ${service.card.link.href}`)

    const ctaCard = found(serviceCtas[service.slug], `CTA card for ${service.slug}`)
    if (ctaCard.link.href !== path)
      throw new Error(`The CTA card of ${service.slug} links to ${ctaCard.link.href}`)

    const accordion = found(
      home.services.items.find((item) => item.href === path),
      `home accordion entry for ${service.slug}`,
    )
    const menu = found(
      desktopMenu.find((item) => item.href === path),
      `desktop menu entry for ${service.slug}`,
    )
    const menuMobile = found(
      mobileMenu.find((item) => item.href === path),
      `mobile menu entry for ${service.slug}`,
    )
    if (menu.label !== menuMobile.label || menu.description !== menuMobile.description)
      throw new Error(`The desktop and mobile menu entries of ${service.slug} differ`)
    if (menu.icon !== menuMobile.icon)
      throw new Error(`The desktop and mobile menu icons of ${service.slug} differ`)
    const footerLink = found(
      footerLinks.find((item) => item.href === path),
      `footer link for ${service.slug}`,
    )
    if (footerLink.label !== menu.label)
      throw new Error(`The footer label of ${service.slug} differs from its menu label`)

    await upsert(
      payload,
      'services',
      { slug: { equals: service.slug } },
      {
        _status: 'published',
        name: service.name,
        slug: service.slug,
        order: index + 1,
        hero: {
          ...heroTitle(service.hero.title),
          lead: service.hero.lead,
          image: await upload(payload, service.hero.image.desktop, ''),
          imageMobile: await upload(payload, service.hero.image.mobile, ''),
          background: service.hero.background,
        },
        intro: {
          tag: service.intro.tag,
          title: service.intro.title,
          paragraphs: rows(service.intro.paragraphs),
          image: await upload(payload, service.intro.image, service.intro.alt),
        },
        offerings: {
          tag: service.offerings.tag,
          title: service.offerings.title,
          items: service.offerings.items.map(offeringRow),
        },
        values: {
          tag: service.values.tag,
          title: service.values.title,
          columns: service.values.columns === 5 ? '5' : '6',
          items: await valueRows(payload, service.values.items),
        },
        approach: approachOf(service.approach),
        cta: service.cta,
        card: {
          title: service.card.title,
          paragraphs: rows(service.card.paragraphs),
          linkLabel: service.card.link.label,
          image: await upload(payload, service.card.image.desktop, ''),
          imageMobile: await upload(payload, service.card.image.mobile, ''),
        },
        ctaCard: {
          title: ctaCard.title,
          paragraphs: rows(ctaCard.paragraphs),
          linkLabel: ctaCard.link.label,
          icon: ctaCard.icon.__icon as CtaCard['icon'],
          iconTone: ctaCard.iconTone,
          frame: ctaCard.frame,
          image: await upload(payload, ctaCard.image, ''),
          imageMobile:
            ctaCard.imageMobile === null ? null : await upload(payload, ctaCard.imageMobile, ''),
        },
        home: {
          title: accordion.title,
          paragraphs: rows(accordion.paragraphs),
          image: await upload(payload, accordion.image, accordion.alt),
        },
        navigation: { label: menu.label, description: menu.description, icon: menu.icon },
        meta: service.meta,
      },
    )
  }

  const chip = servicesPage.hero.links[0]
  if (chip === undefined || servicesPage.hero.links.length !== 1)
    throw new Error('The services hero is expected to have exactly one chip')

  const steps = []
  for (const [index, step] of approach.steps.entries()) {
    if (step.number !== String(index + 1).padStart(2, '0'))
      throw new Error(`Step "${step.title}" is numbered ${step.number} at position ${index + 1}`)
    steps.push({
      title: step.title,
      text: step.text,
      image: step.image === null ? null : await upload(payload, step.image, ''),
    })
  }

  await payload.updateGlobal({
    slug: 'services-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: servicesPage.hero.title,
        linkLabel: chip.label,
        image: await upload(payload, servicesPage.hero.image.desktop, ''),
        imageMobile: await upload(payload, servicesPage.hero.image.mobile, ''),
      },
      intro: {
        tag: servicesPage.intro.tag,
        title: servicesPage.intro.title,
        columns: rows(servicesPage.intro.columns),
      },
      approach: {
        tag: servicesPage.approach.tag,
        title: servicesPage.approach.title,
        steps,
        illustration: await upload(payload, approach.illustration, ''),
      },
      values: {
        tag: servicesPage.values.tag,
        title: servicesPage.values.title,
        items: await valueRows(payload, servicesPage.values.items),
      },
      cta: servicesPage.cta,
      detailEyebrow: serviceDetail.eyebrow.label,
      ctaActions,
      meta: servicesPage.meta,
    },
  })
}
