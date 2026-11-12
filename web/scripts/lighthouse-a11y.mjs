import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [, , origin, folder] = process.argv
if (!origin || !folder)
  throw new Error('usage: node scripts/lighthouse-a11y.mjs <origin> <output folder>')

const event =
  '/organization/news-and-events/free-monthly-pypsa-support-for-european-transmission-system-operators'
const pages = {
  home: '/',
  legal: '/legal',
  about: '/organization/about',
  career: '/organization/career',
  departments: '/organization/departments',
  department: '/organization/departments/energy-system-modeling',
  news: '/organization/news-and-events',
  'event-highlight': event,
  'event-upcoming': `${event}-2`,
  partners: '/organization/partners-and-funders',
  team: '/organization/team',
  theory: '/organization/theory-of-change',
  publications: '/outputs/publications',
  publication: '/outputs/publications/the-state-of-solvers-for-energy-planning',
  'success-stories': '/outputs/success-stories',
  project: '/outputs/success-stories/e-fuels-in-australia',
  services: '/services',
  service: '/services/system-operators-and-utilities',
  tools: '/tools-and-data',
}

mkdirSync(folder, { recursive: true })
const summary = {}
for (const [name, route] of Object.entries(pages)) {
  const file = join(folder, `${name}.json`)
  execFileSync(
    'npx',
    [
      '--yes',
      'lighthouse',
      `${origin}${route}`,
      '--only-categories=accessibility',
      '--output=json',
      `--output-path=${file}`,
      '--quiet',
      '--chrome-flags="--headless=new"',
    ],
    { stdio: 'ignore', shell: true },
  )
  const report = JSON.parse(readFileSync(file, 'utf8'))
  const failing = Object.values(report.audits)
    .filter((audit) => audit.score === 0)
    .map((audit) => ({
      id: audit.id,
      nodes: audit.details.items.map((item) => item.node.snippet.slice(0, 140)),
    }))
  summary[name] = { score: Math.round(report.categories.accessibility.score * 100), failing }
  console.log(
    `${name} ${summary[name].score} ${failing.map((audit) => `${audit.id}(${audit.nodes.length})`).join(' ')}`,
  )
}
writeFileSync(join(folder, 'summary.json'), JSON.stringify(summary, null, 1))
