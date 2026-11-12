import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const origin = process.argv[2]
if (!origin) throw new Error('Pass the website origin')
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(origin, { waitUntil: 'networkidle' })
  const wall = page.locator('oet-logo-wall:visible')
  await wall.scrollIntoViewIfNeeded()
  const button = wall.getByRole('button', { name: 'Pause logo rotation' })
  await button.click()
  await page.mouse.move(0, 0)
  await page.waitForTimeout(1400)
  const names = () => wall.locator('[data-logo-slot] img').evaluateAll((images) => images.map((image) => image.alt))
  const paused = await names()
  await page.waitForTimeout(3000)
  assert.deepEqual(await names(), paused)
  assert.equal(await button.getAttribute('aria-pressed'), 'true')
  await button.click()
  await page.mouse.move(0, 0)
  await page.waitForTimeout(3500)
  assert.notDeepEqual(await names(), paused)
  assert.ok(await wall.locator('.sr-only li').count() > 10)
  await page.setViewportSize({ width: 412, height: 900 })
  await page.goto(`${origin}/organization/team`, { waitUntil: 'networkidle' })
  const globe = page.locator('oet-team-globe[data-variant="team"]')
  await globe.scrollIntoViewIfNeeded()
  await page.locator('oet-team-globe[data-ready]').waitFor()
  const pins = globe.locator('[data-globe="pin"]')
  for (let index = 0; index < await pins.count(); index += 1) {
    await pins.nth(index).focus()
    const position = await pins.nth(index).evaluate((pin) => {
      const outer = pin.closest('oet-team-globe').getBoundingClientRect()
      const rect = pin.getBoundingClientRect()
      return { name: pin.textContent, left: rect.left - outer.left, right: outer.right - rect.right }
    })
    assert.ok(position.left >= 0 && position.right >= 0, JSON.stringify(position))
  }
  console.log('Logo pause/resume, complete name list, and mobile globe focus: passed')
} finally {
  await browser.close()
}
