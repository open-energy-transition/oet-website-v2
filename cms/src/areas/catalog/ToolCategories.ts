import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { select, slug, text } from '../../fields'
import { order } from './fields'

export const toolCategoryTones = [
  'brand',
  'brand-700',
  'neutral-900',
  'neutral-700',
  'brand-900',
] as const

export const ToolCategories: CollectionConfig = {
  slug: 'tool-categories',
  access: publicRead,
  defaultSort: 'order',
  labels: { singular: 'Tool category', plural: 'Tool categories' },
  admin: {
    group: 'Catalog',
    useAsTitle: 'label',
    defaultColumns: ['label', 'tabLabel', 'slug', 'tone', 'order'],
    description:
      'Groups of the Tools and Data page. Each category is a filter tab with its own URL and a tag on the tool cards.',
  },
  fields: [
    text('label', {
      required: true,
      label: 'Card tag',
      description: 'Shown as the tag on every tool card of this category.',
    }),
    text('tabLabel', {
      required: true,
      label: 'Tab label',
      description:
        'Shown on the filter tab of the Tools and Data page and in the browser title of the filtered page.',
    }),
    select('tone', toolCategoryTones, {
      required: true,
      label: 'Tag colour',
      description: 'Background colour of the tag on the tool cards of this category.',
    }),
    slug('label'),
    order(
      'Position of the tab and of the group of cards on the Tools and Data page, lowest first.',
    ),
  ],
}
