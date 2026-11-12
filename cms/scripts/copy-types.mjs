import { copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../src/payload-types.ts', import.meta.url))
const target = fileURLToPath(new URL('../../web/src/lib/payload-types.ts', import.meta.url))

await copyFile(source, target)
