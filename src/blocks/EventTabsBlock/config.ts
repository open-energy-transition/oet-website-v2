import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const EventTabs: Block = {
  slug: 'eventTabs',
  interfaceName: 'EventTabsBlock',
  labels: {
    singular: 'Event Tabs',
    plural: 'Event Tabs',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Heading shown above the tabs, e.g. "News & Events".',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      label: 'Intro Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'tabLabels',
      type: 'group',
      label: 'Tab Labels',
      fields: [
        {
          name: 'highlightsLabel',
          type: 'text',
          defaultValue: 'Event Highlights',
        },
        {
          name: 'upcomingLabel',
          type: 'text',
          defaultValue: 'Upcoming Events',
        },
      ],
    },
    {
      name: 'defaultTab',
      type: 'select',
      defaultValue: 'highlights',
      options: [
        { label: 'Event Highlights', value: 'highlights' },
        { label: 'Upcoming Events', value: 'upcoming' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'event-categories',
      hasMany: true,
      admin: {
        description:
          'Optional. Restricts the category filter chips to this list. Leave empty to show every category used by the listed events.',
      },
    },
    {
      name: 'pageSize',
      type: 'number',
      defaultValue: 12,
      min: 1,
      admin: {
        description: 'Maximum number of events to load per tab.',
      },
    },
  ],
}
