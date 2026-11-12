import type { Payload } from 'payload'

import { seedEventBanners } from './seedBanners'
import { seedServices } from './seedServices'
import { seedTools } from './seedTools'

export const seed = async (payload: Payload) => {
  await seedEventBanners(payload)
  await seedTools(payload)
  await seedServices(payload)
}
