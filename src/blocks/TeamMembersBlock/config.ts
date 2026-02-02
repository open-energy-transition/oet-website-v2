import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

export const TeamMembersBlock: Block = {
  slug: 'teamMembers',
  interfaceName: 'TeamMembersBlock',
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
        features: getLexicalFeatures,
      }),
      label: 'Description',
    },
    {
      name: 'defaultStaffCategory',
      type: 'relationship',
      relationTo: 'staff',
      label: 'Default Staff Category',
      admin: {
        description: 'Select a default staff category to filter team members on page load',
      },
    },
  ],
  labels: {
    plural: 'Team Members',
    singular: 'Team Member',
  },
}
