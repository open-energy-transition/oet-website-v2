import type { Payload } from 'payload'

import { seedEvents } from './seedEvents'
import { seedPages } from './seedPages'

export const seed = async (payload: Payload) => {
  await seedEvents(payload)
  await seedPages(payload)
}
