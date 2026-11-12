import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const [, , folder, ...filters] = process.argv
if (!folder)
  throw new Error('usage: node scripts/snapshot-all.mjs <output folder> [route prefix...]')

const origin = 'http://localhost:4321'
const widths = [1440, 412]
const workers = 4

const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const discovered = walk('dist')
  .filter((file) => file.endsWith('index.html'))
  .map((file) =>
    file
      .split(/[\\/]/)
      .join('/')
      .replace(/^dist/, '')
      .replace(/index\.html$/, ''),
  )
  .map((route) => (route === '/' ? route : route.replace(/\/$/, '')))
  .concat(['/dev/shared', '/dev/shell'])
  .sort()

const routes =
  filters.length > 0
    ? discovered.filter((route) =>
        filters.some((filter) => route === filter || route.startsWith(`${filter}/`)),
      )
    : discovered

const fileName = (route, width) =>
  `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '__')}-${width}.png`

mkdirSync(folder, { recursive: true })
const browser = await chromium.launch()
const jobs = routes.flatMap((route) => widths.map((width) => ({ route, width })))
const results = []

const shoot = async ({ route, width }) => {
  const context = await browser.newContext({
    viewport: { width, height: width >= 1024 ? 900 : 917 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  await context.routeWebSocket(/./, () => {})
  const page = await context.newPage()
  const problems = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(String(error)))
  const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  await page.addStyleTag({
    content:
      '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}',
  })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y)
    await page.waitForTimeout(100)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready.then(() => true))
  await page.waitForFunction(
    () =>
      [...document.images].every((image) => {
        const rect = image.getBoundingClientRect()
        const offscreen = rect.width === 0 || rect.right < 0 || rect.left > innerWidth
        return image.complete || offscreen
      }),
    null,
    { timeout: 30000 },
  )
  await page.waitForTimeout(800)
  const file = fileName(route, width)
  await page.screenshot({ path: join(folder, file), fullPage: true })
  results.push({ route, width, file, status: response.status(), height, problems })
  await context.close()
}

const queue = [...jobs]
await Promise.all(
  Array.from({ length: workers }, async () => {
    while (queue.length > 0) await shoot(queue.shift())
  }),
)
await browser.close()

results.sort((a, b) => a.file.localeCompare(b.file))
writeFileSync(join(folder, 'index.json'), JSON.stringify(results, null, 1))
const flagged = results.filter((result) => result.status !== 200 || result.problems.length > 0)
console.log(
  JSON.stringify({ folder, routes: routes.length, shots: results.length, flagged }, null, 1),
)
