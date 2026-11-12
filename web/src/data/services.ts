import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import type { FrameTone, PartnerTag } from '../components/cards/types'
import type { Locale } from '../i18n/config'
import { findAll, findGlobal, required, texts, type Doc, type GlobalDoc } from '../lib/cms'
import { altOf, icon, image, optionalImage } from '../lib/media'
import { partnerTag, projectPeriod } from './projects'
import { routes } from './routes'

export type ServiceSlug = string
export type Accent = 'brand-500' | 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900'
export type HeroBackground = 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900'
export type Collage = 'wind' | 'thermalpower' | 'biz'

export interface ResponsiveImage {
  desktop: ImageMetadata
  mobile: ImageMetadata
}

export interface Link {
  label: string
  href: string
}

export interface ValueItem {
  thumbnail: ImageMetadata
  thumbnailMobile: ImageMetadata
  label: string
  title: string
  body: string
}

export type OfferingText = string | { list: string[] }

export interface Offering {
  accent: Accent
  icon: SvgComponent
  title: string
  text: OfferingText[]
  link: Link | null
  deliverables: string[]
}

export interface ApproachStep {
  number: string
  title: string
  text: string
  image: ImageMetadata | null
}

export interface Approach {
  illustration: ImageMetadata
  steps: ApproachStep[]
}

export interface CtaAction {
  label: string
  href: string
  emphasis: 'primary' | 'secondary'
  newTab: boolean
}

export interface RelatedProject {
  title: string
  excerpt: string
  period: string
  href: string
  image: ImageMetadata
  alt: string
  frame: FrameTone
  partnerTag: PartnerTag | null
}

export interface ServiceCard {
  title: string
  paragraphs: string[]
  link: Link
  image: ResponsiveImage
}

export interface Service {
  slug: ServiceSlug
  name: string
  meta: { title: string; description: string }
  hero: {
    title: string | { desktop: string; mobile: string }
    lead: string
    image: ResponsiveImage
    background: HeroBackground
  }
  card: ServiceCard
  intro: { tag: string; title: string; paragraphs: string[]; image: ImageMetadata; alt: string }
  offerings: { tag: string; title: string; items: Offering[] }
  values: { tag: string; title: string; columns: 5 | 6; items: ValueItem[] }
  approach: { tag: string; title: string; paragraphs: string[] } | null
  related: RelatedProject[]
  cta: { heading: string; text: string; background: HeroBackground; collage: Collage }
}

export interface ServiceShared {
  eyebrow: { label: string; mobile: boolean }
  approach: Approach
  ctaActions: CtaAction[]
}

export interface ServicesPage {
  meta: { title: string; description: string }
  hero: { title: string; links: Link[]; image: ResponsiveImage }
  intro: { id: string; tag: string; title: string; columns: string[] }
  approach: { tag: string; title: string }
  values: { tag: string; title: string; items: ValueItem[] }
  cta: { heading: string; text: string }
  cards: ServiceCard[]
  shared: ServiceShared
}

type ServiceDoc = Doc<'services'>
type ProjectDoc = Doc<'projects'>
type PageDoc = GlobalDoc<'services-page'>
type Rows = { text: string }[] | null | undefined

const introId = 'services'
const valueColumns = { '5': 5, '6': 6 } as const

const optionalTexts = (rows: Rows): string[] =>
  rows === null || rows === undefined ? [] : rows.map((row) => row.text)

const valueItems = (items: PageDoc['values']['items'], what: string): ValueItem[] =>
  items.map((item) => ({
    thumbnail: image(item.thumbnail, `${what} thumbnail of ${item.label}`),
    thumbnailMobile: image(item.thumbnailMobile, `${what} mobile thumbnail of ${item.label}`),
    label: item.label,
    title: item.title,
    body: item.body,
  }))

const offeringLink = (link: ServiceDoc['offerings']['items'][number]['link'], what: string) => {
  const { label, href } = required(link, what)
  const hasLabel = label !== null && label !== undefined
  const hasHref = href !== null && href !== undefined
  if (hasLabel && hasHref) return { label, href }
  if (hasLabel || hasHref) throw new Error(`${what} needs both a label and a target`)
  return null
}

const offering = (item: ServiceDoc['offerings']['items'][number], what: string): Offering => ({
  accent: item.accent,
  icon: icon(item.icon),
  title: item.title,
  text: item.text.map((block) =>
    block.blockType === 'paragraph'
      ? block.text
      : { list: texts(block.items, `${what} list of ${item.title}`) },
  ),
  link: offeringLink(item.link, `${what} link of ${item.title}`),
  deliverables: optionalTexts(item.deliverables),
})

const serviceApproach = (approach: ServiceDoc['approach'], what: string): Service['approach'] =>
  approach.show
    ? {
        tag: required(approach.tag, `${what} approach tag`),
        title: required(approach.title, `${what} approach title`),
        paragraphs: optionalTexts(approach.paragraphs),
      }
    : null

const relatedProject = (project: ProjectDoc): RelatedProject => ({
  title: project.title,
  excerpt: project.excerpt,
  period: projectPeriod(project),
  href: routes.successStory(project.slug),
  image: image(project.thumbnail, `thumbnail of project ${project.slug}`),
  alt: altOf(project.thumbnail, `thumbnail of project ${project.slug}`),
  frame: project.frame,
  partnerTag: partnerTag(project.partnerTag, `partner tag of project ${project.slug}`),
})

const serviceCard = (doc: ServiceDoc): ServiceCard => ({
  title: doc.card.title,
  paragraphs: texts(doc.card.paragraphs, `card paragraphs of service ${doc.slug}`),
  link: { label: doc.card.linkLabel, href: routes.service(doc.slug) },
  image: {
    desktop: image(doc.card.image, `card image of service ${doc.slug}`),
    mobile: image(doc.card.imageMobile, `mobile card image of service ${doc.slug}`),
  },
})

const service = (doc: ServiceDoc, projects: ProjectDoc[]): Service => {
  const what = `service ${doc.slug}`
  const { hero, intro, offerings, values, cta, meta } = doc
  return {
    slug: doc.slug,
    name: doc.name,
    meta: { title: meta.title, description: meta.description },
    hero: {
      title:
        hero.titleMobile === null || hero.titleMobile === undefined
          ? hero.title
          : { desktop: hero.title, mobile: hero.titleMobile },
      lead: hero.lead,
      image: {
        desktop: image(hero.image, `${what} hero image`),
        mobile: image(hero.imageMobile, `${what} mobile hero image`),
      },
      background: hero.background,
    },
    card: serviceCard(doc),
    intro: {
      tag: intro.tag,
      title: intro.title,
      paragraphs: texts(intro.paragraphs, `${what} intro paragraphs`),
      image: image(intro.image, `${what} intro image`),
      alt: altOf(intro.image, `${what} intro image`),
    },
    offerings: {
      tag: offerings.tag,
      title: offerings.title,
      items: offerings.items.map((item) => offering(item, what)),
    },
    values: {
      tag: values.tag,
      title: values.title,
      columns: valueColumns[values.columns],
      items: valueItems(values.items, what),
    },
    approach: serviceApproach(doc.approach, what),
    related: projects.map(relatedProject),
    cta: {
      heading: cta.heading,
      text: cta.text,
      background: cta.background,
      collage: cta.collage,
    },
  }
}

const shared = (page: PageDoc): ServiceShared => ({
  eyebrow: { label: page.detailEyebrow, mobile: true },
  approach: {
    illustration: image(page.approach.illustration, 'services page approach illustration'),
    steps: page.approach.steps.map((step, index) => ({
      number: String(index + 1).padStart(2, '0'),
      title: step.title,
      text: step.text,
      image: optionalImage(step.image, `picture of approach step ${step.title}`),
    })),
  },
  ctaActions: required(page.ctaActions, 'services page banner actions').map((action) => ({
    label: action.label,
    href: action.href,
    emphasis: action.emphasis,
    newTab: action.newTab,
  })),
})

const serviceDocs = (locale: Locale): Promise<ServiceDoc[]> =>
  findAll('services', locale, { depth: 1, sort: 'order' })

export const loadServiceShared = async (locale: Locale): Promise<ServiceShared> =>
  shared(await findGlobal('services-page', locale, 1))

export const loadServices = async (locale: Locale): Promise<Service[]> => {
  const docs = await serviceDocs(locale)
  return Promise.all(
    docs.map(async (doc) =>
      service(
        doc,
        await findAll('projects', locale, {
          depth: 2,
          sort: 'createdAt',
          where: { 'where[services][contains]': String(doc.id) },
        }),
      ),
    ),
  )
}

export const loadServicesPage = async (locale: Locale): Promise<ServicesPage> => {
  const [page, docs] = await Promise.all([
    findGlobal('services-page', locale, 1),
    serviceDocs(locale),
  ])
  return {
    meta: { title: page.meta.title, description: page.meta.description },
    hero: {
      title: page.hero.title,
      links: [{ label: page.hero.linkLabel, href: `#${introId}` }],
      image: {
        desktop: image(page.hero.image, 'services page hero image'),
        mobile: image(page.hero.imageMobile, 'services page mobile hero image'),
      },
    },
    intro: {
      id: introId,
      tag: page.intro.tag,
      title: page.intro.title,
      columns: texts(page.intro.columns, 'services page intro columns'),
    },
    approach: { tag: page.approach.tag, title: page.approach.title },
    values: {
      tag: page.values.tag,
      title: page.values.title,
      items: valueItems(page.values.items, 'services page'),
    },
    cta: { heading: page.cta.heading, text: page.cta.text },
    cards: docs.map(serviceCard),
    shared: shared(page),
  }
}
