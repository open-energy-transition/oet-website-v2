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

export const ProjectsOverview: Block = {
  slug: 'projectsOverview',
  interfaceName: 'ProjectsOverviewBlock',
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
        link({
          appearances: false,
        }),
      ],
      required: true,
    },
    {
      name: 'projects',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          required: true,
          admin: { width: '50%' },
        },
      ],
      labels: { singular: 'Project', plural: 'Projects' },
    },
  ],
  labels: {
    plural: 'Projects Overview',
    singular: 'Project Overview',
  },
}
