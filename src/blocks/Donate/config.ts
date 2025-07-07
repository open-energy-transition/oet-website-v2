import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Donate: Block = {
  slug: 'donate',
  interfaceName: 'DonateBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
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
      name: 'listItems',
      type: 'array',
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
        singular: 'List Item',
        plural: 'List Items',
      },
    },
  ],
  labels: {
    plural: 'Donate',
    singular: 'Donate',
  },
}
