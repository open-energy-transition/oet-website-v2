import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [, , origin, label, runsArgument, ...filters] = process.argv
if (!origin || !label || !runsArgument)
  throw new Error(
    'usage: node scripts/lighthouse.mjs <origin> <label> <runs> [name | name=/route...]',
  )

const runs = Number(runsArgument)
const custom = filters.filter((filter) => filter.includes('=')).map((filter) => filter.split('='))
const pages = [
  ['home', '/'],
  ['success-stories', '/outputs/success-stories'],
  ['project-detail', '/outputs/success-stories/e-fuels-in-australia'],
  ['publication-detail', '/outputs/publications/the-state-of-solvers-for-energy-planning'],
  ['tools-and-data', '/tools-and-data'],
  ['services', '/services'],
  ['service-detail', '/services/system-operators-and-utilities'],
  ['about', '/organization/about'],
  ['team', '/organization/team'],
  ['theory-of-change', '/organization/theory-of-change'],
  ['news-and-events', '/organization/news-and-events'],
  [
    'event-detail',
    '/organization/news-and-events/free-monthly-pypsa-support-for-european-transmission-system-operators',
  ],
]
  .filter(([name]) => filters.length === 0 || filters.includes(name))
  .concat(custom)
const modes = [
  ['mobile', []],
  ['desktop', ['--preset=desktop']],
].filter(([mode]) => process.env.LIGHTHOUSE_MODE === undefined || mode === process.env.LIGHTHOUSE_MODE)

const folder = join('.screenshots', 'lighthouse', label)
mkdirSync(folder, { recursive: true })

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]

const summary = []
for (const [name, route] of pages) {
  for (const [mode, flags] of modes) {
    const reports = []
    for (let run = 1; run <= runs; run += 1) {
      const output = join(folder, `${name}-${mode}-${run}.json`)
      rmSync(output, { force: true })
      for (let attempt = 1; attempt <= 3 && !existsSync(output); attempt += 1)
        spawnSync(
          'npx',
          [
            '--yes',
            'lighthouse',
            `${origin}${route}`,
            '--only-categories=performance,accessibility,best-practices,seo',
            '--output=json',
            `--output-path=${output}`,
            '--quiet',
            '--chrome-flags="--headless=new"',
            ...flags,
          ],
          { shell: true, stdio: 'ignore' },
        )
      reports.push(JSON.parse(readFileSync(output, 'utf8')))
    }
    const pick = (read) => median(reports.map(read))
    const row = {
      page: name,
      mode,
      performance: pick((report) => Math.round(report.categories.performance.score * 100)),
      accessibility: pick((report) => Math.round(report.categories.accessibility.score * 100)),
      bestPractices: pick((report) => Math.round(report.categories['best-practices'].score * 100)),
      seo: pick((report) => Math.round(report.categories.seo.score * 100)),
      fcp: pick((report) => Math.round(report.audits['first-contentful-paint'].numericValue)),
      lcp: pick((report) => Math.round(report.audits['largest-contentful-paint'].numericValue)),
      cls: pick((report) =>
        Number(report.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
      ),
      tbt: pick((report) => Math.round(report.audits['total-blocking-time'].numericValue)),
      speedIndex: pick((report) => Math.round(report.audits['speed-index'].numericValue)),
      bytes: pick((report) => report.audits['total-byte-weight'].numericValue),
    }
    summary.push(row)
    console.log(JSON.stringify(row))
    writeFileSync(join(folder, 'summary.json'), JSON.stringify(summary, null, 1))
  }
}
