import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const [, , route, name, ...widthArgs] = process.argv
if (!route || !name) throw new Error('usage: pnpm shoot <route> <name> [width...]')

const widths = widthArgs.length > 0 ? widthArgs.map(Number) : [1440, 412]
mkdirSync('.screenshots', { recursive: true })

const browser = await chromium.launch()
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width >= 1024 ? 900 : 917 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  const problems = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(String(error)))
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y)
    await page.waitForTimeout(120)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)
  const path = `.screenshots/${name}-${width}.png`
  await page.screenshot({ path, fullPage: true })
  console.log(JSON.stringify({ path, width, height, problems }))
  await context.close()
}
await browser.close()
