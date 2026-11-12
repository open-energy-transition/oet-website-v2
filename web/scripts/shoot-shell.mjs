import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const url = 'http://localhost:4321/dev/shell'
const out = '.screenshots/shell'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const report = { problems: [], checks: {}, sizes: {} }

const open = async (width, height) => {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  await context.routeWebSocket(/./, () => {})
  const page = await context.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') report.problems.push(message.text())
  })
  page.on('pageerror', (error) => report.problems.push(String(error)))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  return { context, page }
}

const shot = async (page, name, clip) => {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await page.screenshot({ path: `${out}/${name}.png`, clip })
    } catch (error) {
      if (attempt === 3) throw error
      await page.waitForTimeout(250)
    }
  }
}

const scrollToSection = async (page, index) => {
  await page.evaluate((position) => {
    const section = document.querySelectorAll('[data-header-theme]')[position]
    scrollTo(0, section.getBoundingClientRect().top + scrollY - 20)
  }, index)
  await page.waitForTimeout(400)
}

const theme = (page) => page.locator('oet-header').getAttribute('data-theme')

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  await context.routeWebSocket(/./, () => {})
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'commit' })
  await page.waitForSelector('.oet-preloader', { state: 'attached' })
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector('.oet-preloader')).display === 'flex',
    null,
    { timeout: 3000 },
  )
  report.checks.preloaderShownOnFirstVisit = true
  await shot(page, 'd-preloader')
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector('.oet-preloader')).visibility === 'hidden',
    null,
    { timeout: 3000 },
  )
  report.checks.preloaderGoneAfterAnimation = true
  await page.reload({ waitUntil: 'commit' })
  await page.waitForSelector('.oet-preloader', { state: 'attached' })
  report.checks.preloaderSkippedOnSecondPage = await page
    .locator('.oet-preloader')
    .evaluate((element) => getComputedStyle(element).display === 'none')
  await context.close()
}

{
  const { context, page } = await open(1440, 900)
  const bar = { x: 0, y: 0, width: 1440, height: 460 }
  report.checks.themeAtTop = await theme(page)
  await shot(page, 'd-light', bar)

  const triggers = page.locator('oet-header nav [data-dropdown] > button')
  const names = ['tools', 'services', 'outputs', 'organization']
  for (const [index, name] of names.entries()) {
    await triggers.nth(index).hover()
    await page.waitForTimeout(350)
    await shot(page, `d-menu-${name}`, bar)
  }
  await page.mouse.move(700, 800)
  await page.waitForTimeout(350)
  report.checks.closesOnPointerLeave =
    (await triggers.nth(3).getAttribute('aria-expanded')) === 'false'

  const language = page.locator('oet-header [aria-controls="nav-language"]')
  await language.click()
  await page.waitForTimeout(350)
  await shot(page, 'd-menu-language', bar)
  await page.mouse.click(700, 800)
  report.checks.closesOnOutsideClick = (await language.getAttribute('aria-expanded')) === 'false'

  await triggers.nth(0).focus()
  await page.keyboard.press('Enter')
  report.checks.enterOpens = (await triggers.nth(0).getAttribute('aria-expanded')) === 'true'
  await page.keyboard.press('Escape')
  report.checks.escapeCloses = (await triggers.nth(0).getAttribute('aria-expanded')) === 'false'
  report.checks.escapeReturnsFocus = await triggers
    .nth(0)
    .evaluate((element) => element === document.activeElement)
  await page.keyboard.press('Space')
  report.checks.spaceOpens = (await triggers.nth(0).getAttribute('aria-expanded')) === 'true'
  await page.keyboard.press('Escape')
  await page.keyboard.press('ArrowDown')
  report.checks.arrowDownFocusesFirstLink = await page.evaluate(
    () =>
      document.activeElement ===
      document.querySelector('oet-header [data-dropdown] [data-panel] a'),
  )
  for (let step = 0; step < 5; step += 1) await page.keyboard.press('Tab')
  report.checks.tabLeavesAndCloses =
    (await triggers.nth(0).getAttribute('aria-expanded')) === 'false' &&
    (await triggers.nth(1).evaluate((element) => element === document.activeElement))
  await page.mouse.click(700, 800)

  for (const [index, name] of ['light', 'dark', 'on-red', 'dark-2', 'over-footer'].entries()) {
    await scrollToSection(page, index)
    report.checks[`themeOver:${name}`] = await theme(page)
    if (index > 0) await shot(page, `d-${name}`, { x: 0, y: 0, width: 1440, height: 160 })
  }
  await page.addStyleTag({ content: 'oet-header { visibility: hidden }' })
  await page.locator('footer').screenshot({ path: `${out}/d-footer.png` })
  report.sizes.desktopFooter = await page.locator('footer').boundingBox()
  await context.close()
}

{
  const { context, page } = await open(412, 917)
  const top = { x: 0, y: 0, width: 412, height: 140 }
  await shot(page, 'm-light', top)
  await scrollToSection(page, 1)
  await shot(page, 'm-dark', top)
  await page.locator('oet-header [aria-controls="nav-language"]').click()
  await page.waitForTimeout(350)
  await shot(page, 'm-language', { x: 0, y: 0, width: 412, height: 240 })
  await page.keyboard.press('Escape')
  const hide = await page.addStyleTag({ content: 'oet-header { visibility: hidden }' })
  await page.locator('footer').screenshot({ path: `${out}/m-footer.png` })
  await hide.evaluate((element) => element.remove())
  report.sizes.mobileFooter = await page.locator('footer').boundingBox()
  await scrollToSection(page, 0)

  const burger = page.locator('[data-burger]')
  await burger.click()
  await page.waitForTimeout(350)
  await shot(page, 'm-menu-root')
  report.checks.scrollLocked = await page.evaluate(
    () => getComputedStyle(document.documentElement).overflow === 'hidden',
  )
  report.checks.burgerExpanded = (await burger.getAttribute('aria-expanded')) === 'true'

  const stops = await page.evaluate(
    () =>
      [...document.querySelectorAll('oet-header :is(a, button, summary)')].filter(
        (element) => element.getClientRects().length > 0,
      ).length,
  )
  await page.locator('oet-header [data-bar] > a').focus()
  const visited = []
  for (let step = 0; step < stops + 2; step += 1) {
    await page.keyboard.press('Tab')
    visited.push(await page.evaluate(() => document.activeElement.closest('oet-header') !== null))
  }
  await page.keyboard.press('Shift+Tab')
  visited.push(await page.evaluate(() => document.activeElement.closest('oet-header') !== null))
  report.checks.focusTrapped = visited.every(Boolean)

  await page.locator('[data-mobile-menu] summary').nth(0).click()
  await page.waitForTimeout(200)
  await shot(page, 'm-menu-group')
  await page.locator('[data-mobile-menu] summary').nth(2).click()
  await page.waitForTimeout(200)
  report.checks.accordionExclusive = await page.evaluate(
    () => document.querySelectorAll('[data-mobile-menu] details[open]').length === 1,
  )
  await page.locator('[data-mobile-menu] summary').nth(1).click()
  await page.waitForTimeout(200)
  await shot(page, 'm-menu-services')
  await page.locator('[data-mobile-menu] [data-drill] summary').click()
  await page.waitForTimeout(200)
  report.checks.drillDownCloses = await page.evaluate(
    () =>
      document.querySelectorAll('[data-mobile-menu] li').length > 0 &&
      document.querySelector('[data-mobile-menu] li:not([data-drill])').getClientRects().length > 0,
  )

  await page.keyboard.press('Escape')
  report.checks.escapeClosesMenu = (await burger.getAttribute('aria-expanded')) === 'false'
  report.checks.escapeFocusesBurger = await burger.evaluate(
    (element) => element === document.activeElement,
  )
  report.checks.scrollUnlocked = await page.evaluate(
    () => document.documentElement.style.overflow === '',
  )
  await context.close()
}

await browser.close()
console.log(JSON.stringify(report, null, 2))
