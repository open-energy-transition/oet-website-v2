import type { ImageMetadata } from 'astro'
import type { Locale } from '../i18n/config'
import { t } from '../i18n/ui'
import { findAll, findGlobal, required, resolved, texts, type Doc } from '../lib/cms'
import { image } from '../lib/media'
import { routes } from './routes'

export type ToolCategoryTone = 'brand' | 'brand-700' | 'neutral-900' | 'neutral-700' | 'brand-900'

export interface ToolCategory {
  slug: string
  href: string
  label: string
  tabLabel: string
  tone: ToolCategoryTone
}

export interface Tool {
  name: string
  description: string[]
  categories: string[]
  sourceHref: string
  websiteHref: string
  githubHref: string
}

export interface ToolsCta {
  tone: 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900' | 'light'
  heading: string
  lead: string | null
  text: string
  actions: { label: string; href: string; emphasis: 'primary' | 'secondary'; newTab: boolean }[]
  collage: 'wind' | 'thermalpower' | 'biz'
  breakout: boolean
}

export interface ToolsPage {
  meta: { title: string; description: string }
  hero: {
    eyebrow: { label: string; mobile: boolean }
    title: string
    link: { label: string; href: string }
    image: { desktop: ImageMetadata; mobile: ImageMetadata }
  }
  intro: { id: string; title: string; paragraphs: string[] }
  cta: ToolsCta
  categories: ToolCategory[]
  tools: Tool[]
}

const introId = 'tools'

const describe = (tool: Doc<'tools'>, locale: Locale): string[] => {
  const paragraphs = texts(tool.description, `description of tool ${tool.name}`)
  if (tool.role === null || tool.role === undefined) return paragraphs
  const [first, ...rest] = paragraphs
  return [`${t(locale, `tool.role.${tool.role}`)} | ${first}`, ...rest]
}

const banner = (doc: Doc<'cta-banners'>): ToolsCta => ({
  tone: doc.tone,
  heading: doc.heading,
  lead: doc.lead === undefined ? null : doc.lead,
  text: doc.text,
  actions: required(doc.actions, `actions of banner ${doc.key}`).map((action) => ({
    label: action.label,
    href: action.href,
    emphasis: action.emphasis,
    newTab: action.newTab,
  })),
  collage: doc.collage,
  breakout: doc.breakout,
})

const category = (doc: Doc<'tool-categories'>): ToolCategory => ({
  slug: doc.slug,
  href: routes.toolsCategory(doc.slug),
  label: doc.label,
  tabLabel: doc.tabLabel,
  tone: doc.tone,
})

export const loadToolCategories = async (locale: Locale): Promise<ToolCategory[]> => {
  const docs = await findAll('tool-categories', locale, { depth: 0, sort: 'order' })
  return docs.map(category)
}

export const loadToolsPage = async (locale: Locale): Promise<ToolsPage> => {
  const [page, categories, toolDocs] = await Promise.all([
    findGlobal('tools-page', locale, 1),
    loadToolCategories(locale),
    findAll('tools', locale, { depth: 1, sort: 'order' }),
  ])
  return {
    meta: { title: page.meta.title, description: page.meta.description },
    hero: {
      eyebrow: { label: page.hero.eyebrow, mobile: false },
      title: page.hero.title,
      link: { label: page.hero.linkLabel, href: `#${introId}` },
      image: {
        desktop: image(page.hero.image, 'tools page hero image'),
        mobile: image(page.hero.imageMobile, 'tools page mobile hero image'),
      },
    },
    intro: {
      id: introId,
      title: page.intro.title,
      paragraphs: texts(page.intro.paragraphs, 'tools page intro paragraphs'),
    },
    cta: banner(resolved(page.cta, 'tools page banner')),
    categories,
    tools: toolDocs.map((tool) => ({
      name: tool.name,
      description: describe(tool, locale),
      categories: tool.categories.map(
        (item) => resolved(item, `category of tool ${tool.name}`).slug,
      ),
      sourceHref: tool.sourceHref,
      websiteHref: tool.websiteHref,
      githubHref: tool.githubHref,
    })),
  }
}
