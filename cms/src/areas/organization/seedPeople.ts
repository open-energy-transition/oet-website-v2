import type { Payload } from 'payload'

import type { Department, TeamMember } from '../../payload-types'
import { content, lexical, upload, upsert, type Asset, type IconRef } from '../../seed/lib'
import { departmentKey, iconName, responsive, type ResponsiveAsset } from './seedSource'

type Detail = NonNullable<Department['detail']>

interface BoxSource {
  x: number
  y: number
  width: number
  height: number
}

interface MemberSource {
  name: string
  lastName: string
  role: string
  portrait: { image: Asset; desktop: BoxSource; mobile: BoxSource; rotate: number }
  glow: TeamMember['glow']
  links: { kind: 'email' | 'github' | 'linkedin' | 'message'; href: string }[]
  profileLabel: string
  education: { degree: string; kind: 'doctorate' | 'degree' }[]
  biographyHtml: string | null
  tags: string[]
}

interface CountrySource {
  code: string
  name: string
  count: string
  lon: number
  lat: number
  photo: Asset
  photoAlt: string
}

export interface TeamSource {
  countries: CountrySource[]
  filterGroups: { label: string; href: string; active: boolean }[]
  members: MemberSource[]
}

interface DetailSource {
  slug: string
  cardImage: ResponsiveAsset
  hero: {
    title: string
    lead: string
    image: ResponsiveAsset
    background: Detail['hero']['background']
    ornament: Detail['hero']['ornament']
    peopleCount: string
  }
  about: string
  works: {
    intro: string
    topics: { title: string; description: string | null; icon: IconRef }[]
    outro: string | null
  }
  mobileColumn: 326 | 332
}

interface DepartmentSource {
  name: string
  lead: string
  summary: string
  accent: Department['accent']
  icon: IconRef
  head: { name: string; role: string; photo: Asset }
  detail: DetailSource | null
}

export interface DepartmentsSource {
  departments: DepartmentSource[]
}

const mobileColumns: Record<DetailSource['mobileColumn'], Detail['mobileColumn']> = {
  326: '326',
  332: '332',
}

const boxOf = ({ x, y, width, height }: BoxSource) => ({ x, y, width, height })

const teamFilters = (team: TeamSource) =>
  team.filterGroups
    .filter((group) => group.href.includes('?group='))
    .map((group) => ({ label: group.label, key: departmentKey(group.label) }))

export const seniorLeadershipLabel = (team: TeamSource, departments: DepartmentsSource) => {
  const keys = departments.departments.map((department) => departmentKey(department.name))
  const others = teamFilters(team).filter((filter) => !keys.includes(filter.key))
  if (others.length !== 1)
    throw new Error(`Expected one team filter that is not a department, found ${others.length}`)
  return others[0].label
}

const seedCountries = async (payload: Payload, team: TeamSource) => {
  for (const country of team.countries)
    await upsert(
      payload,
      'countries',
      { code: { equals: country.code } },
      {
        code: country.code,
        name: country.name,
        longitude: country.lon,
        latitude: country.lat,
        teammates: country.count,
        photo: await upload(payload, country.photo, country.photoAlt),
      },
    )
}

const seedMembers = async (
  payload: Payload,
  members: MemberSource[],
  heads: DepartmentSource['head'][],
  seniorLabel: string,
) => {
  const ids = new Map<string, number>()
  for (const [order, member] of members.entries()) {
    const head = heads.find((candidate) => candidate.name === member.name)
    const saved = await upsert(
      payload,
      'team-members',
      { name: { equals: member.name } },
      {
        name: member.name,
        lastName: member.lastName,
        role: member.role,
        photo: head ? await upload(payload, head.photo, member.name) : null,
        socialLinks: member.links.map(({ kind, href }) => ({ kind, href })),
        profileLabel: member.profileLabel,
        education: member.education.map(({ degree, kind }) => ({ degree, kind })),
        biography:
          member.biographyHtml === null ? null : await lexical(payload, member.biographyHtml),
        portrait: await upload(payload, member.portrait.image, member.name),
        portraitDesktop: boxOf(member.portrait.desktop),
        portraitMobile: boxOf(member.portrait.mobile),
        portraitRotation: member.portrait.rotate,
        portraitKind: 'cut-out',
        glow: member.glow,
        seniorLeadership: member.tags.includes(seniorLabel),
        order: order + 1,
      },
    )
    ids.set(member.name, saved.id)
  }
  return ids
}

const detailOf = async (payload: Payload, detail: DetailSource): Promise<Detail> => ({
  cardImage: await responsive(payload, detail.cardImage),
  hero: {
    title: detail.hero.title,
    lead: detail.hero.lead,
    image: await responsive(payload, detail.hero.image),
    peopleCount: detail.hero.peopleCount,
    background: detail.hero.background,
    ornament: detail.hero.ornament,
  },
  about: await lexical(payload, detail.about),
  worksIntro: await lexical(payload, detail.works.intro),
  topics: detail.works.topics.map((topic) => ({
    title: topic.title,
    description: topic.description,
    icon: iconName(topic.icon),
  })),
  worksOutro: detail.works.outro === null ? null : await lexical(payload, detail.works.outro),
  mobileColumn: mobileColumns[detail.mobileColumn],
})

const seedDepartments = async (
  payload: Payload,
  departments: DepartmentSource[],
  filters: { label: string; key: string }[],
  memberIds: Map<string, number>,
) => {
  const ids = new Map<string, number>()
  for (const [index, department] of departments.entries()) {
    const slug = departmentKey(department.name)
    if (department.detail !== null && department.detail.slug !== slug)
      throw new Error(`Department ${department.name} has the page slug ${department.detail.slug}`)
    const filterIndex = filters.findIndex((filter) => filter.key === slug)
    if (filterIndex === -1) throw new Error(`No team filter for department ${department.name}`)
    const head = memberIds.get(department.head.name)
    if (head === undefined)
      throw new Error(`Head ${department.head.name} of ${department.name} is not a team member`)
    const saved = await upsert(
      payload,
      'departments',
      { slug: { equals: slug } },
      {
        name: department.name,
        slug,
        lead: department.lead,
        summary: department.summary,
        head,
        icon: iconName(department.icon),
        accent: department.accent,
        teamLabel: filters[filterIndex].label,
        teamOrder: filterIndex + 1,
        hasDetailPage: department.detail !== null,
        order: index + 1,
        _status: 'published',
        ...(department.detail === null
          ? {}
          : { detail: await detailOf(payload, department.detail) }),
      },
    )
    ids.set(slug, saved.id)
  }
  return ids
}

const membership = (
  member: MemberSource,
  seniorLabel: string,
  departmentIds: Map<string, number>,
) =>
  member.tags
    .filter((tag) => tag !== seniorLabel)
    .map((tag) => {
      const id = departmentIds.get(departmentKey(tag))
      if (id === undefined) throw new Error(`Tag ${tag} of ${member.name} matches no department`)
      return id
    })

export const seedPeople = async (payload: Payload) => {
  const team = await content<TeamSource>('team')
  const source = await content<DepartmentsSource>('departments')
  const seniorLabel = seniorLeadershipLabel(team, source)
  const filters = teamFilters(team).filter((filter) => filter.label !== seniorLabel)
  const members = team.members.filter(
    (member, index) => team.members.findIndex((other) => other.name === member.name) === index,
  )

  await seedCountries(payload, team)
  const memberIds = await seedMembers(
    payload,
    members,
    source.departments.map((department) => department.head),
    seniorLabel,
  )
  const departmentIds = await seedDepartments(payload, source.departments, filters, memberIds)

  for (const member of members) {
    const id = memberIds.get(member.name)
    if (id === undefined) throw new Error(`Team member ${member.name} was not saved`)
    await payload.update({
      collection: 'team-members',
      id,
      data: { departments: membership(member, seniorLabel, departmentIds) },
      depth: 0,
    })
  }
}
