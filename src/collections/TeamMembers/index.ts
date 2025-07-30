import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'jobTitle'],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      label: 'Job Title',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkedIn',
      type: 'text',
      required: false,
      label: 'LinkedIn Link',
      admin: {
        placeholder: 'https://linkedin.com/in/username',
      },
    },
    {
      name: 'x',
      type: 'text',
      required: false,
      label: 'X (Twitter) Link',
      admin: {
        placeholder: 'https://x.com/username',
      },
    },
    {
      name: 'github',
      type: 'text',
      required: false,
      label: 'Github Link',
      admin: {
        placeholder: 'https://github.com/username',
      },
    },
    {
      name: 'externalLink',
      type: 'text',
      required: false,
      label: 'External Link',
      admin: {
        placeholder: 'https://example.com',
      },
    },
  ],
}
