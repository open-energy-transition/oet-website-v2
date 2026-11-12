import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { href, paragraphs, plainText, select } from '../../fields'
import { order } from './fields'

export const toolRoles = ['maintainer', 'co-maintainer', 'maintainers'] as const

export const Tools: CollectionConfig = {
  slug: 'tools',
  access: publicRead,
  defaultSort: 'order',
  admin: {
    group: 'Catalog',
    useAsTitle: 'name',
    defaultColumns: ['name', 'categories', 'role', 'order'],
    description: 'Open models, software and data sets shown as cards on the Tools and Data page.',
  },
  fields: [
    plainText('name', { required: true, description: 'Card title.' }),
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'tool-categories',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: {
        description:
          'The card appears once in the group of every category chosen here, with the tag of that group.',
      },
    },
    select('role', toolRoles, {
      required: false,
      label: 'Role of OET',
      description:
        'Shown before the first paragraph of the description, separated by a vertical bar ("Maintainer | …"). Leave empty for a tool without a stated role.',
    }),
    paragraphs('description', {
      label: 'Description',
      minRows: 1,
      description: 'One row per paragraph of the card text. Do not repeat the role here.',
    }),
    {
      type: 'row',
      fields: [
        href('sourceHref', {
          required: true,
          label: 'Source code link',
          description: 'Target of the "Source Code" text link on the card.',
        }),
        href('websiteHref', {
          required: true,
          label: 'Website link',
          description: 'Target of the globe icon on the card.',
        }),
        href('githubHref', {
          required: true,
          label: 'GitHub link',
          description: 'Target of the GitHub icon on the card.',
        }),
      ],
    },
    order('Position of the card inside its category group, lowest first.'),
  ],
}
