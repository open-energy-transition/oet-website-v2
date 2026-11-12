import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const [, , folder, ...filters] = process.argv
if (!folder)
  throw new Error('usage: node scripts/check-header-theme.mjs <output folder> [route prefix...]')

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
  .sort()

const routes =
  filters.length > 0
    ? discovered.filter((route) =>
        filters.some((filter) => route === filter || route.startsWith(`${filter}/`)),
      )
    : discovered

const fileName = (route, width) =>
  `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '__')}-${width}`

mkdirSync(folder, { recursive: true })
const browser = await chromium.launch()
const report = []

const textContrast = (page, buffer) =>
  page.evaluate(async (encoded) => {
    const bitmap = await createImageBitmap(
      await (await fetch(`data:image/png;base64,${encoded}`)).blob(),
    )
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const context = canvas.getContext('2d')
    context.drawImage(bitmap, 0, 0)
    const { data } = context.getImageData(0, 0, bitmap.width, bitmap.height)
    const linear = (value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    const sum = [0, 0, 0]
    for (let index = 0; index < data.length; index += 4)
      for (let channel = 0; channel < 3; channel += 1) sum[channel] += data[index + channel]
    const [red, green, blue] = sum.map((total) => linear(total / (data.length / 4) / 255))
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue
    return { white: 1.05 / (luminance + 0.05), dark: (luminance + 0.05) / 0.1 }
  }, buffer.toString('base64'))

const check = async ({ route, width }) => {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  await context.routeWebSocket(/./, () => {})
  const page = await context.newPage()
  const helper = await context.newPage()
  const problems = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(String(error)))
  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  await page.addStyleTag({
    content: '*,*::before,*::after{animation:none!important;transition:none!important}',
  })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const footerTop = await page.evaluate(
    () => document.querySelector('footer').getBoundingClientRect().top + scrollY,
  )
  const positions = []
  for (let y = 0; y < height - 900; y += 300) positions.push(y)
  positions.push(height - 900)
  const mismatches = []
  const samples = []
  for (const y of positions) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y)
    await page.waitForTimeout(150)
    const state = await page.evaluate(() => {
      const header = document.querySelector('oet-header')
      const rect = header.querySelector('[data-bar]').getBoundingClientRect()
      return {
        theme: header.getAttribute('data-theme'),
        clip: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      }
    })
    await page.evaluate(() => (document.querySelector('oet-header').style.visibility = 'hidden'))
    const behind = await page.screenshot({ clip: state.clip })
    await page.evaluate(() => (document.querySelector('oet-header').style.visibility = ''))
    const contrast = await textContrast(helper, behind)
    const lightText = state.theme === 'light' || state.theme === 'on-red'
    const current = lightText ? contrast.white : contrast.dark
    const other = lightText ? contrast.dark : contrast.white
    const wrong = current < 2.5 && other > current
    samples.push({ y, theme: state.theme, light: contrast.white < contrast.dark })
    if (wrong) {
      mismatches.push({ y, theme: state.theme, contrast: Math.round(current * 10) / 10 })
      await page.screenshot({
        path: join(folder, `${fileName(route, width)}-y${y}.png`),
        clip: { x: 0, y: 0, width, height: 140 },
      })
    }
  }
  const shots = [
    ['hero', 0],
    ['body', positions.find((y) => samples.find((sample) => sample.y === y).light)],
    ['footer', Math.min(footerTop, height - 900)],
  ]
  for (const [name, y] of shots) {
    if (y === undefined) continue
    await page.evaluate((offset) => window.scrollTo(0, offset), y)
    await page.waitForTimeout(150)
    await page.screenshot({
      path: join(folder, `${fileName(route, width)}-${name}.png`),
      clip: { x: 0, y: 0, width, height: 140 },
    })
  }
  report.push({ route, width, mismatches, problems, footerTheme: samples.at(-1).theme })
  await context.close()
}

const queue = routes.flatMap((route) => widths.map((width) => ({ route, width })))
await Promise.all(
  Array.from({ length: workers }, async () => {
    while (queue.length > 0) await check(queue.shift())
  }),
)
await browser.close()

report.sort((a, b) => `${a.route}${a.width}`.localeCompare(`${b.route}${b.width}`))
writeFileSync(join(folder, 'report.json'), JSON.stringify(report, null, 1))
const flagged = report.filter((entry) => entry.mismatches.length > 0 || entry.problems.length > 0)
console.log(JSON.stringify({ checked: report.length, flagged: flagged.length }))
for (const entry of flagged)
  console.log(
    entry.route,
    entry.width,
    entry.mismatches.map((item) => `${item.y}:${item.theme}:${item.contrast}`).join(' '),
    entry.problems.join(' | '),
  )
