import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { icon, link, paragraphs, richText, seo, text, textarea } from '../../fields'
import { count, responsiveImage, tab } from './fields'

export const CareerPage: GlobalConfig = {
  slug: 'career-page',
  label: 'Career page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/organization/career'),
    group: 'Organization',
    description: 'Content of /organization/career. The job cards are the Jobs collection.',
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
              paragraphs('lead', { minRows: 1, description: 'Paragraphs under the title.' }),
              responsiveImage('image', {
                label: 'Hero photo',
                description: 'Photo on the right of the hero, with the grading baked in.',
              }),
              icon('icon', { required: true, description: 'Icon next to the open roles figure.' }),
              count('count', {
                label: 'Open roles figure',
                description: 'Figure and label in the hero.',
              }),
              link('action', {
                required: true,
                label: 'Hero button',
                description: 'Button next to the figure; leads to the open roles section.',
              }),
            ],
          },
        ]),
        tab('Open roles', [
          {
            name: 'roles',
            type: 'group',
            label: 'Open roles',
            fields: [
              text('tag', { required: true, description: 'Small label above the title.' }),
              text('title', { required: true }),
              {
                name: 'columns',
                type: 'array',
                label: 'Text columns',
                minRows: 1,
                maxRows: 3,
                admin: {
                  description:
                    'Columns of text under the title, above the job cards. Links are allowed.',
                },
                fields: [...richText('text', { required: true })],
              },
            ],
          },
        ]),
        tab('Hiring process', [
          {
            name: 'hiring',
            type: 'group',
            label: 'Hiring process',
            fields: [
              text('title', { required: true }),
              paragraphs('paragraphs', { minRows: 1 }),
              {
                name: 'steps',
                type: 'array',
                minRows: 1,
                admin: {
                  description: 'Numbered list. The numbers (01, 02, …) follow the order here.',
                },
                fields: [
                  textarea('text', {
                    required: true,
                    description: 'A line break starts a new line.',
                  }),
                  icon('icon', { required: true }),
                ],
              },
            ],
          },
        ]),
        tab('Search', [seo()]),
      ],
    },
  ],
}
