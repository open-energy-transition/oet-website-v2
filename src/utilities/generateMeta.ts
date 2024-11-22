import type { Metadata } from 'next'

import type { Page, Post } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { title } from 'process'

export const generateMeta = async (args: { doc: Page | Post }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  // const title = doc?.meta?.title ? doc?.meta?.title + ' | OET Website' : 'OET Website'

  const title = 'OET Website'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      // description: doc?.meta?.description || '',
      description: 'POC Website',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      // "ggggg",
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
