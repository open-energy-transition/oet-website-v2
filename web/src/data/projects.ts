import type { ImageMetadata } from 'astro'
import type { FrameTone, PartnerTag } from '../components/cards/types'
import type { Locale } from '../i18n/config'
import { t } from '../i18n/ui'
import {
  findAll,
  findGlobal,
  required,
  resolved,
  texts,
  type Doc,
  type GlobalDoc,
} from '../lib/cms'
import { facet, type PageSize } from '../lib/listing'
import { altOf, image, optionalImage } from '../lib/media'
import { logoBox, logoFits } from '../lib/logoSize'
import {
  articleHtml,
  ctaContent,
  linkGroups,
  longDate,
  monthOfYear,
  person,
  serviceCta,
  tagLabel,
  testimonial,
  type CtaContent,
  type LinkGroup,
  type SidebarPartner,
  type Person,
  type ServiceCta,
  type Testimonial,
} from './outputs'

export interface PartnerLink {
  label: string
  href: string
}

export interface ProjectDetail {
  highlights: string[]
  tools: string[]
  services: string[]
  start: string
  rangeWord: string
  end: string
  status: string
  region: string
  tags: string[]
  body: string
  linkGroups: LinkGroup[]
  contact: Person
  partners: SidebarPartner[]
  funders: SidebarPartner[]
  testimonialHeading: string
  testimonial: Testimonial[]
  related: string[]
  cta: CtaContent
  serviceCta: ServiceCta
}

export interface Project {
  slug: string
  title: string
  excerpt: string
  period: string
  thumbnail: ImageMetadata
  hero: ImageMetadata
  alt: string
  frame: FrameTone
  partnerTag: PartnerTag | null
  partnerLink: PartnerLink | null
  facets: Record<'status' | 'region' | 'service' | 'product' | 'tag', string>
  date: string
  detail: ProjectDetail
}

type ProjectDoc = Doc<'projects'>
type StoriesPage = GlobalDoc<'success-stories-page'>

const listingId = 'success-stories'

export const partnerTag = (source: ProjectDoc['partnerTag'], what: string): PartnerTag | null => {
  if (source === null || source === undefined) return null
  const partner = resolved(source, what)
  const logo = image(partner.tagLogo, `${what} tag logo`)
  return {
    name: partner.name,
    logo,
    ...logoBox(partner.tagSize, logo, logoFits.tag, `${what} tag size`),
  }
}

export const partnerLink = (
  source: ProjectDoc['partnerLink'],
  what: string,
): PartnerLink | null => {
  const { label, href } = required(source, what)
  return label && href ? { label, href } : null
}

export const projectPeriod = (doc: ProjectDoc): string =>
  `${monthOfYear(doc.startDate)} - ${monthOfYear(doc.endDate)}`

const sidebarPartner = (source: number | Doc<'partners'>, what: string): SidebarPartner => {
  const partner = resolved(source, what)
  return {
    name: partner.name,
    logo: optionalImage(partner.logo, `${what} logo`),
    href: partner.website === null || partner.website === undefined ? null : partner.website,
  }
}

const project = (
  locale: Locale,
  doc: ProjectDoc,
  page: StoriesPage,
  slugs: Map<number, string>,
): Project => {
  const what = `project ${doc.slug}`
  const statuses: Record<ProjectDoc['projectStatus'], string> = {
    completed: page.listing.tabs.completed,
    'in-progress': page.listing.tabs.inProgress,
  }
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    period: projectPeriod(doc),
    thumbnail: image(doc.thumbnail, `${what} thumbnail`),
    hero: image(doc.hero, `${what} hero`),
    alt: altOf(doc.thumbnail, `${what} thumbnail`),
    frame: doc.frame,
    partnerTag: partnerTag(doc.partnerTag, `${what} partner tag`),
    partnerLink: partnerLink(doc.partnerLink, `${what} partner link`),
    facets: {
      status: doc.projectStatus,
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
    date: doc.startDate,
    detail: {
      highlights: texts(doc.highlights, `${what} highlights`),
      tools: required(doc.tools, `${what} tools`).map(
        (tool) => resolved(tool, `${what} tool`).name,
      ),
      services: required(doc.services, `${what} services`).map(
        (service) => resolved(service, `${what} service`).name,
      ),
      start: longDate(locale, doc.startDate),
      rangeWord: t(locale, 'detail.rangeWord'),
      end: longDate(locale, doc.endDate),
      status: statuses[doc.projectStatus],
      region: resolved(doc.region, `${what} region`).name,
      tags: required(doc.tags, `${what} tags`).map((tag) => tagLabel(tag, `${what} tag`)),
      body: articleHtml(doc.bodyHtml, `${what} body`),
      linkGroups: linkGroups(doc.linkGroups, `${what} link groups`),
      contact: required(
        person(
          locale,
          doc.contact,
          doc.contact.role === undefined ? null : doc.contact.role,
          `${what} contact`,
        ),
        `${what} contact photo`,
      ),
      partners: required(doc.partners, `${what} partners`).map((partner) =>
        sidebarPartner(partner, `${what} partner`),
      ),
      funders: required(doc.funders, `${what} funders`).map((funder) =>
        sidebarPartner(funder, `${what} funder`),
      ),
      testimonialHeading: page.testimonials.heading,
      testimonial:
        doc.testimonial === null || doc.testimonial === undefined
          ? []
          : [testimonial(doc.testimonial, `${what} testimonial`)],
      related: required(doc.related, `${what} related projects`).flatMap((related) => {
        const slug = slugs.get(typeof related === 'number' ? related : related.id)
        return slug === undefined ? [] : [slug]
      }),
      cta: ctaContent(doc.cta, `${what} call to action`),
      serviceCta: serviceCta(doc.ctaService, `${what} service`),
    },
  }
}

const loadDocs = (locale: Locale) => findAll('projects', locale, { depth: 2, sort: 'createdAt' })

const fromDocs = (locale: Locale, docs: ProjectDoc[], page: StoriesPage): Project[] => {
  const slugs = new Map(docs.map((doc) => [doc.id, doc.slug]))
  return docs.map((doc) => project(locale, doc, page, slugs))
}

export const loadProjects = async (locale: Locale): Promise<Project[]> => {
  const [docs, page] = await Promise.all([
    loadDocs(locale),
    findGlobal('success-stories-page', locale, 0),
  ])
  return fromDocs(locale, docs, page)
}

export const projectBySlug = (projects: Project[], slug: string): Project => {
  const found = projects.find((item) => item.slug === slug)
  if (!found) throw new Error(`Unknown project: ${slug}`)
  return found
}

export const loadSuccessStories = async (locale: Locale) => {
  const [docs, page] = await Promise.all([
    loadDocs(locale),
    findGlobal('success-stories-page', locale, 2),
  ])
  return {
    meta: { title: page.meta.title, description: page.meta.description },
    hero: {
      title: page.hero.title,
      links: [{ label: page.hero.linkLabel, href: `#${listingId}` }],
      image: {
        desktop: image(page.hero.image, 'success stories hero image'),
        mobile: image(page.hero.imageMobile, 'success stories mobile hero image'),
      },
    },
    listing: {
      id: listingId,
      title: page.listing.title,
      description: page.listing.description,
      tabs: [
        {
          label: page.listing.tabs.completed,
          href: `?status=completed#${listingId}`,
          active: true,
        },
        {
          label: page.listing.tabs.inProgress,
          href: `?status=in-progress#${listingId}`,
          active: false,
        },
      ],
      pageSize: { desktop: 12, mobile: 6 } satisfies PageSize,
      items: fromDocs(locale, docs, page),
    },
    testimonials: {
      heading: page.testimonials.heading,
      subline: page.testimonials.subline,
      items: page.testimonials.items.map((item) =>
        testimonial(item, 'success stories testimonial'),
      ),
    },
  }
}
