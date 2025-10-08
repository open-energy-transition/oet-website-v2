import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublishedWithoutDrafts } from '../../access/authenticatedOrPublished'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'category', 'jobTitle'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublishedWithoutDrafts,
    update: authenticated,
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
      name: 'categories',
      type: 'relationship',
      relationTo: 'staff',
      hasMany: true,
      required: true,
      label: 'Staff Categories',
      admin: {
        description: "The team member's categories for user navigation",
      },
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
        features: getLexicalFeatures,
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
