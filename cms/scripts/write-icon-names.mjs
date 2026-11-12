import { readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const iconsDir = fileURLToPath(new URL('../../web/src/icons', import.meta.url))
const target = fileURLToPath(new URL('../src/fields/iconNames.ts', import.meta.url))

const names = (await readdir(iconsDir))
  .filter((file) => file.endsWith('.svg'))
  .map((file) => file.slice(0, -'.svg'.length))
  .sort()

const lines = names.map((name) => `  '${name}',`).join('\n')

await writeFile(
  target,
  `export const iconNames = [\n${lines}\n] as const\n\nexport type IconName = (typeof iconNames)[number]\n`,
)
