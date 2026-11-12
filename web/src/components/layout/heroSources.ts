import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'

export interface HeroSource {
  media: string
  type: string
  srcset: string
  sizes: string
}

interface Variant {
  image: ImageMetadata
  media: string
  widths: number[]
  sizes: string
  crop: { width: number; height: number } | null
}

const formats = ['avif', 'webp'] as const

const NARROW = 480
const MOBILE_WINDOW = 1024
const DESKTOP_WIDTH = 1400

const build = (variants: Variant[]): Promise<HeroSource[]> =>
  Promise.all(
    formats.flatMap((format) =>
      variants.map(async ({ image, media, widths, sizes, crop }) => {
        const result = await getImage(
          crop === null
            ? { src: image, format, widths }
            : { src: image, format, widths, width: crop.width, height: crop.height, fit: 'cover' },
        )
        return { media, type: `image/${format}`, srcset: result.srcSet.attribute, sizes }
      }),
    ),
  )

const desktop = (image: ImageMetadata, media: string): Variant => ({
  image,
  media,
  widths: [DESKTOP_WIDTH, DESKTOP_WIDTH * 1.5, DESKTOP_WIDTH * 2],
  sizes: `(min-width: ${DESKTOP_WIDTH + 40}px) calc(100vw - 40px), ${DESKTOP_WIDTH}px`,
  crop: null,
})

export const homeHeroSources = (image: ImageMetadata, imageMobile: ImageMetadata) =>
  build([
    {
      image: imageMobile,
      media: `(max-width: ${NARROW}px)`,
      widths: [412, 618, 722, imageMobile.width],
      sizes: '100vw',
      crop: null,
    },
    desktop(image, `(min-width: ${NARROW + 0.02}px)`),
  ])

export const pageHeroSources = (image: { desktop: ImageMetadata; mobile: ImageMetadata }) => {
  const narrowWidth = Math.round((image.mobile.width * NARROW) / MOBILE_WINDOW)
  return build([
    {
      image: image.mobile,
      media: `(max-width: ${NARROW}px)`,
      widths: [NARROW, NARROW * 1.5, narrowWidth],
      sizes: `${NARROW}px`,
      crop: { width: narrowWidth, height: image.mobile.height },
    },
    {
      image: image.mobile,
      media: `(min-width: ${NARROW + 0.02}px) and (max-width: 1023.98px)`,
      widths: [MOBILE_WINDOW, MOBILE_WINDOW * 1.5, image.mobile.width],
      sizes: `${MOBILE_WINDOW}px`,
      crop: null,
    },
    desktop(image.desktop, '(min-width: 1024px)'),
  ])
}
