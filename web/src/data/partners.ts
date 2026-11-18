import type { SvgComponent } from 'astro/types'
import type { Locale } from '../i18n/config'
import { t } from '../i18n/ui'
import { findAll, findGlobal, required, texts, type Doc } from '../lib/cms'
import { facet } from '../lib/listing'
import { icon, image, optionalImage } from '../lib/media'
import { logoFits, partnerMark, type PartnerMark } from '../lib/logoSize'
import { routes } from './routes'

export interface PartnerStat {
  icon: SvgComponent
  tone: 'brand' | 'light'
  value: string
  label: string
}

const logoColumns = 4

const toLogo = (partner: Doc<'partners'>): PartnerMark =>
  partnerMark(
    partner.name,
    optionalImage(partner.logo, `partner ${partner.name} logo`),
    partner.logoDesktop,
    logoFits.desktop,
    `partner ${partner.name} logo size`,
  )

const columnByColumn = <Item>(items: Item[], columns: number): Item[] =>
  Array.from({ length: columns }, (_, column) =>
    items.filter((_, index) => index % columns === column),
  ).flat()

export const loadPartnersPage = async (locale: Locale) => {
  const [page, partners] = await Promise.all([
    findGlobal('partners-page', locale, 1),
    findAll('partners', locale, {
      depth: 1,
      sort: 'order',
      where: { 'where[showOnPartnersPage][equals]': 'true' },
    }),
  ])
  const logos = partners.map(toLogo)
  const types = partners.map((partner) => ({
    type: facet([
      ...(partner.isFunder === true ? ['funders'] : []),
      ...(partner.isPartner === true ? ['partners'] : []),
    ]),
  }))
  return {
    meta: page.meta,
    hero: {
      title: page.hero.title,
      image: {
        desktop: image(page.hero.image.desktop, 'partners page hero image desktop'),
        mobile: image(page.hero.image.mobile, 'partners page hero image mobile'),
      },
      stats: required(page.hero.stats, 'partners page hero stats').map((stat): PartnerStat => ({
        icon: icon(stat.icon),
        tone: stat.tone,
        value: stat.value,
        label: stat.label,
      })),
    },
    intro: {
      statement: page.intro.statement,
      paragraphs: texts(page.intro.paragraphs, 'partners page intro paragraphs'),
    },
    filter: {
      options: [
        { label: t(locale, 'tabs.showAll'), href: `${routes.partners}?type=all`, active: true },
        {
          label: page.filter.fundersLabel,
          href: `${routes.partners}?type=funders`,
          active: false,
        },
        {
          label: page.filter.partnersLabel,
          href: `${routes.partners}?type=partners`,
          active: false,
        },
      ],
    },
    logos,
    logosMobile: columnByColumn(logos, logoColumns),
    types,
    typesMobile: columnByColumn(types, logoColumns),
  }
}
