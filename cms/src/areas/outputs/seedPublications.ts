import type { Payload } from 'payload'

import { content, findId, lexical, upload, upsert, type Asset, type IconRef } from '../../seed/lib'
import {
  ctaOf,
  dayOf,
  iconName,
  idsBySlug,
  linkGroupsOf,
  slugOf,
  tagNameOf,
  teamMemberWithPhoto,
  unique,
  type CtaSource,
  type FrameTone,
  type LinkGroupSource,
  type LinkSource,
  type MetaSource,
} from './seedSource'

type PublicationType = 'academic' | 'blogs' | 'policy-briefs' | 'reports'

type BlockSource =
  | { kind: 'richText'; html: string }
  | { kind: 'stats'; title: string; stats: { value: string; label: string; icon: IconRef }[] }
  | { kind: 'image'; image: Asset; alt: string }

interface PublicationSource {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  type: PublicationType
  thumbnail: Asset
  alt: string
  frame: FrameTone
  detail: {
    highlight: string
    authorNames: string[]
    date: string
    region: string
    tags: string[]
    hero: Asset
    heroAlt: string
    body: BlockSource[]
    linkGroups: LinkGroupSource[]
    citation: string
    related: string[]
    cta: CtaSource
    service: string
  }
}

interface PublicationsContent {
  publications: PublicationSource[]
  publicationsPage: {
    meta: MetaSource
    hero: { title: string; links: LinkSource[] }
    listing: { title: string; typeTabs: { type: PublicationType; label: string }[] }
    outputs: { title: string; description: string; items: string[] }
  }
}

const preprint = 'Preprint'

const heroDesktop: Asset = { __asset: 'heroes/publications-desktop.webp' }

const heroMobile: Asset = { __asset: 'heroes/publications-mobile.webp' }

const typeOrder: PublicationType[] = ['academic', 'blogs', 'policy-briefs', 'reports']

const blockOf = async (payload: Payload, block: BlockSource) => {
  if (block.kind === 'richText')
    return { blockType: 'richText' as const, content: await lexical(payload, block.html) }
  if (block.kind === 'stats')
    return {
      blockType: 'stats' as const,
      title: block.title,
      items: block.stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
        icon: iconName(stat.icon),
      })),
    }
  return { blockType: 'image' as const, image: await upload(payload, block.image, block.alt) }
}

const authorOf = async (payload: Payload, name: string) => {
  const member = await teamMemberWithPhoto(payload, name)
  return member === null
    ? { kind: 'external' as const, name }
    : { kind: 'team-member' as const, member }
}

const labelsByType = (labels: string[], what: string) => {
  const [academic, blogs, policyBriefs, reports, ...others] = labels
  if (
    academic === undefined ||
    blogs === undefined ||
    policyBriefs === undefined ||
    reports === undefined ||
    others.length > 0
  )
    throw new Error(`The publications ${what} must have one label per publication type`)
  return { academic, blogs, policyBriefs, reports }
}

export const seedPublications = async (payload: Payload) => {
  const { publications, publicationsPage } = await content<PublicationsContent>('publications')
  const inOutputs = new Set(publicationsPage.outputs.items)

  for (const publication of publications) {
    const { detail } = publication
    const isPreprint = publication.date === preprint
    const body = []
    for (const block of detail.body) body.push(await blockOf(payload, block))
    const authors = []
    for (const name of detail.authorNames) authors.push(await authorOf(payload, name))

    await upsert(
      payload,
      'publications',
      { slug: { equals: publication.slug } },
      {
        title: publication.title,
        slug: publication.slug,
        type: publication.type,
        excerpt: publication.excerpt,
        category: await findId(payload, 'publication-categories', {
          slug: { equals: slugOf(publication.category) },
        }),
        date: dayOf(isPreprint ? detail.date : publication.date),
        preprint: isPreprint,
        highlight: detail.highlight,
        thumbnail: await upload(payload, publication.thumbnail, publication.alt),
        frame: publication.frame,
        showInOutputs: inOutputs.has(publication.slug),
        region: await findId(payload, 'regions', { slug: { equals: slugOf(detail.region) } }),
        tags: await idsBySlug(
          payload,
          'tags',
          detail.tags.map((tag) => slugOf(tagNameOf(tag))),
        ),
        authors,
        hero: await upload(payload, detail.hero, detail.heroAlt),
        body,
        linkGroups: linkGroupsOf(detail.linkGroups),
        citation: detail.citation,
        cta: ctaOf(detail.cta),
        ctaService: await findId(payload, 'services', { slug: { equals: detail.service } }),
        _status: 'published',
      },
    )
  }

  for (const publication of publications) {
    const related = unique(publication.detail.related).filter((slug) => slug !== publication.slug)
    await payload.update({
      collection: 'publications',
      id: await findId(payload, 'publications', { slug: { equals: publication.slug } }),
      data: { related: await idsBySlug(payload, 'publications', related) },
      depth: 0,
    })
  }

  const { hero, listing, outputs, meta } = publicationsPage
  listing.typeTabs.forEach((tab, index) => {
    if (tab.type !== typeOrder[index])
      throw new Error(
        `Publication type tab ${index + 1} is ${tab.type}, expected ${typeOrder[index]}`,
      )
  })

  await payload.updateGlobal({
    slug: 'publications-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: hero.title,
        chips: labelsByType(
          hero.links.map((link) => link.label),
          'hero chips',
        ),
        image: await upload(payload, heroDesktop, ''),
        imageMobile: await upload(payload, heroMobile, ''),
      },
      listing: {
        title: listing.title,
        tabs: labelsByType(
          listing.typeTabs.map((tab) => tab.label),
          'type tabs',
        ),
      },
      outputs: { title: outputs.title, description: outputs.description },
      meta,
    },
  })
}
