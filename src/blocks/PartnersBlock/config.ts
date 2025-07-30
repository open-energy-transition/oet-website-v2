import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

export const PartnersBlock: Block = {
  slug: 'partners',
  interfaceName: 'PartnersBlock',
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
      name: 'partnerImages',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', required: true, relationTo: 'media' },
        { name: 'alt', type: 'text', required: true },
      ],
      labels: { singular: 'Partner Image', plural: 'Partner Images' },
    },
  ],
  labels: {
    plural: 'Partners',
    singular: 'Partner',
  },
}
