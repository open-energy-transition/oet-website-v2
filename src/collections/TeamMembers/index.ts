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
    defaultColumns: ['firstName', 'lastName', 'category', 'jobTitle', '_order'],
    listSearchableFields: ['firstName', 'lastName', 'jobTitle'],
  },
  // Enable drag and drop ordering
  orderable: true,
  // Add default sorting by _order field (PayloadCMS's orderable field)
  defaultSort: '_order',
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
        position: 'sidebar',
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      label: 'Job Title',
    },
    {
      name: 'education',
      type: 'array',
      label: 'Education',
      required: false,
      admin: {
        description: 'Add degrees, PhDs, and other educational qualifications',
      },
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
          label: 'Degree/Qualification',
          admin: {
            placeholder: 'e.g., PhD in Computer Science, BSc Engineering',
          },
        },
      ],
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
      name: 'email',
      type: 'text',
      required: false,
      label: 'Email',
      admin: {
        placeholder: 'Enter email address',
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
