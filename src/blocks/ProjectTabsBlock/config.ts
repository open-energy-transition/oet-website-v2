import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ProjectTabs: Block = {
  slug: 'projectTabs',
  interfaceName: 'ProjectTabsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
      admin: {
        description: 'Title for the project tabs block',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'showTabs',
      type: 'checkbox',
      defaultValue: true,
      label: 'Display as Tabs (based on project status)',
    },
    {
      name: 'tabLabels',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.showTabs === true,
      },
      fields: [
        {
          name: 'inProgressLabel',
          type: 'text',
          defaultValue: 'In Progress',
          label: 'In Progress Tab Label',
        },
        {
          name: 'completedLabel',
          type: 'text',
          defaultValue: 'Completed',
          label: 'Completed Tab Label',
        },
      ],
      label: 'Tab Labels',
    },
    {
      name: 'displayOptions',
      type: 'group',
      fields: [
        {
          name: 'showService',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Service',
        },
        {
          name: 'showDate',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Date',
        },
        {
          name: 'showSubtitle',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Subtitle',
        },
      ],
      label: 'Display Options',
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        description: 'Filter projects by categories (optional)',
      },
      hasMany: true,
      label: 'Filter by Categories',
      relationTo: 'categories',
    },
  ],
  labels: {
    plural: 'Project Tabs',
    singular: 'Project Tab',
  },
}
