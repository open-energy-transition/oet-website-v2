import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from '../payload.config'
import { runOldSiteImport } from './run'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const reportFile = path.resolve(dirname, '../../../docs/reports/old-site-import.md')

const payload = await getPayload({ config })
const report = await runOldSiteImport(payload)

await mkdir(path.dirname(reportFile), { recursive: true })
await writeFile(reportFile, report)
payload.logger.info(`Old site import finished; report in ${reportFile}`)
process.exit(0)
