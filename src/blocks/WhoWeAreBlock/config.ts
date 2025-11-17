import type { Block } from 'payload'
import { link } from '@/fields/link'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

export const WhoWeAre: Block = {
  slug: 'whoWeAre',
  interfaceName: 'WhoWeAreBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Content Items',
      minRows: 1,
      fields: [
        {
          name: 'title-tem',
          type: 'text',
          required: true,
        },
        {
          name: 'description-item',
          type: 'richText',
          editor: lexicalEditor({
            features: getLexicalFeatures,
          }),
        },
        link({
          overrides: {
            admin: {
              description: 'Link to a page with more information',
            },
          },
        }),
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'reverse',
          type: 'checkbox',
          label: 'Reverse Layout',
          defaultValue: false,
          admin: {
            description: 'Toggle to swap the position of media and content',
          },
        },
      ],
    },
    {
      name: 'bottomItems',
      type: 'array',
      label: 'Bottom Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: getLexicalFeatures,
          }),
        },
      ],
    },
  ],
  labels: {
    plural: 'Who We Are',
    singular: 'Who We Are',
  },
}
