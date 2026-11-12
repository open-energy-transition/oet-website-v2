import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { slug, text } from '../../fields'

export const Regions: CollectionConfig = {
  slug: 'regions',
  access: publicRead,
  defaultSort: 'name',
  admin: {
    group: 'Outputs',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    description:
      'Regions of the world a project or publication is about. They are the options of the region filter on the listings.',
  },
  fields: [
    text('name', {
      required: true,
      description: 'Shown in the page header of a project or publication and in the region filter.',
    }),
    slug('name'),
  ],
}
