import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

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
        features: getLexicalFeatures,
      }),
    },
    link(),
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
            features: getLexicalFeatures,
          }),
          required: false,
        },
        {
          name: 'icon',
          label: 'Icon',
          relationTo: 'icons',
          type: 'relationship',
          required: false,
        },
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
        { name: 'alt', type: 'text', required: false },
      ],
      labels: { singular: 'Bottom Image', plural: 'Bottom Images' },
    },
  ],
  labels: {
    plural: 'Our Service',
    singular: 'Our Service',
  },
}
