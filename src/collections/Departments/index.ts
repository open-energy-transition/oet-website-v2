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

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'department',
    defaultColumns: ['department', 'status', 'representativeMember'],
    preview: (doc) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/departments/${doc.id}`
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublishedWithoutDrafts,
    update: authenticated,
  },
  fields: [
    {
      name: 'department',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: getLexicalFeatures,
      }),
      required: true,
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'icons',
      required: false,
      admin: { width: '50%' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Draft', value: 'draft' },
      ],
    },
    {
      name: 'projects',
      label: 'Projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      required: false,
    },
    {
      name: 'representativeMember',
      label: 'Representative Member',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: false,
      required: false,
      admin: {
        description: 'Select a representative team member for this department',
      },
    },
    {
      name: 'teamMembers',
      label: 'Team Members',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select all team members that belong to this department',
      },
    },
  ],
}
