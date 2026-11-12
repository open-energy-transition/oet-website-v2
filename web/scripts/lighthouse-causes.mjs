import { readFileSync } from 'node:fs'

const [, , file] = process.argv
if (!file) throw new Error('usage: node scripts/lighthouse-causes.mjs <lighthouse json>')

const report = JSON.parse(readFileSync(file, 'utf8'))
const audits = report.audits
const print = (title, value) => console.log(`\n## ${title}\n${JSON.stringify(value, null, 1)}`)

print(
  'scores',
  Object.fromEntries(
    Object.entries(report.categories).map(([key, category]) => [key, category.score]),
  ),
)
print(
  'metrics',
  Object.fromEntries(
    [
      'first-contentful-paint',
      'largest-contentful-paint',
      'speed-index',
      'total-blocking-time',
      'cumulative-layout-shift',
      'total-byte-weight',
    ].map((id) => [id, audits[id].displayValue]),
  ),
)

const insight = (id) =>
  audits[id].details.items.map((item) => {
    if (item.type === 'node') return { node: item.snippet, selector: item.selector }
    if (item.type === 'table' || item.type === 'checklist' || item.type === 'list-section')
      return item.items
    return item
  })

for (const id of [
  'lcp-breakdown-insight',
  'lcp-discovery-insight',
  'render-blocking-insight',
  'font-display-insight',
  'image-delivery-insight',
  'cls-culprits-insight',
  'dom-size-insight',
  'forced-reflow-insight',
]) {
  if (audits[id].details) print(id, insight(id))
}

print(
  'requests',
  audits['network-requests'].details.items.map((item) => ({
    url: item.url.replace(/^https?:\/\/[^/]+/, ''),
    type: item.resourceType,
    priority: item.priority,
    transfer: item.transferSize,
    size: item.resourceSize,
    start: Math.round(
      item.networkRequestTime - audits['network-requests'].details.items[0].networkRequestTime,
    ),
    end: Math.round(
      item.networkEndTime - audits['network-requests'].details.items[0].networkRequestTime,
    ),
  })),
)

for (const id of ['unused-css-rules', 'unused-javascript', 'mainthread-work-breakdown']) {
  if (audits[id].details)
    print(
      id,
      audits[id].details.items.map((item) => ({
        ...item,
        url: item.url && item.url.replace(/^https?:\/\/[^/]+/, ''),
      })),
    )
}

for (const category of ['accessibility', 'best-practices', 'seo']) {
  print(
    `${category} failures`,
    report.categories[category].auditRefs
      .map((reference) => audits[reference.id])
      .filter((audit) => audit.score !== null && audit.score < 1)
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        nodes: audit.details.items.map((item) => ({
          snippet: item.node && item.node.snippet,
          selector: item.node && item.node.selector,
          explanation: item.node && item.node.explanation,
        })),
      })),
  )
}
