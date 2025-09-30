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

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'jobTitle',
    defaultColumns: ['jobTitle', 'department', 'status', 'location'],
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
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'contactType',
      type: 'text',
      required: true,
      label: 'Contact Type',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Paused', value: 'paused' },
        { label: 'Filled', value: 'filled' },
        { label: 'Draft', value: 'draft' },
        { label: 'Expired', value: 'expired' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Interviewing', value: 'interviewing' },
        { label: 'Offer Extended', value: 'offer_extended' },
        { label: 'On Hold', value: 'on_hold' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: false,
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
    },
    {
      name: 'externalLink',
      type: 'text',
      required: false,
      label: 'External Link',
      admin: {
        placeholder: 'https://example.com/job-details',
      },
    },
  ],
}
