import type { Payload } from 'payload'

import { content, rows, upload, type Asset } from '../../seed/lib'
import type { actionVariants, statIcons } from './HomePage'

interface LinkSource {
  label: string
  href: string
}

interface HeadingSource {
  tag: string
  title: string
}

interface LogoSource {
  name: string
  image: Asset
  width: number
  height: number
}

interface SlideSource {
  label: string
  title: string
  paragraphs: [string, string]
  image: Asset
  imageMobile: Asset
  thumbnail: Asset
  pattern: { image: Asset; left: number; top: number }
  alt: string
}

interface StepSource {
  title: string
  paragraphs: string[]
  note: string
  image: Asset
  alt: string
}

export interface HomeSource {
  hero: { actions: { primary: LinkSource; secondary: LinkSource }; slides: SlideSource[] }
  intro: HeadingSource & {
    paragraphs: string[]
    actions: (LinkSource & { variant: (typeof actionVariants)[number]; arrow: boolean })[]
    image: Asset
    alt: string
  }
  meta: { title: string; description: string }
  partnerGroups: [{ label: string }, { label: string }]
  partnerGroupsMobile: [{ label: string }]
  projects: HeadingSource & { label: string }
  services: HeadingSource
  stats: { value: string; label: string; icon: (typeof statIcons)[number] }[]
  steps: HeadingSource & { items: StepSource[] }
  tools: HeadingSource & { paragraphs: string[]; action: LinkSource; logos: LogoSource[] }
}

const linkOf = ({ label, href }: LinkSource) => ({ label, href })

const headingOf = ({ tag, title }: HeadingSource) => ({ tag, title })

const slideOf = async (payload: Payload, slide: SlideSource) => ({
  label: slide.label,
  title: slide.title,
  statement: slide.paragraphs[0],
  description: slide.paragraphs[1],
  image: await upload(payload, slide.image, slide.alt),
  imageMobile: await upload(payload, slide.imageMobile, slide.alt),
  thumbnail: await upload(payload, slide.thumbnail, ''),
  pattern: {
    image: await upload(payload, slide.pattern.image, ''),
    left: slide.pattern.left,
    top: slide.pattern.top,
  },
})

const logoOf = async (payload: Payload, logo: LogoSource) => ({
  name: logo.name,
  logo: await upload(payload, logo.image, logo.name),
  width: logo.width,
  height: logo.height,
})

const stepOf = async (payload: Payload, step: StepSource) => ({
  title: step.title,
  paragraphs: rows(step.paragraphs),
  note: step.note,
  image: await upload(payload, step.image, step.alt),
})

const sequential = async <Source, Result>(
  items: Source[],
  convert: (item: Source) => Promise<Result>,
) => {
  const results: Result[] = []
  for (const item of items) results.push(await convert(item))
  return results
}

export const seedHome = async (payload: Payload) => {
  const home = await content<HomeSource>('home')
  const [trusted, networks] = home.partnerGroups
  const [mobileGroup] = home.partnerGroupsMobile
  if (mobileGroup.label !== trusted.label)
    throw new Error(
      `The mobile partner grid is labelled "${mobileGroup.label}", expected "${trusted.label}"`,
    )

  await payload.updateGlobal({
    slug: 'home-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        primaryAction: linkOf(home.hero.actions.primary),
        secondaryAction: linkOf(home.hero.actions.secondary),
        slides: await sequential(home.hero.slides, (slide) => slideOf(payload, slide)),
      },
      intro: {
        ...headingOf(home.intro),
        paragraphs: rows(home.intro.paragraphs),
        actions: home.intro.actions.map((action) => ({
          ...linkOf(action),
          variant: action.variant,
          arrow: action.arrow,
        })),
        image: await upload(payload, home.intro.image, home.intro.alt),
      },
      stats: home.stats.map(({ value, label, icon }) => ({ value, label, icon })),
      services: headingOf(home.services),
      tools: {
        ...headingOf(home.tools),
        paragraphs: rows(home.tools.paragraphs),
        action: linkOf(home.tools.action),
        logos: await sequential(home.tools.logos, (logo) => logoOf(payload, logo)),
      },
      steps: {
        ...headingOf(home.steps),
        items: await sequential(home.steps.items, (step) => stepOf(payload, step)),
      },
      partners: { trustedPartnersLabel: trusted.label, networksLabel: networks.label },
      projects: {
        tag: home.projects.tag,
        title: home.projects.title,
        carouselLabel: home.projects.label,
      },
      meta: { title: home.meta.title, description: home.meta.description },
    },
  })
}
