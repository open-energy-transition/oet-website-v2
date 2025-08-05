import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

export const OurService: Block = {
  slug: 'ourService',
  interfaceName: 'OurServiceBlock',
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
      name: 'unitsButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'number', type: 'text', required: false },
        { name: 'title', type: 'text', required: false },
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
          required: false,
        },
        { name: 'icon', type: 'text', required: false },
      ],
      labels: { singular: 'Service', plural: 'Services' },
    },
    {
      name: 'bottomImages',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'image', type: 'upload', required: true, relationTo: 'media' },
        { name: 'alt', type: 'text', required: true },
      ],
      labels: { singular: 'Bottom Image', plural: 'Bottom Images' },
    },
  ],
  labels: {
    plural: 'Our Service',
    singular: 'Our Service',
  },
}
