# OET CMS

Payload 3.90 running in Next.js 16, with Postgres 16. It serves the admin panel at `/admin` and the REST API at `/api`; it has no public pages. The website in [`../web`](../web) reads it at build time.

## Requirements

- Node.js 22 (`>=22.12.0 <23`)
- pnpm 11 through Corepack (`corepack enable`)
- Docker, for the local database

## Local setup

```bash
cp .env.example .env              # then edit; see "Environment variables"
docker compose up -d              # Postgres 16 on localhost:5433, data in ./database
pnpm install
pnpm migrate                      # create the schema from src/migrations
pnpm seed                         # admin user and the Figma content
pnpm dev                          # http://localhost:3000/admin
```

Log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`.

`docker compose` reads `DB_PASSWORD` from `.env`, and `DATABASE_URL` must use the same password. The database files are in `cms/database/` (a bind mount, git-ignored). To start from an empty database, stop the container and delete that folder.

## Environment variables

All variables are read through `src/env.ts`, which throws when a required variable is missing. There are no defaults.

| Variable | Required | Used for |
| --- | --- | --- |
| `DATABASE_URL` | always | Postgres connection string. Locally `postgres://payload:<DB_PASSWORD>@localhost:5433/oet_cms`; on Vercel the pooled Neon URL |
| `DB_PASSWORD` | local Docker / VPS | Password of the Postgres container. Letters and digits only, because it is placed in a URL |
| `PAYLOAD_SECRET` | always | Signs sessions and API keys. Long random string. Changing it logs everyone out and invalidates API keys, including the preview key |
| `PAYLOAD_PUBLIC_URL` | always | Public URL of this CMS (`serverURL`), for example `http://localhost:3000` |
| `WEB_URL` | always | Origin of the website. Allowed by CORS and used to build Preview / Live Preview URLs |
| `PREVIEW_SECRET` | always | Shared secret appended to preview URLs. Must equal `PREVIEW_SECRET` in the website |
| `MEDIA_STORAGE` | always | `disk` (local files in `MEDIA_DIR`) or `blob` (Vercel Blob) |
| `MEDIA_DIR` | when `MEDIA_STORAGE=disk` | Upload folder, relative to `cms/`. `media` locally |
| `BLOB_READ_WRITE_TOKEN` | when `MEDIA_STORAGE=blob` | Vercel Blob token, added when a Blob store is connected to the project |
| `WEB_DEPLOY_HOOK_URL` | optional | Vercel deploy hook of the website. When set, publishing content triggers a website rebuild. Leave it unset locally and while seeding |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | for `pnpm seed` | First admin user. The seed creates it only if no user has that email |
| `SEED_AREAS` | optional, seed only | Comma-separated subset of seed areas; see [Seeding](#seeding) |

`.env.production.example` lists the variables for the VPS Docker set-up (see [Alternative: VPS with Docker](#alternative-vps-with-docker)).

## Project layout

```
src/
  payload.config.ts      config: collections and globals from every area, Postgres, Blob, rebuild plugin
  areas/<area>/          site, outputs, catalog, events, organization
                         each exports `collections`, `globals` and a `seed`
  collections/           Media, Users
  access/                access rules (admin, editor, preview, public read)
  fields/                shared field helpers
  plugins/rebuildOnPublish.ts   calls WEB_DEPLOY_HOOK_URL on publish, unpublish and delete
  preview.ts             Preview and Live Preview URLs pointing at the website
  migrations/            generated migrations; applied in production by `pnpm migrate`
  seed/                  seed entry point (`index.ts`) and the `core` step (admin user)
  old-site-import/       one-off import from the live site's public REST API
seed/                    seed content (JSON) and assets
scripts/copy-types.mjs   copies src/payload-types.ts to ../web/src/lib/payload-types.ts
```

Pages with a fixed layout (home, about, team, …) are **globals**. Routed content (projects, publications, events, services, departments, legal pages) are **collections with drafts**. Draft autosave runs every second; up to 50 versions are kept per document. The full model is listed in the admin sidebar, grouped by area.

### Users and roles

| Role | Admin panel | Can |
| --- | --- | --- |
| `admin` | yes | everything, including users |
| `editor` | yes | create, edit and publish content; cannot create or delete users |
| `preview` | no | read drafts through the API. Used only by the website's preview routes |

API keys are enabled on users (`auth.useAPIKey`). The website's preview uses the API key of a `preview` user; see [Preview](#preview).

## Commands

| Command | What |
| --- | --- |
| `pnpm dev` | Admin and API on port 3000. In development Payload **pushes** schema changes straight to the database |
| `pnpm check` | TypeScript (`tsc --noEmit`) |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm migrate` | Apply pending migrations |
| `pnpm migrate:create <name>` | Generate a migration from the schema difference |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` and copy it to the website |
| `pnpm generate:importmap` | Regenerate the admin import map after adding or moving custom admin components |
| `pnpm seed` | Seed the admin user and content; see [Seeding](#seeding) |
| `pnpm import:old-site` | Import partners, projects, publications and team from the live site; see below |
| `pnpm format` | Prettier |

## Schema changes and migrations

1. Change the collection or global in `src/areas/…`.
2. Run `pnpm dev`. The development push applies the change to your local database. Prefer additive changes: when a field is renamed or removed, the push asks a question in the terminal and hangs. In that case, recreate the local database and seed again.
3. `pnpm migrate:create <name>` writes `src/migrations/<timestamp>_<name>.ts` and a JSON snapshot. Review the SQL.
4. `pnpm generate:types` updates the types in both apps.
5. Commit the schema change, the migration, `src/migrations/index.ts`, and both `payload-types.ts` files in the same commit.

Production never pushes. It only applies committed migrations: the Vercel build runs `pnpm migrate && pnpm build`, and the Docker image runs migrations on start. A schema change without a migration deploys against the old tables.

Adding a **required** field to a table that already has rows fails with `NOT NULL`. In the migration, add the column as nullable, backfill it, then set `NOT NULL`. Apply the same SQL to your local database before `pnpm dev`, so the push does not hang.

## Seeding

`pnpm seed` runs these areas in order: `core` (admin user), `organization`, `catalog`, `events`, `outputs`, `site`. Limit it with `SEED_AREAS`:

```bash
SEED_AREAS=core pnpm seed           # only the admin user
SEED_AREAS=core,site pnpm seed
```

The seed is idempotent: running it again does not create duplicates. However, it **overwrites seeded documents with the seed content**. Never run the content areas against a database that editors have changed, such as staging or production. On those databases, use `SEED_AREAS=core` at most.

Other rules:

- Unset `WEB_DEPLOY_HOOK_URL` while seeding. Otherwise every seeded document requests a website rebuild.
- To seed Vercel Blob, use a clean checkout with no local `media/` folder. Existing local files make Payload add `-1` to filenames, which breaks the seed's lookup by filename on a later run.

### Old-site import

`pnpm import:old-site` reads partners, projects, publications and team members from the public REST API of the current live site (`www.openenergytransition.org`), not from the old codebase. It is idempotent: imported media are named `old-site-<id>-…`. It writes a report to `../docs/reports/old-site-import.md`. Documents missing required fields are saved as drafts.

On staging the import has already run, and editors have since completed some of the imported documents. Running it again would overwrite their edits.

## Media

- `MEDIA_STORAGE=disk`: files in `MEDIA_DIR`, served by the CMS at `/api/media/file/…`. Use this locally.
- `MEDIA_STORAGE=blob`: Vercel Blob. Uploads go from the browser straight to Blob (`clientUploads`), so Vercel's 4.5 MB function body limit does not apply. Media URLs point at the public Blob host.

Upload photos with the colour grading already applied. The website does not grade images.

`sharp` is deliberately not passed to Payload. With `sharp` configured, Payload re-encodes every WebP and GIF upload. The website does all image resizing at build time.

## Publishing and website rebuilds

When `WEB_DEPLOY_HOOK_URL` is set, `plugins/rebuildOnPublish.ts` calls it once per request in these cases:

- a document is published or unpublished
- a published document without drafts is saved
- a document is deleted
- a global is saved

Draft saves and autosave never trigger a rebuild, and neither do changes to `users`, `form-submissions` or `media`. A new upload only appears on the site once a published document uses it, and that publish triggers the rebuild. Replacing a file or editing alt text of an image already on the site shows up with the next publish. The call runs after the response (`waitUntil`). If it fails, the error is logged and the save still succeeds. Vercel queues the website builds.

## Preview

Collections with a detail page (projects, publications, events, services, departments, pages) have a **Preview** button and a **Live Preview** toggle in the edit view. Both open:

```
${WEB_URL}/preview/<path>?secret=${PREVIEW_SECRET}
```

The website serves that route on demand and reads drafts with a `preview` user's API key. To set it up:

1. Use the same long random value for `PREVIEW_SECRET` in the CMS and the website.
2. In the admin, create a user with role **Preview (read only)**. On that user, enable **API Key**, generate a key, and save.
3. Set the key as `PAYLOAD_PREVIEW_API_KEY` in the website.

Live Preview refreshes the page in the iframe after each autosave, about every second.

## Deployment

Current set-up: Vercel, with Neon Postgres and Vercel Blob in the same region (`iad1`). The staging deployment is `https://oet-cms.vercel.app/admin`.

### Vercel project

1. Import the repository. Set the **root directory** to `cms` and the **Node.js version** to 22.
2. `vercel.json` sets the framework and these commands:
   - install: `corepack pnpm install --frozen-lockfile`
   - build: `pnpm migrate && pnpm build`, so pending migrations are applied before each build
   - `ignoreCommand`: skips the build when a push changes neither `cms/` nor the root `package.json`
3. Under **Storage**, create a Neon Postgres database and a Blob store, and connect both to the project. This adds `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN`.
4. Set the environment variables:

| Variable | Value |
| --- | --- |
| `ENABLE_EXPERIMENTAL_COREPACK` | `1`, so Vercel uses the pnpm version from `packageManager` |
| `MEDIA_STORAGE` | `blob` |
| `PAYLOAD_SECRET` | long random string |
| `PAYLOAD_PUBLIC_URL` | URL of this deployment |
| `WEB_URL` | URL of the website |
| `PREVIEW_SECRET` | same value as on the website |
| `WEB_DEPLOY_HOOK_URL` | the website's deploy hook (Production only); set it after the website project exists |

5. Create the first admin user from a local checkout against the new database. Do this **before** setting `WEB_DEPLOY_HOOK_URL`:

```bash
DATABASE_URL=<neon url> MEDIA_STORAGE=blob BLOB_READ_WRITE_TOKEN=<token> \
  PAYLOAD_SECRET=<secret> PAYLOAD_PUBLIC_URL=<cms url> WEB_URL=<web url> PREVIEW_SECRET=<secret> \
  ADMIN_EMAIL=<email> ADMIN_PASSWORD=<password> SEED_AREAS=core pnpm seed
```

Run the content areas only on a new, empty database. Seeding from a laptop over the internet is slow; the staging content was seeded once from a temporary Vercel build next to the database.

Vercel deployment pitfalls:

- Corepack needs `packageManager` in the **root** `package.json` as well as in the app. Installing pnpm globally does not replace the older pnpm binary on Vercel's PATH.
- The Node `engines` range must stay bounded (`<23`). With an open range, Vercel selects Node 24 even when the project setting says 22.
- Vercel CLI stores new variables as non-pullable secrets by default. Use `--no-sensitive` for values you need to pull for local commands. Never commit `.env.vercel` or `.env.local`.

### Operations

- **Schema change**: merge the change with its migration; the next deployment applies it. When one push changes both `cms/` and `web/`, both projects build at the same time and the website may read the old API. Redeploy the website after the CMS deployment is ready.
- **New editor**: as an admin, open Administration → Users and create the user with role Editor.
- **Rotating `PAYLOAD_SECRET`**: invalidates all sessions and API keys. Generate a new preview API key and update `PAYLOAD_PREVIEW_API_KEY` on the website.
- **Backups**: Neon keeps point-in-time history according to its plan. Blob files are referenced by URL from the `media` table, so a restore needs both the database and the Blob store.

### Alternative: VPS with Docker

`docker-compose.production.yml` runs Postgres 16, the Payload app (a standalone Next build from `Dockerfile`) and Caddy, which provides HTTPS through Let's Encrypt. The image build, migrations, seed and API were tested locally on 2026-10-13, before preview was added. The set-up has not been deployed, and Caddy has not been tested with a real domain.

```bash
cp .env.production.example .env.production       # CMS_DOMAIN, DB_PASSWORD, PAYLOAD_SECRET, WEB_URL, PREVIEW_SECRET, …
docker compose --env-file .env.production -f docker-compose.production.yml up -d --build
docker compose --env-file .env.production -f docker-compose.production.yml --profile tools run --rm -e SEED_AREAS=core seed
```

The app applies migrations when it starts. To update, run `git pull` and then the same `up -d --build`. To back up, run `pg_dump` in the `database` container and archive the `media` volume. A restore needs both.

## Not covered yet

- Outgoing email. No email adapter is configured, so password-reset emails are written to the log.
- Rate limiting or spam protection on the `form-submissions` endpoint.
- Monitoring and scheduled backups.
