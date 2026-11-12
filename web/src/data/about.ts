import type { ImageMetadata } from 'astro'
import type { Locale } from '../i18n/config'
import { findGlobal, required, resolved, texts } from '../lib/cms'
import { altOf, image } from '../lib/media'
import { loadDepartments } from './departments'

export interface AboutAction {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  arrow: boolean
}

export interface InfoCard {
  image: ImageMetadata
  alt: string
  title: string
  paragraphs: string[]
  action: { label: string; href: string } | null
}

export interface Value {
  thumbnail: ImageMetadata
  thumbnailMobile: ImageMetadata
  label: string
  title: string
  body: string
}

const introId = 'about'

const cardAction = (
  action: { label?: string | null; href?: string | null } | undefined,
  what: string,
): InfoCard['action'] => {
  const { label, href } = required(action, what)
  const hasLabel = label !== null && label !== undefined
  const hasHref = href !== null && href !== undefined
  if (hasLabel && hasHref) return { label, href }
  if (hasLabel || hasHref) throw new Error(`${what} needs both a label and a target`)
  return null
}

export const loadAboutPage = async (locale: Locale) => {
  const [page, departments] = await Promise.all([
    findGlobal('about-page', locale, 1),
    loadDepartments(locale),
  ])
  return {
    meta: page.meta,
    hero: {
      title: page.hero.title,
      links: required(page.hero.links, 'about page hero links').map(({ label, href }) => ({
        label,
        href,
      })),
      image: {
        desktop: image(page.hero.image.desktop, 'about page hero image desktop'),
        mobile: image(page.hero.image.mobile, 'about page hero image mobile'),
      },
    },
    intro: {
      id: introId,
      statement: page.intro.statement,
      paragraphs: texts(page.intro.paragraphs, 'about page intro paragraphs'),
      actions: required(page.intro.actions, 'about page intro actions').map(
        (action): AboutAction => ({
          label: action.label,
          href: action.href,
          variant: action.variant,
          arrow: action.arrow === true,
        }),
      ),
    },
    infoCards: required(page.infoCards, 'about page info cards').map((card): InfoCard => ({
      image: image(card.image, `about page info card ${card.title} image`),
      alt: altOf(card.image, `about page info card ${card.title} image`),
      title: card.title,
      paragraphs: texts(card.paragraphs, `about page info card ${card.title} paragraphs`),
      action: cardAction(card.action, `about page info card ${card.title} action`),
    })),
    departmentsHeading: page.departments,
    featuredDepartments: page.featuredDepartments.map((featured) => {
      const { id, slug } = resolved(featured, 'about page featured department')
      return required(
        departments.find((department) => department.id === id),
        `about page featured department ${slug}`,
      )
    }),
    values: {
      tag: page.values.tag,
      title: page.values.title,
      subline: page.values.subline,
      items: required(page.values.items, 'about page values').map((item): Value => ({
        thumbnail: image(item.thumbnail, `about page value ${item.label} thumbnail`),
        thumbnailMobile: image(
          item.thumbnailMobile,
          `about page value ${item.label} mobile thumbnail`,
        ),
        label: item.label,
        title: item.title,
        body: item.body,
      })),
    },
  }
}
