import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  CollectionSlug,
  GlobalAfterChangeHook,
  GlobalConfig,
  GlobalSlug,
  PayloadRequest,
  Plugin,
} from 'payload'
import { waitUntil } from '@vercel/functions'

const ignored = new Set(['users', 'form-submissions', 'media'])

const trigger = async (url: string, req: PayloadRequest) => {
  const response = await fetch(url, { method: 'POST' })
  if (!response.ok) throw new Error(`Deploy hook answered ${response.status}`)
  req.payload.logger.info('Requested a rebuild of the website')
}

const schedule = (url: string, req: PayloadRequest) => {
  if (req.context.rebuildRequested) return
  req.context.rebuildRequested = true
  waitUntil(trigger(url, req).catch((error: unknown) => req.payload.logger.error(error)))
}

const isCollectionSlug = (req: PayloadRequest, slug: string): slug is CollectionSlug =>
  slug in req.payload.collections

const hasDrafts = (collection: CollectionConfig) =>
  typeof collection.versions === 'object' && Boolean(collection.versions.drafts)

const withCollectionHooks = (url: string, collection: CollectionConfig): CollectionConfig => {
  const drafts = hasDrafts(collection)
  const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
    if (!drafts || doc._status === 'published') {
      schedule(url, req)
      return doc
    }
    if (previousDoc?._status === 'published') {
      const slug = collection.slug
      if (!isCollectionSlug(req, slug)) throw new Error(`Unknown collection ${slug}`)
      const current = await req.payload.findByID({
        collection: slug,
        id: doc.id,
        draft: false,
        depth: 0,
        req,
      })
      if (!('_status' in current) || current._status !== 'published') schedule(url, req)
    }
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    schedule(url, req)
    return doc
  }
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), afterChange],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), afterDelete],
    },
  }
}

const isGlobalSlug = (req: PayloadRequest, slug: string): slug is GlobalSlug =>
  req.payload.globals.config.some((global) => global.slug === slug)

const withGlobalHooks = (url: string, global: GlobalConfig): GlobalConfig => {
  const drafts = typeof global.versions === 'object' && Boolean(global.versions.drafts)
  const afterChange: GlobalAfterChangeHook = async ({ doc, previousDoc, req }) => {
    if (!drafts || doc._status === 'published') {
      schedule(url, req)
      return doc
    }
    if (previousDoc?._status === 'published') {
      const slug = global.slug
      if (!isGlobalSlug(req, slug)) throw new Error(`Unknown global ${slug}`)
      const current = await req.payload.findGlobal({ slug, draft: false, depth: 0, req })
      if (!('_status' in current) || current._status !== 'published') schedule(url, req)
    }
    return doc
  }
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [...(global.hooks?.afterChange ?? []), afterChange],
    },
  }
}

export const rebuildOnPublish =
  (url: string | undefined): Plugin =>
  (config) => {
    if (!url) return config
    return {
      ...config,
      collections: config.collections?.map((collection) =>
        ignored.has(collection.slug) ? collection : withCollectionHooks(url, collection),
      ),
      globals: config.globals?.map((global) => withGlobalHooks(url, global)),
    }
  }
