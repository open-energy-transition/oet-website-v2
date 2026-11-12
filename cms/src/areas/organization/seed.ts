import type { Payload } from 'payload'

import { seedPages } from './seedPages'
import { seedPartners } from './seedPartners'
import { seedPeople } from './seedPeople'

export const seed = async (payload: Payload) => {
  await seedPeople(payload)
  await seedPartners(payload)
  await seedPages(payload)
}
