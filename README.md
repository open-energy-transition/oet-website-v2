# Open Energy Transition website

The OET website is two applications in one repository:

| Folder | What | Docs |
| --- | --- | --- |
| [`cms/`](cms) | Payload 3 on Next.js 16 with Postgres. Admin panel and REST API only; no public pages | [`cms/README.md`](cms/README.md) |
| [`web/`](web) | Public site. Astro 7 static build with a few on-demand preview routes, Tailwind 4, TypeScript strict, no client framework | [`web/README.md`](web/README.md) |

The previous Next.js + Payload app has been removed from the tree. Its last version is `main` at commit `bec3fc3`, tagged `legacy-final`. Content from the live site is imported through its public REST API (see [`cms/README.md`](cms/README.md#old-site-import)), not from that code.

## How the pieces fit

```
editors ──▶ cms (Payload admin) ──▶ Postgres + media storage
                │
                ├─ REST API ───────────────▶ web build (astro build) ──▶ static site on Vercel
                ├─ deploy hook on publish ─▶ triggers the web build
                └─ Preview / Live Preview ─▶ web /preview/* (rendered on demand with drafts)
```

- The website reads all content and media from the CMS REST API **at build time**. A published change reaches the site through a rebuild, which the CMS requests through a Vercel deploy hook.
- Drafts are visible only through the website's `/preview/*` routes. These routes need a shared secret and a read-only API key.
- `cms/src/payload-types.ts` is generated from the CMS schema and copied to `web/src/lib/payload-types.ts`, so the website is type-checked against the CMS model.

## Requirements

- Node.js 22 (`>=22.12.0 <23`; both apps reject other versions)
- pnpm 11 through Corepack: `corepack enable`. The version is pinned in `packageManager`
- Docker, for the local Postgres database

Each app is an independent pnpm project with its own lockfile. Run commands inside `cms/` or `web/`, not at the root. The root `package.json` only pins the package manager for Vercel.

pnpm 11 refuses packages published less than 24 hours ago (`minimumReleaseAge`). If an install fails for that reason, pin the previous version rather than bypassing the policy.

## Quick start

```bash
corepack enable

# 1. CMS: database, schema, content
cd cms
cp .env.example .env               # fill in the values; see cms/README.md
docker compose up -d               # Postgres 16 on localhost:5433
pnpm install
pnpm migrate
pnpm seed                          # admin user + Figma content
pnpm dev                           # http://localhost:3000/admin

# 2. Website, in a second terminal
cd web
cp .env.example .env
pnpm install
pnpm dev                           # http://localhost:4321
```

The website needs the CMS running for `dev` and `build`, but not for `check`.

## Validation before a pull request

| App | Command | Needs the CMS |
| --- | --- | --- |
| cms | `pnpm check` (tsc) | no |
| cms | `pnpm build` | database reachable |
| web | `pnpm check` (astro check) | no |
| web | `pnpm build` | yes |
| web | `node --test scripts/cms-redirects.test.mjs` | no |

After a schema change, commit the generated migration and the regenerated types in both apps. See [`cms/README.md`](cms/README.md#schema-changes-and-migrations).

## Deployment

Each app has its own Vercel project, both built from this repository:

| Project | Root directory | Builds |
| --- | --- | --- |
| CMS | `cms` | when a push changes `cms/` or the root `package.json`. Runs `pnpm migrate && pnpm build` |
| Website | `web` | on every push and on every CMS deploy hook call |

Setup, environment variables and operations are described in [`cms/README.md`](cms/README.md#deployment) and [`web/README.md`](web/README.md#deployment).

## Code conventions

- No comments in code and no fallbacks: missing configuration or data throws instead of being replaced with a default.
- No `any` and no `@ts-ignore`.
- Small Conventional Commits (`feat(web): …`, `fix(cms): …`).
