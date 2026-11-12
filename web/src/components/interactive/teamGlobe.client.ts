import {
  CARD_OFFSET,
  STAGE,
  decode,
  landPath,
  percent,
  pinPosition,
  pinScale,
  projectPoint,
  shapePath,
  stageView,
  type World,
} from './globe'

type Country = { code: string; name: string; count: string; lon: number; lat: number }

const VIEW_OFFSET = { lon: 6.5, lat: -31 }
const LAT_RANGE = { min: -60, max: 40 }
const KEY_STEP = 10
const IDLE_SPEED = 0.002
const TURN_MS = 600
const DWELL_MS = 4000
const FOCUS_RANGE = 12
const FOCUS_STEP = 4
const TILT_MS = 2000

const required = <T extends Element>(root: ParentNode, selector: string): T => {
  const element = root.querySelector<T>(selector)
  if (!element) throw new Error(`TeamGlobe: missing ${selector}`)
  return element
}

const attribute = (element: HTMLElement | SVGElement, name: string): string => {
  const value = element.dataset[name]
  if (value === undefined) throw new Error(`TeamGlobe: missing data-${name}`)
  return value
}

const clampLat = (lat: number) => Math.min(LAT_RANGE.max, Math.max(LAT_RANGE.min, lat))

const loaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', () => resolve(), { once: true })
  })

const inView = (element: Element) =>
  new Promise<void>((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      resolve()
    })
    observer.observe(element)
  })

export const mount = async (root: HTMLElement) => {
  await Promise.all([loaded(), inView(root)])
  const world = await import('../../assets/team/world.json')
  const shapes = decode(world.default as World)
  const countries: Country[] = JSON.parse(attribute(root, 'countries'))
  const start: { lon: number; lat: number } = JSON.parse(attribute(root, 'view'))
  const stage = required<HTMLElement>(root, '[data-globe="stage"]')
  const land = required<SVGPathElement>(root, '[data-globe="land"]')
  const outline = required<SVGCircleElement>(root, 'svg > circle:last-child')
  const card = required<HTMLElement>(root, '[data-globe="card"]')
  const cardCountry = required<HTMLElement>(card, '[data-globe-card="country"]')
  const cardCount = required<HTMLElement>(card, '[data-globe-card="count"]')
  const photos = [...card.querySelectorAll<HTMLImageElement>('[data-globe-photo]')]
  const codes = new Set(countries.map((country) => country.code))
  const still = window.matchMedia('(prefers-reduced-motion: reduce)')

  const items = countries.map((country) => {
    const shape = shapes.find((candidate) => candidate.id === country.code)
    if (!shape) throw new Error(`TeamGlobe: unknown country ${country.code}`)
    return {
      country,
      shape,
      path: required<SVGPathElement>(root, `[data-globe="country"][data-code="${country.code}"]`),
      pin: required<HTMLButtonElement>(root, `[data-globe="pin"][data-code="${country.code}"]`),
    }
  })

  let lon = start.lon
  let lat = start.lat
  let selected: string | null = attribute(root, 'selected')
  let frame = 0
  let turn = 0
  let spin = 0
  let switched = 0
  let tilt = start.lat
  let visible = true
  let engaged = false
  let held = false

  const draw = () => {
    frame = 0
    const view = stageView(lon, lat)
    land.setAttribute('d', landPath(shapes, view, codes))
    for (const { country, shape, path, pin } of items) {
      const active = country.code === selected
      const point = projectPoint(country.lon, country.lat, view)
      const position = pinPosition(point, view)
      path.setAttribute('d', shapePath(shape, view))
      path.toggleAttribute('data-active', active)
      pin.style.left = percent(position.x, STAGE.width)
      pin.style.top = percent(position.y, STAGE.height)
      pin.style.setProperty('--pin-scale', String(pinScale(point.depth)))
      pin.setAttribute('aria-pressed', String(active))
      if (!active) continue
      card.toggleAttribute('data-hidden', point.depth <= 0.05)
      card.style.setProperty('--card-left', percent(point.x + CARD_OFFSET.x, STAGE.width))
      card.style.setProperty(
        '--card-bottom',
        percent(STAGE.height - point.y - CARD_OFFSET.y, STAGE.height),
      )
      cardCountry.textContent = country.name
      cardCount.textContent = country.count
      for (const photo of photos)
        photo.hidden = !attribute(photo, 'globePhoto').split(' ').includes(country.code)
    }
    if (selected === null) card.setAttribute('data-hidden', '')
  }

  const schedule = () => {
    if (frame === 0) frame = requestAnimationFrame(draw)
  }

  const stopTurn = () => {
    cancelAnimationFrame(turn)
    turn = 0
  }

  const rotateTo = (targetLon: number, targetLat: number, then: () => void) => {
    stopTurn()
    const fromLon = lon
    const fromLat = lat
    const delta = ((((targetLon - fromLon) % 360) + 540) % 360) - 180
    if (still.matches) {
      lon = fromLon + delta
      lat = targetLat
      schedule()
      then()
      return
    }
    const began = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - began) / TURN_MS)
      const eased = 1 - (1 - t) ** 3
      lon = fromLon + delta * eased
      lat = fromLat + (targetLat - fromLat) * eased
      schedule()
      if (t < 1) turn = requestAnimationFrame(step)
      else {
        turn = 0
        then()
      }
    }
    turn = requestAnimationFrame(step)
  }

  const select = (code: string | null) => {
    selected = code === selected ? null : code
    root.setAttribute('data-touched', '')
    card.setAttribute('aria-live', 'polite')
    const item = items.find(({ country }) => country.code === selected)
    tilt = item ? clampLat(item.country.lat + VIEW_OFFSET.lat) : lat
    switched = performance.now() + TURN_MS
    if (item) {
      cancelAnimationFrame(spin)
      outline.before(item.path)
      rotateTo(item.country.lon + VIEW_OFFSET.lon, tilt, idle)
      return
    }
    idle()
    schedule()
  }

  const gap = (a: number, b: number) => Math.abs(((((a - b) % 360) + 540) % 360) - 180)

  const follow = (now: number) => {
    if (now - switched < DWELL_MS) return
    const focusLon = lon - VIEW_OFFSET.lon
    const nearest = items
      .map((item) => ({ item, distance: gap(item.country.lon, focusLon) }))
      .filter(({ distance }) => distance <= FOCUS_RANGE)
      .sort(
        (a, b) =>
          Math.round(a.distance / FOCUS_STEP) - Math.round(b.distance / FOCUS_STEP) ||
          Number(b.item.country.count) - Number(a.item.country.count),
      )[0]
    if (!nearest || nearest.item.country.code === selected) return
    selected = nearest.item.country.code
    outline.before(nearest.item.path)
    tilt = clampLat(nearest.item.country.lat + VIEW_OFFSET.lat)
    switched = now
  }

  const idle = () => {
    cancelAnimationFrame(spin)
    if (!visible || engaged || held || turn !== 0 || still.matches) return
    let last = performance.now()
    const step = (now: number) => {
      lon += (now - last) * IDLE_SPEED
      lat += (tilt - lat) * (1 - Math.exp(-(now - last) / TILT_MS))
      last = now
      follow(now)
      schedule()
      spin = requestAnimationFrame(step)
    }
    spin = requestAnimationFrame(step)
  }

  let pointer: { id: number; x: number; y: number; moved: boolean } | null = null

  stage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || (event.target as Element).closest('[data-globe="pin"]')) return
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false }
  })

  stage.addEventListener('pointermove', (event) => {
    if (!pointer || pointer.id !== event.pointerId) return
    const dx = event.clientX - pointer.x
    const dy = event.clientY - pointer.y
    if (!pointer.moved && Math.hypot(dx, dy) < 4) return
    if (!pointer.moved) {
      pointer.moved = true
      stage.setPointerCapture(event.pointerId)
      stage.setAttribute('data-dragging', '')
      stopTurn()
      cancelAnimationFrame(spin)
      held = true
    }
    const degrees = 180 / (Math.PI * STAGE.radius * (stage.clientWidth / STAGE.width))
    lon -= dx * degrees
    lat = clampLat(lat + dy * degrees)
    pointer.x = event.clientX
    pointer.y = event.clientY
    schedule()
  })

  const release = (event: PointerEvent) => {
    if (!pointer || pointer.id !== event.pointerId) return
    const moved = pointer.moved
    pointer = null
    stage.removeAttribute('data-dragging')
    if (held) {
      held = false
      tilt = lat
      idle()
    }
    if (moved || event.type === 'pointercancel') return
    const path = (event.target as Element).closest<SVGPathElement>('[data-globe="country"]')
    if (path) select(attribute(path, 'code'))
    else if (selected !== null) select(selected)
  }

  stage.addEventListener('pointerup', release)
  stage.addEventListener('pointercancel', release)

  stage.addEventListener('keydown', (event) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, KEY_STEP],
      ArrowDown: [0, -KEY_STEP],
    }
    if (event.key === 'Escape' && selected !== null) {
      select(selected)
      return
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    stopTurn()
    const [moveLon, moveLat] = moves[event.key]
    lon += moveLon
    lat = clampLat(lat + moveLat)
    schedule()
  })

  const outside = (pin: HTMLElement) => {
    const frame = root.getBoundingClientRect()
    const box = pin.getBoundingClientRect()
    const cover = card.getBoundingClientRect()
    const covered =
      !card.hasAttribute('data-hidden') &&
      box.left < cover.right &&
      box.right > cover.left &&
      box.top < cover.bottom &&
      box.bottom > cover.top
    return (
      covered ||
      box.left < frame.left ||
      box.right > frame.right ||
      box.top < frame.top ||
      box.bottom > frame.bottom
    )
  }

  for (const { country, pin } of items) {
    pin.addEventListener('click', () => select(country.code))
    pin.addEventListener('focus', () => {
      if (outside(pin)) {
        stopTurn()
        lon = country.lon + VIEW_OFFSET.lon
        lat = clampLat(country.lat + VIEW_OFFSET.lat)
        draw()
      }
    })
  }

  root.addEventListener('focusin', (event) => {
    engaged = (event.target as Element).matches(':focus-visible')
    idle()
  })
  root.addEventListener('focusout', () => {
    engaged = false
    idle()
  })
  still.addEventListener('change', idle)
  new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting)
    idle()
  }).observe(root)

  card.setAttribute('aria-live', 'off')
  root.setAttribute('data-ready', '')
}
