import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const pages = walk('dist').filter((file) => file.endsWith('index.html'))
const routes = pages.map((file) => {
  const route = file
    .split(/[\\/]/)
    .join('/')
    .replace(/^dist/, '')
    .replace(/index\.html$/, '')
  return route === '/' ? route : route.replace(/\/$/, '')
})
const known = new Set(routes)

const broken = new Map()
for (const file of pages) {
  const html = readFileSync(file, 'utf8')
  for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"#?]*)[^"]*"/g)) {
    const target = href === '/' ? href : href.replace(/\/$/, '')
    if (!known.has(target)) {
      if (!broken.has(target)) broken.set(target, 0)
      broken.set(target, broken.get(target) + 1)
    }
  }
}
console.log(
  JSON.stringify({ routes: routes.length, brokenLinks: Object.fromEntries(broken) }, null, 1),
)

const browser = await chromium.launch()
for (const width of [1440, 412]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await context.newPage()
  let problems = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(String(error)))
  for (const route of routes) {
    problems = []
    const response = await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' })
    const metrics = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      missingAlt: [...document.querySelectorAll('img:not([alt])')].length,
    }))
    const flagged =
      response.status() !== 200 ||
      problems.length > 0 ||
      metrics.overflowX > 0 ||
      metrics.h1 !== 1 ||
      metrics.missingAlt > 0
    if (flagged)
      console.log(
        JSON.stringify({
          width,
          route,
          status: response.status(),
          ...metrics,
          problems: problems.slice(0, 3),
        }),
      )
  }
  await context.close()
}
await browser.close()
console.log('sweep finished')
