import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { icon, seo, textarea } from '../../fields'
import { count, heading, responsiveImage, tab } from './fields'

export const DepartmentsPage: GlobalConfig = {
  slug: 'departments-page',
  label: 'Departments page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/organization/departments'),
    group: 'Organization',
    description:
      'Content of /organization/departments. The cards are all published departments in their order.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        tab('Hero', [
          {
            name: 'hero',
            type: 'group',
            fields: [
              textarea('title', {
                required: true,
                description: 'A line break starts a new line.',
              }),
              textarea('lead', { required: true, description: 'Paragraph under the title.' }),
              responsiveImage('image', {
                label: 'Hero image',
                description: 'Map illustration on the right of the hero.',
              }),
              count('count', {
                label: 'Department figure',
                description: 'Figure and label in the hero, next to the icons.',
              }),
              icon('icon', {
                required: true,
                description: 'Icon in the red square of the hero.',
              }),
            ],
          },
        ]),
        tab('Listing', [
          heading('listing', {
            label: 'Listing heading',
            description: 'Heading above the department cards.',
          }),
        ]),
        tab('Search', [seo()]),
      ],
    },
  ],
}
