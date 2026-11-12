import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { href, text } from '../../fields'
import { checkbox, choice } from './fields'

export const jobThemes = [
  { label: 'Finance', value: 'finance' },
  { label: 'People and Culture', value: 'people-and-culture' },
  { label: 'Software Engineering', value: 'software-engineering' },
  { label: 'Research and Market Development', value: 'research-and-market-development' },
  { label: 'Modeling Tools and Data', value: 'modeling-tools-and-data' },
  { label: 'Energy System Modeling', value: 'energy-system-modeling' },
  { label: 'Grid Data', value: 'grid-data' },
  { label: 'Miscellaneous', value: 'miscellaneous' },
] as const

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  access: publicRead,
  admin: {
    group: 'Organization',
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'theme', 'updatedAt'],
    description: 'Open roles on the career page.',
  },
  defaultSort: 'title',
  fields: [
    text('title', { required: true, description: 'Role title on the job card.' }),
    {
      type: 'row',
      fields: [
        text('location', {
          required: true,
          description: 'Where the hire must be based, next to the marker icon.',
        }),
        text('languages', {
          required: true,
          description: 'Required languages, next to the dictionary icon.',
        }),
      ],
    },
    {
      type: 'row',
      fields: [
        text('workMode', {
          required: true,
          label: 'Work mode',
          description: 'For example "Fully Remote", next to the laptop icon.',
        }),
        text('employmentType', {
          required: true,
          label: 'Employment type',
          description: 'For example "Full-Time", next to the diploma icon.',
        }),
      ],
    },
    href('href', {
      required: true,
      label: 'Application link',
      description: 'Where the card leads: the job posting or a mailto: address.',
    }),
    checkbox('newTab', {
      label: 'Open in a new tab',
      description: 'Turn on for postings on another site.',
      sidebar: false,
    }),
    choice('theme', jobThemes, {
      required: true,
      label: 'Thumbnail theme',
      description:
        'Selects the card thumbnail. The eight thumbnails are part of the site, one per department plus a general one.',
    }),
  ],
}
