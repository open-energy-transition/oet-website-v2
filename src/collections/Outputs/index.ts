import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populateAuthors } from './hooks/populateAuthors'

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
  hooks: {
    beforeChange: [populateAuthors],
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
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      admin: {
        description: 'Team members who authored this output',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    // This field is only used to populate the team member data via the `populateAuthors` hook
    // This is because the `team-members` collection has access control locked to protect data
    // GraphQL will also not return mutated data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
