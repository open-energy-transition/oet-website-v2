import type { Payload } from 'payload'

import { importMedia } from './media'
import { urlOf, type LegacyTeamMember } from './source'
import { quiet } from './quiet'

export const regionNames = [
  'Africa',
  'Asia',
  'Australia/Oceania',
  'Europe',
  'North America',
  'Global',
] as const

export type RegionName = (typeof regionNames)[number]

export const slugOf = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const ensureRegions = async (payload: Payload) => {
  const ids = new Map<RegionName, number>()
  for (const name of regionNames) {
    const found = await payload.find({
      collection: 'regions',
      where: { name: { equals: name } },
      limit: 1,
      depth: 0,
    })
    const doc = found.docs[0]
    ids.set(
      name,
      doc
        ? doc.id
        : (
            await payload.create({
              context: quiet(),
              collection: 'regions',
              data: { name, slug: slugOf(name) },
              depth: 0,
            })
          ).id,
    )
  }
  return (name: RegionName) => {
    const id = ids.get(name)
    if (id === undefined) throw new Error(`Region ${name} was not created`)
    return id
  }
}

export const regionFor = <Key extends string>(
  table: Record<Key, RegionName>,
  slug: string,
): RegionName | null => {
  const key = (Object.keys(table) as Key[]).find((prefix) => slug.toLowerCase().startsWith(prefix))
  return key === undefined ? null : table[key]
}

const normalise = (name: string) =>
  name
    .replace(/^(Asst\. Prof\. |Prof\. |Dr\. )+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

export const fullName = (member: LegacyTeamMember) =>
  `${member.firstName} ${member.lastName}`.replace(/\s+/g, ' ').trim()

export const loadTeam = async (payload: Payload) => {
  const result = await payload.find({ collection: 'team-members', limit: 1000, depth: 0 })
  const byName = new Map(
    result.docs.map((doc) => [
      normalise(doc.name),
      { id: doc.id, hasPhoto: doc.photo !== null && doc.photo !== undefined },
    ]),
  )
  return (name: string) => byName.get(normalise(name))
}

export type TeamLookup = Awaited<ReturnType<typeof loadTeam>>

export const personFrom = async (
  payload: Payload,
  team: TeamLookup,
  member: LegacyTeamMember,
  needsPhoto: boolean,
) => {
  const name = fullName(member)
  const known = team(name)
  if (known !== undefined && (known.hasPhoto || !needsPhoto))
    return { person: { kind: 'team-member' as const, member: known.id }, missing: [] }
  const missing: string[] = []
  if (needsPhoto && !member.image) missing.push(`photo of ${name}`)
  return {
    person: {
      kind: 'external' as const,
      name,
      title: member.jobTitle,
      photo: member.image ? await importMedia(payload, member.image, name) : null,
      socialLinks: [
        { kind: 'linkedin' as const, href: urlOf(member.linkedIn) },
        { kind: 'github' as const, href: urlOf(member.github) },
      ].flatMap((link) => (link.href === null ? [] : [{ kind: link.kind, href: link.href }])),
    },
    missing,
  }
}

export const referenceCta = async (payload: Payload, collection: 'projects' | 'publications') => {
  const result = await payload.find({
    collection,
    where: { _status: { equals: 'published' } },
    sort: 'createdAt',
    limit: 1,
    depth: 0,
  })
  const doc = result.docs[0]
  if (!doc) throw new Error(`No published ${collection} document to copy the call to action from`)
  const actions = doc.cta.actions
  if (!actions) throw new Error(`${collection} ${doc.id} has no call to action buttons`)
  const ctaService = doc.ctaService
  if (typeof ctaService !== 'number') throw new Error(`${collection} ${doc.id} has no service card`)
  return {
    cta: {
      heading: doc.cta.heading,
      primary: doc.cta.primary,
      secondary: doc.cta.secondary,
      actions: actions.map(({ label, href, emphasis }) => ({ label, href, emphasis })),
    },
    ctaService,
  }
}
