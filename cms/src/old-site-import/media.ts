import type { Payload } from 'payload'
import sharp from 'sharp'

import { fetchFile, type LegacyMedia } from './source'
import { quiet } from './quiet'

const svg = 'image/svg+xml'
const rasterWidth = 1600

const legacyName = (media: LegacyMedia) => {
  const name = media.filename.replace(/[^\w.-]+/g, '-').toLowerCase()
  return `old-site-${media.id}-${media.mimeType === svg ? name.replace(/\.svg$/, '.png') : name}`
}

const fileOf = async (media: LegacyMedia) => {
  const data = await fetchFile(media.url)
  if (media.mimeType !== svg) return { data, mimetype: media.mimeType }
  const { width } = await sharp(data).metadata()
  if (!width) throw new Error(`SVG ${media.filename} has no width`)
  const density = Math.ceil((72 * rasterWidth) / width)
  const png = await sharp(data, { density }).resize({ width: rasterWidth }).png().toBuffer()
  return { data: png, mimetype: 'image/png' }
}

export const importMedia = async (
  payload: Payload,
  media: LegacyMedia,
  alt: string,
): Promise<number> => {
  const filename = legacyName(media)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })
  const found = existing.docs[0]
  if (found) return found.id
  const { data, mimetype } = await fileOf(media)
  const created = await payload.create({
    context: quiet(),
    collection: 'media',
    data: { alt },
    file: { data, mimetype, name: filename, size: data.byteLength },
    depth: 0,
  })
  return created.id
}

export const mediaUrl = async (payload: Payload, id: number): Promise<string> => {
  const media = await payload.findByID({ collection: 'media', id, depth: 0 })
  if (!media.url) throw new Error(`Media ${id} has no URL`)
  return new URL(media.url, payload.config.serverURL).href
}
