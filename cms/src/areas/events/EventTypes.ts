import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { slug, text } from '../../fields'
import { order } from './fields'

export const EventTypes: CollectionConfig = {
  slug: 'event-types',
  access: publicRead,
  defaultSort: 'order',
  labels: { singular: 'Event type', plural: 'Event types' },
  admin: {
    group: 'Events',
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'order'],
    description:
      'Kinds of events. Each one is a filter tab above the event list on /organization/news-and-events.',
  },
  fields: [
    text('label', {
      required: true,
      description: 'Label of the filter tab above the event list.',
    }),
    slug('label'),
    order('Position of the tab in the type filter, lowest first.'),
  ],
}
