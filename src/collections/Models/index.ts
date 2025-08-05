import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublishedWithoutDrafts } from '../../access/authenticatedOrPublished'
import { linkGroup } from '@/fields/linkGroup'

export const Models: CollectionConfig = {
  slug: 'models',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublishedWithoutDrafts,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    linkGroup({
      appearances: ['default', 'github', 'internal', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
