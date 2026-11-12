import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const [, , before, after, ...filters] = process.argv
if (!before || !after)
  throw new Error(
    'usage: node scripts/compare-snapshots.mjs <before folder> <after folder> [name part...]',
  )

const names = (folder) => readdirSync(folder).filter((file) => file.endsWith('.png'))
const wanted = (file) => filters.length === 0 || filters.some((filter) => file.includes(filter))
const beforeNames = names(before).filter(wanted)
const afterNames = new Set(names(after).filter(wanted))
const diffFolder = join(after, 'diff')
rmSync(diffFolder, { recursive: true, force: true })
mkdirSync(diffFolder, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()
const dataUrl = (path) => `data:image/png;base64,${readFileSync(path).toString('base64')}`

const report = []
for (const file of beforeNames) {
  if (!afterNames.has(file)) {
    report.push({ file, result: 'missing after' })
    continue
  }
  const outcome = await page.evaluate(
    async ([first, second]) => {
      const load = async (url) => createImageBitmap(await (await fetch(url)).blob())
      const [a, b] = await Promise.all([load(first), load(second)])
      const width = Math.max(a.width, b.width)
      const height = Math.max(a.height, b.height)
      const pixels = (bitmap) => {
        const canvas = new OffscreenCanvas(width, height)
        const context = canvas.getContext('2d', { willReadFrequently: true })
        context.drawImage(bitmap, 0, 0)
        return context.getImageData(0, 0, width, height).data
      }
      const left = pixels(a)
      const right = pixels(b)
      let different = 0
      let top = height
      let bottom = -1
      let minX = width
      let maxX = -1
      const bands = []
      for (let y = 0; y < height; y += 1) {
        let rowDiffers = false
        for (let x = 0; x < width; x += 1) {
          const index = (y * width + x) * 4
          if (
            Math.abs(left[index] - right[index]) > 2 ||
            Math.abs(left[index + 1] - right[index + 1]) > 2 ||
            Math.abs(left[index + 2] - right[index + 2]) > 2
          ) {
            different += 1
            rowDiffers = true
            if (x < minX) minX = x
            if (x > maxX) maxX = x
          }
        }
        if (rowDiffers) {
          if (y < top) top = y
          bottom = y
          const last = bands.at(-1)
          if (last && y - last[1] <= 24) last[1] = y
          else bands.push([y, y])
        }
      }
      const sizes = { before: [a.width, a.height], after: [b.width, b.height] }
      if (different === 0 && a.height === b.height && a.width === b.width)
        return { different, sizes, bands, image: null }
      const cropTop = Math.max(0, Math.min(top, Math.min(a.height, b.height)) - 40)
      const cropHeight = Math.min(
        1400,
        Math.max(bottom, Math.min(a.height, b.height)) - cropTop + 80,
        height - cropTop,
      )
      const sheet = new OffscreenCanvas(width * 2 + 20, cropHeight)
      const context = sheet.getContext('2d')
      context.fillStyle = '#00f'
      context.fillRect(0, 0, sheet.width, sheet.height)
      context.drawImage(a, 0, cropTop, a.width, cropHeight, 0, 0, a.width, cropHeight)
      context.drawImage(b, 0, cropTop, b.width, cropHeight, width + 20, 0, b.width, cropHeight)
      const blob = await sheet.convertToBlob({ type: 'image/png' })
      const bytes = new Uint8Array(await blob.arrayBuffer())
      let binary = ''
      for (let offset = 0; offset < bytes.length; offset += 32768)
        binary += String.fromCharCode(...bytes.subarray(offset, offset + 32768))
      return { different, sizes, bands, x: [minX, maxX], cropTop, image: btoa(binary) }
    },
    [dataUrl(join(before, file)), dataUrl(join(after, file))],
  )
  if (outcome.image === null) {
    report.push({ file, result: 'identical' })
    continue
  }
  writeFileSync(join(diffFolder, file), Buffer.from(outcome.image, 'base64'))
  report.push({
    file,
    result: 'different',
    pixels: outcome.different,
    sizes: outcome.sizes,
    x: outcome.x,
    cropTop: outcome.cropTop,
    bands: outcome.bands.slice(0, 12),
    bandCount: outcome.bands.length,
  })
}
await browser.close()

for (const file of afterNames) if (!beforeNames.includes(file)) report.push({ file, result: 'new' })
writeFileSync(join(after, 'compare.json'), JSON.stringify(report, null, 1))
const identical = report.filter((entry) => entry.result === 'identical').length
console.log(JSON.stringify({ compared: report.length, identical }))
for (const entry of report) if (entry.result !== 'identical') console.log(JSON.stringify(entry))
