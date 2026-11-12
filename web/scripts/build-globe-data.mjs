import { readFileSync, writeFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const [, , source, target] = process.argv
if (!source || !target)
  throw new Error(
    'usage: node scripts/build-globe-data.mjs <ne_50m_admin_0_countries.geojson> <out.json>',
  )

const GRID = 20
const TOLERANCE = 0.05
const MIN_AREA = 0.02
const DETACHED = [{ from: 'USA', id: 'USA-HI', west: -162, east: -154, south: 18, north: 23 }]

const collection = JSON.parse(readFileSync(source, 'utf8'))

const polygonsOf = (geometry) =>
  geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates

const dropPole = (ring) => ring.filter(([, lat]) => lat > -89.5)

const open = (ring) => {
  const [firstLon, firstLat] = ring[0]
  const [lastLon, lastLat] = ring[ring.length - 1]
  return firstLon === lastLon && firstLat === lastLat ? ring.slice(0, -1) : ring
}

const seamRun = (ring, lon) => {
  const count = ring.length
  const start = ring.findIndex(
    (point, index) => point[0] === lon && ring[(index + count - 1) % count][0] !== lon,
  )
  if (start === -1) return null
  let length = 1
  while (length < count && ring[(start + length) % count][0] === lon) length += 1
  if (length < 2) return null
  const rotated = [...ring.slice(start), ...ring.slice(0, start)]
  return { path: [...rotated.slice(length - 1), rotated[0]], from: rotated[0][1] }
}

const mergeAcrossAntimeridian = (rings) => {
  const east = []
  const west = []
  const rest = []
  for (const ring of rings) {
    const eastRun = seamRun(ring, 180)
    const westRun = seamRun(ring, -180)
    if (eastRun && !westRun) east.push(eastRun)
    else if (westRun && !eastRun)
      west.push({ ...westRun, path: westRun.path.map(([lon, lat]) => [lon + 360, lat]) })
    else rest.push(ring)
  }
  const merged = []
  for (const eastRun of east) {
    const end = eastRun.path[0][1]
    const index = west.findIndex((westRun) => Math.abs(westRun.from - end) < 0.5)
    if (index === -1) {
      merged.push(eastRun.path.slice(0, -1))
      continue
    }
    const [westRun] = west.splice(index, 1)
    merged.push([...eastRun.path.slice(1, -1), ...westRun.path.slice(1, -1)])
  }
  for (const westRun of west) merged.push(westRun.path.slice(0, -1))
  return [...rest, ...merged]
}

const distance = (point, a, b) => {
  const scale = Math.cos((point[1] * Math.PI) / 180)
  const px = (point[0] - a[0]) * scale
  const py = point[1] - a[1]
  const dx = (b[0] - a[0]) * scale
  const dy = b[1] - a[1]
  const length = dx * dx + dy * dy
  if (length === 0) return Math.hypot(px, py)
  const t = Math.max(0, Math.min(1, (px * dx + py * dy) / length))
  return Math.hypot(px - t * dx, py - t * dy)
}

const simplifyLine = (line) => {
  const keep = new Uint8Array(line.length)
  keep[0] = 1
  keep[line.length - 1] = 1
  const stack = [[0, line.length - 1]]
  while (stack.length > 0) {
    const [first, last] = stack.pop()
    let worst = 0
    let index = -1
    for (let i = first + 1; i < last; i += 1) {
      const d = distance(line[i], line[first], line[last])
      if (d > worst) {
        worst = d
        index = i
      }
    }
    if (worst > TOLERANCE) {
      keep[index] = 1
      stack.push([first, index], [index, last])
    }
  }
  return line.filter((_, i) => keep[i] === 1)
}

const simplifyRing = (ring) => {
  let far = 0
  let best = 0
  for (let i = 1; i < ring.length; i += 1) {
    const d = Math.hypot(ring[i][0] - ring[0][0], ring[i][1] - ring[0][1])
    if (d > best) {
      best = d
      far = i
    }
  }
  const first = simplifyLine(ring.slice(0, far + 1))
  const second = simplifyLine([...ring.slice(far), ring[0]])
  return [...first, ...second.slice(1, -1)]
}

const area = (ring) => {
  let sum = 0
  for (let i = 0; i < ring.length; i += 1) {
    const [x1, y1] = ring[i]
    const [x2, y2] = ring[(i + 1) % ring.length]
    sum += (x1 * y2 - x2 * y1) * Math.cos((((y1 + y2) / 2) * Math.PI) / 180)
  }
  return Math.abs(sum) / 2
}

const quantize = (ring) => {
  const points = []
  for (const [lon, lat] of ring) {
    const x = Math.round(lon * GRID)
    const y = Math.round(lat * GRID)
    const last = points[points.length - 1]
    if (!last || last[0] !== x || last[1] !== y) points.push([x, y])
  }
  const first = points[0]
  const last = points[points.length - 1]
  if (points.length > 1 && first[0] === last[0] && first[1] === last[1]) points.pop()
  return points
}

const encode = (points) => {
  const flat = []
  let px = 0
  let py = 0
  for (const [x, y] of points) {
    flat.push(x - px, y - py)
    px = x
    py = y
  }
  return flat
}

const countries = collection.features
  .map((feature) => {
    const outer = polygonsOf(feature.geometry).map((polygon) => dropPole(open(polygon[0])))
    const rings = mergeAcrossAntimeridian(outer)
      .map((ring) => ({ ring: quantize(simplifyRing(ring)), size: area(ring) }))
      .filter(({ ring }) => ring.length >= 3)
      .sort((a, b) => b.size - a.size)
    const kept = rings.filter(({ size }, index) => index === 0 || size >= MIN_AREA)
    const id = feature.properties.ADM0_A3
    const encoded = kept.map(({ ring }) => encode(ring))
    const detached = DETACHED.filter((region) => region.from === id)
    const inside = (region, flat) => {
      const lon = flat[0] / GRID
      const lat = flat[1] / GRID
      return lon > region.west && lon < region.east && lat > region.south && lat < region.north
    }
    return [
      [id, encoded.filter((flat) => !detached.some((region) => inside(region, flat)))],
      ...detached.map((region) => [region.id, encoded.filter((flat) => inside(region, flat))]),
    ]
  })
  .flat()
  .sort(([a], [b]) => (a < b ? -1 : 1))

const json = JSON.stringify({ grid: GRID, countries })
writeFileSync(target, json)

const points = countries.reduce(
  (sum, [, rings]) => sum + rings.reduce((inner, ring) => inner + ring.length / 2, 0),
  0,
)
console.log(
  JSON.stringify({
    countries: countries.length,
    rings: countries.reduce((sum, [, rings]) => sum + rings.length, 0),
    points,
    bytes: json.length,
    gzip: gzipSync(json, { level: 9 }).length,
  }),
)
