# OET website

The public site: Astro 7 with Tailwind 4 and TypeScript (strict), and no client framework. Every page is prerendered from the CMS at build time. Only the `/preview/*` routes render on demand, for drafts. It is deployed to Vercel with `@astrojs/vercel`.

## Requirements

- Node.js 22 (`>=22.12.0 <23`)
- pnpm 11 through Corepack (`corepack enable`)
- A running CMS: `dev` and `build` read content, media and redirects from it. Set it up first with [`../cms/README.md`](../cms/README.md)

## Local development

```bash
cp .env.example .env              # then edit; see "Environment variables"
pnpm install
pnpm dev                          # http://localhost:4321
```

With the CMS running locally, the defaults in `.env.example` work as they are. In development each request reads the CMS without a cache, so content edits appear on reload. New or changed media appear only after restarting `pnpm dev`, because media are downloaded when Astro starts (see [Media](#media)).

Two pages are available only in development, `/dev/shared` and `/dev/shell`. They show the shared UI components and the layout shell.

## Environment variables

`astro.config.mjs` loads `.env`. Every variable is required where it is used, and a missing or invalid value fails the build.

| Variable | Used for |
| --- | --- |
| `PAYLOAD_URL` | Base URL of the CMS. Used for content, the media download and redirects |
| `SITE_URL` | Public origin of the site. Used for canonical URLs, hreflang, the sitemap and Open Graph URLs, and to tell internal links from external ones |
| `SITE_INDEXING` | `on` or `off`. `off` adds `noindex` to every page and serves a `robots.txt` that disallows everything. Use `off` everywhere except the real production domain |
| `PREVIEW_SECRET` | Secret that `/preview/*` requests must carry. Must equal `PREVIEW_SECRET` in the CMS |
| `PAYLOAD_PREVIEW_API_KEY` | API key of a CMS user with the `preview` role. Used only by `/preview/*` to read drafts |

## How content gets in

```
Payload REST ─▶ src/lib/cms.ts ─▶ src/data/*.ts ─▶ src/pages/**/*.astro ─▶ components (props only)
```

- `src/lib/cms.ts` is the typed client: `findAll`, `findGlobal`, and the helpers `resolved` and `required`. These helpers throw when a relation or required value is missing. In production builds, identical requests are cached for the length of the build.
- `src/lib/payload-types.ts` is **generated**. Do not edit it. After a schema change, run `pnpm generate:types` in `cms/`, which copies it here, and commit both copies.
- `src/data/*.ts` are loaders, one per area. They fetch documents and map them to the view models that the pages and components take. Components never fetch.
- `src/components/{ui,layout,blocks,cards,interactive,pages}`. Interactive behaviour is a small custom element with a scoped `<script>` per component.
- Design tokens are in `src/styles/global.css` (`@theme`). Tailwind's default colour, text and radius scales are reset, so only the design tokens exist.
- i18n uses Astro routing (`src/i18n/config.ts`). English is the default and only locale, without a URL prefix. The CMS falls back to English for missing translations.

Content problems fail the build with a message naming the document and field, for example `contact photo is missing`. Fix the content in the CMS and publish again; the build will run again.

### Media

Integration `scripts/cms-media.mjs` runs before `dev` and `build`. It downloads every CMS media file into `src/assets/cms/`, which is git-ignored, and deletes files that the CMS no longer has. `src/lib/media.ts` then turns a media document into `ImageMetadata`, so CMS images go through `astro:assets` (responsive sizes, AVIF/WebP) like local files. Only raster formats are supported; SVG icons come from `src/icons/`.

After the build, `scripts/prune-unused-assets.mjs` removes generated images that no page references.

### Redirects

Integration `scripts/cms-redirects.mjs` reads the CMS `redirects` collection and turns it into Vercel redirects at build time. It rejects invalid paths, duplicates, self-redirects and cycles. A change to a redirect therefore needs a rebuild, which the CMS publish hook triggers. Test: `node --test scripts/cms-redirects.test.mjs`.

## Preview

Editors open drafts through the **Preview** button or the **Live Preview** panel in the CMS. Both point at:

```
/preview/<path>?secret=<PREVIEW_SECRET>
```

- `src/middleware.ts` returns 404 when the secret is wrong. It marks the response `private, no-store` and `noindex`, and runs the request in a preview context (`src/lib/preview.ts`).
- In that context `src/lib/cms.ts` adds `draft=true` and `Authorization: users API-Key <PAYLOAD_PREVIEW_API_KEY>`, and skips its cache.
- `src/pages/preview/[...path]` (`prerender = false`) renders the same `components/pages/*DetailPage.astro` as the static routes. It supports projects, publications, events, services, departments and legal pages.
- On preview pages, `components/layout/LivePreview.astro` listens for Live Preview messages from the admin. After each autosave it re-renders `main#main`.

Setup, done once per environment:

1. Generate a long random secret and set it as `PREVIEW_SECRET` in **both** the CMS and the website.
2. In the CMS admin, create a user with role **Preview (read only)**, enable **API Key**, generate the key and save. This role can read drafts but cannot open the admin panel or change anything.
3. Set that key as `PAYLOAD_PREVIEW_API_KEY` in the website, and set `WEB_URL` in the CMS to the website's URL.

To check: open a draft's Preview from the admin; the draft content should appear. The same URL with a wrong secret should return 404.

## Commands

| Command | What | Needs the CMS |
| --- | --- | --- |
| `pnpm dev` | Dev server on port 4321 | yes |
| `pnpm build` | Production build into `dist/` and `.vercel/output/` | yes |
| `pnpm check` | `astro check` (types and templates) | no |
| `pnpm format` | Prettier with the Astro and Tailwind plugins | no |
| `node --test scripts/cms-redirects.test.mjs` | Redirect validation tests | no |

On Windows, `pnpm build` fails at the Vercel adapter step (`EPERM` creating a symlink) unless Developer Mode is on. Prerendering has already completed by then. To produce a full build, enable Developer Mode or build in a `node:22` container.

### Validation before a pull request

1. `pnpm check`: 0 errors.
2. `pnpm build` against a local or staging CMS.
3. `node --test scripts/cms-redirects.test.mjs`.
4. For visual or interactive changes, check the affected pages at 1440 px and 412 px. Also check with reduced motion.

`scripts/` also holds the audit tools used during the redesign. They run against a built site or an origin; most print their usage when started without arguments:

| Script | What |
| --- | --- |
| `sweep.mjs` | Loads every built route in Chromium and reports broken links, images and console errors |
| `lighthouse.mjs`, `lighthouse-a11y.mjs` | Lighthouse performance and accessibility runs over representative routes |
| `keyboard-check.mjs`, `modes-check.mjs`, `cross-browser.mjs` | Keyboard navigation, reduced motion and print, and Chromium/Firefox/WebKit checks |
| `snapshot-all.mjs`, `compare-snapshots.mjs`, `compare-content.mjs` | Screenshot and content comparisons between two builds |
| `serve-dist.mjs` | Static server for `dist/client` with optional added latency |

They use Playwright: run `pnpm exec playwright install chromium` once.

## Deployment

Vercel project with **root directory** `web` and Node.js 22. `vercel.json` sets the Astro framework, install (`corepack pnpm install --frozen-lockfile`) and build (`pnpm build`). The staging deployment is `https://oet-web.vercel.app`.

Environment variables, for both Production and Preview environments:

| Variable | Value |
| --- | --- |
| `ENABLE_EXPERIMENTAL_COREPACK` | `1` |
| `PAYLOAD_URL` | URL of the CMS deployment |
| `SITE_URL` | URL of this site. On staging, the `vercel.app` URL; at launch, the real domain |
| `SITE_INDEXING` | `off` on staging; `on` only on the production domain |
| `PREVIEW_SECRET` | same value as in the CMS |
| `PAYLOAD_PREVIEW_API_KEY` | key of the CMS preview user |

Then connect the CMS:

1. In this project, open Settings → Git → Deploy Hooks and create a hook for the production branch.
2. Put the hook URL in `WEB_DEPLOY_HOOK_URL` of the CMS project (Production only), and redeploy the CMS.

From then on, every publish, unpublish, delete or global save in the CMS triggers one build. Vercel queues builds. The first build downloads all media and generates every image variant, which takes about 12 minutes. Later builds reuse the image cache and take well under a minute.

### Launch checklist

- `SITE_URL` set to the real domain, and `SITE_INDEXING=on`. Change these on the production environment only.
- Domain added to the Vercel project.
- `WEB_URL` in the CMS updated to the real domain. Preview links and CORS depend on it.
- Old-site URLs covered by entries in the CMS `redirects` collection.
