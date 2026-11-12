import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import type { FrameTone } from '../components/cards/types'
import type { Locale } from '../i18n/config'
import { t } from '../i18n/ui'
import { findAll, findGlobal, required, resolved, type Doc } from '../lib/cms'
import { facet, type PageSize } from '../lib/listing'
import { altOf, icon, image } from '../lib/media'
import {
  articleHtml,
  ctaContent,
  linkGroups,
  longDate,
  person,
  personName,
  serviceCta,
  tagLabel,
  type CtaContent,
  type LinkGroup,
  type Person,
  type ServiceCta,
} from './outputs'
import { routes } from './routes'

export interface Stat {
  value: string
  label: string
  icon: SvgComponent
}

export type BodyBlock =
  | { kind: 'richText'; html: string }
  | { kind: 'stats'; title: string; stats: Stat[] }
  | { kind: 'image'; image: ImageMetadata; alt: string }

export interface PublicationDetail {
  highlight: string
  authorNames: string[]
  date: string
  region: string
  tags: string[]
  hero: ImageMetadata
  heroAlt: string
  body: BodyBlock[]
  linkGroups: LinkGroup[]
  authors: Person[]
  citation: string
  related: string[]
  cta: CtaContent
  serviceCta: ServiceCta
}

export type PublicationTypeId = 'academic' | 'blogs' | 'policy-briefs' | 'reports'

export interface Publication {
  slug: string
  type: PublicationTypeId
  title: string
  excerpt: string
  date: string
  category: string
  thumbnail: ImageMetadata
  alt: string
  frame: FrameTone
  facets: Record<'region' | 'service' | 'product' | 'tag', string>
  isoDate: string
  detail: PublicationDetail
}

type PublicationDoc = Doc<'publications'>

const listingId = 'publications'

const bodyBlock = (block: PublicationDoc['body'][number], what: string): BodyBlock => {
  if (block.blockType === 'richText')
    return { kind: 'richText', html: articleHtml(block.contentHtml, `${what} rich text`) }
  if (block.blockType === 'stats')
    return {
      kind: 'stats',
      title: block.title,
      stats: block.items.map((item) => ({
        value: item.value,
        label: item.label,
        icon: icon(item.icon),
      })),
    }
  return {
    kind: 'image',
    image: image(block.image, `${what} body image`),
    alt: altOf(block.image, `${what} body image`),
  }
}

const publication = (
  locale: Locale,
  doc: PublicationDoc,
  slugs: Map<number, string>,
): Publication => {
  const what = `publication ${doc.slug}`
  const date = longDate(locale, doc.date)
  return {
    slug: doc.slug,
    type: doc.type,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.preprint ? t(locale, 'publication.preprint') : date,
    category: resolved(doc.category, `${what} category`).name,
    thumbnail: image(doc.thumbnail, `${what} thumbnail`),
    alt: altOf(doc.thumbnail, `${what} thumbnail`),
    frame: doc.frame,
    facets: {
      region: resolved(doc.region, `${what} region`).slug,
      service: facet(
        required(doc.services, `${what} services`).map(
          (service) => resolved(service, `${what} service`).slug,
        ),
      ),
      product: facet(
        required(doc.tools, `${what} tools`).map((tool) =>
          String(resolved(tool, `${what} tool`).id),
        ),
      ),
      tag: facet(
        required(doc.tags, `${what} tags`).map((tag) => resolved(tag, `${what} tag`).slug),
      ),
    },
    isoDate: doc.date,
    detail: {
      highlight: doc.highlight,
      authorNames: doc.authors.map((author) => personName(author, `${what} author`)),
      date,
      region: resolved(doc.region, `${what} region`).name,
      tags: required(doc.tags, `${what} tags`).map((tag) => tagLabel(tag, `${what} tag`)),
      hero: image(doc.hero, `${what} hero`),
      heroAlt: altOf(doc.hero, `${what} hero`),
      body: doc.body.map((block) => bodyBlock(block, what)),
      linkGroups: linkGroups(doc.linkGroups, `${what} link groups`),
      authors: doc.authors.flatMap((author) => {
        const row = person(locale, author, null, `${what} author`)
        return row === null ? [] : [row]
      }),
      citation: doc.citation,
      related: required(doc.related, `${what} related publications`).flatMap((related) => {
        const slug = slugs.get(typeof related === 'number' ? related : related.id)
        return slug === undefined ? [] : [slug]
      }),
      cta: ctaContent(doc.cta, `${what} call to action`),
      serviceCta: serviceCta(doc.ctaService, `${what} service`),
    },
  }
}

const loadDocs = (locale: Locale) =>
  findAll('publications', locale, { depth: 2, sort: 'createdAt' })

const fromDocs = (locale: Locale, docs: PublicationDoc[]): Publication[] => {
  const slugs = new Map(docs.map((doc) => [doc.id, doc.slug]))
  return docs.map((doc) => publication(locale, doc, slugs))
}

export const loadPublications = async (locale: Locale): Promise<Publication[]> =>
  fromDocs(locale, await loadDocs(locale))

export const publicationBySlug = (publications: Publication[], slug: string): Publication => {
  const found = publications.find((item) => item.slug === slug)
  if (!found) throw new Error(`Unknown publication: ${slug}`)
  return found
}

export const loadPublicationsPage = async (locale: Locale) => {
  const [docs, page] = await Promise.all([
    loadDocs(locale),
    findGlobal('publications-page', locale, 1),
  ])
  const items = fromDocs(locale, docs)
  const { chips } = page.hero
  const { tabs } = page.listing
  const anchor = `#${listingId}`
  return {
    meta: { title: page.meta.title, description: page.meta.description },
    hero: {
      title: page.hero.title,
      links: [chips.academic, chips.blogs, chips.policyBriefs, chips.reports].map((label) => ({
        label,
        href: anchor,
      })),
      image: {
        desktop: image(page.hero.image, 'publications hero image'),
        mobile: image(page.hero.imageMobile, 'publications mobile hero image'),
      },
    },
    listing: {
      id: listingId,
      title: page.listing.title,
      typeTabs: [
        { type: 'academic', label: tabs.academic, href: routes.academicPublications },
        { type: 'blogs', label: tabs.blogs, href: routes.blogs },
        { type: 'policy-briefs', label: tabs.policyBriefs, href: routes.policyBriefs },
        { type: 'reports', label: tabs.reports, href: routes.reports },
      ] satisfies { type: PublicationTypeId; label: string; href: string }[],
      pageSize: { desktop: 9, mobile: 5 } satisfies PageSize,
      items,
    },
    outputs: {
      title: page.outputs.title,
      description: page.outputs.description,
      pageSize: { desktop: 9, mobile: 5 } satisfies PageSize,
      items: docs
        .filter((doc) => doc.showInOutputs)
        .map((doc) => publicationBySlug(items, doc.slug)),
    },
  }
}
