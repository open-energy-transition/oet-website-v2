import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cmsRedirects } from './cms-redirects.mjs'

const configure = async (docs) => {
  const originalFetch = globalThis.fetch
  const originalBase = process.env.PAYLOAD_URL
  process.env.PAYLOAD_URL = 'https://cms.example.test'
  globalThis.fetch = async () => Response.json({ docs })
  let config
  try {
    await cmsRedirects().hooks['astro:config:setup']({
      command: 'build',
      updateConfig: (value) => {
        config = value
      },
    })
    return config
  } finally {
    globalThis.fetch = originalFetch
    if (originalBase === undefined) delete process.env.PAYLOAD_URL
    else process.env.PAYLOAD_URL = originalBase
  }
}

test('maps permanent and temporary CMS redirects', async () => {
  assert.deepEqual(
    await configure([
      { from: '/old', to: '/new', statusCode: '301' },
      { from: '/event', to: 'https://example.org/event', statusCode: '302' },
    ]),
    {
      redirects: {
        '/old': { destination: '/new', status: 301 },
        '/event': { destination: 'https://example.org/event', status: 302 },
      },
    },
  )
})

test('rejects redirect loops', async () => {
  await assert.rejects(
    configure([
      { from: '/a', to: '/b', statusCode: '301' },
      { from: '/b', to: '/a', statusCode: '301' },
    ]),
    /cycle/,
  )
})

test('rejects duplicate sources and unsafe destinations', async () => {
  await assert.rejects(
    configure([
      { from: '/a', to: '/b', statusCode: '301' },
      { from: '/a', to: '/c', statusCode: '301' },
    ]),
    /Duplicate/,
  )
  await assert.rejects(
    configure([{ from: '/a', to: '//example.org', statusCode: '301' }]),
    /Invalid redirect destination/,
  )
})

test('rejects invalid status and source', async () => {
  await assert.rejects(
    configure([{ from: '/a', to: '/b', statusCode: '200' }]),
    /Invalid redirect status/,
  )
  await assert.rejects(
    configure([{ from: '/a?query=1', to: '/b', statusCode: '301' }]),
    /Invalid redirect source/,
  )
})
