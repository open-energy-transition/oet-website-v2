import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const JobsBlock: Block = {
  slug: 'jobs',
  interfaceName: 'JobsBlock',
  fields: [
    {
      name: 'tag',
      type: 'text',
      label: 'Tag',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Description',
    },
  ],
  labels: {
    plural: 'Jobs',
    singular: 'Job',
  },
}
