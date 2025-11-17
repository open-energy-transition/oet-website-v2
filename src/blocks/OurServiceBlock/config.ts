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
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        link(),
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
        { name: 'image', type: 'upload', required: false, relationTo: 'media' },
      ],
      labels: { singular: 'Service', plural: 'Services' },
    },
  ],
  labels: {
    plural: 'Our Service',
    singular: 'Our Service',
  },
}
