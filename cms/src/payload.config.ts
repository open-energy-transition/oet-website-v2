import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'

import * as catalog from './areas/catalog'
import * as events from './areas/events'
import * as organization from './areas/organization'
import * as outputs from './areas/outputs'
import * as site from './areas/site'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { env } from './env'
import { migrations } from './migrations'
import { rebuildOnPublish } from './plugins/rebuildOnPublish'
import { mediaStorage } from './storage'
import { publicRead } from './access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const areas = [site, outputs, catalog, events, organization]

const blob = mediaStorage() === 'blob'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - OET CMS',
      icons: { icon: '/oet-icon.svg' },
      defaultOGImageType: 'off',
    },
    importMap: { baseDir: dirname },
    theme: 'light',
    components: {
      graphics: {
        Logo: './components/Brand#Brand',
        Icon: './components/Brand#BrandIcon',
      },
      beforeLogin: ['./components/Welcome#LoginWelcome'],
      beforeDashboard: ['./components/Welcome#DashboardWelcome'],
    },
  },
  folders: {
    collectionOverrides: [({ collection }) => ({ ...collection, access: publicRead })],
  },
  collections: [...areas.flatMap((area) => area.collections), Media, Users],
  globals: areas.flatMap((area) => area.globals),
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: env('DATABASE_URL') },
    migrationDir: path.resolve(dirname, 'migrations'),
    prodMigrations: migrations,
  }),
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    defaultLocale: 'en',
    fallback: true,
  },
  secret: env('PAYLOAD_SECRET'),
  serverURL: env('PAYLOAD_PUBLIC_URL'),
  cors: [env('WEB_URL')],
  plugins: [
    vercelBlobStorage({
      enabled: blob,
      token: blob ? env('BLOB_READ_WRITE_TOKEN') : undefined,
      collections: { media: { disablePayloadAccessControl: true } },
      clientUploads: true,
      alwaysInsertFields: true,
    }),
    rebuildOnPublish(process.env.WEB_DEPLOY_HOOK_URL),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    declare: false,
  },
})
