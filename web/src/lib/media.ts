import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import { required, resolved } from './cms'
import type { Media } from './payload-types'
import { inPreview } from './preview'

type MediaRef = number | Media | null | undefined

const files = import.meta.glob<ImageMetadata>('../assets/cms/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  import: 'default',
})

const icons = import.meta.glob<SvgComponent>('../icons/*.svg', {
  eager: true,
  import: 'default',
})

const formats = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'avif'] as const

const isFormat = (value: string): value is (typeof formats)[number] =>
  formats.some((format) => format === value)

const cmsImage = (doc: Media, what: string): ImageMetadata => {
  const base = import.meta.env.PAYLOAD_URL
  if (!base) throw new Error('PAYLOAD_URL is not set')
  const url = required(doc.url, `${what} url`)
  const format = required(doc.mimeType, `${what} type`).replace(/^image\//, '')
  if (!isFormat(format)) throw new Error(`${what}: ${doc.mimeType} is not an image format`)
  return {
    src: new URL(url, base).href,
    width: required(doc.width, `${what} width`),
    height: required(doc.height, `${what} height`),
    format,
  }
}

export const image = (media: MediaRef, what: string): ImageMetadata => {
  const doc = resolved(media, what)
  const file = files[`../assets/cms/${doc.filename}`]
  if (file) return file
  if (inPreview()) return cmsImage(doc, what)
  throw new Error(`${what}: media file ${doc.filename} is not in src/assets/cms; restart Astro`)
}

export const optionalImage = (media: MediaRef, what: string): ImageMetadata | null =>
  media === null || media === undefined ? null : image(media, what)

export const altOf = (media: MediaRef, what: string): string => {
  const { alt } = resolved(media, what)
  return alt === null || alt === undefined ? '' : alt
}

export const icon = (name: string): SvgComponent => {
  const component = icons[`../icons/${name}.svg`]
  if (!component) throw new Error(`Unknown icon: ${name}`)
  return component
}
