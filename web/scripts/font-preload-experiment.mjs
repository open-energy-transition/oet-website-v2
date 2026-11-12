import { createServer } from 'node:http'

const origin = 'https://oet-web.vercel.app'
const response = await fetch(origin)
if (!response.ok) throw new Error(`Home answered ${response.status}`)
const html = await response.text()
const styles = [...html.matchAll(/href="([^"]+\.css)"/g)].map((match) => match[1])
const fonts = new Set()
for (const path of styles) {
  const stylesheet = await fetch(new URL(path, origin))
  if (!stylesheet.ok) throw new Error(`Stylesheet answered ${stylesheet.status}`)
  const css = await stylesheet.text()
  for (const match of css.matchAll(/url\(([^)]+latin-wght-normal[^)]+\.woff2)\)/g))
    fonts.add(
      new URL(match[1].replaceAll('"', '').replaceAll("'", ''), new URL(path, origin)).pathname,
    )
}
if (fonts.size !== 1) throw new Error(`Expected one Latin variable font, found ${fonts.size}`)
const [font] = fonts
const preloaded = html.replace(
  '</head>',
  `<link rel="preload" as="font" type="font/woff2" crossorigin href="${font}"></head>`,
)
createServer(async (request, reply) => {
  if (request.url === '/baseline' || request.url === '/preload') {
    reply.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    })
    reply.end(request.url === '/preload' ? preloaded : html)
    return
  }
  try {
    const upstream = await fetch(new URL(request.url, origin))
    const headers = Object.fromEntries(upstream.headers)
    delete headers['content-encoding']
    delete headers['content-length']
    reply.writeHead(upstream.status, headers)
    reply.end(Buffer.from(await upstream.arrayBuffer()))
  } catch (error) {
    console.error(error)
    reply.writeHead(502)
    reply.end('Upstream request failed')
  }
}).listen(4390, '127.0.0.1', () => console.log(`Font experiment ready: ${font}`))
