import type { Payload } from 'payload'

import type { Publication } from '../payload-types'
import {
  personFrom,
  referenceCta,
  regionFor,
  slugOf,
  type RegionName,
  type TeamLookup,
} from './context'
import { cleanNodes, editorState } from './lexical'
import { groupsOf, plainLink, prefixedLink, type LinkGroup } from './links'
import { importMedia, mediaUrl } from './media'
import { record } from './report'
import {
  plain,
  readableIds,
  richTextPlain,
  type LegacyMedia,
  type LegacyPost,
  type LexicalNode,
} from './source'
import { quiet } from './quiet'

const regions: Record<string, RegionName> = {
  'costs-and-benefits-of-transmission': 'North America',
  'pypsa-asean': 'Asia',
  'your-energy-models-are-critical': 'Europe',
  'integrated-system-planning': 'Global',
  'ai-coding-agents': 'Global',
  'the-state-of-solvers': 'Global',
  'case-study': 'Europe',
  'techno-economic-impacts': 'Global',
  'balancing-hydrogen-delivery': 'Global',
  'pypsa-earth-sector-coupled': 'Global',
  'ukraine-against-darkness': 'Europe',
  'protecting-europes-digital-sovereignty': 'Europe',
  'cascading-failures': 'Global',
  'remind-pypsa-eur': 'Europe',
  'modernising-kazakhstans': 'Asia',
  'flattening-the-peak': 'Europe',
  'free-the-models': 'Global',
  'the-impact-of-temporal-hydrogen': 'Global',
  'the-role-of-energy-storage-in-germany': 'Europe',
}

const types = {
  'academic-publications': { type: 'academic', category: 'Academic Publications' },
  blogs: { type: 'blogs', category: 'Blog' },
  reports: { type: 'reports', category: 'Reports' },
  'policy-briefs': { type: 'policy-briefs', category: 'Policy Briefs' },
} as const

type CategorySlug = keyof typeof types

const precedence: CategorySlug[] = ['academic-publications', 'reports', 'policy-briefs', 'blogs']

const excerptLength = 220

const normaliseTitle = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const clip = (text: string) => {
  if (text.length <= excerptLength) return text
  const cut = text.slice(0, excerptLength)
  const sentence = cut.lastIndexOf('. ')
  if (sentence > excerptLength / 2) return cut.slice(0, sentence + 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

const doiPattern = /^(https?:\/\/(dx\.)?doi\.org\/)?(10\.\d{4,9}\/\S+)$/i

const typeOf = (source: LegacyPost) => {
  const slugs = source.categories.map((category) => category.slug)
  const known = precedence.filter((slug) => slugs.includes(slug))
  if (known.length === 0)
    throw new Error(`${source.slug} has categories ${slugs.join(', ')}; none is known`)
  return { ...types[known[0]], also: known.slice(1) }
}

const categoryId = async (payload: Payload, name: string) => {
  const found = await payload.find({
    collection: 'publication-categories',
    where: { name: { equals: name } },
    limit: 1,
    depth: 0,
  })
  const doc = found.docs[0]
  if (doc) return doc.id
  return (
    await payload.create({
      context: quiet(),
      collection: 'publication-categories',
      data: { name, slug: slugOf(name) },
      depth: 0,
    })
  ).id
}

type BodySection = NonNullable<Publication['body']>[number]

const bodyOf = async (payload: Payload, source: LegacyPost, title: string) => {
  const sections: BodySection[] = []
  let text: LexicalNode[] = []
  const flush = () => {
    const nodes = cleanNodes(text)
    if (nodes.length > 0) sections.push({ blockType: 'richText', content: editorState(nodes) })
    text = []
  }
  for (const node of source.content.root.children ?? []) {
    if (node.type !== 'upload') {
      text.push(node)
      continue
    }
    flush()
    const value = node.value as LegacyMedia
    sections.push({
      blockType: 'image',
      image: await importMedia(payload, value, value.alt === null ? title : value.alt),
    })
  }
  flush()
  return sections
}

const linkGroupsOf = async (payload: Payload, source: LegacyPost, journal: string) => {
  const resources = await Promise.all(
    source.resources.map(async (resource) => {
      if (resource.file)
        return plainLink(
          resource.label,
          await mediaUrl(payload, await importMedia(payload, resource.file, resource.label)),
        )
      if (resource.externalLink) return plainLink(resource.label, resource.externalLink)
      throw new Error(`Resource "${resource.label}" of ${source.slug} has no file or link`)
    }),
  )
  const doi = source.doi?.trim()
  const doiMatch = doi ? doiPattern.exec(doi) : null
  const publicationLinks = doi
    ? [
        doiMatch
          ? prefixedLink('DOI: ', doiMatch[3], `https://doi.org/${doiMatch[3]}`)
          : plainLink(journal === '' ? 'Original publication' : journal, doi),
      ]
    : []
  const groups: LinkGroup[] = [
    { title: 'Resources', links: resources },
    { title: doiMatch ? 'Journal & DOI' : 'Links', links: publicationLinks },
  ]
  return groupsOf(groups)
}

export type PublicationIds = Map<number, number>

export const migratePublications = async (
  payload: Payload,
  legacy: LegacyPost[],
  team: TeamLookup,
  region: (name: RegionName) => number,
): Promise<PublicationIds> => {
  const reference = await referenceCta(payload, 'publications')
  const current = await payload.find({
    collection: 'publications',
    limit: 1000,
    depth: 0,
    draft: true,
  })
  const ids: PublicationIds = new Map()

  for (const source of legacy) {
    const title = source.title.trim()
    payload.logger.info(`Publication ${source.slug}`)
    const key = normaliseTitle(title)
    const existing = current.docs.find((doc) => {
      const known = normaliseTitle(doc.title)
      return key.startsWith(known) || known.startsWith(key)
    })
    const { type, category, also } = typeOf(source)
    const missing: string[] = []
    const notes: string[] = [type]
    if (also.length > 0) notes.push(`also in ${also.join(', ')} on the old site`)

    const firstParagraph = (source.content.root.children ?? [])
      .filter((node) => node.type === 'paragraph')
      .map((node) => plain(node).replace(/\s+/g, ' ').trim())
      .find((text) => text !== '')
    if (!firstParagraph) missing.push('excerpt and highlight')

    const regionName = regionFor(regions, source.slug)
    if (regionName === null) missing.push('region')
    else notes.push(`region ${regionName}`)

    const people = [
      ...(
        await Promise.all(
          source.teamMemberAuthors.map((member) => personFrom(payload, team, member, false)),
        )
      ).map(({ person }) => person),
      ...source.customAuthors.map((author) => ({
        kind: 'external' as const,
        name: author.fullName.trim(),
        title: author.title,
      })),
    ]
    if (people.length === 0) missing.push('authors')
    const authorNames = [
      ...source.teamMemberAuthors.map((member) =>
        `${member.firstName} ${member.lastName}`.replace(/\s+/g, ' ').trim(),
      ),
      ...source.customAuthors.map((author) => author.fullName.trim()),
    ]

    const date = source.publishedAt
    const shownDate = source.pDate?.trim()
    if (shownDate) notes.push(`old site showed the date as "${shownDate}"; publishing date used`)
    const journal = source.journal ? richTextPlain(source.journal) : ''
    const doi = source.doi?.trim()
    const citation = [
      `${authorNames.join(', ')} (${new Date(date).getUTCFullYear()}). ${title}.`,
      journal,
      doi ? `DOI: ${doi}` : '',
    ]
      .filter((part) => part !== '')
      .join(' ')
    notes.push('citation composed from authors, year, title, journal and DOI')

    const body = await bodyOf(payload, source, title)
    if (body.length === 0) missing.push('article text')

    const content: Partial<Publication> = {
      title,
      type,
      category: await categoryId(payload, category),
      date,
      preprint: false,
      authors: people,
      body,
      linkGroups: await linkGroupsOf(payload, source, journal),
      citation,
    }
    if (firstParagraph) {
      content.excerpt = clip(firstParagraph)
      content.highlight = firstParagraph
    }
    if (regionName) content.region = region(regionName)

    if (!existing && !source.heroImage) missing.push('picture')
    const publish = missing.length === 0
    const status = publish ? 'published' : 'draft'
    if (!publish) notes.unshift(`missing: ${missing.join(', ')}`)

    if (existing) {
      await payload.update({
        context: quiet(),
        collection: 'publications',
        id: existing.id,
        data: { ...content, _status: status },
        draft: !publish,
        depth: 0,
      })
      ids.set(source.id, existing.id)
      record({ area: 'Publications', title, action: 'updated', status, notes })
      continue
    }

    const picture = source.heroImage
      ? await importMedia(
          payload,
          source.heroImage,
          source.heroImage.alt === null ? title : source.heroImage.alt,
        )
      : null
    notes.push(
      'picture from the old site used as thumbnail and hero; replace with a Thumbnail Maker export',
    )
    const created = await payload.create({
      context: quiet(),
      collection: 'publications',
      data: {
        ...content,
        slug: slugOf(source.slug),
        thumbnail: picture,
        hero: picture,
        frame: 'brand-500',
        showInOutputs: false,
        tags: [],
        services: [],
        tools: [],
        ...reference,
        _status: status,
      } as never,
      draft: !publish,
      depth: 0,
    })
    ids.set(source.id, created.id)
    record({ area: 'Publications', title, action: 'created', status, notes })
  }
  return ids
}

export const linkRelatedPublications = async (
  payload: Payload,
  legacy: LegacyPost[],
  ids: PublicationIds,
) => {
  for (const source of legacy) {
    const references = readableIds(source.relatedPosts)
    if (references.length === 0) continue
    const id = ids.get(source.id)
    if (id === undefined) throw new Error(`Publication ${source.slug} was not migrated`)
    const related = references.map((reference) => {
      const target = ids.get(reference)
      if (target === undefined) throw new Error(`Related publication ${reference} was not migrated`)
      return target
    })
    const doc = await payload.findByID({ collection: 'publications', id, depth: 0, draft: true })
    await payload.update({
      context: quiet(),
      collection: 'publications',
      id,
      data: { related },
      draft: doc._status !== 'published',
      depth: 0,
    })
  }
}
