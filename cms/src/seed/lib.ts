import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import type { SanitizedServerEditorConfig } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import type {
  CollectionSlug,
  DataFromCollectionSlug,
  Payload,
  RequiredDataFromCollectionSlug,
  Where,
} from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.resolve(dirname, '../../seed/content')
const assetRoot = path.resolve(dirname, '../../seed/assets')

export interface Asset {
  __asset: string
}

export interface IconRef {
  __icon: string
}

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

export const content = async <Shape>(name: string): Promise<Shape> =>
  JSON.parse(await readFile(path.join(contentDir, `${name}.json`), 'utf8')) as Shape

export const mediaName = (asset: Asset) => asset.__asset.replaceAll('/', '-')

export const upload = async (payload: Payload, asset: Asset, alt: string): Promise<number> => {
  const filename = mediaName(asset)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })
  const found = existing.docs[0]
  if (found) {
    if (alt !== '' && found.alt !== alt)
      await payload.update({ collection: 'media', id: found.id, data: { alt }, depth: 0 })
    return found.id
  }
  const extension = path.extname(filename).toLowerCase()
  const mimetype = mimeTypes[extension]
  if (!mimetype) throw new Error(`No mime type for ${filename}`)
  const data = await readFile(path.join(assetRoot, asset.__asset))
  const created = await payload.create({
    collection: 'media',
    data: alt === '' ? {} : { alt },
    file: { data, mimetype, name: filename, size: data.byteLength },
    depth: 0,
  })
  return created.id
}

export const upsert = async <Slug extends CollectionSlug>(
  payload: Payload,
  collection: Slug,
  where: Where,
  data: RequiredDataFromCollectionSlug<Slug>,
): Promise<DataFromCollectionSlug<Slug>> => {
  const existing = await payload.find({ collection, where, limit: 1, depth: 0, draft: true })
  const found = existing.docs[0]
  if (found)
    return (await payload.update({
      collection,
      id: found.id,
      data: data as never,
      depth: 0,
    })) as DataFromCollectionSlug<Slug>
  return (await payload.create({ collection, data, depth: 0 })) as DataFromCollectionSlug<Slug>
}

export const findId = async (
  payload: Payload,
  collection: CollectionSlug,
  where: Where,
): Promise<number> => {
  const result = await payload.find({ collection, where, limit: 1, depth: 0, draft: true })
  const found = result.docs[0]
  if (!found) throw new Error(`No ${collection} document matches ${JSON.stringify(where)}`)
  return found.id as number
}

let editorConfig: SanitizedServerEditorConfig | undefined

export const lexical = async (payload: Payload, html: string) => {
  if (!editorConfig) editorConfig = await editorConfigFactory.default({ config: payload.config })
  return convertHTMLToLexical({ editorConfig, html, JSDOM })
}

export const rows = (items: string[]) => items.map((text) => ({ text }))
