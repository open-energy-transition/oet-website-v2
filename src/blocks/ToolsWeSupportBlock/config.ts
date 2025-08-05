import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

export const ToolsWeSupport: Block = {
  slug: 'toolsWeSupport',
  interfaceName: 'ToolsWeSupportBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({
            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          AlignFeature(),
          LinkFeature(),
        ],
      }),
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: 'icon',
          type: 'relationship',
          relationTo: 'icons',
          required: false,
          admin: { width: '50%' },
        },
        {
          name: 'model',
          type: 'relationship',
          relationTo: 'models',
          required: true,
          admin: { width: '50%' },
        },
      ],
      labels: { singular: 'Service', plural: 'Services' },
    },
  ],
  labels: {
    plural: 'Tools We Support',
    singular: 'Tool We Support',
  },
}
