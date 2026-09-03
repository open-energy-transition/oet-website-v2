import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'

/**
 * Categories used only by the Events collection (Open Calls, Support Meetups,
 * Events, Webinars, ...). Kept separate from the shared `categories` collection
 * so event filters don't mix with project/post categories.
 */
export const EventCategories: CollectionConfig = {
  slug: 'event-categories',
  labels: {
    singular: 'Event Category',
    plural: 'Event Categories',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_order'],
  },
  // Drag-and-drop ordering controls the order of the filter chips on the listing.
  orderable: true,
  defaultSort: '_order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
