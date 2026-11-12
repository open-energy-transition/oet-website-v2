import type { Payload } from 'payload'

import { content, rows, upload, upsert, type Asset } from '../../seed/lib'
import { seedBanner, toolsBannerKey, type BannerSource } from './seedBanners'

type Role = 'maintainer' | 'co-maintainer' | 'maintainers'

interface CategorySource {
  id: string
  slug: string
  label: string
  tabLabel: string
  tone: 'brand' | 'brand-700' | 'neutral-900' | 'neutral-700' | 'brand-900'
}

interface ToolSource {
  name: string
  description: string[]
  categories: string[]
  sourceHref: string
  websiteHref: string
  githubHref: string
}

interface ToolsContent {
  toolCategories: CategorySource[]
  tools: ToolSource[]
  toolsPage: {
    meta: { title: string; description: string }
    hero: {
      eyebrow: { label: string }
      title: string
      link: { label: string }
      image: { desktop: Asset; mobile: Asset }
    }
    intro: { title: string; paragraphs: string[] }
    cta: BannerSource
  }
}

const roles: Record<string, Role> = {
  Maintainer: 'maintainer',
  'Co-maintainer': 'co-maintainer',
  Maintainers: 'maintainers',
}

const separator = ' | '

const splitRole = (description: string[]): { role: Role | null; description: string[] } => {
  const [first, ...rest] = description
  if (first === undefined) throw new Error('A tool has no description')
  const at = first.indexOf(separator)
  if (at === -1) return { role: null, description }
  const role = roles[first.slice(0, at)]
  if (!role) throw new Error(`Unknown tool role in "${first}"`)
  return { role, description: [first.slice(at + separator.length), ...rest] }
}

export const seedTools = async (payload: Payload) => {
  const { toolCategories, tools, toolsPage } = await content<ToolsContent>('tools')

  const categoryIds = new Map<string, number>()
  for (const [index, category] of toolCategories.entries()) {
    const saved = await upsert(
      payload,
      'tool-categories',
      { slug: { equals: category.slug } },
      {
        slug: category.slug,
        label: category.label,
        tabLabel: category.tabLabel,
        tone: category.tone,
        order: index + 1,
      },
    )
    categoryIds.set(category.id, saved.id)
  }

  for (const [index, tool] of tools.entries()) {
    const { role, description } = splitRole(tool.description)
    await upsert(
      payload,
      'tools',
      { name: { equals: tool.name } },
      {
        name: tool.name,
        categories: tool.categories.map((id) => {
          const category = categoryIds.get(id)
          if (category === undefined) throw new Error(`Unknown tool category: ${id}`)
          return category
        }),
        role,
        description: rows(description),
        sourceHref: tool.sourceHref,
        websiteHref: tool.websiteHref,
        githubHref: tool.githubHref,
        order: index + 1,
      },
    )
  }

  const { hero, intro, meta, cta } = toolsPage
  await payload.updateGlobal({
    slug: 'tools-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        eyebrow: hero.eyebrow.label,
        title: hero.title,
        linkLabel: hero.link.label,
        image: await upload(payload, hero.image.desktop, ''),
        imageMobile: await upload(payload, hero.image.mobile, ''),
      },
      intro: { title: intro.title, paragraphs: rows(intro.paragraphs) },
      cta: await seedBanner(payload, toolsBannerKey, cta),
      meta,
    },
  })
}
