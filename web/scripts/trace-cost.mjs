import { chromium } from 'playwright'

const [, , url, widthArgument, runsArgument] = process.argv
if (!url || !widthArgument || !runsArgument)
  throw new Error('usage: node scripts/trace-cost.mjs <url> <width> <runs>')

const width = Number(widthArgument)
const runs = Number(runsArgument)
const names = [
  'RunTask',
  'ParseHTML',
  'ParseAuthorStyleSheet',
  'UpdateLayoutTree',
  'Layout',
  'PrePaint',
  'Paint',
  'Layerize',
  'Commit',
  'EvaluateScript',
  'v8.evaluateModule',
  'FunctionCall',
  'Decode Image',
  'ImageDecodeTask',
]

const browser = await chromium.launch()
const totals = []
for (let run = 0; run < runs; run += 1) {
  const context = await browser.newContext({
    viewport: { width, height: width >= 1024 ? 940 : 823 },
    deviceScaleFactor: width >= 1024 ? 1 : 1.75,
    isMobile: width < 1024,
  })
  const page = await context.newPage()
  const client = await context.newCDPSession(page)
  const events = []
  client.on('Tracing.dataCollected', (chunk) => events.push(...chunk.value))
  await client.send('Tracing.start', {
    traceConfig: {
      includedCategories: [
        'devtools.timeline',
        'disabled-by-default-devtools.timeline',
        'loading',
        'blink.user_timing',
      ],
    },
    transferMode: 'ReportEvents',
  })
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(2000)
  const done = new Promise((resolve) => client.once('Tracing.tracingComplete', resolve))
  await client.send('Tracing.end')
  await done
  const main = events.find((event) => event.name === 'ParseHTML')
  const onMain = events.filter(
    (event) => event.pid === main.pid && event.tid === main.tid && event.ph === 'X',
  )
  const start = Math.min(
    ...events
      .filter((event) => event.name === 'navigationStart' || event.name === 'ResourceSendRequest')
      .map((event) => event.ts),
  )
  const mark = (name) => {
    const found = events.filter((event) => event.name === name).map((event) => event.ts)
    return found.length > 0 ? Math.round((Math.max(...found) - start) / 1000) : null
  }
  const row = Object.fromEntries(
    names.map((name) => [
      name,
      Math.round(
        onMain.filter((event) => event.name === name).reduce((sum, event) => sum + event.dur, 0) /
          1000,
      ),
    ]),
  )
  row.longTasks = onMain
    .filter((event) => event.name === 'RunTask' && event.dur > 50000)
    .map((event) => [Math.round((event.ts - start) / 1000), Math.round(event.dur / 1000)])
  row.layouts = onMain
    .filter((event) => event.name === 'Layout')
    .map((event) => [Math.round((event.ts - start) / 1000), Math.round(event.dur / 1000)])
  row.fcp = mark('firstContentfulPaint')
  row.lcp = mark('largestContentfulPaint::Candidate')
  totals.push(row)
  await context.close()
}
await browser.close()
for (const row of totals) console.log(JSON.stringify(row))
