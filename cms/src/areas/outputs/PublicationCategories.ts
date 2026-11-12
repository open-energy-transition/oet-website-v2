import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { slug, text } from '../../fields'

export const PublicationCategories: CollectionConfig = {
  slug: 'publication-categories',
  access: publicRead,
  defaultSort: 'name',
  labels: { singular: 'Publication category', plural: 'Publication categories' },
  admin: {
    group: 'Outputs',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    description:
      'Category label of a publication card. Finer than the publication type: a blog can be a "Blog | Case Study".',
  },
  fields: [
    text('name', {
      required: true,
      description: 'Shown at the bottom of every card of a publication in this category.',
    }),
    slug('name'),
  ],
}
