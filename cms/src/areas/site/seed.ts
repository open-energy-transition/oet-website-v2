import type { Payload } from 'payload'

import { seedHome } from './seedHome'
import { seedShell } from './seedShell'

export const seed = async (payload: Payload) => {
  await seedHome(payload)
  await seedShell(payload)
}
