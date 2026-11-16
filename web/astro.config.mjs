// @ts-check
import { existsSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'
import { cmsMedia } from './scripts/cms-media.mjs'
import { pruneUnusedAssets } from './scripts/prune-unused-assets.mjs'
import { cmsRedirects } from './scripts/cms-redirects.mjs'

if (existsSync('.env')) process.loadEnvFile('.env')
const site = process.env.SITE_URL
if (!site) throw new Error('SITE_URL is not set')

export default defineConfig({
  site,
  adapter: vercel(),
  integrations: [
    cmsRedirects(),
    cmsMedia(),
    sitemap({
      serialize: (item) => {
        const url = new URL(item.url)
        if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/, '')
        return { ...item, url: url.href }
      },
    }),
    pruneUnusedAssets(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
