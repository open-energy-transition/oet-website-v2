import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const [, , folder, origin, ...filters] = process.argv
if (!folder || !origin)
  throw new Error(
    'usage: node scripts/compare-content.mjs <baseline html folder> <origin> [route prefix...]',
  )

const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

const decode = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/g, (match, name) => (name in entities ? entities[name] : match))

const attributes = (html, tag, name) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*?\\s${name}="([^"]*)"`, 'g'))].map((match) =>
    decode(match[1]),
  )

const extract = (html) => {
  const title = /<title>([\s\S]*?)<\/title>/.exec(html)
  const description = /<meta name="description" content="([^"]*)"/.exec(html)
  const body = html
    .replace(/<head[\s\S]*?<\/head>/g, '')
    .replace(/<(script|style|svg|template|noscript)\b[\s\S]*?<\/\1>/g, '')
  const text = decode(body.replace(/<[^>]+>/g, '\n'))
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line !== '')
  return [
    `title: ${title ? decode(title[1]) : ''}`,
    `description: ${description ? decode(description[1]) : ''}`,
    ...text,
    ...attributes(body, 'a', 'href').map((value) => `href: ${value}`),
    ...attributes(body, 'img', 'alt').map((value) => `alt: ${value}`),
  ]
}

const diff = (before, after) => {
  const rows = before.length + 1
  const columns = after.length + 1
  const table = new Uint32Array(rows * columns)
  for (let i = before.length - 1; i >= 0; i -= 1)
    for (let j = after.length - 1; j >= 0; j -= 1)
      table[i * columns + j] =
        before[i] === after[j]
          ? table[(i + 1) * columns + j + 1] + 1
          : Math.max(table[(i + 1) * columns + j], table[i * columns + j + 1])
  const changes = []
  let i = 0
  let j = 0
  while (i < before.length && j < after.length) {
    if (before[i] === after[j]) {
      i += 1
      j += 1
    } else if (table[(i + 1) * columns + j] >= table[i * columns + j + 1]) {
      changes.push(`- ${before[i]}`)
      i += 1
    } else {
      changes.push(`+ ${after[j]}`)
      j += 1
    }
  }
  for (; i < before.length; i += 1) changes.push(`- ${before[i]}`)
  for (; j < after.length; j += 1) changes.push(`+ ${after[j]}`)
  return changes
}

const routes = walk(folder)
  .filter((file) => file.endsWith('index.html'))
  .map((file) => {
    const relative = file.slice(folder.length).split(/[\\/]/).join('/')
    const route = relative.replace(/index\.html$/, '').replace(/(.)\/$/, '$1')
    return { file, route: route.startsWith('/') ? route : `/${route}` }
  })
  .filter(
    ({ route }) =>
      filters.length === 0 ||
      filters.some((filter) => route === filter || route.startsWith(`${filter}/`)),
  )
  .sort((a, b) => a.route.localeCompare(b.route))

let different = 0
for (const { file, route } of routes) {
  const response = await fetch(`${origin}${route}`)
  if (!response.ok) {
    different += 1
    console.log(`${route}: answered ${response.status}`)
    continue
  }
  const changes = diff(extract(readFileSync(file, 'utf8')), extract(await response.text()))
  if (changes.length === 0) {
    console.log(`${route}: same`)
    continue
  }
  different += 1
  console.log(`${route}: ${changes.length} changed lines`)
  for (const change of changes) console.log(`  ${change}`)
}

console.log(`${routes.length - different} of ${routes.length} routes have the same content`)
