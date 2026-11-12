import type { Payload } from 'payload'

import type { IconName } from '../../fields/iconNames'
import type { Job, TheoryOfChangePage } from '../../payload-types'
import {
  content,
  findId,
  lexical,
  rows,
  upload,
  upsert,
  type Asset,
  type IconRef,
} from '../../seed/lib'
import { seniorLeadershipLabel, type DepartmentsSource, type TeamSource } from './seedPeople'
import {
  assertNumbered,
  coordinatesOf,
  iconName,
  linkOf,
  responsive,
  type CountSource,
  type LinkSource,
  type MetaSource,
  type ResponsiveAsset,
  type ViewSource,
} from './seedSource'

type Tone = 'brand' | 'light'
type Variant = 'primary' | 'secondary'
type OutcomeColumn = NonNullable<TheoryOfChangePage['outcomes']['columns']>[number]
type Pin = NonNullable<TheoryOfChangePage['globe']['pins']>[number]

interface ActionSource extends LinkSource {
  variant: Variant
  arrow: boolean
}

interface HeadingSource {
  tag: string
  title: string
}

interface AboutSource {
  featuredDepartments: string[]
  hero: { title: string; links: LinkSource[]; image: ResponsiveAsset }
  infoCards: {
    image: Asset
    alt: string
    title: string
    paragraphs: string[]
    action: LinkSource | null
  }[]
  intro: { statement: string; paragraphs: string[]; actions: ActionSource[] }
  meta: MetaSource
  values: {
    tag: string
    title: string
    subline: string
    items: {
      thumbnail: Asset
      thumbnailMobile: Asset
      label: string
      title: string
      body: string
    }[]
  }
}

interface DepartmentsPageSource extends DepartmentsSource {
  departmentsHeading: HeadingSource
  departmentsIndex: {
    meta: MetaSource
    hero: {
      title: string
      lead: string
      image: ResponsiveAsset
      count: CountSource
      icon: IconRef
    }
  }
}

interface TeamPageSource extends TeamSource {
  continents: { label: string; items: CountSource[] }
  globe: { view: ViewSource; selected: string }
  teamPage: {
    meta: MetaSource
    hero: { title: string; lead: string[]; stats: CountSource[]; image: ResponsiveAsset }
    intro: { tag: string; title: string; subline: string; actions: ActionSource[] }
    listing: { title: string; mobileDescription: string }
  }
}

interface PartnersPageSource {
  filter: { options: LinkSource[] }
  hero: {
    title: string
    image: ResponsiveAsset
    stats: (CountSource & { icon: IconRef; tone: Tone })[]
  }
  intro: { statement: string; paragraphs: string[] }
  meta: MetaSource
}

interface CareerSource {
  hero: {
    title: string
    lead: string[]
    image: ResponsiveAsset
    icon: IconRef
    count: CountSource
    action: LinkSource
  }
  hiring: {
    title: string
    paragraphs: string[]
    steps: { number: string; text: string; icon: IconRef }[]
  }
  meta: MetaSource
  roles: {
    tag: string
    title: string
    columns: string[]
    jobs: {
      title: string
      location: string
      languages: string
      workMode: string
      employmentType: string
      href: string
      newTab: boolean
      theme: Job['theme']
    }[]
  }
}

interface CaptionSource {
  label: string
  statement: string
  emphasis: string | null
  details: string[]
}

interface TheorySource {
  theoryPage: {
    meta: MetaSource
    hero: { title: string; lead: string[]; links: LinkSource[]; image: ResponsiveAsset }
    scene: { challenge: CaptionSource; goal: CaptionSource; values: string[] }
    approach: {
      mobileTag: string
      title: string
      subline: string
      steps: { number: string; title: string; text: string; image: Asset | null }[]
    }
    outcomes: {
      title: string
      columns: {
        output: string
        description: string
        outcome: string
        icon: OutcomeColumn['icon']
        tone: OutcomeColumn['tone']
      }[]
    }
    impact: { title: string; text: string }
    globe: {
      view: ViewSource
      pins: { icon: Pin['icon']; lon: number; lat: number; scale: number }[]
    }
  }
}

const teamStatIcons: { icon: IconName; tone: Tone }[] = [
  { icon: 'globe-alt', tone: 'brand' },
  { icon: 'employees', tone: 'light' },
  { icon: 'model-cube-space', tone: 'light' },
]

const actionOf = ({ label, href, variant, arrow }: ActionSource) => ({
  label,
  href,
  variant,
  arrow,
})

const countOf = ({ value, label }: CountSource) => ({ value, label })

const headingOf = ({ tag, title }: HeadingSource) => ({ tag, title })

const captionOf = (caption: CaptionSource) => ({
  label: caption.label,
  statement: caption.statement,
  emphasis: caption.emphasis,
  details: rows(caption.details),
})

const filterLabel = (options: LinkSource[], type: string) => {
  const option = options.find((candidate) => candidate.href.endsWith(`?type=${type}`))
  if (!option) throw new Error(`The partners filter has no option for ${type}`)
  return option.label
}

const seedAbout = async (payload: Payload) => {
  const about = await content<AboutSource>('about')
  const { departmentsHeading } = await content<DepartmentsPageSource>('departments')
  const infoCards = []
  for (const card of about.infoCards)
    infoCards.push({
      image: await upload(payload, card.image, card.alt),
      title: card.title,
      paragraphs: rows(card.paragraphs),
      action: card.action === null ? { label: null, href: null } : linkOf(card.action),
    })
  const items = []
  for (const value of about.values.items)
    items.push({
      thumbnail: await upload(payload, value.thumbnail, ''),
      thumbnailMobile: await upload(payload, value.thumbnailMobile, ''),
      label: value.label,
      title: value.title,
      body: value.body,
    })
  const featuredDepartments = []
  for (const slug of about.featuredDepartments)
    featuredDepartments.push(await findId(payload, 'departments', { slug: { equals: slug } }))
  await payload.updateGlobal({
    slug: 'about-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: about.hero.title,
        links: about.hero.links.map(linkOf),
        image: await responsive(payload, about.hero.image),
      },
      intro: {
        statement: about.intro.statement,
        paragraphs: rows(about.intro.paragraphs),
        actions: about.intro.actions.map(actionOf),
      },
      infoCards,
      departments: headingOf(departmentsHeading),
      featuredDepartments,
      values: {
        tag: about.values.tag,
        title: about.values.title,
        subline: about.values.subline,
        items,
      },
      meta: about.meta,
    },
  })
}

const seedDepartmentsPage = async (payload: Payload) => {
  const { departmentsHeading, departmentsIndex } =
    await content<DepartmentsPageSource>('departments')
  await payload.updateGlobal({
    slug: 'departments-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: departmentsIndex.hero.title,
        lead: departmentsIndex.hero.lead,
        image: await responsive(payload, departmentsIndex.hero.image),
        count: countOf(departmentsIndex.hero.count),
        icon: iconName(departmentsIndex.hero.icon),
      },
      listing: headingOf(departmentsHeading),
      meta: departmentsIndex.meta,
    },
  })
}

const seedTeamPage = async (payload: Payload) => {
  const team = await content<TeamPageSource>('team')
  const departments = await content<DepartmentsSource>('departments')
  const { hero, intro, listing, meta } = team.teamPage
  if (hero.stats.length !== teamStatIcons.length)
    throw new Error(
      `The team hero has ${hero.stats.length} stats, expected ${teamStatIcons.length}`,
    )
  await payload.updateGlobal({
    slug: 'team-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: hero.title,
        lead: rows(hero.lead),
        stats: hero.stats.map((stat, index) => ({ ...countOf(stat), ...teamStatIcons[index] })),
        image: await responsive(payload, hero.image),
      },
      intro: {
        tag: intro.tag,
        title: intro.title,
        subline: intro.subline,
        actions: intro.actions.map(actionOf),
      },
      globe: {
        view: coordinatesOf(team.globe.view),
        selectedCountry: await findId(payload, 'countries', {
          code: { equals: team.globe.selected },
        }),
      },
      continents: {
        label: team.continents.label,
        items: team.continents.items.map(countOf),
      },
      listing: {
        title: listing.title,
        mobileDescription: listing.mobileDescription,
        seniorLeadershipLabel: seniorLeadershipLabel(team, departments),
      },
      meta,
    },
  })
}

const seedPartnersPage = async (payload: Payload) => {
  const partners = await content<PartnersPageSource>('partners')
  await payload.updateGlobal({
    slug: 'partners-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: partners.hero.title,
        stats: partners.hero.stats.map((stat) => ({
          ...countOf(stat),
          icon: iconName(stat.icon),
          tone: stat.tone,
        })),
        image: await responsive(payload, partners.hero.image),
      },
      intro: {
        statement: partners.intro.statement,
        paragraphs: rows(partners.intro.paragraphs),
      },
      filter: {
        fundersLabel: filterLabel(partners.filter.options, 'funders'),
        partnersLabel: filterLabel(partners.filter.options, 'partners'),
      },
      meta: partners.meta,
    },
  })
}

const seedCareer = async (payload: Payload) => {
  const career = await content<CareerSource>('career')
  for (const job of career.roles.jobs)
    await upsert(
      payload,
      'jobs',
      { title: { equals: job.title } },
      {
        title: job.title,
        location: job.location,
        languages: job.languages,
        workMode: job.workMode,
        employmentType: job.employmentType,
        href: job.href,
        newTab: job.newTab,
        theme: job.theme,
      },
    )
  assertNumbered(career.hiring.steps, 'Hiring step')
  const columns = []
  for (const column of career.roles.columns)
    columns.push({ text: await lexical(payload, `<p>${column}</p>`) })
  await payload.updateGlobal({
    slug: 'career-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: career.hero.title,
        lead: rows(career.hero.lead),
        image: await responsive(payload, career.hero.image),
        icon: iconName(career.hero.icon),
        count: countOf(career.hero.count),
        action: linkOf(career.hero.action),
      },
      roles: { tag: career.roles.tag, title: career.roles.title, columns },
      hiring: {
        title: career.hiring.title,
        paragraphs: rows(career.hiring.paragraphs),
        steps: career.hiring.steps.map((step) => ({
          text: step.text,
          icon: iconName(step.icon),
        })),
      },
      meta: career.meta,
    },
  })
}

const seedTheory = async (payload: Payload) => {
  const { theoryPage } = await content<TheorySource>('theory-of-change')
  const { hero, scene, approach, outcomes, impact, globe, meta } = theoryPage
  assertNumbered(approach.steps, 'Approach step')
  const steps = []
  for (const step of approach.steps)
    steps.push({
      title: step.title,
      text: step.text,
      image: step.image === null ? null : await upload(payload, step.image, ''),
    })
  await payload.updateGlobal({
    slug: 'theory-of-change-page',
    depth: 0,
    data: {
      _status: 'published',
      hero: {
        title: hero.title,
        lead: rows(hero.lead),
        links: hero.links.map(linkOf),
        image: await responsive(payload, hero.image),
      },
      scene: {
        challenge: captionOf(scene.challenge),
        goal: captionOf(scene.goal),
        values: rows(scene.values),
      },
      approach: {
        mobileTag: approach.mobileTag,
        title: approach.title,
        subline: approach.subline,
        steps,
      },
      outcomes: {
        title: outcomes.title,
        columns: outcomes.columns.map(({ output, description, outcome, icon, tone }) => ({
          output,
          description,
          outcome,
          icon,
          tone,
        })),
      },
      impact: { title: impact.title, text: impact.text },
      globe: {
        view: coordinatesOf(globe.view),
        pins: globe.pins.map((pin) => ({
          icon: pin.icon,
          longitude: pin.lon,
          latitude: pin.lat,
          scale: pin.scale,
        })),
      },
      meta,
    },
  })
}

export const seedPages = async (payload: Payload) => {
  await seedAbout(payload)
  await seedDepartmentsPage(payload)
  await seedTeamPage(payload)
  await seedPartnersPage(payload)
  await seedCareer(payload)
  await seedTheory(payload)
}
