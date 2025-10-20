import type { Block } from 'payload'
import { link } from '@/fields/link'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

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
        features: getLexicalFeatures,
      }),
    },
    link({
      overrides: {
        admin: {
          description: 'Link to a page with more information about the tools we support',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'services',
      type: 'array',
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
