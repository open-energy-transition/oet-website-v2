import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Outputs: CollectionConfig = {
  slug: 'outputs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'link', 'updatedAt', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the output',
      },
    },
    {
      name: 'link',
      type: 'text',
      required: false,
      admin: {
        description: 'URL link for the output',
      },
    },
    {
      name: 'tags',
      type: 'array',
      required: false,
      admin: {
        description: 'Tags associated with this output',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
    },
    maxPerDoc: 50,
  },
}
