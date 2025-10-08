import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublishedWithoutDrafts } from '../../access/authenticatedOrPublished'

export const StaffCategories: CollectionConfig = {
  slug: 'staff',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'slug'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublishedWithoutDrafts,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
      admin: {
        description: 'The name of the staff category (e.g., "Energy System Modeler")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Description',
      admin: {
        description: 'Optional description of this category',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly version of the name (e.g., "energy-system-modeler")',
      },
      validate: (value: any) => {
        const val = String(value || '')
        if (!val.match(/^[a-z0-9-]+$/)) {
          return 'Slug must contain only lowercase letters, numbers, and hyphens'
        }
        return true
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      label: 'Display Order',
      admin: {
        description:
          'Optional numeric value to control the display order (lower numbers appear first)',
      },
    },
  ],
}
