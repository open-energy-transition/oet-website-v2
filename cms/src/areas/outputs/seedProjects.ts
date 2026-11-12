import type { Payload } from 'payload'

import { content, findId, lexical, rows, upload, upsert, type Asset } from '../../seed/lib'
import {
  ctaOf,
  dayOf,
  externalPerson,
  idsBySlug,
  linkGroupsOf,
  routePrefixes,
  slugFromHref,
  slugOf,
  tagNameOf,
  teamMemberWithPhoto,
  unique,
  type CtaSource,
  type FrameTone,
  type LinkGroupSource,
  type LinkSource,
  type MetaSource,
  type PersonSource,
  type TestimonialSource,
} from './seedSource'

interface ProjectSource {
  slug: string
  title: string
  excerpt: string
  thumbnail: Asset
  hero: Asset
  alt: string
  frame: FrameTone
  partnerTag: { name: string } | null
  partnerLink: LinkSource | null
  detail: {
    highlights: string[]
    tools: string[]
    start: string
    end: string
    status: string
    region: string
    tags: string[]
    body: string
    linkGroups: LinkGroupSource[]
    contact: PersonSource
    testimonial: TestimonialSource[]
    related: string[]
    cta: CtaSource
    service: string
  }
}

interface ProjectsContent {
  projects: ProjectSource[]
  successStories: {
    meta: MetaSource
    hero: { title: string; links: LinkSource[] }
    listing: { title: string; description: string; tabs: { label: string }[] }
  }
}

interface CardSource {
  href: string
}

interface HomeContent {
  projects: { items: (CardSource & { titleLines: 2 | 3 })[] }
}

interface DepartmentsContent {
  departments: { detail: { slug: string; projects: CardSource[] } | null }[]
}

interface ServicesContent {
  services: { slug: string; related: CardSource[] }[]
}

interface OutputsContent {
  testimonials: { heading: string; subline: string; items: TestimonialSource[] }
}

const heroDesktop: Asset = { __asset: 'heroes/success-stories-desktop.webp' }

const heroMobile: Asset = { __asset: 'heroes/success-stories-mobile.webp' }

const partnerNames: Record<string, string> = { Stanford: 'Stanford University' }

const partnerNameOf = (tagName: string) =>
  tagName in partnerNames ? partnerNames[tagName] : tagName

const groupedBySlug = (
  owners: { slug: string; cards: CardSource[] }[],
  prefix: string,
): Map<string, string[]> => {
  const grouped = new Map<string, string[]>()
  for (const owner of owners)
    for (const project of unique(owner.cards.map((card) => slugFromHref(card.href, prefix)))) {
      const listed = grouped.get(project)
      if (listed) listed.push(owner.slug)
      else grouped.set(project, [owner.slug])
    }
  return grouped
}

const listedFor = (grouped: Map<string, string[]>, slug: string) => {
  const listed = grouped.get(slug)
  return listed === undefined ? [] : listed
}

const logoPartners = async (payload: Payload, partner: number | null) => {
  if (partner === null) return []
  const found = await payload.find({
    collection: 'partners',
    where: { and: [{ id: { equals: partner } }, { logo: { exists: true } }] },
    limit: 1,
    depth: 0,
  })
  return found.docs.map((document) => document.id)
}

const contactOf = async (payload: Payload, person: PersonSource) => {
  const member = await teamMemberWithPhoto(payload, person.name)
  return member === null
    ? { role: person.role, ...(await externalPerson(payload, person)) }
    : { role: person.role, kind: 'team-member' as const, member }
}

export const seedProjects = async (payload: Payload) => {
  const { projects, successStories } = await content<ProjectsContent>('projects')
  const home = await content<HomeContent>('home')
  const { departments } = await content<DepartmentsContent>('departments')
  const { services } = await content<ServicesContent>('services')
  const { testimonials } = await content<OutputsContent>('outputs')
  const prefix = (await routePrefixes()).project

  const [completedTab, inProgressTab, ...otherTabs] = successStories.listing.tabs
  if (completedTab === undefined || inProgressTab === undefined || otherTabs.length > 0)
    throw new Error('The success stories listing must have exactly two status tabs')
  const statuses = new Map([
    [completedTab.label, 'completed' as const],
    [inProgressTab.label, 'in-progress' as const],
  ])

  const homeCards = new Map(
    home.projects.items.map((card, index) => [
      slugFromHref(card.href, prefix),
      { order: index + 1, titleLines: card.titleLines === 3 ? ('3' as const) : ('2' as const) },
    ]),
  )
  const departmentsOf = groupedBySlug(
    departments.flatMap(({ detail }) =>
      detail === null ? [] : [{ slug: detail.slug, cards: detail.projects }],
    ),
    prefix,
  )
  const servicesOf = groupedBySlug(
    services.map((service) => ({ slug: service.slug, cards: service.related })),
    prefix,
  )

  for (const project of projects) {
    const { detail } = project
    const status = statuses.get(detail.status)
    if (status === undefined) throw new Error(`Unknown project status: ${detail.status}`)
    const [testimonial, ...otherTestimonials] = detail.testimonial
    if (otherTestimonials.length > 0)
      throw new Error(`${project.slug} has more than one testimonial`)
    const partnerTag =
      project.partnerTag === null
        ? null
        : await findId(payload, 'partners', {
            name: { equals: partnerNameOf(project.partnerTag.name) },
          })
    const tools: number[] = []
    for (const name of detail.tools)
      tools.push(await findId(payload, 'tools', { name: { equals: name } }))
    const homeCard = homeCards.get(project.slug)

    await upsert(
      payload,
      'projects',
      { slug: { equals: project.slug } },
      {
        title: project.title,
        slug: project.slug,
        projectStatus: status,
        excerpt: project.excerpt,
        startDate: dayOf(detail.start),
        endDate: dayOf(detail.end),
        highlights: rows(detail.highlights),
        thumbnail: await upload(payload, project.thumbnail, project.alt),
        frame: project.frame,
        partnerTag,
        partnerLink:
          project.partnerLink === null
            ? { label: null, href: null }
            : { label: project.partnerLink.label, href: project.partnerLink.href },
        region: await findId(payload, 'regions', { slug: { equals: slugOf(detail.region) } }),
        tags: await idsBySlug(
          payload,
          'tags',
          detail.tags.map((tag) => slugOf(tagNameOf(tag))),
        ),
        tools,
        services: await idsBySlug(payload, 'services', listedFor(servicesOf, project.slug)),
        departments: await idsBySlug(
          payload,
          'departments',
          listedFor(departmentsOf, project.slug),
        ),
        hero: await upload(payload, project.hero, project.alt),
        body: await lexical(payload, detail.body),
        linkGroups: linkGroupsOf(detail.linkGroups),
        testimonial:
          testimonial === undefined
            ? null
            : await findId(payload, 'testimonials', { name: { equals: testimonial.name } }),
        contact: await contactOf(payload, detail.contact),
        partners: await logoPartners(payload, partnerTag),
        cta: ctaOf(detail.cta),
        ctaService: await findId(payload, 'services', { slug: { equals: detail.service } }),
        home:
          homeCard === undefined
            ? { showOnHome: false, order: null, titleLines: null }
            : { showOnHome: true, order: homeCard.order, titleLines: homeCard.titleLines },
        _status: 'published',
      },
    )
  }

  for (const project of projects) {
    const related = unique(project.detail.related).filter((slug) => slug !== project.slug)
    await payload.update({
      collection: 'projects',
      id: await findId(payload, 'projects', { slug: { equals: project.slug } }),
      data: { related: await idsBySlug(payload, 'projects', related) },
      depth: 0,
    })
  }

  const [chip, ...otherChips] = successStories.hero.links
  if (chip === undefined || otherChips.length > 0)
    throw new Error('The success stories hero must have exactly one chip')
  const slides: number[] = []
  for (const name of unique(testimonials.items.map((item) => item.name)))
    slides.push(await findId(payload, 'testimonials', { name: { equals: name } }))

  await payload.updateGlobal({
    slug: 'success-stories-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: successStories.hero.title,
        linkLabel: chip.label,
        image: await upload(payload, heroDesktop, ''),
        imageMobile: await upload(payload, heroMobile, ''),
      },
      listing: {
        title: successStories.listing.title,
        description: successStories.listing.description,
        tabs: { completed: completedTab.label, inProgress: inProgressTab.label },
      },
      testimonials: {
        heading: testimonials.heading,
        subline: testimonials.subline,
        items: slides,
      },
      meta: successStories.meta,
    },
  })
}
