import { writeFileSync } from 'node:fs'
import { chromium, firefox, webkit } from 'playwright'

const [, , origin, output, ...requested] = process.argv
if (!origin || !output)
  throw new Error(
    'usage: node scripts/keyboard-check.mjs <origin> <output json> [chromium firefox webkit]',
  )

const launchers = { chromium, firefox, webkit }
const engines = requested.length > 0 ? requested : ['chromium', 'firefox', 'webkit']

const event =
  '/organization/news-and-events/free-monthly-pypsa-support-for-european-transmission-system-operators'
const publication = '/outputs/publications/the-state-of-solvers-for-energy-planning'
const project = '/outputs/success-stories/e-fuels-in-australia'
const selectedRoutes = process.env.AUDIT_ROUTES
const templates = [
  '/',
  '/legal',
  '/organization/about',
  '/organization/career',
  '/organization/departments',
  '/organization/departments/energy-system-modeling',
  '/organization/news-and-events',
  event,
  `${event}-2`,
  '/organization/partners-and-funders',
  '/organization/team',
  '/organization/theory-of-change',
  '/outputs/publications',
  publication,
  '/outputs/policy-briefs',
  '/outputs/success-stories',
  project,
  '/services',
  '/services/system-operators-and-utilities',
  '/tools-and-data',
].filter((route) => selectedRoutes === undefined || selectedRoutes.split(',').includes(route))

const results = []
process.on('exit', () => writeFileSync(output, JSON.stringify(results, null, 1)))
const keys = { tab: 'Tab', back: 'Shift+Tab' }
const needsLinkTabbing =
  /Tab walks|Shift.Tab from the trigger|Tab moves into|Tab reaches|collapsed panels are skipped|Tab past/
const record = (engine, width, route, name, pass, detail) => {
  if (engine === 'webkit' && needsLinkTabbing.test(name)) {
    results.push({ engine, width, route, name, pass: null, detail: 'links are not tab stops here' })
    return
  }
  results.push({ engine, width, route, name, pass, detail })
  if (pass === false) console.log(`FAIL ${engine} ${width} ${route} ${name} ${JSON.stringify(detail)}`)
}

const focusInfo = async () => {
  const element = document.activeElement
  if (!element || element === document.body) return null
  if (element.closest('oet-team-globe'))
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  const describe = (node) =>
    `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ''} "${(node.getAttribute('aria-label') ?? node.textContent).trim().replace(/\s+/g, ' ').slice(0, 40)}"`
  const own = getComputedStyle(element)
  const after = getComputedStyle(element, '::after')
  const drawn = (style) => style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 1
  const stretched = !drawn(own) && drawn(after)
  const style = stretched ? after : own
  const host = stretched ? element.offsetParent : element
  const rect = host.getBoundingClientRect()
  const reach = Math.max(parseFloat(style.outlineOffset) + parseFloat(style.outlineWidth), 0)
  const ring = {
    left: rect.left - reach,
    top: rect.top - reach,
    right: rect.right + reach,
    bottom: rect.bottom + reach,
  }
  const clippedBy = []
  const scroller = host.closest('[data-track]')
  const fits = scroller === null || rect.width <= scroller.clientWidth
  let node = host.parentElement
  while (node && node !== document.documentElement) {
    const computed = getComputedStyle(node)
    if (computed.overflowX !== 'visible' || computed.overflowY !== 'visible') {
      const box = node.getBoundingClientRect()
      if (
        fits &&
        rect.width <= box.width &&
        (ring.left < box.left - 2 ||
          ring.top < box.top - 2 ||
          ring.right > box.right + 2 ||
          ring.bottom > box.bottom + 2)
      )
        clippedBy.push(
          `${describe(node)} [${[box.left - ring.left, box.top - ring.top, ring.right - box.right, ring.bottom - box.bottom].map((value) => Math.round(value * 10) / 10).join(' ')}]`,
        )
    }
    node = node.parentElement
  }
  const x = Math.min(Math.max((rect.left + rect.right) / 2, 1), innerWidth - 1)
  const y = Math.min(Math.max((rect.top + rect.bottom) / 2, 1), innerHeight - 1)
  const hit = document.elementFromPoint(x, y)
  const covered =
    hit !== null &&
    !host.contains(hit) &&
    !hit.contains(host) &&
    !(rect.width * rect.height > 200000 && host.parentElement.contains(hit))
  const bar = document.querySelector('[data-bar]').getBoundingClientRect()
  const overlay = element.closest('oet-header, .skip-link') !== null
  const self = element.getBoundingClientRect()
  return {
    element: describe(element),
    top: Math.round(rect.top + scrollY),
    left: Math.round(rect.left),
    inMain: element.closest('main') !== null,
    map: element.closest('oet-team-globe') !== null,
    sized: rect.width > 0 && rect.height > 0,
    onScreen: rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight,
    hidden:
      own.visibility === 'hidden' || element.closest('[aria-hidden="true"], [inert]') !== null,
    indicator: drawn(style),
    outline: `${style.outlineColor} ${style.outlineWidth} ${style.outlineOffset}`,
    halo: style.boxShadow.includes('255, 254, 251'),
    clippedBy,
    covered: covered ? describe(hit) : null,
    underBar: !overlay && self.top < bar.bottom - 1 && self.bottom > bar.top + 1,
  }
}

const tabThrough = async (page) => {
  const stops = []
  for (let count = 0; count < 600; count += 1) {
    await page.keyboard.press(keys.tab)
    const info = await page.evaluate(focusInfo)
    if (info === null) break
    if (stops.length > 2 && info.element === stops[0].element) break
    const last = stops.at(-1)
    if (last && last.element === info.element && last.top === info.top && last.left === info.left)
      break
    stops.push(info)
  }
  return stops
}

const open = async (browser, width, route, options) => {
  const context = await browser.newContext({
    viewport: { width, height: width >= 1024 ? 900 : 917 },
    ...options,
  })
  await context.route(/youtube|youtu\.be|vimeo/, (request) => request.abort())
  await context.addInitScript(() => {
    window.calls = []
    window.print = () => window.calls.push('print')
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: (data) => {
        window.calls.push(`share ${data.url}`)
        return Promise.resolve()
      },
    })
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (text) => {
          window.calls.push(`copy ${text.slice(0, 20)}`)
          return Promise.resolve()
        },
      },
    })
  })
  const page = await context.newPage()
  const problems = []
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('ERR_FAILED'))
      problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(String(error)))
  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  return { context, page, problems }
}

const state = (page, selector, read) => page.locator(selector).first().evaluate(read)
const active = (page, read) => page.evaluate(read)

const generic = async (engine, browser, width, route) => {
  const { context, page } = await open(browser, width, route, { reducedMotion: 'reduce' })
  const check = (name, pass, detail) => record(engine, width, route, name, pass, detail)
  const globe = page.locator('oet-team-globe[data-variant="team"]')
  if (await globe.count()) {
    await globe.scrollIntoViewIfNeeded()
    await page.locator('oet-team-globe[data-ready]').waitFor()
    await page.evaluate(() => window.scrollTo(0, 0))
  }
  const stops = await tabThrough(page)
  const first = stops[0]
  check('skip link is the first stop', first.element.startsWith('a "Skip'), first.element)
  check('skip link visible when focused', first.onScreen && first.covered === null, first)
  const expected = await page.evaluate(
    () =>
      [...document.querySelectorAll('a[href], button, summary, [tabindex="0"]')].filter(
        (element) =>
          !element.disabled &&
          element.getClientRects().length > 0 &&
          getComputedStyle(element).visibility !== 'hidden',
      ).length,
  )
  check('every rendered control is a tab stop', stops.length === expected, {
    stops: stops.length,
    expected,
  })
  const failing = (test) => stops.filter(test).map((stop) => stop.element)
  check(
    'no stop without size',
    failing((stop) => !stop.sized).length === 0,
    failing((s) => !s.sized),
  )
  check(
    'no stop off-screen',
    failing((s) => !s.onScreen).length === 0,
    failing((s) => !s.onScreen),
  )
  check(
    'no stop hidden',
    failing((stop) => stop.hidden).length === 0,
    failing((s) => s.hidden),
  )
  check(
    'every stop draws the focus ring',
    failing((stop) => !stop.indicator || !stop.halo).length === 0,
    stops.filter((stop) => !stop.indicator || !stop.halo).map((s) => `${s.element} ${s.outline}`),
  )
  check(
    'no focus ring clipped',
    failing((stop) => stop.clippedBy.length > 0).length === 0,
    stops.filter((s) => s.clippedBy.length > 0).map((s) => `${s.element} by ${s.clippedBy[0]}`),
  )
  check(
    'no stop covered by another element',
    failing((stop) => stop.covered !== null).length === 0,
    stops.filter((s) => s.covered !== null).map((s) => `${s.element} by ${s.covered}`),
  )
  check(
    'no stop under the header bar',
    failing((s) => s.underBar).length === 0,
    failing((s) => s.underBar),
  )
  const main = stops.filter((stop) => stop.inMain && !stop.map)
  const backward = main
    .slice(1)
    .filter((stop, index) => stop.top < main[index].top - 150 && stop.left <= main[index].left + 10)
    .map((stop, index) => `${main[main.indexOf(stop) - 1].element} → ${stop.element} (${index})`)
  check('focus order follows the page downwards', backward.length === 0, backward)

  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  await page.keyboard.press(keys.tab)
  await page.keyboard.press('Enter')
  check('skip link sets the fragment', page.url().endsWith('#main'), page.url())
  await page.keyboard.press(keys.tab)
  const landed = await page.evaluate(focusInfo)
  const inside = await page.locator('main a[href], main button, main [tabindex="0"]').count()
  check(
    'focus continues inside main after the skip link',
    landed !== null && (landed.inMain || inside === 0),
    landed,
  )
  await context.close()
}

const header = async (engine, browser) => {
  const route = '/organization/about'
  const { context, page, problems } = await open(browser, 1440, route, {})
  const check = (name, pass, detail) => record(engine, 1440, route, `header: ${name}`, pass, detail)
  const triggers = page.locator('oet-header [data-dropdown] > button')
  const count = await triggers.count()
  for (let index = 0; index < count; index += 1) {
    const trigger = triggers.nth(index)
    const label = (await trigger.innerText()).trim() || (await trigger.getAttribute('aria-label'))
    const expanded = () => trigger.getAttribute('aria-expanded')
    const panel = page.locator('oet-header [data-dropdown]').nth(index).locator('[data-panel]')
    const focused = () => trigger.evaluate((element) => element === document.activeElement)
    await trigger.focus()
    check(`${label}: closed panel is not rendered`, !(await panel.isVisible()), null)
    await page.keyboard.press('Enter')
    check(`${label}: Enter opens`, (await expanded()) === 'true' && (await panel.isVisible()), null)
    await page.keyboard.press('Escape')
    check(
      `${label}: Escape closes and keeps focus`,
      (await expanded()) === 'false' && (await focused()),
      null,
    )
    await page.keyboard.press('Space')
    check(`${label}: Space opens`, (await expanded()) === 'true', null)
    await page.keyboard.press('Space')
    check(`${label}: Space closes`, (await expanded()) === 'false', null)
    await page.keyboard.press('ArrowDown')
    const inPanel = () =>
      panel.evaluate(
        (element) =>
          element.contains(document.activeElement) && document.activeElement.matches('a'),
      )
    check(
      `${label}: ArrowDown opens and focuses the first link`,
      (await expanded()) === 'true' && (await inPanel()),
      null,
    )
    await page.keyboard.press('Escape')
    check(
      `${label}: Escape from a link returns focus to the trigger`,
      (await expanded()) === 'false' && (await focused()),
      null,
    )
    await page.keyboard.press('Enter')
    const links = await panel.locator('a').count()
    for (let step = 0; step < links; step += 1) await page.keyboard.press(keys.tab)
    check(`${label}: Tab walks the ${links} links`, await inPanel(), null)
    await page.keyboard.press(keys.tab)
    await page.waitForTimeout(350)
    check(
      `${label}: Tab past the last link closes`,
      (await expanded()) === 'false' && !(await panel.isVisible()),
      null,
    )
    await trigger.focus()
    await page.keyboard.press('Enter')
    await page.keyboard.press(keys.back)
    check(`${label}: Shift+Tab from the trigger closes`, (await expanded()) === 'false', null)
  }
  check('no console errors', problems.length === 0, problems)
  await context.close()
}

const mobileMenu = async (engine, browser) => {
  const route = '/organization/about'
  const { context, page, problems } = await open(browser, 412, route, {})
  const check = (name, pass, detail) =>
    record(engine, 412, route, `mobile menu: ${name}`, pass, detail)
  const burger = page.locator('[data-burger]')
  const menu = page.locator('[data-mobile-menu]')
  const hasFocus = () => burger.evaluate((element) => element === document.activeElement)
  const locked = () => page.evaluate(() => getComputedStyle(document.documentElement).overflowY)
  check('closed panel is not rendered', !(await menu.isVisible()), null)
  await burger.focus()
  await page.keyboard.press('Enter')
  check(
    'Enter opens',
    (await burger.getAttribute('aria-expanded')) === 'true' && (await menu.isVisible()),
    null,
  )
  check('page scroll is locked', (await locked()) === 'hidden', await locked())
  const seen = []
  for (let step = 0; step < 40; step += 1) {
    await page.keyboard.press(keys.tab)
    seen.push(
      await page.evaluate(() => ({
        inside: document.activeElement.closest('oet-header') !== null,
        burger: document.activeElement.matches('[data-burger]'),
        visible: document.activeElement.getClientRects().length > 0,
      })),
    )
  }
  check(
    'Tab stays inside bar and panel',
    seen.every((stop) => stop.inside && stop.visible),
    null,
  )
  check('Tab wraps back to the burger', seen.filter((stop) => stop.burger).length >= 2, null)
  await burger.focus()
  await page.keyboard.press(keys.back)
  await page.keyboard.press(keys.back)
  await page.keyboard.press(keys.back)
  await page.keyboard.press(keys.back)
  check(
    'Shift+Tab wraps inside the menu',
    await page.evaluate(() => document.activeElement.closest('oet-header') !== null),
    null,
  )
  const summary = menu.locator('summary').first()
  await summary.focus()
  await page.keyboard.press('Enter')
  check(
    'Enter opens a group',
    await summary.evaluate((element) => element.parentElement.open),
    null,
  )
  await page.keyboard.press(keys.tab)
  check(
    'Tab moves into the open group',
    await summary.evaluate(
      (element) =>
        element.parentElement.contains(document.activeElement) &&
        document.activeElement.matches('a'),
    ),
    null,
  )
  await page.keyboard.press('Escape')
  check(
    'Escape closes',
    (await burger.getAttribute('aria-expanded')) === 'false' && !(await menu.isVisible()),
    null,
  )
  check('Escape returns focus to the burger', await hasFocus(), null)
  check('page scroll is restored', (await locked()) !== 'hidden', await locked())
  check('no console errors', problems.length === 0, problems)
  await context.close()
}

const home = async (engine, browser, width) => {
  const route = '/'
  const { context, page, problems } = await open(browser, width, route, {})
  const check = (name, pass, detail) => record(engine, width, route, name, pass, detail)
  const slide = () =>
    state(page, 'oet-hero [role="group"][data-active]', (element) => element.dataset.slide)
  const next = page.locator('oet-hero [data-next]')
  await next.focus()
  const paused = await state(
    page,
    'oet-hero .bar[data-active] .bar-fill',
    (element) => getComputedStyle(element).animationPlayState,
  )
  check('hero: progress pauses while focus is inside', paused === 'paused', paused)
  await page.waitForTimeout(9500)
  check('hero: no auto-advance while focused', (await slide()) === '0', await slide())
  await page.keyboard.press('Enter')
  check('hero: Enter on "next" shows slide 2', (await slide()) === '1', await slide())
  await page.waitForTimeout(800)
  check(
    'hero: inactive slides are not exposed',
    await page.evaluate(() =>
      [...document.querySelectorAll('oet-hero [role="group"]:not([data-active])')].every(
        (element) =>
          ['hidden', 'collapse'].includes(getComputedStyle(element).visibility) ||
          getComputedStyle(element).display === 'none',
      ),
    ),
    null,
  )
  const heroStops = await page.locator('oet-hero a, oet-hero button').count()
  check('hero: two actions and "next" are reachable', heroStops === 3, heroStops)

  const buttons = page.locator('oet-accordion h3 button')
  const second = buttons.nth(1)
  await second.focus()
  await page.keyboard.press('Enter')
  check(
    'accordion: Enter expands the item and collapses the others',
    (await second.getAttribute('aria-expanded')) === 'true' &&
      (await buttons.nth(0).getAttribute('aria-expanded')) === 'false',
    null,
  )
  await page.waitForTimeout(500)
  await page.keyboard.press(keys.tab)
  check(
    'accordion: Tab reaches the link of the open panel',
    await active(page, () =>
      document.activeElement.matches('oet-accordion [data-item="1"] .accordion-panel a'),
    ),
    await active(page, () => document.activeElement.outerHTML.slice(0, 80)),
  )
  await page.keyboard.press(keys.tab)
  check(
    'accordion: collapsed panels are skipped',
    await active(page, () =>
      document.activeElement.matches('oet-accordion [data-item="2"] h3 button'),
    ),
    await active(page, () => document.activeElement.outerHTML.slice(0, 80)),
  )
  await second.focus()
  await page.keyboard.press('Space')
  check(
    'accordion: Space keeps the item open',
    (await second.getAttribute('aria-expanded')) === 'true',
    null,
  )

  const carousel = page.locator('oet-card-carousel').first()
  const track = carousel.locator('[data-track]')
  const left = () => track.evaluate((element) => Math.round(element.scrollLeft))
  await track.scrollIntoViewIfNeeded()
  await track.focus()
  const range = await track.evaluate((element) => element.scrollWidth - element.clientWidth)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(700)
  check('carousel: ArrowRight scrolls the focused track', range === 0 || (await left()) > 0, {
    left: await left(),
    range,
  })
  await track.evaluate((element) => element.scrollTo({ left: 0, behavior: 'instant' }))
  await page.waitForTimeout(300)
  if (width >= 1024) {
    const forward = carousel.locator('[data-next]')
    const back = carousel.locator('[data-previous]')
    check(
      'carousel: "previous" starts disabled',
      (await back.getAttribute('aria-disabled')) === 'true',
      null,
    )
    await forward.focus()
    await page.keyboard.press('Enter')
    await page.waitForTimeout(900)
    check('carousel: Enter on "next" scrolls', (await left()) > 0, await left())
    check(
      'carousel: "previous" is enabled after scrolling',
      (await back.getAttribute('aria-disabled')) === 'false',
      null,
    )
    check(
      'carousel: focus stays on a control at the end',
      await active(page, () => document.activeElement.closest('oet-card-carousel') !== null),
      await active(page, () => document.activeElement.tagName),
    )
  }
  check('no console errors', problems.length === 0, problems)
  await context.close()
}

const listing = async (engine, browser, width) => {
  const route = '/outputs/success-stories'
  const { context, page, problems } = await open(browser, width, route, {})
  const check = (name, pass, detail) => record(engine, width, route, name, pass, detail)

  const select = page.locator('oet-select').first()
  const button = select.locator('button')
  const list = select.locator('[role="listbox"]')
  const marked = () => list.getAttribute('aria-activedescendant')
  const optionIds = await list
    .locator('[role="option"]')
    .evaluateAll((items) => items.map((item) => item.id))
  const focusOn = (locator) => locator.evaluate((element) => element === document.activeElement)
  await button.focus()
  await page.keyboard.press('ArrowDown')
  check(
    'listbox: ArrowDown opens and focuses the list',
    (await list.isVisible()) && (await focusOn(list)),
    null,
  )
  check('listbox: the selected option is active', (await marked()) === optionIds[0], await marked())
  await page.keyboard.press('ArrowDown')
  check('listbox: ArrowDown moves', (await marked()) === optionIds[1], await marked())
  await page.keyboard.press('End')
  check(
    'listbox: End moves to the last option',
    (await marked()) === optionIds.at(-1),
    await marked(),
  )
  await page.keyboard.press('Home')
  check(
    'listbox: Home moves to the first option',
    (await marked()) === optionIds[0],
    await marked(),
  )
  await page.keyboard.press('ArrowUp')
  check('listbox: ArrowUp wraps', (await marked()) === optionIds.at(-1), await marked())
  await page.keyboard.press('Escape')
  check(
    'listbox: Escape closes and returns focus',
    !(await list.isVisible()) && (await focusOn(button)),
    null,
  )
  await page.keyboard.press('Enter')
  check('listbox: Enter on the button opens', await list.isVisible(), null)
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  const chosen = await list.locator('[aria-selected="true"]').innerText()
  check(
    'listbox: Enter selects, closes and returns focus',
    !(await list.isVisible()) &&
      (await focusOn(button)) &&
      (await button.innerText()).includes(chosen.trim()),
    chosen,
  )
  await page.keyboard.press('Space')
  check('listbox: Space on the button opens', await list.isVisible(), null)
  await page.keyboard.press(keys.tab)
  check('listbox: Tab closes', !(await list.isVisible()), null)
  check(
    'listbox: aria-expanded follows',
    (await button.getAttribute('aria-expanded')) === 'false',
    null,
  )

  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  const progress = page.locator('oet-testimonial-slider [data-progress] button')
  if ((await progress.count()) > 1) {
    await progress.nth(1).focus()
    await page.keyboard.press('Enter')
    await page.waitForTimeout(1200)
    check(
      'testimonials: Enter on segment 2 shows slide 2',
      (await progress.nth(1).getAttribute('aria-current')) === 'true',
      null,
    )
    const track = page.locator('oet-testimonial-slider [data-track]')
    await track.focus()
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(1200)
    check(
      'testimonials: ArrowLeft on the focused track goes back',
      (await progress.nth(0).getAttribute('aria-current')) === 'true',
      null,
    )
  } else check('testimonials: multiple-slide interaction', null, 'No multiple-slide fixture on this page')

  const pages = page.locator('nav[aria-label="Pagination"]').last()
  check(
    'pagination: current page is marked and disabled steps are not links',
    (await pages.locator('a[aria-current="page"]').count()) === 1 &&
      (await pages.locator('span[aria-disabled="true"] a').count()) === 0,
    null,
  )
  const target = pages.locator('a:not([aria-current])').first()
  if (await target.count()) {
    const href = await target.getAttribute('href')
    await target.focus()
    await page.keyboard.press('Enter')
    await page.waitForURL((url) => url.href.endsWith(href), { timeout: 5000 })
    check('pagination: Enter follows the link', page.url().endsWith(href), [page.url(), href])
  } else {
    check('pagination: hidden when every item fits', !(await pages.isVisible()), null)
  }

  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  const tab = page.locator('nav[aria-label="Project status"] a:not([aria-current])').first()
  const tabHref = await tab.getAttribute('href')
  check(
    'filter tabs: one tab is current',
    (await page.locator('nav[aria-label="Project status"] a[aria-current="true"]').count()) === 1,
    null,
  )
  await tab.focus()
  await page.keyboard.press('Enter')
  const requestedTab = new URL(tabHref, `${origin}${route}`)
  await page.waitForURL((url) => url.search === requestedTab.search, { timeout: 5000 })
  check('filter tabs: Enter updates the selected query', new URL(page.url()).search === requestedTab.search, [page.url(), tabHref])
  check('no console errors', problems.length === 0, problems)
  await context.close()
}

const publicationDetail = async (engine, browser, width) => {
  const { context, page, problems } = await open(browser, width, publication, {})
  const check = (name, pass, detail) => record(engine, width, publication, name, pass, detail)
  const link = page.locator('oet-toc a').nth(2)
  const hash = await link.getAttribute('href')
  await link.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(800)
  const position = await page.evaluate((id) => {
    const heading = document.getElementById(id).getBoundingClientRect()
    const bar = document.querySelector('[data-bar]').getBoundingClientRect()
    return { top: Math.round(heading.top), bar: Math.round(bar.bottom) }
  }, hash.slice(1))
  check(
    'table of contents: Enter jumps and the heading clears the bar',
    page.url().endsWith(hash) && position.top >= position.bar,
    position,
  )
  check(
    'table of contents: the entry becomes current',
    await page
      .evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))),
          ),
      )
      .then(() => link.getAttribute('aria-current'))
      .then((value) => value === 'true'),
    null,
  )
  for (const [action, expected] of [
    ['share', 'share'],
    ['cite', 'copy'],
    ['pdf', 'print'],
  ]) {
    await page.evaluate(() => {
      window.calls.length = 0
    })
    await page.locator(`oet-share-bar [data-action="${action}"]`).focus()
    await page.keyboard.press('Enter')
    await page.waitForTimeout(100)
    const calls = await page.evaluate(() => window.calls)
    check(
      `share bar: Enter on "${action}"`,
      calls.length === 1 && calls[0].startsWith(expected),
      calls,
    )
  }
  check(
    'share bar: the copy is announced',
    (await page.locator('oet-share-bar [data-status]').innerText()).length > 0,
    null,
  )
  check('no console errors', problems.length === 0, problems)
  await context.close()
}

const eventDetail = async (engine, browser, width) => {
  for (const route of [event, `${event}-2`]) {
    const { context, page, problems } = await open(browser, width, route, {})
    const check = (name, pass, detail) => record(engine, width, route, name, pass, detail)
    const tabs = page.locator('oet-media-gallery [role="tab"]')
    if ((await tabs.count()) > 0) {
      const selected = () =>
        tabs.evaluateAll((items) =>
          items.findIndex((item) => item.getAttribute('aria-selected') === 'true'),
        )
      const focusedIndex = () => tabs.evaluateAll((items) => items.indexOf(document.activeElement))
      const total = await tabs.count()
      await tabs.first().focus()
      await page.keyboard.press('ArrowRight')
      check(
        'gallery: ArrowRight selects and focuses the next tab',
        (await selected()) === 1 && (await focusedIndex()) === 1,
        null,
      )
      check(
        'gallery: only the selected panel is shown',
        (await page.locator('oet-media-gallery [role="tabpanel"]:not([hidden])').count()) === 1 &&
          (await page.locator('oet-media-gallery [role="tabpanel"]').nth(1).isVisible()),
        null,
      )
      await page.keyboard.press('End')
      check('gallery: End selects the last tab', (await selected()) === total - 1, null)
      await page.keyboard.press('ArrowRight')
      check('gallery: ArrowRight wraps', (await selected()) === 0, null)
      await page.keyboard.press('ArrowLeft')
      check('gallery: ArrowLeft wraps', (await selected()) === total - 1, null)
      await page.keyboard.press('Home')
      check('gallery: Home selects the first tab', (await selected()) === 0, null)
      check(
        'gallery: one tab in the tab order',
        (await tabs.evaluateAll((items) => items.filter((item) => item.tabIndex === 0).length)) ===
          1,
        null,
      )
    }
    const play = page.locator('oet-video-poster a[data-embed]')
    if ((await play.count()) > 0) {
      await play.first().focus()
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)
      check(
        'video: Enter replaces the poster with the player and focuses it',
        await page.evaluate(
          () =>
            document.activeElement.tagName === 'IFRAME' && document.activeElement.title.length > 0,
        ),
        await page.evaluate(() => document.activeElement.tagName),
      )
    }
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
}

const team = async (engine, browser, width) => {
  const route = '/organization/team'
  const { context, page, problems } = await open(browser, width, route, {})
  const check = (name, pass, detail) => record(engine, width, route, name, pass, detail)
  const globe = page.locator('oet-team-globe')
  const stage = globe.locator('[data-globe="stage"]')
  await globe.scrollIntoViewIfNeeded()
  await page.waitForSelector('oet-team-globe[data-ready]', { timeout: 15000 })
  const land = () => globe.locator('[data-globe="land"]').getAttribute('d')
  check(
    'globe: the stage is a tab stop once ready',
    (await stage.getAttribute('tabindex')) === '0',
    null,
  )
  await stage.focus()
  await page.waitForTimeout(300)
  const still = await land()
  await page.waitForTimeout(400)
  check('globe: rotation pauses while focused', (await land()) === still, null)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(200)
  const turned = await land()
  check('globe: ArrowRight rotates', turned !== still, null)
  await page.keyboard.press('ArrowUp')
  await page.waitForTimeout(200)
  check('globe: ArrowUp tilts', (await land()) !== turned, null)
  const pin = globe.locator('[data-globe="pin"][aria-pressed="false"]:not([data-hidden])').first()
  const code = await pin.getAttribute('data-code')
  const name = (await pin.locator('.sr-only').first().innerText()).replace(':', '').trim()
  await pin.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(900)
  const pressed = await globe
    .locator(`[data-globe="pin"][data-code="${code}"]`)
    .getAttribute('aria-pressed')
  check('globe: Enter on a country button selects it', pressed === 'true', pressed)
  const card = await globe.locator('[data-globe-card="country"]').innerText()
  check('globe: the card names the country', card.trim() === name, { card, name })
  check('globe: the card is shown', await globe.locator('[data-globe="card"]').isVisible(), null)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  check(
    'globe: Escape deselects',
    (await globe.locator('[data-globe="pin"][aria-pressed="true"]').count()) === 0,
    null,
  )
  check('no console errors', problems.length === 0, problems)
  await context.close()
}

const theory = async (engine, browser, width) => {
  const route = '/organization/theory-of-change'
  const { context, page, problems } = await open(browser, width, route, {})
  const check = (name, pass, detail) => record(engine, width, route, name, pass, detail)
  const matrix = page.locator('oet-outcome-matrix')
  await matrix.scrollIntoViewIfNeeded()
  await matrix.focus()
  await page.waitForTimeout(1200)
  check(
    'matrix: expands when it is on screen',
    (await matrix.getAttribute('data-collapsed')) === null,
    null,
  )
  const range = await matrix.evaluate((element) => element.scrollWidth - element.clientWidth)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(500)
  const left = await matrix.evaluate((element) => element.scrollLeft)
  check('matrix: ArrowRight scrolls the region when it overflows', range === 0 || left > 0, {
    range,
    left,
  })
  check(
    'matrix: every cell text is in the accessibility tree',
    (await matrix.locator('h3').count()) === 4 &&
      (await matrix.getAttribute('aria-label')).length > 0,
    null,
  )
  check('no console errors', problems.length === 0, problems)
  await context.close()
}

for (const engine of engines) {
  const browser = await launchers[engine].launch()
  if (engine === 'chromium')
    for (const width of [1440, 412])
      for (const route of templates) await generic(engine, browser, width, route)
  if (engine === 'firefox')
    for (const route of ['/', '/outputs/success-stories', publication])
      await generic(engine, browser, 1440, route)
  await header(engine, browser)
  await mobileMenu(engine, browser)
  for (const width of [1440, 412]) {
    await home(engine, browser, width)
    await listing(engine, browser, width)
    await publicationDetail(engine, browser, width)
    await eventDetail(engine, browser, width)
    await team(engine, browser, width)
    await theory(engine, browser, width)
  }
  await browser.close()
}

writeFileSync(output, JSON.stringify(results, null, 1))
const failed = results.filter((result) => result.pass === false)
const untestable = results.filter((result) => result.pass === null)
console.log(
  JSON.stringify({ checks: results.length, failed: failed.length, untestable: untestable.length }),
)
process.exitCode = failed.length > 0 ? 1 : 0
