import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium, firefox, webkit } from 'playwright'

const [, , origin, folder, ...requested] = process.argv
if (!origin || !folder)
  throw new Error(
    'usage: node scripts/modes-check.mjs <origin> <output folder> [chromium firefox webkit]',
  )

const launchers = { chromium, firefox, webkit }
const engines = requested.length > 0 ? requested : ['chromium', 'firefox', 'webkit']
mkdirSync(folder, { recursive: true })

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
  '/outputs/success-stories',
  project,
  '/services',
  '/services/system-operators-and-utilities',
  '/tools-and-data',
].filter((route) => selectedRoutes === undefined || selectedRoutes.split(',').includes(route))

const results = []
const record = (engine, mode, route, name, pass, detail) => {
  results.push({ engine, mode, route, name, pass, detail })
  if (!pass) console.log(`FAIL ${engine} ${mode} ${route} ${name} ${JSON.stringify(detail)}`)
}

const open = async (browser, width, route, options) => {
  const context = await browser.newContext({
    viewport: { width, height: width >= 1024 ? 900 : 917 },
    deviceScaleFactor: 1,
    ...options,
  })
  const page = await context.newPage()
  const problems = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(String(error)))
  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  return { context, page, problems }
}

const scrollTo = async (page, y) => {
  await page.evaluate((offset) => window.scrollTo({ top: offset, behavior: 'instant' }), y)
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
  await page.waitForTimeout(150)
}

const features = async (engine, browser) => {
  const mode = 'features 1440'
  {
    const { context, page, problems } = await open(browser, 1440, '/', {})
    const check = (name, pass, detail) => record(engine, mode, '/', name, pass, detail)
    const first = await page.evaluate(() => {
      const filter = (element) => {
        const style = getComputedStyle(element)
        return style.backdropFilter ? style.backdropFilter : style.webkitBackdropFilter
      }
      const names = [
        ...new Set([...document.querySelectorAll('*')].map((element) => element.localName)),
      ].filter((name) => name.startsWith('oet-'))
      const image = document.querySelector('oet-hero img')
      const track = [...document.querySelectorAll('oet-card-carousel [data-track]')].at(-1)
      return {
        undefinedElements: names.filter((name) => !customElements.get(name)),
        elements: names,
        bar: filter(document.querySelector('[data-bar]')),
        tag: filter(document.querySelector('main [class*="backdrop-blur"]')),
        heroSource: image.currentSrc.split('.').at(-1),
        heroLoaded: image.naturalWidth > 0,
        theme: document.querySelector('oet-header').dataset.theme,
        preloader: getComputedStyle(document.querySelector('.oet-preloader')).animationName,
        snap: getComputedStyle(track).scrollSnapType,
        zoom: getComputedStyle(track.querySelector('article')).zoom,
        card: Math.round(track.querySelector('article').getBoundingClientRect().width * 10) / 10,
      }
    })
    check(
      'custom elements are defined',
      first.undefinedElements.length === 0,
      first.undefinedElements,
    )
    check('header bar has a backdrop filter', first.bar.includes('blur(6px)'), first.bar)
    check('glass boxes have a backdrop filter', first.tag.includes('blur'), first.tag)
    check(
      'hero image loaded from a modern source',
      first.heroLoaded && ['avif', 'webp'].includes(first.heroSource),
      first.heroSource,
    )
    check(
      'preloader runs on a first visit',
      first.preloader === 'oet-preloader-out',
      first.preloader,
    )
    check('carousel snaps', first.snap.includes('mandatory'), first.snap)
    check('home card is the scaled 291.7px card', Math.abs(first.card - 291.7) < 0.6, [
      first.card,
      first.zoom,
    ])
    check('header starts light on the hero', first.theme === 'light', first.theme)

    const steps = page.locator('oet-steps')
    const top = await steps.evaluate((element) => element.getBoundingClientRect().top + scrollY)
    const total = await steps.evaluate((element) =>
      Number(element.style.getPropertyValue('--steps')),
    )
    check('steps scene is enhanced', (await steps.getAttribute('data-enhanced')) !== null, null)
    for (let step = 0; step < total; step += 1) {
      await scrollTo(page, top - 20 + step * 600 + (step === 0 ? 10 : 0))
      const pinned = await steps.evaluate((element) => ({
        top: Math.round(element.querySelector('.steps-panel').getBoundingClientRect().top),
        step: element.dataset.step,
      }))
      check(
        `steps scene pins at step ${step + 1}`,
        pinned.top === 20 && pinned.step === String(step),
        pinned,
      )
    }
    const themeOnRed = await page.evaluate(() => document.querySelector('oet-header').dataset.theme)
    check('header switches to the section theme', themeOnRed === 'on-red', themeOnRed)
    await scrollTo(page, await page.evaluate(() => document.documentElement.scrollHeight))
    await page.waitForTimeout(300)
    const footerTheme = await page.evaluate(
      () => document.querySelector('oet-header').dataset.theme,
    )
    check('header is on-red over the footer', footerTheme === 'on-red', footerTheme)
    const lazy = await page.evaluate(
      () =>
        [...document.images].filter(
          (image) =>
            image.complete && image.naturalWidth === 0 && image.getClientRects().length > 0,
        ).length,
    )
    check('no broken image after scrolling', lazy === 0, lazy)
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
  {
    const route = '/organization/theory-of-change'
    const { context, page, problems } = await open(browser, 1440, route, {})
    const check = (name, pass, detail) => record(engine, mode, route, name, pass, detail)
    const scene = page.locator('oet-theory-scene')
    check('scroll scene is enhanced', (await scene.getAttribute('data-enhanced')) !== null, null)
    const box = await scene.evaluate((element) => ({
      top: element.getBoundingClientRect().top + scrollY,
      height: element.getBoundingClientRect().height,
    }))
    check('scroll scene is one viewport plus 800px', Math.abs(box.height - 1700) <= 1, box.height)
    for (const [fraction, expected] of [
      [0.02, ['0', '0']],
      [0.5, ['1', '0']],
      [0.99, ['1', '1']],
    ]) {
      await scrollTo(page, box.top + fraction * 800)
      await page.waitForTimeout(fraction === 0.99 ? 2000 : 350)
      const read = await scene.evaluate((element) => {
        const panel = element.querySelector('[data-state="initial"]')
        return {
          top: Math.round(panel.getBoundingClientRect().top),
          p1: String(Math.round(Number(getComputedStyle(panel).getPropertyValue('--p1')))),
          p2: String(Math.round(Number(getComputedStyle(panel).getPropertyValue('--p2')))),
          fill: getComputedStyle(panel).backgroundColor,
        }
      })
      check(
        `scroll scene pinned at ${fraction * 100}%`,
        read.top === 0 && read.p1 === expected[0] && read.p2 === expected[1],
        read,
      )
    }
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
  {
    const route = '/organization/team'
    const { context, page, problems } = await open(browser, 1440, route, {})
    const check = (name, pass, detail) => record(engine, mode, route, name, pass, detail)
    const globe = page.locator('oet-team-globe')
    check('globe waits before it loads', (await globe.getAttribute('data-ready')) === null, null)
    await globe.scrollIntoViewIfNeeded()
    const ready = await page.waitForSelector('oet-team-globe[data-ready]', { timeout: 15000 }).then(
      () => true,
      () => false,
    )
    check('globe loads its script when scrolled to', ready, null)
    await globe.locator('[data-globe="stage"]').focus()
    await page.keyboard.press('Escape')
    await globe.locator('[data-globe="stage"]').evaluate((element) => element.blur())
    await page.mouse.move(5, 5)
    const land = () => globe.locator('[data-globe="land"]').getAttribute('d')
    const before = await land()
    await page.waitForTimeout(700)
    check('globe turns when idle', (await land()) !== before, null)
    const pin = await globe
      .locator('[data-globe="pin"]')
      .first()
      .evaluate((element) => ({
        size: getComputedStyle(element).fontSize,
        stage: element.closest('[data-globe="stage"]').getBoundingClientRect().width,
      }))
    check(
      'pins scale with the stage through container units',
      Math.abs(parseFloat(pin.size) - pin.stage * 0.008121) < 0.1,
      pin,
    )
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
}

const reduced = async (engine, browser) => {
  const mode = 'reduced motion 1440'
  const options = { reducedMotion: 'reduce' }
  {
    const { context, page, problems } = await open(browser, 1440, '/', options)
    const check = (name, pass, detail) => record(engine, mode, '/', name, pass, detail)
    const read = await page.evaluate(() => ({
      preloader: getComputedStyle(document.querySelector('.oet-preloader')).display,
      bar: getComputedStyle(document.querySelector('oet-hero .bar[data-active] .bar-fill'))
        .animationName,
      steps: document.querySelector('oet-steps').hasAttribute('data-enhanced'),
      panel: getComputedStyle(document.querySelector('.steps-panel')).position,
      smooth: getComputedStyle(document.querySelector('[data-track]')).scrollBehavior,
    }))
    check('preloader is not shown', read.preloader === 'none', read.preloader)
    check('hero progress does not animate', read.bar === 'none', read.bar)
    check('steps are stacked, not pinned', !read.steps && read.panel !== 'sticky', read)
    check('carousels do not scroll smoothly', read.smooth === 'auto', read.smooth)
    await page.waitForTimeout(10000)
    const slide = await page.evaluate(
      () => document.querySelector('oet-hero [role="group"][data-active]').dataset.slide,
    )
    check('hero does not advance by itself', slide === '0', slide)
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
  {
    const route = '/organization/theory-of-change'
    const { context, page, problems } = await open(browser, 1440, route, options)
    const check = (name, pass, detail) => record(engine, mode, route, name, pass, detail)
    const read = await page.evaluate(() => ({
      enhanced: document.querySelector('oet-theory-scene').hasAttribute('data-enhanced'),
      panels: [...document.querySelectorAll('oet-theory-scene .scene-panel')].filter(
        (panel) => panel.getClientRects().length > 0,
      ).length,
      collapsed: document.querySelector('oet-outcome-matrix').hasAttribute('data-collapsed'),
    }))
    check('scroll scene is three stacked panels', !read.enhanced && read.panels === 3, read)
    check('matrix is expanded from the start', !read.collapsed, read)
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
  {
    const route = '/organization/team'
    const { context, page, problems } = await open(browser, 1440, route, options)
    const check = (name, pass, detail) => record(engine, mode, route, name, pass, detail)
    const globe = page.locator('oet-team-globe')
    await globe.scrollIntoViewIfNeeded()
    await page.waitForSelector('oet-team-globe[data-ready]', { timeout: 15000 })
    await globe.locator('[data-globe="stage"]').focus()
    await page.keyboard.press('Escape')
    await globe.locator('[data-globe="stage"]').evaluate((element) => element.blur())
    await page.mouse.move(5, 5)
    const land = () => globe.locator('[data-globe="land"]').getAttribute('d')
    const before = await land()
    await page.waitForTimeout(900)
    check('globe does not turn by itself', (await land()) === before, null)
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
}

const noScript = async (engine, browser) => {
  for (const width of [1440, 412]) {
    const mode = `no JavaScript ${width}`
    for (const route of templates) {
      const { context, page } = await open(browser, width, route, {
        javaScriptEnabled: false,
        reducedMotion: 'no-preference',
      })
      const check = (name, pass, detail) => record(engine, mode, route, name, pass, detail)
      const height = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y < height; y += 600) {
        await page.evaluate((offset) => window.scrollTo(0, offset), y)
        await page.waitForTimeout(60)
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForLoadState('networkidle')
      const measure = () => {
        const shown = (element) => {
          if (element.getClientRects().length === 0) return false
          let node = element
          while (node && node !== document.body) {
            const style = getComputedStyle(node)
            if (style.visibility === 'hidden' || style.opacity === '0') return false
            node = node.parentElement
          }
          return true
        }
        const texts = [
          ...document.querySelectorAll(
            'main h1, main h2, main h3, main p, main li, main blockquote',
          ),
        ].filter(
          (element) =>
            element.textContent.trim().length > 0 &&
            !element.closest('[hidden], .sr-only, oet-pagination'),
        )
        const squeeze = (text) => text.replace(/\s+/g, '').toLowerCase()
        const rendered = squeeze(document.querySelector('main').innerText)
        const faded = (element) => {
          let node = element
          while (node && node !== document.body) {
            if (getComputedStyle(node).opacity === '0') return true
            node = node.parentElement
          }
          return false
        }
        const unread = texts.filter(
          (element) => !rendered.includes(squeeze(element.textContent)) || faded(element),
        )
        return {
          overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          texts: texts.length,
          unread: unread.map((element) => element.textContent.trim().slice(0, 50)),
          preloader: getComputedStyle(document.querySelector('.oet-preloader')).display,
          pinned: [...document.querySelectorAll('.steps-panel, .scene-panel')].filter(
            (panel) => getComputedStyle(panel).position === 'sticky',
          ).length,
          dead: [...document.querySelectorAll('main button:not(oet-accordion button)')]
            .filter((button) => !button.disabled && shown(button))
            .map((button) =>
              (button.getAttribute('aria-label') ?? button.textContent)
                .trim()
                .replace(/\s+/g, ' ')
                .slice(0, 30),
            ),
        }
      }
      const read = await page.evaluate(measure)
      check('no horizontal overflow', read.overflowX <= 0, read.overflowX)
      const scripted = await open(browser, width, route, { reducedMotion: 'reduce' })
      const withScript = await scripted.page.evaluate(measure)
      await scripted.context.close()
      const lost = read.unread.filter((text) => !withScript.unread.includes(text))
      check('all text shown with script is shown without', lost.length === 0, lost.slice(0, 6))
      check('preloader is not shown', read.preloader === 'none', read.preloader)
      check('nothing is pinned', read.pinned === 0, read.pinned)
      check('no button without a function is shown', read.dead.length === 0, read.dead)
      if (width === 412) {
        const openLink = page.locator('[data-static-open]')
        check(
          'menu link is shown in place of the button',
          (await openLink.isVisible()) && !(await page.locator('[data-burger]').isVisible()),
          null,
        )
        await openLink.click()
        const menu = page.locator('[data-mobile-menu]')
        check('menu opens through the fragment', await menu.isVisible(), page.url())
        const group = menu.locator('summary').nth(1)
        await group.click()
        check(
          'a group opens without script',
          await group.evaluate(
            (element) =>
              element.parentElement.open &&
              element.parentElement.querySelector('a').getClientRects().length > 0,
          ),
          null,
        )
        await page.locator('[data-static-close]').click()
        check('menu closes through the close link', !(await menu.isVisible()), page.url())
      } else {
        const trigger = page.locator('oet-header [data-dropdown] > button').first()
        await trigger.focus()
        check(
          'dropdown opens on focus',
          await page.locator('oet-header [data-dropdown] [data-panel]').first().isVisible(),
          null,
        )
      }
      if (
        route === '/' ||
        route === '/organization/theory-of-change' ||
        route === '/organization/team'
      ) {
        await page.screenshot({
          path: join(
            folder,
            `nojs-${engine}-${width}-${route === '/' ? 'home' : route.split('/').at(-1)}.png`,
          ),
          fullPage: true,
        })
      }
      await context.close()
    }
  }
}

const print = async (engine, browser) => {
  for (const route of [publication, project]) {
    const { context, page, problems } = await open(browser, 1440, route, {
      reducedMotion: 'reduce',
    })
    const check = (name, pass, detail) => record(engine, 'print', route, name, pass, detail)
    await page.setViewportSize({ width: 794, height: 1123 })
    await page.emulateMedia({ media: 'print' })
    await page.waitForTimeout(300)
    const read = await page.evaluate(() => {
      const shown = (selector) =>
        [...document.querySelectorAll(selector)].filter(
          (element) => element.getClientRects().length > 0,
        ).length
      const article = document.querySelector('[data-print="article"]').getBoundingClientRect()
      return {
        header: shown('oet-header'),
        footer: shown('footer'),
        skip: shown('.skip-link'),
        aside: shown('main aside'),
        hidden: shown('[data-print="hide"]'),
        title: shown('main h1'),
        article: [Math.round(article.left), Math.round(article.width)],
        page: document.documentElement.clientWidth,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        paragraphs: shown('[data-print="article"] p'),
      }
    })
    check(
      'header, footer and skip link are not printed',
      read.header + read.footer + read.skip === 0,
      read,
    )
    check(
      'sidebar, related items and call to action are not printed',
      read.aside + read.hidden === 0,
      read,
    )
    check('title and body are printed', read.title === 1 && read.paragraphs > 3, read)
    check(
      'body uses the page width',
      read.article[1] >= read.page - 80 && read.overflowX <= 0,
      read,
    )
    const name = `print-${engine}-${route.split('/').at(-1).slice(0, 24)}`
    await page.screenshot({ path: join(folder, `${name}.png`), fullPage: true })
    if (engine === 'chromium') {
      const pdf = await page.pdf({ format: 'A4', printBackground: true })
      writeFileSync(join(folder, `${name}.pdf`), pdf)
      check('PDF is produced', pdf.length > 20000, pdf.length)
    }
    check('no console errors', problems.length === 0, problems)
    await context.close()
  }
}

for (const engine of engines) {
  const browser = await launchers[engine].launch()
  await features(engine, browser)
  await reduced(engine, browser)
  await noScript(engine, browser)
  await print(engine, browser)
  await browser.close()
}

writeFileSync(join(folder, 'modes.json'), JSON.stringify(results, null, 1))
const failed = results.filter((result) => !result.pass)
console.log(JSON.stringify({ checks: results.length, failed: failed.length }))
process.exitCode = failed.length > 0 ? 1 : 0
