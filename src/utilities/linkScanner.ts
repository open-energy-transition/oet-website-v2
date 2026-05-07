import configPromise from '@payload-config'
import { getPayload, type Where } from 'payload'

type ScanSource = {
  sourceCollection: string
  sourceId: string
  sourceTitle: string
}

type ExtractedLink = ScanSource & {
  sourcePath: string
  url: string
}

type LinkScanResult = ExtractedLink & {
  durationMs: number
  error?: string
  finalUrl?: string
  ok: boolean
  statusCode?: number
}

type CollectionScanConfig = {
  collection:
    | 'categories'
    | 'departments'
    | 'outputs'
    | 'pages'
    | 'partners'
    | 'posts'
    | 'projects'
  sourceTitleFields: string[]
  where?: Where
}

const PUBLIC_COLLECTIONS: CollectionScanConfig[] = [
  {
    collection: 'pages',
    sourceTitleFields: ['title', 'slug'],
    where: {
      _status: {
        equals: 'published',
      },
    },
  },
  {
    collection: 'posts',
    sourceTitleFields: ['title', 'slug'],
    where: {
      _status: {
        equals: 'published',
      },
    },
  },
  {
    collection: 'projects',
    sourceTitleFields: ['title', 'slug'],
  },
  {
    collection: 'categories',
    sourceTitleFields: ['title', 'slug'],
  },
  {
    collection: 'departments',
    sourceTitleFields: ['department'],
    where: {
      status: {
        not_equals: 'draft',
      },
    },
  },
  {
    collection: 'outputs',
    sourceTitleFields: ['title', 'slug'],
  },
  {
    collection: 'partners',
    sourceTitleFields: ['name', 'slug'],
  },
]

const PUBLIC_GLOBALS = ['header', 'footer'] as const

const URL_PATTERN = /https?:\/\/[^\s<>"'`)\]}]+/gi
const REQUEST_TIMEOUT_MS = 10000
const REQUEST_CONCURRENCY = 8

const getSourceTitle = (doc: Record<string, unknown>, fields: string[]) => {
  for (const field of fields) {
    const value = doc[field]
    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }

  const id = doc.id
  return typeof id === 'number' || typeof id === 'string' ? String(id) : 'Unknown'
}

const normalizeUrl = (value: string) => value.trim().replace(/[),.;:!?]+$/g, '')

const isExternalHttpUrl = (value: string, siteOrigin: string) => {
  if (!value) return false

  try {
    const parsed = new URL(value)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false
    return parsed.origin !== siteOrigin
  } catch {
    return false
  }
}

const extractUrlsFromString = (value: string, siteOrigin: string) => {
  const matches = value.match(URL_PATTERN) ?? []

  return matches
    .map((match) => normalizeUrl(match))
    .filter((url, index, urls) => urls.indexOf(url) === index && isExternalHttpUrl(url, siteOrigin))
}

const collectLinks = (
  value: unknown,
  source: ScanSource,
  siteOrigin: string,
  path = 'root',
): ExtractedLink[] => {
  if (typeof value === 'string') {
    return extractUrlsFromString(value, siteOrigin).map((url) => ({
      ...source,
      sourcePath: path,
      url,
    }))
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => collectLinks(entry, source, siteOrigin, `${path}[${index}]`))
  }

  if (!value || typeof value !== 'object') {
    return []
  }

  return Object.entries(value).flatMap(([key, nestedValue]) =>
    collectLinks(nestedValue, source, siteOrigin, `${path}.${key}`),
  )
}

const validateLink = async (link: ExtractedLink): Promise<LinkScanResult> => {
  const startedAt = Date.now()

  try {
    const response = await fetch(link.url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'OET Link Scanner/1.0',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    return {
      ...link,
      durationMs: Date.now() - startedAt,
      finalUrl: response.url,
      ok: response.ok,
      statusCode: response.status,
    }
  } catch (error) {
    return {
      ...link,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : 'Unknown error',
      ok: false,
    }
  }
}

const mapWithConcurrency = async <Input, Output>(
  items: Input[],
  concurrency: number,
  mapper: (item: Input, index: number) => Promise<Output>,
): Promise<Output[]> => {
  const results: Output[] = new Array(items.length)
  let nextIndex = 0

  const worker = async () => {
    while (true) {
      const currentIndex = nextIndex
      nextIndex += 1

      if (currentIndex >= items.length) {
        return
      }

      results[currentIndex] = await mapper(items[currentIndex], currentIndex)
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()))

  return results
}

export const runExternalLinkScan = async () => {
  const payload = await getPayload({ config: configPromise })
  const siteOrigin = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.openenergytransition.org')
    .origin

  const startedAt = new Date()
  const run = await payload.create({
    collection: 'link-scan-runs',
    data: {
      startedAt: startedAt.toISOString(),
      status: 'running',
      totalChecked: 0,
      totalFailed: 0,
      trigger: 'cron',
    },
    overrideAccess: true,
  })

  try {
    const collectedLinks: ExtractedLink[] = []

    for (const collectionConfig of PUBLIC_COLLECTIONS) {
      const result = await payload.find({
        collection: collectionConfig.collection,
        depth: 0,
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        where: collectionConfig.where,
      })

      for (const doc of result.docs as unknown as Record<string, unknown>[]) {
        const source: ScanSource = {
          sourceCollection: collectionConfig.collection,
          sourceId:
            typeof doc.id === 'number' || typeof doc.id === 'string' ? String(doc.id) : 'unknown',
          sourceTitle: getSourceTitle(doc, collectionConfig.sourceTitleFields),
        }

        collectedLinks.push(...collectLinks(doc, source, siteOrigin))
      }
    }

    for (const globalSlug of PUBLIC_GLOBALS) {
      const globalDoc = (await payload.findGlobal({
        slug: globalSlug,
        overrideAccess: false,
      })) as unknown as Record<string, unknown>

      collectedLinks.push(
        ...collectLinks(
          globalDoc,
          {
            sourceCollection: globalSlug,
            sourceId: globalSlug,
            sourceTitle: globalSlug,
          },
          siteOrigin,
        ),
      )
    }

    const results = await mapWithConcurrency(collectedLinks, REQUEST_CONCURRENCY, validateLink)
    const finishedAt = new Date()
    const totalFailed = results.filter((result) => !result.ok).length

    await payload.update({
      id: run.id,
      collection: 'link-scan-runs',
      data: {
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        finishedAt: finishedAt.toISOString(),
        results: results.map((result) => ({
          durationMs: result.durationMs,
          error: result.error,
          finalUrl: result.finalUrl,
          ok: result.ok,
          sourceCollection: result.sourceCollection,
          sourceId: result.sourceId,
          sourcePath: result.sourcePath,
          sourceTitle: result.sourceTitle,
          statusCode: result.statusCode,
          url: result.url,
        })),
        status: 'completed',
        totalChecked: results.length,
        totalFailed,
      },
      overrideAccess: true,
    })

    return {
      id: run.id,
      status: 'completed' as const,
      totalChecked: results.length,
      totalFailed,
    }
  } catch (error) {
    const finishedAt = new Date()
    const message = error instanceof Error ? error.message : 'Unknown error'

    await payload.update({
      id: run.id,
      collection: 'link-scan-runs',
      data: {
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        finishedAt: finishedAt.toISOString(),
        results: [
          {
            error: message,
            ok: false,
            sourceCollection: 'system',
            sourceId: 'system',
            sourcePath: 'run',
            sourceTitle: 'Link scan run',
            url: 'about:blank',
          },
        ],
        status: 'failed',
        totalChecked: 0,
        totalFailed: 1,
      },
      overrideAccess: true,
    })

    throw error
  }
}
