import type { SvgComponent } from 'astro/types'
import type { Locale } from '../i18n/config'
import { findAll, findGlobal, required, richHtml, texts } from '../lib/cms'
import { icon, image } from '../lib/media'

export type JobTheme =
  | 'finance'
  | 'people-and-culture'
  | 'software-engineering'
  | 'research-and-market-development'
  | 'modeling-tools-and-data'
  | 'energy-system-modeling'
  | 'grid-data'
  | 'miscellaneous'

export interface Job {
  title: string
  location: string
  languages: string
  workMode: string
  employmentType: string
  href: string
  newTab: boolean
  theme: JobTheme
}

export interface HiringStep {
  number: string
  text: string
  icon: SvgComponent
}

const rolesId = 'open-roles'

const singleParagraph = /^<p>((?:(?!<\/?p>)[\s\S])*)<\/p>$/

const paragraphContent = (html: string, what: string): string => {
  const match = singleParagraph.exec(html)
  if (!match) throw new Error(`${what} must be a single paragraph`)
  return match[1]
}

const stepNumber = (index: number): string => String(index + 1).padStart(2, '0')

export const loadCareerPage = async (locale: Locale) => {
  const [page, jobs] = await Promise.all([
    findGlobal('career-page', locale, 1),
    findAll('jobs', locale, { depth: 0, sort: 'title' }),
  ])
  return {
    meta: page.meta,
    hero: {
      title: page.hero.title,
      lead: texts(page.hero.lead, 'career page hero lead'),
      image: {
        desktop: image(page.hero.image.desktop, 'career page hero image desktop'),
        mobile: image(page.hero.image.mobile, 'career page hero image mobile'),
      },
      icon: icon(page.hero.icon),
      count: page.hero.count,
      action: page.hero.action,
    },
    roles: {
      id: rolesId,
      tag: page.roles.tag,
      title: page.roles.title,
      columns: required(page.roles.columns, 'career page roles columns').map((column, index) =>
        paragraphContent(
          richHtml(column.textHtml, `career page roles column ${index + 1}`),
          `career page roles column ${index + 1}`,
        ),
      ),
      jobs: jobs.map((job): Job => ({
        title: job.title,
        location: job.location,
        languages: job.languages,
        workMode: job.workMode,
        employmentType: job.employmentType,
        href: job.href,
        newTab: job.newTab === true,
        theme: job.theme,
      })),
    },
    hiring: {
      title: page.hiring.title,
      paragraphs: texts(page.hiring.paragraphs, 'career page hiring paragraphs'),
      steps: required(page.hiring.steps, 'career page hiring steps').map(
        (step, index): HiringStep => ({
          number: stepNumber(index),
          text: step.text,
          icon: icon(step.icon),
        }),
      ),
    },
  }
}
