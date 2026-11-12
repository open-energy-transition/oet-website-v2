export const legacyOrigin = 'https://www.openenergytransition.org'

export interface LegacyMedia {
  id: number
  alt: string | null
  url: string
  filename: string
  mimeType: string
  width: number | null
  height: number | null
}

export interface LexicalNode {
  type: string
  children?: LexicalNode[]
  [key: string]: unknown
}

export interface LegacyRichText {
  root: LexicalNode
}

export type LegacyReference = { id: number } | number

export const readableIds = (references: LegacyReference[]) =>
  references.flatMap((reference) => (typeof reference === 'number' ? [] : [reference.id]))

export interface LegacyPartner {
  id: number
  name: string
  type: 'partner' | 'funder'
  logo: LegacyMedia | null
  website: string | null
}

export interface LegacyTeamMember {
  id: number
  firstName: string
  lastName: string
  jobTitle: string | null
  image: LegacyMedia | null
  linkedIn: string | null
  github: string | null
}

export interface LegacyStaffMember extends LegacyTeamMember {
  _order: string
  categories: { name: string }[]
  education: { degree: string }[]
  description: LegacyRichText | null
  email: string | null
}

export interface LegacyProject {
  id: number
  title: string
  subTitle: string | null
  content: LegacyRichText
  projectStatus: 'completed' | 'in-progress'
  date: string | null
  imageUrl: LegacyMedia | null
  partners: LegacyPartner[]
  relatedProjects: LegacyReference[]
  slug: string
}

export interface LegacyResource {
  label: string
  resourceType: string
  file: LegacyMedia | null
  externalLink: string | null
}

export interface LegacyPost {
  id: number
  title: string
  pDate: string | null
  shortDescription: string | null
  heroImage: LegacyMedia | null
  content: LegacyRichText
  journal: LegacyRichText | null
  doi: string | null
  resources: LegacyResource[]
  relatedPosts: LegacyReference[]
  categories: { slug: string }[]
  publishedAt: string
  teamMemberAuthors: LegacyTeamMember[]
  customAuthors: { fullName: string; title: string | null }[]
  slug: string
}

export interface LegacyFooterLink {
  link: string
  name: string
}

export interface LegacyFooter {
  followUs: { linkActions: LegacyFooterLink[] }
}

const getJson = async <Shape>(path: string): Promise<Shape> => {
  const response = await fetch(`${legacyOrigin}${path}`, { signal: AbortSignal.timeout(60_000) })
  if (!response.ok) throw new Error(`Legacy site answered ${response.status} for ${path}`)
  return (await response.json()) as Shape
}

export const fetchAll = async <Doc>(collection: string): Promise<Doc[]> => {
  const body = await getJson<{ docs: Doc[]; hasNextPage: boolean }>(
    `/api/${collection}?limit=1000&depth=2`,
  )
  if (body.hasNextPage) throw new Error(`Legacy ${collection} has more than 1000 documents`)
  return body.docs
}

export const fetchFooter = () => getJson<LegacyFooter>('/api/globals/footer?depth=1')

export const fetchFile = async (url: string): Promise<Buffer> => {
  const response = await fetch(new URL(url, legacyOrigin), { signal: AbortSignal.timeout(120_000) })
  if (!response.ok) throw new Error(`Legacy site answered ${response.status} for ${url}`)
  return Buffer.from(await response.arrayBuffer())
}

export const plain = (node: LexicalNode): string => {
  if (node.type === 'linebreak') return ' '
  if (typeof node.text === 'string') return node.text
  return (node.children ?? []).map(plain).join('')
}

export const richTextPlain = (value: LegacyRichText) =>
  (value.root.children ?? [])
    .map(plain)
    .map((text) => text.replace(/\s+/g, ' ').trim())
    .filter((text) => text !== '')
    .join(' ')

export const urlOf = (value: string | null) => {
  if (value === null || value.trim() === '') return null
  const website = value.trim()
  if (/^https?:\/\//.test(website)) return website
  if (/^[\w-]+(\.[\w-]+)+$/.test(website)) return `https://${website.toLowerCase()}/`
  if (/^[\w-]+(\.[\w-]+)+\/\S*$/.test(website)) return `https://${website}`
  throw new Error(`Link "${website}" is not a URL`)
}
