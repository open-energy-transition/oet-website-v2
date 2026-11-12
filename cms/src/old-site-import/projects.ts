import type { Payload } from 'payload'

import type { Project } from '../payload-types'
import { personFrom, referenceCta, regionFor, type RegionName, type TeamLookup } from './context'
import { blocksOf, cleanRichText } from './lexical'
import { groupsOf, plainLink, type LinkGroupLink } from './links'
import { importMedia } from './media'
import type { PartnerIds } from './partners'
import { record } from './report'
import { readableIds, type LegacyProject, type LegacyTeamMember } from './source'
import { quiet } from './quiet'

const regions: Record<string, RegionName> = {
  'women-in-energy': 'Africa',
  'free-support-sessions': 'Global',
  'open-monthly-update': 'Global',
  'e-fuels-in-australia': 'Australia/Oceania',
  'google-guarantee-of-origin': 'Europe',
  avanguard: 'Europe',
  'wallonia-energy-plan': 'Europe',
  'empowering-zambia': 'Africa',
  'pypsa-taskforce': 'Global',
  'european-clean-flexibility': 'Europe',
  'isie-consortium': 'Europe',
  'free-monthly-pypsa-support': 'Europe',
  'open-source-market-model': 'Europe',
  'multi-country-electricity-transition': 'Global',
  'project-tauritron': 'Global',
  'energy-system-chef-zambia': 'Africa',
  'energy-transition-kazakhstan': 'Asia',
  'sustainable-hydrogen-and-power-to-x': 'Africa',
  'flattening-the-energy': 'Europe',
  'exclusive-stanford-university': 'North America',
  'openmod-meets-usa': 'North America',
  'collaborative-energy-modeling': 'Europe',
  'instrat-ukraine': 'Europe',
  'open-energy-benchmark': 'Global',
  'exploring-the-geothermal': 'North America',
  'advancing-hydropower-integration': 'Africa',
  'grid-modelling-to-assess-electrofuels': 'North America',
  'open-tyndp': 'Europe',
  'system-benefits-of-energy-storage': 'Europe',
  'comprehensive-pypsa-training': 'Global',
  'flexibility-assessment-platform': 'Europe',
  mapyourgrid: 'Global',
}

const currentSlugs: Record<string, string> = {
  'multi-country-electricity-transition-project':
    'multi-country-electricity-transition-potential-and-challenges-project',
  'grid-modelling-to-assess-electrofuels': 'grid-modelling-to-assess-electrofuels-supply-potential',
  'exploring-the-geothermal-resource-potential':
    'exploring-the-geothermal-resource-potential-in-the-us',
  'system-benefits-of-energy-storage-in-germany': 'the-role-of-energy-storage-in-germany',
}

const maxHighlights = 4

interface OverviewItem {
  title: string
  description: string
}

interface Aim {
  title: string
  link?: string | null
}

interface ButtonBlock {
  link: { url: string | null; label: string | null }
}

const durationPattern = /^([\d.,]+)\s*(week|month|year)s?$/i

const endDateOf = (start: string, items: OverviewItem[]) => {
  for (const item of items) {
    for (const text of [item.description, item.title]) {
      const match = durationPattern.exec(text.trim())
      if (!match) continue
      const amount = Number(match[1].replace(',', '.'))
      const unit = match[2].toLowerCase()
      const end = new Date(start)
      if (unit === 'week') end.setUTCDate(end.getUTCDate() + Math.round(amount * 7))
      if (unit === 'month') end.setUTCMonth(end.getUTCMonth() + Math.round(amount))
      if (unit === 'year') end.setUTCMonth(end.getUTCMonth() + Math.round(amount * 12))
      return { end: end.toISOString(), text }
    }
  }
  return null
}

const slugOf = (source: LegacyProject) => {
  const slug = source.slug.toLowerCase()
  return Object.hasOwn(currentSlugs, slug) ? currentSlugs[slug] : slug
}

export type ProjectIds = Map<number, number>

export const migrateProjects = async (
  payload: Payload,
  legacy: LegacyProject[],
  partners: PartnerIds,
  team: TeamLookup,
  region: (name: RegionName) => number,
): Promise<ProjectIds> => {
  const reference = await referenceCta(payload, 'projects')
  const ids: ProjectIds = new Map()

  for (const source of legacy) {
    const slug = slugOf(source)
    payload.logger.info(`Project ${slug}`)
    const found = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      draft: true,
    })
    const existing = found.docs[0]
    const missing: string[] = []
    const notes: string[] = []

    const excerpt = source.subTitle?.trim()
    if (!excerpt) missing.push('excerpt')

    const regionName = regionFor(regions, source.slug)
    if (regionName === null) missing.push('region')
    else notes.push(`region ${regionName}`)

    if (!source.date) missing.push('start date')
    const overview = blocksOf(source.content, 'contentItems').flatMap(
      (block) => block.items as OverviewItem[],
    )
    const end = source.date ? endDateOf(source.date, overview) : null
    if (end) notes.push(`end date from "${end.text}"`)
    else if (existing?.endDate)
      notes.push('end date kept from the current CMS entry; please check it')
    else missing.push('end date')

    const aims = blocksOf(source.content, 'projectAims').flatMap((block) => block.items as Aim[])
    const highlightTexts = aims.filter((aim) => !aim.link).map((aim) => aim.title.trim())
    if (highlightTexts.length === 0) missing.push('highlights')
    if (highlightTexts.length > maxHighlights)
      notes.push(`${highlightTexts.length - maxHighlights} highlights beyond four left out`)

    const links: LinkGroupLink[] = [
      ...aims.flatMap((aim) => (aim.link ? [plainLink(aim.title.trim(), aim.link)] : [])),
      ...blocksOf(source.content, 'button').flatMap((block) => {
        const { link } = block as unknown as ButtonBlock
        return link.url && link.label ? [plainLink(link.label.trim(), link.url)] : []
      }),
    ]

    const body = cleanRichText(source.content)
    if (body.root.children.length === 0) missing.push('article text')

    const firstMember = blocksOf(source.content, 'projectTeam')
      .flatMap((block) => block.teamMembers as { member: LegacyTeamMember | null }[])
      .map((row) => row.member)
      .find((member) => member !== null && typeof member.firstName === 'string')
    const contact = firstMember ? await personFrom(payload, team, firstMember, true) : null
    if (contact) missing.push(...contact.missing)
    else if (!existing?.contact?.kind) missing.push('contact person')

    const sidebarPartners = source.partners.flatMap((partner) => {
      const target = partners.get(partner.id)
      if (!target) throw new Error(`Partner ${partner.name} was not migrated`)
      return target.hasLogo ? [target.id] : []
    })

    const content: Partial<Project> = {
      title: source.title.trim(),
      projectStatus: source.projectStatus,
      highlights: highlightTexts.slice(0, maxHighlights).map((text) => ({ text })),
      body,
      linkGroups: groupsOf([{ title: 'Links', links }]),
      partners: sidebarPartners,
    }
    if (excerpt) content.excerpt = excerpt
    if (regionName) content.region = region(regionName)
    if (source.date) content.startDate = source.date
    if (end) content.endDate = end.end
    if (contact) content.contact = { role: 'Contact', ...contact.person }

    if (!existing && !source.imageUrl) missing.push('picture')

    const publish = missing.length === 0
    const status = publish ? 'published' : 'draft'
    if (!publish) notes.unshift(`missing: ${missing.join(', ')}`)

    if (existing) {
      await payload.update({
        context: quiet(),
        collection: 'projects',
        id: existing.id,
        data: { ...content, _status: status },
        draft: !publish,
        depth: 0,
      })
      ids.set(source.id, existing.id)
      record({
        area: 'Success stories',
        title: content.title as string,
        action: 'updated',
        status,
        notes,
      })
      continue
    }

    const picture = source.imageUrl
      ? await importMedia(
          payload,
          source.imageUrl,
          source.imageUrl.alt === null ? source.title.trim() : source.imageUrl.alt,
        )
      : null
    notes.push(
      'picture from the old site used as thumbnail and hero; replace with a Thumbnail Maker export',
    )
    const created = await payload.create({
      context: quiet(),
      collection: 'projects',
      data: {
        ...content,
        slug,
        thumbnail: picture,
        hero: picture,
        frame: 'brand-500',
        tags: [],
        tools: [],
        services: [],
        departments: [],
        ...reference,
        home: { showOnHome: false },
        _status: status,
      } as never,
      draft: !publish,
      depth: 0,
    })
    ids.set(source.id, created.id)
    record({
      area: 'Success stories',
      title: content.title as string,
      action: 'created',
      status,
      notes,
    })
  }
  return ids
}

export const linkRelatedProjects = async (
  payload: Payload,
  legacy: LegacyProject[],
  ids: ProjectIds,
) => {
  for (const source of legacy) {
    payload.logger.info(`Related projects of ${source.slug}`)
    const references = readableIds(source.relatedProjects)
    if (references.length === 0) continue
    const id = ids.get(source.id)
    if (id === undefined) throw new Error(`Project ${source.slug} was not migrated`)
    const related = references.map((reference) => {
      const target = ids.get(reference)
      if (target === undefined) throw new Error(`Related project ${reference} was not migrated`)
      return target
    })
    const current = await payload.findByID({ collection: 'projects', id, depth: 0, draft: true })
    await payload.update({
      context: quiet(),
      collection: 'projects',
      id,
      data: { related },
      draft: current._status !== 'published',
      depth: 0,
    })
  }
}
