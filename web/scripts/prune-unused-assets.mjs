import { readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const textFiles = /\.(html|css|js|mjs|xml|json|svg)$/

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })

const textOf = (directory) =>
  walk(directory)
    .filter((path) => textFiles.test(path))
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n')

export const pruneUnusedAssets = () => {
  let serverDir = null
  let serverText = null
  return {
    name: 'prune-unused-assets',
    hooks: {
      'astro:config:done': ({ config }) => {
        serverDir = fileURLToPath(config.build.server)
      },
      'astro:build:ssr': () => {
        if (serverDir === null) throw new Error('prune-unused-assets: build.server is unknown')
        serverText = textOf(serverDir)
      },
      'astro:build:done': ({ dir, logger }) => {
        if (serverText === null) throw new Error('prune-unused-assets: the server build was not read')
        const root = fileURLToPath(dir)
        const assets = join(root, '_astro')
        const text = `${textOf(root)}\n${serverText}`
        const unused = readdirSync(assets).filter((name) => !text.includes(name))
        const bytes = unused.reduce((sum, name) => sum + statSync(join(assets, name)).size, 0)
        for (const name of unused) rmSync(join(assets, name))
        logger.info(`removed ${unused.length} unreferenced files (${(bytes / 1e6).toFixed(1)} MB)`)
      },
    },
  }
}
