import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'richText',
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
      label: false,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'listItems',
      type: 'array',
      fields: [
        {
          name: 'iconClass',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g. bx bx-cube-alt',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      minRows: 1,
      labels: {
        singular: 'List Item',
        plural: 'List Items',
      },
    },
    {
      name: 'actionItems',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'iconClass',
          type: 'text',
          required: true,
          defaultValue: 'fa fa-info-circle',
          admin: {
            placeholder: 'e.g. fa fa-info-circle',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
      minRows: 1,
      labels: {
        singular: 'Action Item',
        plural: 'Action Items',
      },
    },
  ],
  labels: {
    plural: 'About',
    singular: 'About',
  },
}
