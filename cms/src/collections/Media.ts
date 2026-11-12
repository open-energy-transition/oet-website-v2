import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { publicRead } from '../access'
import { env } from '../env'
import { mediaStorage } from '../storage'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const mimeTypes = ['image/*', 'application/pdf', 'video/mp4']

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: publicRead,
  admin: {
    group: 'Library',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'width', 'height', 'updatedAt'],
  },
  upload:
    mediaStorage() === 'disk'
      ? { staticDir: path.resolve(dirname, '../..', env('MEDIA_DIR')), mimeTypes }
      : { mimeTypes },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Text alternative read by screen readers. Leave empty only for decorative images.',
      },
    },
  ],
}
