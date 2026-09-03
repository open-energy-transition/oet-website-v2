import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'
import { slugField } from '@/fields/slug'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateEvent } from './hooks/revalidateEvent'

/**
 * Returns true when the event's start date is in the future (an "Upcoming Event"),
 * false when it is in the past (an "Event Highlight"). Used to conditionally show
 * the relevant link fields in the admin panel.
 */
const isUpcoming = (data: Record<string, unknown> | undefined): boolean => {
  const start = data?.startDate
  if (!start || typeof start !== 'string') return true
  return new Date(start).getTime() >= Date.now()
}

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    startDate: true,
    endDate: true,
    heroImage: true,
    excerpt: true,
    categories: true,
    featuredAsHighlight: true,
    videoUrl: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'startDate', 'featuredAsHighlight', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'events',
          req,
        })
        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'events',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Card Excerpt',
      admin: {
        description: 'Short description shown on the event listing cards.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              admin: {
                description: 'Shown as the "By ..." byline on the detail page.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  required: true,
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayAndTime',
                      timeFormat: 'HH:mm',
                    },
                    description: 'Events in the future appear under "Upcoming Events".',
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayAndTime',
                      timeFormat: 'HH:mm',
                    },
                    description: 'Optional. Used for the time range on upcoming events.',
                  },
                },
              ],
            },
            {
              name: 'timezoneLabel',
              type: 'text',
              label: 'Timezone Label',
              defaultValue: 'CET',
              admin: {
                description: 'Displayed next to the date/time, e.g. "CET".',
              },
            },
            {
              name: 'location',
              type: 'textarea',
              admin: {
                description: 'Location, country, address and any additional detail.',
              },
            },
            {
              name: 'durationLabel',
              type: 'text',
              label: 'Duration Label',
              admin: {
                description: 'Free-text duration shown in the Details panel, e.g. "90 Min".',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
            },
            {
              name: 'about',
              type: 'richText',
              label: 'About Event',
              editor: lexicalEditor({
                features: getLexicalFeatures,
              }),
            },
            {
              name: 'documentation',
              type: 'group',
              label: 'Event Documentation',
              admin: {
                description:
                  'Past-event gallery section. Leave empty to hide it on the detail page.',
                condition: (data) => !isUpcoming(data),
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Event Documentation',
                },
                {
                  name: 'featuredImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'gallery',
                  type: 'array',
                  labels: {
                    singular: 'Image',
                    plural: 'Images',
                  },
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Links',
          fields: [
            {
              name: 'videoUrl',
              type: 'text',
              label: 'Watch Event URL',
              admin: {
                description: 'Livestream / recording link shown over the hero (past events).',
                condition: (data) => !isUpcoming(data),
              },
            },
            {
              name: 'recapUrl',
              type: 'text',
              label: 'Watch Event Recap URL',
              admin: {
                description: 'Recap link shown as a button in the Details panel (past events).',
                condition: (data) => !isUpcoming(data),
              },
            },
            {
              name: 'registrationUrl',
              type: 'text',
              label: 'Registration URL',
              admin: {
                description: '"Join This Event" button target (upcoming events).',
                condition: (data) => isUpcoming(data),
              },
            },
          ],
        },
        {
          label: 'Contributors',
          fields: [
            {
              name: 'contributors',
              type: 'relationship',
              relationTo: 'team-members',
              hasMany: true,
              admin: {
                description: 'People listed under "Contributors" on the detail page.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'event-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Used for the category filter on the listing (Open Calls, Webinars, ...).',
      },
    },
    {
      name: 'featuredAsHighlight',
      type: 'checkbox',
      label: 'Feature under "Event Highlights"',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Include this past event in the "Event Highlights" tab.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateEvent],
    afterDelete: [revalidateDelete],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
