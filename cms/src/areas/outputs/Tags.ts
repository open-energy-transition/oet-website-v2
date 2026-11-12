import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { slug, text } from '../../fields'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: publicRead,
  defaultSort: 'name',
  admin: {
    group: 'Outputs',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    description:
      'Topic tags of projects and publications. They are the options of the tag filter on the listings.',
  },
  fields: [
    text('name', {
      required: true,
      description:
        'Written without the leading #. The page header adds it; the tag filter shows the name as it is.',
    }),
    slug('name'),
  ],
}
