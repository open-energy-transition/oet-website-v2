import { getPayload, type Payload } from 'payload'

import { seed as seedCatalog } from '../areas/catalog/seed'
import { seed as seedEvents } from '../areas/events/seed'
import { seed as seedOrganization } from '../areas/organization/seed'
import { seed as seedOutputs } from '../areas/outputs/seed'
import { seed as seedSite } from '../areas/site/seed'
import config from '../payload.config'
import { seed as seedCore } from './core'

const steps: [string, (payload: Payload) => Promise<void>][] = [
  ['core', seedCore],
  ['organization', seedOrganization],
  ['catalog', seedCatalog],
  ['events', seedEvents],
  ['outputs', seedOutputs],
  ['site', seedSite],
]

const requested = process.env.SEED_AREAS
const selected = requested ? requested.split(',') : steps.map(([name]) => name)

for (const name of selected)
  if (!steps.some(([step]) => step === name)) throw new Error(`Unknown seed area: ${name}`)

const payload = await getPayload({ config })

for (const [name, run] of steps) {
  if (!selected.includes(name)) continue
  payload.logger.info(`Seeding ${name}`)
  await run(payload)
}

payload.logger.info('Seed finished')
process.exit(0)
