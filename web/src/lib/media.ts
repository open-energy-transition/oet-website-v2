import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import { resolved } from './cms'
import type { Media } from './payload-types'

type MediaRef = number | Media | null | undefined

const files = import.meta.glob<ImageMetadata>('../assets/cms/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  import: 'default',
})

const icons = import.meta.glob<SvgComponent>('../icons/*.svg', {
  eager: true,
  import: 'default',
})

export const image = (media: MediaRef, what: string): ImageMetadata => {
  const doc = resolved(media, what)
  const file = files[`../assets/cms/${doc.filename}`]
  if (!file)
    throw new Error(`${what}: media file ${doc.filename} is not in src/assets/cms; restart Astro`)
  return file
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
