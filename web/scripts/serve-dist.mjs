import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'

const [, , folder, portArgument, latencyArgument] = process.argv
if (!folder || !portArgument || !latencyArgument)
  throw new Error('usage: node scripts/serve-dist.mjs <folder> <port> <latency ms>')

const root = resolve(folder)
const port = Number(portArgument)
const latency = Number(latencyArgument)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

const compressible = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.svg', '.txt'])
const compressed = new Map()

const encode = (path, encoding) => {
  const key = `${encoding}:${path}`
  if (!compressed.has(key)) {
    const source = readFileSync(path)
    compressed.set(
      key,
      encoding === 'br'
        ? brotliCompressSync(source, {
            params: { [constants.BROTLI_PARAM_QUALITY]: 9 },
          })
        : gzipSync(source, { level: 6 }),
    )
  }
  return compressed.get(key)
}

const locate = (pathname) => {
  const path = normalize(join(root, decodeURIComponent(pathname)))
  if (!path.startsWith(root)) return null
  if (existsSync(path) && statSync(path).isFile()) return path
  const index = join(path, 'index.html')
  if (existsSync(index)) return index
  return null
}

const respond = (request, response) => {
  const { pathname } = new URL(request.url, `http://${request.headers.host}`)
  const path = locate(pathname)
  if (path === null) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }
  const extension = extname(path)
  const headers = {
    'content-type': types[extension],
    'cache-control': pathname.startsWith('/_astro/')
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=0, must-revalidate',
    vary: 'accept-encoding',
  }
  const accepted = String(request.headers['accept-encoding'])
  const encoding = ['br', 'gzip'].find((name) => accepted.includes(name))
  if (compressible.has(extension) && encoding) {
    const body = encode(path, encoding)
    response.writeHead(200, {
      ...headers,
      'content-encoding': encoding,
      'content-length': body.length,
    })
    response.end(body)
    return
  }
  response.writeHead(200, { ...headers, 'content-length': statSync(path).size })
  createReadStream(path).pipe(response)
}

createServer((request, response) => setTimeout(() => respond(request, response), latency)).listen(
  port,
  () => console.log(`serving ${root} at http://localhost:${port}`),
)
