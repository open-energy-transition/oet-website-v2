import type { CollectionAdminOptions, GlobalAdminOptions } from 'payload'

import { env } from './env'

type PreviewDoc = Record<string, unknown>

const breakpoints = [
  { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
  { name: 'mobile', label: 'Mobile', width: 412, height: 900 },
]

const pathUrl = (path: string) => {
  const url = new URL(`/preview${path}`, env('WEB_URL'))
  url.searchParams.set('secret', env('PREVIEW_SECRET'))
  return url.href
}

const previewUrl = (
  path: (slug: string) => string,
  hasPage: (doc: PreviewDoc) => boolean,
  doc: PreviewDoc,
) => {
  const { slug } = doc
  if (typeof slug !== 'string' || slug === '' || !hasPage(doc)) return null
  return pathUrl(path(slug))
}

export const previewOptions = (
  path: (slug: string) => string,
  hasPage: (doc: PreviewDoc) => boolean,
): Pick<CollectionAdminOptions, 'preview' | 'livePreview'> => ({
  preview: (doc) => previewUrl(path, hasPage, doc),
  livePreview: {
    url: ({ data }) => previewUrl(path, hasPage, data),
    breakpoints,
  },
})

export const globalPreviewOptions = (
  path: string,
): Pick<GlobalAdminOptions, 'preview' | 'livePreview'> => ({
  preview: () => pathUrl(path),
  livePreview: {
    url: () => pathUrl(path),
    breakpoints,
  },
})

export const always = () => true

export const draftVersions = {
  drafts: { autosave: { interval: 1000 } },
  maxPerDoc: 50,
}
