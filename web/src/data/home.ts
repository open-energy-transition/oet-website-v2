import type { ImageMetadata } from 'astro'
import type { PartnerTag, TitleLines } from '../components/cards/types'
import type { Locale } from '../i18n/config'
import { findAll, findGlobal, required, texts, type Doc } from '../lib/cms'
import { altOf, image } from '../lib/media'
import { logoBox, logoFits } from '../lib/logoSize'
import { partnerLink, partnerTag, projectPeriod } from './projects'
import { routes } from './routes'

export interface Link {
  label: string
  href: string
}

export interface Logo {
  name: string
  image: ImageMetadata
  width: number
  height: number
}

export interface HeroSlide {
  label: string
  title: string
  paragraphs: [string, string]
  image: ImageMetadata
  imageMobile: ImageMetadata
  thumbnail: ImageMetadata
  pattern: { image: ImageMetadata; left: number; top: number }
  alt: string
}

export type StatIcon = 'blueprint' | 'handshake' | 'employees' | 'world' | 'folder-edit' | 'license'

export interface Stat {
  value: string
  label: string
  icon: StatIcon
}

export interface IntroAction extends Link {
  variant: 'primary' | 'outline'
  arrow: boolean
}

export interface ServiceItem {
  title: string
  paragraphs: string[]
  href: string
  image: ImageMetadata
  alt: string
}

export interface CarouselStep {
  title: string
  paragraphs: string[]
  note: string
  image: ImageMetadata
  alt: string
}

export interface LogoGroup {
  label: string
  logos: Logo[]
}

export interface Project {
  title: string
  titleLines: TitleLines
  excerpt: string
  period: string
  href: string
  image: ImageMetadata
  alt: string
  partnerTag: PartnerTag | null
  partnerLink: Link | null
}

export interface HomePage {
  meta: { title: string; description: string }
  hero: { actions: { primary: Link; secondary: Link }; slides: HeroSlide[] }
  intro: {
    tag: string
    title: string
    paragraphs: string[]
    actions: IntroAction[]
    image: ImageMetadata
    alt: string
  }
  stats: Stat[]
  services: { tag: string; title: string; items: ServiceItem[] }
  tools: {
    tag: string
    title: string
    paragraphs: [string, string]
    action: Link
    logos: Logo[]
  }
  steps: { tag: string; title: string; items: CarouselStep[] }
  partners: { visible: boolean; groups: LogoGroup[]; groupsMobile: LogoGroup[] }
  projects: { visible: boolean; tag: string; title: string; label: string; items: Project[] }
}

type Partner = Doc<'partners'>
type PartnerBox = 'logoDesktop' | 'logoMobile'

const titleLines: Record<'2' | '3', TitleLines> = { '2': 2, '3': 3 }

const pair = (values: string[], what: string): [string, string] => {
  if (values.length !== 2) throw new Error(`${what} must have two entries, has ${values.length}`)
  return [values[0], values[1]]
}

const partnerFits = { logoDesktop: logoFits.desktop, logoMobile: logoFits.mobile }

const partnerLogo = (partner: Partner, box: PartnerBox): Logo => {
  const logo = image(partner.logo, `partner "${partner.name}" logo`)
  return {
    name: partner.name,
    image: logo,
    ...logoBox(partner[box], logo, partnerFits[box], `partner "${partner.name}" ${box}`),
  }
}

export const loadHomePage = async (locale: Locale): Promise<HomePage> => {
  const [page, services, partners, projects] = await Promise.all([
    findGlobal('home-page', locale, 1),
    findAll('services', locale, { depth: 1, sort: 'order' }),
    findAll('partners', locale, {
      depth: 1,
      sort: 'homeOrder',
      where: { 'where[showOnHome][equals]': 'true' },
    }),
    findAll('projects', locale, {
      depth: 2,
      sort: 'home.order',
      where: { 'where[home.showOnHome][equals]': 'true' },
    }),
  ])

  const grouped = (group: NonNullable<Partner['group']>) =>
    partners
      .filter((partner) => partner.group === group)
      .map((partner) => partnerLogo(partner, 'logoDesktop'))

  return {
    meta: { title: page.meta.title, description: page.meta.description },
    hero: {
      actions: {
        primary: { label: page.hero.primaryAction.label, href: page.hero.primaryAction.href },
        secondary: { label: page.hero.secondaryAction.label, href: page.hero.secondaryAction.href },
      },
      slides: page.hero.slides.map((slide) => ({
        label: slide.label,
        title: slide.title,
        paragraphs: [slide.statement, slide.description],
        image: image(slide.image, `hero slide "${slide.label}" image`),
        imageMobile: image(slide.imageMobile, `hero slide "${slide.label}" mobile image`),
        thumbnail: image(slide.thumbnail, `hero slide "${slide.label}" thumbnail`),
        pattern: {
          image: image(slide.pattern.image, `hero slide "${slide.label}" pattern`),
          left: slide.pattern.left,
          top: slide.pattern.top,
        },
        alt: altOf(slide.image, `hero slide "${slide.label}" image`),
      })),
    },
    intro: {
      tag: page.intro.tag,
      title: page.intro.title,
      paragraphs: texts(page.intro.paragraphs, 'home intro paragraphs'),
      actions: required(page.intro.actions, 'home intro actions').map((action) => ({
        label: action.label,
        href: action.href,
        variant: action.variant,
        arrow: action.arrow,
      })),
      image: image(page.intro.image, 'home intro image'),
      alt: altOf(page.intro.image, 'home intro image'),
    },
    stats: page.stats.map(({ value, label, icon }) => ({ value, label, icon })),
    services: {
      tag: page.services.tag,
      title: page.services.title,
      items: services.map((service) => ({
        title: service.home.title,
        paragraphs: texts(service.home.paragraphs, `service "${service.slug}" home paragraphs`),
        href: routes.service(service.slug),
        image: image(service.home.image, `service "${service.slug}" home image`),
        alt: altOf(service.home.image, `service "${service.slug}" home image`),
      })),
    },
    tools: {
      tag: page.tools.tag,
      title: page.tools.title,
      paragraphs: pair(
        texts(page.tools.paragraphs, 'home tools paragraphs'),
        'home tools paragraphs',
      ),
      action: { label: page.tools.action.label, href: page.tools.action.href },
      logos: page.tools.logos.map((logo) => ({
        name: logo.name,
        image: image(logo.logo, `platform logo "${logo.name}"`),
        width: logo.width,
        height: logo.height,
      })),
    },
    steps: {
      tag: page.steps.tag,
      title: page.steps.title,
      items: page.steps.items.map((step) => ({
        title: step.title,
        paragraphs: texts(step.paragraphs, `home step "${step.title}" paragraphs`),
        note: step.note,
        image: image(step.image, `home step "${step.title}" image`),
        alt: altOf(step.image, `home step "${step.title}" image`),
      })),
    },
    partners: {
      visible: page.partners.visible,
      groups: [
        { label: page.partners.trustedPartnersLabel, logos: grouped('trusted-partner') },
        { label: page.partners.networksLabel, logos: grouped('network-affiliation') },
      ],
      groupsMobile: [
        {
          label: page.partners.trustedPartnersLabel,
          logos: [
            ...partners.filter((partner) => partner.group === 'trusted-partner'),
            ...partners.filter((partner) => partner.group === 'network-affiliation'),
          ].map((partner) => partnerLogo(partner, 'logoMobile')),
        },
      ],
    },
    projects: {
      visible: page.projects.visible,
      tag: page.projects.tag,
      title: page.projects.title,
      label: page.projects.carouselLabel,
      items: projects.map((project) => ({
        title: project.title,
        titleLines:
          titleLines[
            required(project.home.titleLines, `project "${project.slug}" home title lines`)
          ],
        excerpt: project.excerpt,
        period: projectPeriod(project),
        href: routes.successStory(project.slug),
        image: image(project.thumbnail, `project "${project.slug}" thumbnail`),
        alt: altOf(project.thumbnail, `project "${project.slug}" thumbnail`),
        partnerTag: partnerTag(project.partnerTag, `project "${project.slug}" partner tag`),
        partnerLink: partnerLink(project.partnerLink, `project "${project.slug}" partner link`),
      })),
    },
  }
}
