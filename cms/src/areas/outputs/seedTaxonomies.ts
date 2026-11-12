import type { Payload } from 'payload'

import { content, rows, upload, upsert } from '../../seed/lib'
import { slugOf, tagNameOf, unique, type TestimonialSource } from './seedSource'

interface TaggedContent {
  detail: { region: string; tags: string[] }
}

interface ProjectsContent {
  projects: TaggedContent[]
}

interface PublicationsContent {
  publications: (TaggedContent & { category: string })[]
}

interface OutputsContent {
  testimonials: { items: TestimonialSource[] }
}

const filterRegions = ['Africa', 'Asia', 'Australia/Oceania', 'Europe', 'North America']

const seedNamed = async (
  payload: Payload,
  collection: 'regions' | 'tags' | 'publication-categories',
  names: string[],
) => {
  for (const name of names) {
    const slug = slugOf(name)
    await upsert(payload, collection, { slug: { equals: slug } }, { name, slug })
  }
}

export const seedTaxonomies = async (payload: Payload) => {
  const { projects } = await content<ProjectsContent>('projects')
  const { publications } = await content<PublicationsContent>('publications')
  const { testimonials } = await content<OutputsContent>('outputs')
  const documents = [...projects, ...publications]

  await seedNamed(
    payload,
    'regions',
    unique([...filterRegions, ...documents.map((document) => document.detail.region)]),
  )
  await seedNamed(
    payload,
    'tags',
    unique(documents.flatMap((document) => document.detail.tags.map(tagNameOf))),
  )
  await seedNamed(
    payload,
    'publication-categories',
    unique(publications.map((publication) => publication.category)),
  )

  const seen = new Set<string>()
  for (const testimonial of testimonials.items) {
    if (seen.has(testimonial.name)) continue
    seen.add(testimonial.name)
    await upsert(
      payload,
      'testimonials',
      { name: { equals: testimonial.name } },
      {
        quote: testimonial.quote,
        paragraphs: rows(testimonial.paragraphs),
        name: testimonial.name,
        role: testimonial.role,
        portrait: await upload(payload, testimonial.portrait, testimonial.name),
        company: testimonial.company,
        logo: await upload(payload, testimonial.logo, testimonial.company),
      },
    )
  }
}
