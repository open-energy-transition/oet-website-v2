import type { Payload } from 'payload'

import { seedProjects } from './seedProjects'
import { seedPublications } from './seedPublications'
import { seedTaxonomies } from './seedTaxonomies'

export const seed = async (payload: Payload) => {
  await seedTaxonomies(payload)
  await seedProjects(payload)
  await seedPublications(payload)
}
