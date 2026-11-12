import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import type { FrameTone, PartnerTag } from '../components/cards/types'
import PeopleGroup from '../icons/people-group.svg'
import type { Locale } from '../i18n/config'
import { t } from '../i18n/ui'
import { findAll, findGlobal, required, resolved, richHtml, type Doc } from '../lib/cms'
import { altOf, icon, image } from '../lib/media'
import { partnerTag, projectPeriod } from './projects'
import { routes } from './routes'

export type DepartmentAccent = 'red' | 'dark-red' | 'charcoal' | 'plum'

export interface ResponsiveImage {
  desktop: ImageMetadata
  mobile: ImageMetadata
}

export interface DepartmentHead {
  name: string
  role: string
  photo: ImageMetadata
}

export interface WorkTopic {
  title: string
  description: string | null
  icon: SvgComponent
}

export interface DepartmentProject {
  title: string
  excerpt: string
  period: string
  href: string
  image: ImageMetadata
  alt: string
  frame: FrameTone
  partnerTag: PartnerTag | null
}

export interface DepartmentDetail {
  cardImage: ResponsiveImage
  hero: {
    title: string
    lead: string
    image: ResponsiveImage
    background: 'brand-600' | 'brand-900' | 'neutral-900'
    ornament: 'department' | 'department-inverse'
    peopleCount: string
  }
  about: string
  works: {
    intro: string
    topics: WorkTopic[]
    outro: string | null
  }
  mobileColumn: 326 | 332
}

export interface Department {
  id: number
  slug: string
  name: string
  lead: string
  summary: string
  accent: DepartmentAccent
  icon: SvgComponent
  head: DepartmentHead
  detail: DepartmentDetail | null
}

export type DepartmentPage = {
  department: Department
  detail: DepartmentDetail
  projects: DepartmentProject[]
}

type DepartmentDoc = Doc<'departments'>
type ProjectDoc = Doc<'projects'>
type MediaPair = { desktop: Parameters<typeof image>[0]; mobile: Parameters<typeof image>[0] }

const mobileColumns = { '326': 326, '332': 332 } as const

const responsive = (pair: MediaPair, what: string): ResponsiveImage => ({
  desktop: image(pair.desktop, `${what} desktop`),
  mobile: image(pair.mobile, `${what} mobile`),
})

const toDetail = (doc: DepartmentDoc): DepartmentDetail => {
  const what = `department ${doc.slug}`
  const detail = required(doc.detail, `${what} detail`)
  return {
    cardImage: responsive(detail.cardImage, `${what} card image`),
    hero: {
      title: required(detail.hero.title, `${what} hero title`),
      lead: required(detail.hero.lead, `${what} hero lead`),
      image: responsive(detail.hero.image, `${what} hero image`),
      background: required(detail.hero.background, `${what} hero background`),
      ornament: required(detail.hero.ornament, `${what} hero ornament`),
      peopleCount: required(detail.hero.peopleCount, `${what} people count`),
    },
    about: richHtml(detail.aboutHtml, `${what} about`),
    works: {
      intro: richHtml(detail.worksIntroHtml, `${what} works intro`),
      topics: required(detail.topics, `${what} topics`).map((topic) => ({
        title: topic.title,
        description: topic.description === undefined ? null : topic.description,
        icon: icon(topic.icon),
      })),
      outro:
        detail.worksOutro === null || detail.worksOutro === undefined
          ? null
          : richHtml(detail.worksOutroHtml, `${what} works outro`),
    },
    mobileColumn: mobileColumns[required(detail.mobileColumn, `${what} mobile column`)],
  }
}

const toDepartment = (doc: DepartmentDoc): Department => {
  const head = resolved(doc.head, `department ${doc.slug} head`)
  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    lead: doc.lead,
    summary: doc.summary,
    accent: doc.accent,
    icon: icon(doc.icon),
    head: {
      name: head.name,
      role: head.role,
      photo: image(head.photo, `photo of ${head.name}`),
    },
    detail: doc.hasDetailPage === true ? toDetail(doc) : null,
  }
}

const toProject = (doc: ProjectDoc): DepartmentProject => ({
  title: doc.title,
  excerpt: doc.excerpt,
  period: projectPeriod(doc),
  href: routes.successStory(doc.slug),
  image: image(doc.thumbnail, `project ${doc.slug} thumbnail`),
  alt: altOf(doc.thumbnail, `project ${doc.slug} thumbnail`),
  frame: doc.frame,
  partnerTag: partnerTag(doc.partnerTag, `project ${doc.slug} partner tag`),
})

export const loadDepartments = async (locale: Locale): Promise<Department[]> => {
  const docs = await findAll('departments', locale, { depth: 2, sort: 'order' })
  return docs.map(toDepartment)
}

const loadDepartmentProjects = async (
  locale: Locale,
  department: Department,
): Promise<DepartmentProject[]> => {
  const docs = await findAll('projects', locale, {
    depth: 2,
    sort: 'createdAt',
    where: { 'where[departments][contains]': String(department.id) },
  })
  return docs.map(toProject)
}

export const loadDepartmentPages = async (locale: Locale): Promise<DepartmentPage[]> => {
  const departments = await loadDepartments(locale)
  return Promise.all(
    departments.flatMap((department) => {
      const { detail } = department
      return detail === null
        ? []
        : [
            loadDepartmentProjects(locale, department).then((projects) => ({
              department,
              detail,
              projects,
            })),
          ]
    }),
  )
}

export const loadDepartmentsPage = async (locale: Locale) => {
  const page = await findGlobal('departments-page', locale, 1)
  return {
    meta: page.meta,
    hero: {
      title: page.hero.title,
      lead: page.hero.lead,
      image: responsive(page.hero.image, 'departments page hero image'),
      count: page.hero.count,
      icon: icon(page.hero.icon),
    },
    heading: page.listing,
  }
}

export const departmentCard = (locale: Locale, department: Department) => ({
  variant: department.detail === null ? ('compact' as const) : ('full' as const),
  name: department.name,
  lead: department.lead,
  summary: department.summary,
  accent: department.accent,
  icon: department.icon,
  head: department.head,
  link:
    department.detail === null
      ? null
      : {
          label: t(locale, 'card.viewDepartment'),
          href: routes.department(department.slug),
        },
  image: department.detail === null ? null : department.detail.cardImage,
})

export const heroStats = (locale: Locale, icon: SvgComponent, value: string, label: string) => ({
  groups: [
    [
      { kind: 'icon' as const, icon, tone: 'brand' as const },
      { kind: 'icon' as const, icon: PeopleGroup, tone: 'light' as const },
      { kind: 'count' as const, value, label, tone: 'glass' as const },
    ],
  ],
  action: {
    href: routes.team,
    label: t(locale, 'department.meetTheTeam'),
    icon: 'arrow-right' as const,
  },
})
