import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublishedWithoutDrafts } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const StaffCategories: CollectionConfig = {
  slug: 'staff',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', '_order'],
    group: 'Content',
    listSearchableFields: ['name', 'description'], // Fields to search
  },
  // Enable drag and drop ordering
  orderable: true,
  // Add default sorting by _order field (PayloadCMS's orderable field)
  defaultSort: '_order',
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
      name: 'headOfDepartment',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: false,
      required: false,
      label: 'Head of Department',
      admin: {
        description:
          'Select the team member who leads this department. They will be displayed first when this category is selected.',
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
