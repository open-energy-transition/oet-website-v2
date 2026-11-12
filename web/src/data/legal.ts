import type { Locale } from '../i18n/config'
import { findAll, richHtml } from '../lib/cms'

export type LegalPageId = 'legal' | 'privacy-statement' | 'disclaimer'

export interface LegalPageContent {
  meta: { title: string; description: string }
  tag: string
  title: string
  body: string
}

export const loadLegalPage = async (
  locale: Locale,
  slug: LegalPageId,
): Promise<LegalPageContent> => {
  const docs = await findAll('pages', locale, {
    depth: 0,
    where: { 'where[slug][equals]': slug },
  })
  if (docs.length !== 1)
    throw new Error(`Expected one published page with slug "${slug}", found ${docs.length}`)
  const [doc] = docs
  return {
    meta: { title: doc.meta.title, description: doc.meta.description },
    tag: doc.tag,
    title: doc.title,
    body: richHtml(doc.bodyHtml, `Page ${slug} body`),
  }
}
