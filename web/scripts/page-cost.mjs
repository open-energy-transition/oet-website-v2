import { chromium } from 'playwright'

const [, , url, widthArgument] = process.argv
if (!url || !widthArgument) throw new Error('usage: node scripts/page-cost.mjs <url> <width>')

const width = Number(widthArgument)
const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width, height: width >= 1024 ? 940 : 823 },
  deviceScaleFactor: width >= 1024 ? 1 : 1.75,
  isMobile: width < 1024,
})
const page = await context.newPage()
const client = await context.newCDPSession(page)
await client.send('Performance.enable')
await client.send('Network.enable')
const requests = new Map()
client.on('Network.requestWillBeSent', (event) =>
  requests.set(event.requestId, { url: event.request.url, start: event.timestamp }),
)
client.on('Network.loadingFinished', (event) => {
  const request = requests.get(event.requestId)
  request.end = event.timestamp
  request.bytes = event.encodedDataLength
})
await page.addInitScript(() => {
  window.__lcp = []
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries())
      window.__lcp.push({
        time: Math.round(entry.startTime),
        size: entry.size,
        url: entry.url,
        tag: entry.element && entry.element.tagName,
      })
  }).observe({ type: 'largest-contentful-paint', buffered: true })
  window.__shifts = []
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries())
      window.__shifts.push({ time: Math.round(entry.startTime), value: entry.value })
  }).observe({ type: 'layout-shift', buffered: true })
})
await page.goto(url, { waitUntil: 'load' })
await page.waitForTimeout(2500)
const { metrics } = await client.send('Performance.getMetrics')
const pick = (name) => metrics.find((metric) => metric.name === name).value
const origin = Math.min(...[...requests.values()].map((request) => request.start))
console.log(
  JSON.stringify(
    {
      layoutCount: pick('LayoutCount'),
      recalcStyleCount: pick('RecalcStyleCount'),
      layoutMs: Math.round(pick('LayoutDuration') * 1000),
      recalcStyleMs: Math.round(pick('RecalcStyleDuration') * 1000),
      scriptMs: Math.round(pick('ScriptDuration') * 1000),
      taskMs: Math.round(pick('TaskDuration') * 1000),
      nodes: pick('Nodes'),
      paint: await page.evaluate(() =>
        performance
          .getEntriesByType('paint')
          .map((entry) => [entry.name, Math.round(entry.startTime)]),
      ),
      lcp: await page.evaluate(() => window.__lcp),
      shifts: await page.evaluate(() => window.__shifts),
      requests: [...requests.values()].map((request) => [
        request.url.replace(/^https?:\/\/[^/]+/, ''),
        Math.round((request.start - origin) * 1000),
        Math.round((request.end - origin) * 1000),
        request.bytes,
      ]),
    },
    null,
    1,
  ),
)
await browser.close()
