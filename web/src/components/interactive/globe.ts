export type World = { grid: number; countries: [string, number[][]][] }

export type Shape = { id: string; rings: Float32Array[] }

export type View = {
  lon: number
  lat: number
  radius: number
  cx: number
  cy: number
  height: number
}

export type Projected = { x: number; y: number; depth: number }

type Matrix = { cosLon: number; sinLon: number; cosLat: number; sinLat: number }

const RAD = Math.PI / 180

const matrix = (view: View): Matrix => ({
  cosLon: Math.cos(view.lon * RAD),
  sinLon: Math.sin(view.lon * RAD),
  cosLat: Math.cos(view.lat * RAD),
  sinLat: Math.sin(view.lat * RAD),
})

const toVector = (lon: number, lat: number): [number, number, number] => {
  const cosLat = Math.cos(lat * RAD)
  return [cosLat * Math.sin(lon * RAD), Math.sin(lat * RAD), cosLat * Math.cos(lon * RAD)]
}

export const decode = (world: World): Shape[] =>
  world.countries.map(([id, rings]) => ({
    id,
    rings: rings.map((flat) => {
      const vectors = new Float32Array((flat.length / 2) * 3)
      let x = 0
      let y = 0
      for (let i = 0; i < flat.length; i += 2) {
        x += flat[i]
        y += flat[i + 1]
        vectors.set(toVector(x / world.grid, y / world.grid), (i / 2) * 3)
      }
      return vectors
    }),
  }))

export const projectPoint = (lon: number, lat: number, view: View): Projected => {
  const m = matrix(view)
  const [vx, vy, vz] = toVector(lon, lat)
  const t = vx * m.sinLon + vz * m.cosLon
  return {
    x: view.cx + view.radius * (vx * m.cosLon - vz * m.sinLon),
    y: view.cy - view.radius * (vy * m.cosLat - t * m.sinLat),
    depth: vy * m.sinLat + t * m.cosLat,
  }
}

const tenths = (value: number): number => Math.round(value * 10)

const number = (value: number): string => {
  const digits = String(Math.abs(value) / 10)
  return `${value < 0 ? '-' : ''}${digits.startsWith('0.') ? digits.slice(1) : digits}`
}

const pair = (x: number, y: number): string => `${number(x)}${y < 0 ? '' : ' '}${number(y)}`

const ringPath = (ring: Float32Array, view: View, m: Matrix): string => {
  const count = ring.length / 3
  const xs = new Float64Array(count)
  const ys = new Float64Array(count)
  const zs = new Float64Array(count)
  let hidden = -1
  let top = Infinity
  for (let i = 0; i < count; i += 1) {
    const vx = ring[i * 3]
    const vy = ring[i * 3 + 1]
    const vz = ring[i * 3 + 2]
    const t = vx * m.sinLon + vz * m.cosLon
    xs[i] = vx * m.cosLon - vz * m.sinLon
    ys[i] = vy * m.cosLat - t * m.sinLat
    zs[i] = vy * m.sinLat + t * m.cosLat
    if (zs[i] <= 0) hidden = i
    else top = Math.min(top, view.cy - view.radius * ys[i])
  }
  if (top > view.height + 2) return ''

  const sx = (x: number) => tenths(view.cx + view.radius * x)
  const sy = (y: number) => tenths(view.cy - view.radius * y)

  let d = ''
  let penX = 0
  let penY = 0
  let lining = false
  const moveTo = (x: number, y: number) => {
    d += `M${pair(x, y)}`
    penX = x
    penY = y
    lining = false
  }
  const lineTo = (x: number, y: number) => {
    if (x === penX && y === penY) return
    const delta = pair(x - penX, y - penY)
    d += lining ? `${delta.startsWith('-') ? '' : ' '}${delta}` : `l${delta}`
    penX = x
    penY = y
    lining = true
  }

  if (hidden === -1) {
    moveTo(sx(xs[0]), sy(ys[0]))
    for (let i = 1; i < count; i += 1) lineTo(sx(xs[i]), sy(ys[i]))
    return `${d}Z`
  }

  const radius = number(tenths(view.radius))
  let exitX = 0
  let exitY = 0
  let pending = false
  for (let step = 1; step <= count; step += 1) {
    const a = (hidden + step - 1) % count
    const b = (hidden + step) % count
    const visibleA = zs[a] > 0
    const visibleB = zs[b] > 0
    if (visibleA !== visibleB) {
      const t = zs[a] / (zs[a] - zs[b])
      const x = xs[a] + t * (xs[b] - xs[a])
      const y = ys[a] + t * (ys[b] - ys[a])
      const length = Math.hypot(x, y)
      const edgeX = x / length
      const edgeY = y / length
      if (visibleB) {
        if (pending) {
          const sweep = exitX * -edgeY - -exitY * edgeX > 0 ? 1 : 0
          penX = sx(edgeX)
          penY = sy(edgeY)
          d += `A${radius} ${radius} 0 0 ${sweep} ${pair(penX, penY)}`
          lining = false
        } else {
          moveTo(sx(edgeX), sy(edgeY))
          pending = true
        }
      } else {
        lineTo(sx(edgeX), sy(edgeY))
        exitX = edgeX
        exitY = edgeY
      }
    }
    if (visibleB) lineTo(sx(xs[b]), sy(ys[b]))
  }
  return d === '' ? '' : `${d}Z`
}

export const shapePath = (shape: Shape, view: View): string => {
  const m = matrix(view)
  let d = ''
  for (const ring of shape.rings) d += ringPath(ring, view, m)
  return d
}

export const landPath = (shapes: Shape[], view: View, skip: ReadonlySet<string>): string => {
  const m = matrix(view)
  let d = ''
  for (const shape of shapes) {
    if (skip.has(shape.id)) continue
    for (const ring of shape.rings) d += ringPath(ring, view, m)
  }
  return d
}

export const pinScale = (depth: number): number => {
  if (depth >= 0.2) return 1
  if (depth >= 0) return 0.755 + (depth / 0.2) * 0.245
  return Math.max(0.636, 0.755 + depth * 0.33)
}

export const pinPosition = (point: Projected, view: View): { x: number; y: number } => {
  if (point.depth > 0) return { x: point.x, y: point.y }
  const dx = point.x - view.cx
  const dy = point.y - view.cy
  const length = Math.hypot(dx, dy)
  const rim = view.radius + 6
  return { x: view.cx + (dx / length) * rim, y: view.cy + (dy / length) * rim }
}

export const STAGE = { width: 1280, height: 582, radius: 526.9, cx: 613.5, cy: 599.9 }

export const stageView = (lon: number, lat: number): View => ({
  lon,
  lat,
  radius: STAGE.radius,
  cx: STAGE.cx,
  cy: STAGE.cy,
  height: STAGE.height,
})

export const CARD_OFFSET = { x: 56, y: 7 }

export const percent = (value: number, total: number): string =>
  `${Math.round((value / total) * 100000) / 1000}%`
