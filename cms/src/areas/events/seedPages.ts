import type { Payload } from 'payload'

import { content, lexical, upsert } from '../../seed/lib'

interface PageSource {
  meta: { title: string; description: string }
  tag: string
  title: string
  body: string
}

interface LegalContent {
  legalPages: Record<string, PageSource>
}

export const seedPages = async (payload: Payload) => {
  const { legalPages } = await content<LegalContent>('legal')
  for (const [slug, page] of Object.entries(legalPages))
    await upsert(
      payload,
      'pages',
      { slug: { equals: slug } },
      {
        _status: 'published',
        title: page.title,
        slug,
        tag: page.tag,
        body: await lexical(payload, page.body),
        meta: page.meta,
      },
    )
}
