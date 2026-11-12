import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium, firefox, webkit } from 'playwright'

const [, , origin, folder, mode, ...filters] = process.argv
if (!origin || !folder || !['engines', 'widths'].includes(mode))
  throw new Error(
    'usage: node scripts/cross-browser.mjs <origin> <output folder> <engines | widths> [route part...]',
  )

const launchers = { chromium, firefox, webkit }
const plans = {
  engines: { engines: ['chromium', 'firefox', 'webkit'], widths: [1440, 412] },
  widths: { engines: ['chromium'], widths: [360, 390, 768, 1023, 1024, 1280, 1920] },
}
const plan = plans[mode]

const dynamic = [
  [/^\/organization\/departments\/.+/, '/organization/departments/energy-system-modeling'],
  [
    /^\/organization\/news-and-events\/.+-2$/,
    '/organization/news-and-events/free-monthly-pypsa-support-for-european-transmission-system-operators-2',
  ],
  [
    /^\/organization\/news-and-events\/.+/,
    '/organization/news-and-events/free-monthly-pypsa-support-for-european-transmission-system-operators',
  ],
  [
    /^\/outputs\/publications\/.+/,
    '/outputs/publications/the-state-of-solvers-for-energy-planning',
  ],
  [/^\/outputs\/success-stories\/.+/, '/outputs/success-stories/e-fuels-in-australia'],
  [/^\/services\/.+/, '/services/system-operators-and-utilities'],
]

const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const discovered = walk('dist/client')
  .filter((file) => file.endsWith('index.html'))
  .map((file) =>
    file
      .split(/[\\/]/)
      .join('/')
      .replace(/^dist\/client/, '')
      .replace(/index\.html$/, ''),
  )
  .map((route) => (route === '/' ? route : route.replace(/\/$/, '')))

const routes = [
  ...new Set(
    discovered.map((route) => {
      const match = dynamic.find(([pattern]) => pattern.test(route))
      return match ? match[1] : route
    }),
  ),
]
  .filter((route) => filters.length === 0 || filters.some((filter) => route.includes(filter)))
  .sort()

const fileName = (route, width) =>
  `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '__')}-${width}.png`

const measure = () => {
  const viewport = document.documentElement.clientWidth
  const key = (element) => {
    const parts = []
    let node = element
    while (node && node !== document.body) {
      const index = [...node.parentElement.children].indexOf(node)
      parts.unshift(`${node.tagName.toLowerCase()}:${index}`)
      node = node.parentElement
    }
    return parts.join('>')
  }
  const describe = (element) =>
    `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''} "${element.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)}" [${String(element.getAttribute('class')).slice(0, 70)}]`
  const scrollable = (element) => {
    let node = element.parentElement
    while (node && node !== document.body) {
      const style = getComputedStyle(node)
      if (/(auto|scroll)/.test(style.overflowX) && node.scrollWidth > node.clientWidth) return true
      node = node.parentElement
    }
    return false
  }
  const fixed = (element) => {
    let node = element
    while (node && node !== document.body) {
      if (getComputedStyle(node).position === 'fixed') return true
      node = node.parentElement
    }
    return false
  }
  const boxes = {}
  const clipped = []
  const outside = []
  for (const element of document.body.querySelectorAll('*')) {
    if (element.closest('svg') && element.tagName.toLowerCase() !== 'svg') continue
    const rect = element.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) continue
    boxes[key(element)] = [
      Math.round(rect.top + scrollY),
      Math.round(rect.height * 10) / 10,
      Math.round(rect.left),
      Math.round(rect.width * 10) / 10,
      describe(element),
    ]
    const ownText = [...element.childNodes].some(
      (node) => node.nodeType === 3 && node.textContent.trim().length > 0,
    )
    if (!ownText) continue
    const style = getComputedStyle(element)
    if (style.visibility === 'hidden' || style.clipPath !== 'none' || fixed(element)) continue
    if (
      element.scrollWidth > element.clientWidth + 1 &&
      style.overflowX !== 'visible' &&
      style.textOverflow !== 'ellipsis'
    )
      clipped.push(describe(element))
    if ((rect.right > viewport + 1 || rect.left < -1) && !scrollable(element))
      outside.push(`${Math.round(rect.left)}..${Math.round(rect.right)} ${describe(element)}`)
  }
  const bar = document.querySelector('[data-bar]').getBoundingClientRect()
  const heading = document.querySelector('h1').getBoundingClientRect()
  return {
    height: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    headingUnderBar: heading.top < bar.bottom,
    clipped,
    outside,
    boxes,
  }
}

const browsers = {}
for (const engine of plan.engines) browsers[engine] = await launchers[engine].launch()

const shoot = async (engine, route, width) => {
  const context = await browsers[engine].newContext({
    viewport: { width, height: width >= 1024 ? 900 : 917 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
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
    await page.waitForTimeout(80)
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
  await page.waitForTimeout(500)
  const broken = await page.evaluate(() =>
    [...document.images]
      .filter(
        (image) => image.complete && image.naturalWidth === 0 && image.getClientRects().length,
      )
      .map((image) => image.currentSrc),
  )
  const metrics = await page.evaluate(measure)
  mkdirSync(join(folder, engine), { recursive: true })
  await page.screenshot({ path: join(folder, engine, fileName(route, width)), fullPage: true })
  await context.close()
  return { status: response.status(), problems, broken, ...metrics }
}

const responsible = (reference, other, differs) => {
  const differing = Object.keys(reference).filter(
    (path) => other[path] && differs(reference[path], other[path]),
  )
  const leaves = differing.filter(
    (path) => !differing.some((inner) => inner !== path && inner.startsWith(`${path}>`)),
  )
  return leaves.slice(0, 6).map((path) => ({
    element: reference[path][4],
    top: reference[path][0],
    reference: reference[path].slice(1, 4),
    other: other[path].slice(1, 4),
  }))
}

const jobs = routes.flatMap((route) => plan.widths.map((width) => ({ route, width })))
const results = []
const queue = [...jobs]
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length > 0) {
      const { route, width } = queue.shift()
      const entry = { route, width, engines: {} }
      let reference = null
      for (const engine of plan.engines) {
        const { boxes, ...result } = await shoot(engine, route, width)
        if (reference === null) reference = boxes
        else {
          result.missing = Object.keys(reference).filter((path) => !boxes[path]).length
          result.extra = Object.keys(boxes).filter((path) => !reference[path]).length
          result.responsible = responsible(reference, boxes, (a, b) => Math.abs(a[1] - b[1]) >= 1)
          result.shifted = responsible(
            reference,
            boxes,
            (a, b) => Math.abs(a[2] - b[2]) > 1 || Math.abs(a[3] - b[3]) > 1,
          )
        }
        entry.engines[engine] = result
      }
      results.push(entry)
    }
  }),
)
for (const browser of Object.values(browsers)) await browser.close()

results.sort((a, b) => a.route.localeCompare(b.route) || a.width - b.width)
writeFileSync(join(folder, `${mode}.json`), JSON.stringify(results, null, 1))

for (const { route, width, engines } of results) {
  const heights = plan.engines.map((engine) => engines[engine].height)
  const flags = []
  for (const engine of plan.engines) {
    const result = engines[engine]
    if (result.status !== 200) flags.push(`${engine} status ${result.status}`)
    if (result.problems.length > 0) flags.push(`${engine} console ${result.problems[0]}`)
    if (result.broken.length > 0) flags.push(`${engine} broken image ${result.broken[0]}`)
    if (result.overflowX > 0) flags.push(`${engine} overflowX ${result.overflowX}`)
    if (result.headingUnderBar) flags.push(`${engine} h1 under the bar`)
    if (result.clipped.length > 0) flags.push(`${engine} clipped ${result.clipped.join(' | ')}`)
    if (result.outside.length > 0) flags.push(`${engine} outside ${result.outside.join(' | ')}`)
    if (result.missing > 0 || result.extra > 0)
      flags.push(`${engine} boxes missing ${result.missing} extra ${result.extra}`)
    if (Math.abs(result.height - heights[0]) > 2) flags.push(`${engine} height differs`)
    if (result.responsible && result.responsible.length > 0)
      flags.push(`${engine} taller or shorter ${JSON.stringify(result.responsible)}`)
    if (result.shifted && result.shifted.length > 0)
      flags.push(`${engine} shifted or resized ${JSON.stringify(result.shifted)}`)
  }
  console.log(`${route} ${width} ${heights.join(' / ')}${flags.length > 0 ? ' FLAG' : ''}`)
  for (const flag of flags) console.log(`    ${flag}`)
}
