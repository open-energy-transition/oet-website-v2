import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const filters = process.argv.slice(2)
const lines = readFileSync('scripts/figma-headings.txt', 'utf8').split('\n').filter(Boolean)
const browser = await chromium.launch()
for (const line of lines) {
  const [head, rest] = line.split(' :: ')
  const [id, width, height, route] = head.split(' ')
  if (filters.length > 0 && !filters.some((filter) => route.includes(filter) || filter === width))
    continue
  const marks = rest.split(' | ').map((item) => {
    const [y, h, ...text] = item.split('/')
    return { y: Number(y), h: Number(h), text: text.join('/') }
  })
  const context = await browser.newContext({
    viewport: { width: Number(width), height: Number(width) >= 1024 ? 900 : 917 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  await context.routeWebSocket(/./, () => {})
  const page = await context.newPage()
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready.then(() => true))
  await page.waitForTimeout(300)
  const found = await page.evaluate((wanted) => {
    const norm = (value) => value.replace(/\s+/g, ' ').trim()
    const elements = [...document.querySelectorAll('h1,h2,h3,h4,p,blockquote')].filter(
      (element) => {
        const rect = element.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0
      },
    )
    return {
      height: document.documentElement.scrollHeight,
      marks: wanted.map((mark) => {
        const key = norm(mark.text)
        const element = elements.find((candidate) => norm(candidate.innerText).startsWith(key))
        if (!element) return null
        const rect = element.getBoundingClientRect()
        return { y: Math.round(rect.y + scrollY), h: Math.round(rect.height) }
      }),
    }
  }, marks)
  await context.close()
  const parts = marks.map((mark, index) => {
    const hit = found.marks[index]
    return hit === null
      ? `${mark.text.trim()}: not found`
      : `${mark.text.trim()}: ${mark.y}→${hit.y} (${hit.y - mark.y >= 0 ? '+' : ''}${hit.y - mark.y}${hit.h === mark.h ? '' : `, h ${mark.h}→${hit.h}`})`
  })
  console.log(
    `${route} @${width} [${id}] height ${height}→${found.height} (${found.height - height >= 0 ? '+' : ''}${found.height - height})\n   ${parts.join(' | ')}`,
  )
}
await browser.close()
