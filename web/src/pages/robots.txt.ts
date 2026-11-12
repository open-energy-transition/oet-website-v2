import type { APIRoute } from 'astro'
import { indexingEnabled } from '../lib/indexing'

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('robots.txt needs the site URL')
  const body = indexingEnabled()
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n'
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
