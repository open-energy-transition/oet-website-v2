import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

process.loadEnvFile('../cms/.env')
const origin = 'https://oet-cms.vercel.app'
const folder = '.screenshots/next-steps-admin'
mkdirSync(folder, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
await page.goto(`${origin}/admin/login`)
await page.getByRole('button', { name: 'Login', exact: true }).waitFor()
await page.screenshot({ path: `${folder}/login.png`, fullPage: true })
await page.getByLabel(/^Email/).fill(process.env.ADMIN_EMAIL)
await page.getByLabel(/^Password/).fill(process.env.ADMIN_PASSWORD)
await page.getByRole('button', { name: 'Login', exact: true }).click()
await page.getByRole('heading', { name: 'Your website workspace' }).waitFor()
await page.screenshot({ path: `${folder}/dashboard.png`, fullPage: true })
await page.goto(`${origin}/admin/collections/media`)
await page.getByRole('heading', { name: 'Media', exact: true }).waitFor()
await page.screenshot({ path: `${folder}/media.png`, fullPage: true })
const folders = await page.locator('a[href*="folder"], button').allTextContents()
const api = await page.request.get(`${origin}/api/media?limit=1&depth=0`)
const media = await api.json()
const legal = await page.request.get(`${origin}/api/pages?limit=0&depth=0`)
const pages = await legal.json()
const footerResponse = await page.request.get(`${origin}/api/globals/site-footer?depth=0`)
const footer = await footerResponse.json()
writeFileSync(
  `${folder}/summary.json`,
  JSON.stringify(
    {
      errors,
      mediaCount: media.totalDocs,
      foldersControls: folders.filter((text) => /folder/i.test(text)),
      legal: pages.docs.map(({ slug, bodyHtml }) => ({ slug, bodyLength: bodyHtml.length })),
      academicLink: footer.columns
        .filter((column) => column.blockType === 'linkColumn')
        .flatMap((column) => column.links)
        .filter((link) => /academic/i.test(link.label)),
    },
    null,
    2,
  ),
)
await browser.close()
if (errors.length > 0) throw new Error(JSON.stringify(errors))
