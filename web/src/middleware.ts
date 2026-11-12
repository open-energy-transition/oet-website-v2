import { defineMiddleware, sequence } from 'astro:middleware'
import { openExternalLinksInNewTab } from './lib/externalLinks'
import { previewSecret, withPreview } from './lib/preview'

const preview = defineMiddleware((context, next) => {
  if (!context.url.pathname.startsWith('/preview/')) return next()
  if (context.url.searchParams.get('secret') !== previewSecret())
    return new Response('Not found', { status: 404 })
  return withPreview(async () => {
    const response = await next()
    response.headers.set('Cache-Control', 'private, no-store')
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  })
})

const externalLinks = defineMiddleware(async (context, next) => {
  const response = await next()
  if (!response.headers.get('Content-Type')?.startsWith('text/html')) return response
  if (context.site === undefined) throw new Error('site is not configured')
  const html = openExternalLinksInNewTab(await response.text(), context.site.host)
  return new Response(html, { status: response.status, headers: response.headers })
})

export const onRequest = sequence(externalLinks, preview)
