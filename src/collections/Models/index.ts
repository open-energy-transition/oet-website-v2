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
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'icons',
      required: false,
      admin: { width: '50%' },
    },
    {
      name: 'website',
      label: 'Website Link',
      type: 'text',
    },
    {
      name: 'documentation',
      label: 'Documentation Link',
      type: 'text',
    },
    {
      name: 'github',
      label: 'Github Link',
      type: 'text',
    },
    {
      name: 'sourceCode',
      label: 'Source Code Link',
      type: 'text',
    },
  ],
}
