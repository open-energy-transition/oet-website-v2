import type { CollectionConfig } from 'payload'

import { admin, adminField, editor } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: { useAPIKey: true },
  access: {
    read: editor,
    create: admin,
    update: editor,
    delete: admin,
    admin: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  admin: {
    group: 'Administration',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Preview (read only)', value: 'preview' },
      ],
      admin: {
        description:
          'Admin manages everything including users. Editor manages content. Preview only reads, including drafts; it is the role of the API key the website uses for draft previews.',
      },
      access: { create: adminField, update: adminField },
    },
  ],
}
