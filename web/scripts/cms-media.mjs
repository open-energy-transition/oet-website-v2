import { existsSync } from 'node:fs'
import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const envFile = fileURLToPath(new URL('../.env', import.meta.url))
const target = fileURLToPath(new URL('../src/assets/cms', import.meta.url))
const cache = fileURLToPath(new URL('../node_modules/.cache/cms-media', import.meta.url))

const cmsUrl = () => {
  if (existsSync(envFile)) process.loadEnvFile(envFile)
  const url = process.env.PAYLOAD_URL
  if (!url) throw new Error('PAYLOAD_URL is not set')
  return url
}

const sizeOf = async (path) => (existsSync(path) ? (await stat(path)).size : -1)

const removeStale = async (directory, wanted) => {
  const stale = (await readdir(directory)).filter((name) => !wanted.has(name))
  for (const name of stale) await rm(join(directory, name))
  return stale.length
}

export const syncMedia = async () => {
  const base = cmsUrl()
  const response = await fetch(new URL('/api/media?limit=0&depth=0', base))
  if (!response.ok) throw new Error(`CMS answered ${response.status} for the media list`)
  const { docs } = await response.json()
  await mkdir(target, { recursive: true })
  await mkdir(cache, { recursive: true })
  const wanted = new Set(docs.map((doc) => doc.filename))
  const removed = await removeStale(target, wanted)
  await removeStale(cache, wanted)
  let downloaded = 0
  for (const doc of docs) {
    const cached = join(cache, doc.filename)
    if ((await sizeOf(cached)) !== doc.filesize) {
      const file = await fetch(new URL(doc.url, base))
      if (!file.ok) throw new Error(`CMS answered ${file.status} for ${doc.url}`)
      await writeFile(cached, Buffer.from(await file.arrayBuffer()))
      downloaded += 1
    }
    const path = join(target, doc.filename)
    if ((await sizeOf(path)) !== doc.filesize) await copyFile(cached, path)
  }
  return { total: docs.length, downloaded, removed }
}

export const cmsMedia = () => ({
  name: 'cms-media',
  hooks: {
    'astro:config:setup': async ({ command, logger }) => {
      if (command !== 'dev' && command !== 'build') return
      const result = await syncMedia()
      logger.info(
        `${result.total} media files, ${result.downloaded} downloaded, ${result.removed} removed`,
      )
    },
  },
})
