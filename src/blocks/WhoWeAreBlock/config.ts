import type { Block } from 'payload'
import { link } from '@/fields/link'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

export const WhoWeAre: Block = {
  slug: 'whoWeAre',
  interfaceName: 'WhoWeAreBlock',
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
          description: 'Link to a page with more information about the who we are section',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  labels: {
    plural: 'Who We Are',
    singular: 'Who We Are',
  },
}
