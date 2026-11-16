import type { Locale } from '../i18n/config'
import type { Config } from './payload-types'
import { inPreview, previewApiKey, previewTarget } from './preview'

type Collections = Config['collections']
type Globals = Config['globals']

export type CollectionSlug = keyof Collections
export type GlobalSlug = keyof Globals
export type Doc<Slug extends CollectionSlug> = Collections[Slug]
export type GlobalDoc<Slug extends GlobalSlug> = Globals[Slug]

export interface Query {
  depth: number
  sort?: string
  where?: Record<string, string>
}

const base = import.meta.env.PAYLOAD_URL

const cache = new Map<string, Promise<unknown>>()

const load = async (url: URL, headers: Record<string, string>): Promise<unknown> => {
  const response = await fetch(url, { headers })
  if (!response.ok)
    throw new Error(`CMS answered ${response.status} for ${url.pathname}${url.search}`)
  return response.json()
}

const request = <Result>(
  path: string,
  params: Record<string, string>,
  draft: boolean,
): Promise<Result> => {
  if (!base) throw new Error('PAYLOAD_URL is not set')
  const url = new URL(`/api/${path}`, base)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)
  if (draft) {
    url.searchParams.set('draft', 'true')
    return load(url, { Authorization: `users API-Key ${previewApiKey()}` }) as Promise<Result>
  }
  if (!import.meta.env.PROD || inPreview()) return load(url, {}) as Promise<Result>
  const cached = cache.get(url.href)
  if (cached) return cached as Promise<Result>
  const pending = load(url, {})
  cache.set(url.href, pending)
  return pending as Promise<Result>
}

const hasSlug = (doc: object, slug: string): boolean => 'slug' in doc && doc.slug === slug

const withDraft = async <Slug extends CollectionSlug>(
  collection: Slug,
  params: Record<string, string>,
  slug: string,
): Promise<Doc<Slug>[]> => {
  const [published, drafts] = await Promise.all([
    request<{ docs: Doc<Slug>[] }>(collection, params, false),
    request<{ docs: Doc<Slug>[] }>(collection, { ...params, 'where[slug][equals]': slug }, true),
  ])
  const [draft] = drafts.docs
  if (draft === undefined) return published.docs
  if (!published.docs.some((doc) => hasSlug(doc, slug))) return [...published.docs, draft]
  return published.docs.map((doc) => (hasSlug(doc, slug) ? draft : doc))
}

export const findAll = async <Slug extends CollectionSlug>(
  collection: Slug,
  locale: Locale,
  query: Query,
): Promise<Doc<Slug>[]> => {
  const params: Record<string, string> = {
    locale,
    depth: String(query.depth),
    limit: '0',
    ...query.where,
  }
  if (query.sort) params.sort = query.sort
  if (inPreview()) {
    const target = previewTarget()
    if (target.kind === 'document' && target.collection === collection)
      return withDraft(collection, params, target.slug)
  }
  const result = await request<{ docs: Doc<Slug>[] }>(collection, params, false)
  return result.docs
}

export const findGlobal = <Slug extends GlobalSlug>(
  slug: Slug,
  locale: Locale,
  depth: number,
): Promise<GlobalDoc<Slug>> =>
  request<GlobalDoc<Slug>>(
    `globals/${slug}`,
    { locale, depth: String(depth) },
    inPreview() && previewTarget().kind === 'globals',
  )

export const resolved = <Value extends object>(
  value: number | Value | null | undefined,
  what: string,
): Value => {
  if (value === null || value === undefined) throw new Error(`${what} is missing`)
  if (typeof value === 'number')
    throw new Error(`${what} is not populated; request it with a higher depth`)
  return value
}

export const required = <Value>(value: Value | null | undefined, what: string): Value => {
  if (value === null || value === undefined) throw new Error(`${what} is missing`)
  return value
}

export const texts = (rows: { text: string }[] | null | undefined, what: string): string[] =>
  required(rows, what).map((row) => row.text)

const richTextWrapper = /^<div class="payload-richtext">([\s\S]*)<\/div>$/

export const richHtml = (value: string | null | undefined, what: string): string => {
  const match = richTextWrapper.exec(required(value, what))
  if (!match) throw new Error(`${what} is not Payload rich text HTML`)
  return match[1]
}
