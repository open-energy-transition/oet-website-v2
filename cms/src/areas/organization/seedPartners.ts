import type { Payload } from 'payload'

import type { Partner } from '../../payload-types'
import { content, upload, upsert, type Asset } from '../../seed/lib'

type Group = NonNullable<Partner['group']>

interface LogoSource {
  name: string
  image: Asset
  width: number
  height: number
}

interface LogoGroupSource {
  label: string
  logos: LogoSource[]
}

interface HomeSource {
  partnerGroups: LogoGroupSource[]
  partnerGroupsMobile: LogoGroupSource[]
}

interface PartnersSource {
  logos: LogoSource[]
}

interface TagSource {
  name: string
  logo: Asset
  width: number
  height: number
}

interface PartnerTagsSource {
  partnerTags: Record<string, TagSource>
}

interface Size {
  width: number
  height: number
}

interface Entry {
  name: string
  logo: Asset | null
  desktop: Size | null
  mobile: Size | null
  group: Group | null
  homeOrder: number | null
  order: number | null
  tag: TagSource | null
}

const sameOrganisation = [
  {
    alias: 'The International Council on Clean Transportation',
    name: 'International Council on Clean Transportation',
  },
  { alias: 'Stanford', name: 'Stanford University' },
]

const groupsInOrder: Group[] = ['trusted-partner', 'network-affiliation']

const canonical = (name: string) => {
  const match = sameOrganisation.find((entry) => entry.alias === name)
  return match ? match.name : name
}

const sizeOf = ({ width, height }: Size): Size => ({ width, height })

const collect = (home: HomeSource, partners: PartnersSource, tags: PartnerTagsSource) => {
  const entries = new Map<string, Entry>()

  const entryFor = (source: { name: string }) => {
    const name = canonical(source.name)
    const existing = entries.get(name)
    if (existing) return existing
    const created: Entry = {
      name,
      logo: null,
      desktop: null,
      mobile: null,
      group: null,
      homeOrder: null,
      order: null,
      tag: null,
    }
    entries.set(name, created)
    return created
  }

  const listed = (key: 'homeOrder' | 'order') =>
    [...entries.values()].filter((entry) => entry[key] !== null).length

  const groupOf = (label: string) => {
    const index = home.partnerGroups.findIndex((group) => group.label === label)
    if (index === -1 || index >= groupsInOrder.length)
      throw new Error(`Home partner group "${label}" has no group value`)
    return groupsInOrder[index]
  }

  const onHome = (logo: LogoSource, group: Group) => {
    const entry = entryFor(logo)
    if (entry.logo === null) entry.logo = logo.image
    if (entry.group === null) entry.group = group
    if (entry.homeOrder === null) entry.homeOrder = listed('homeOrder') + 1
    return entry
  }

  for (const group of home.partnerGroups)
    for (const logo of group.logos) {
      const known = entries.has(canonical(logo.name))
      const entry = onHome(logo, groupOf(group.label))
      if (!known) entry.desktop = sizeOf(logo)
    }

  for (const group of home.partnerGroupsMobile)
    for (const logo of group.logos) {
      const entry = onHome(logo, groupOf(group.label))
      if (entry.mobile === null) entry.mobile = sizeOf(logo)
    }

  for (const logo of partners.logos) {
    const entry = entryFor(logo)
    if (entry.logo === null) entry.logo = logo.image
    if (entry.desktop === null) entry.desktop = sizeOf(logo)
    if (entry.order === null) entry.order = listed('order') + 1
  }

  for (const tag of Object.values(tags.partnerTags)) entryFor(tag).tag = tag

  return [...entries.values()]
}

const gridFields = async (payload: Payload, entry: Entry) => {
  if (entry.homeOrder === null && entry.order === null) return { logo: null }
  if (entry.logo === null) throw new Error(`Partner ${entry.name} is listed without a logo`)
  if (entry.mobile === null) throw new Error(`Partner ${entry.name} has no mobile logo size`)
  return {
    logo: await upload(payload, entry.logo, entry.name),
    logoDesktop: entry.desktop === null ? entry.mobile : entry.desktop,
    logoMobile: entry.mobile,
  }
}

const tagFields = async (payload: Payload, entry: Entry) => {
  if (entry.tag === null) return { tagLogo: null }
  return {
    tagLogo: await upload(payload, entry.tag.logo, entry.name),
    tagSize: sizeOf(entry.tag),
  }
}

export const seedPartners = async (payload: Payload) => {
  const entries = collect(
    await content<HomeSource>('home'),
    await content<PartnersSource>('partners'),
    await content<PartnerTagsSource>('partnerTags'),
  )
  for (const entry of entries)
    await upsert(
      payload,
      'partners',
      { name: { equals: entry.name } },
      {
        name: entry.name,
        group: entry.group,
        showOnHome: entry.homeOrder !== null,
        homeOrder: entry.homeOrder,
        showOnPartnersPage: entry.order !== null,
        order: entry.order,
        ...(await gridFields(payload, entry)),
        ...(await tagFields(payload, entry)),
      },
    )
}
