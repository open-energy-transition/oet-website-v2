import type { GlobalConfig, GroupField } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { image, links, paragraphs, seo, text, textarea } from '../../fields'
import { choice, coordinates, number, responsiveImage, tab } from './fields'

export const outcomeIcons = [
  { label: 'medical-star', value: 'medical-star' },
  { label: 'employees', value: 'employees' },
  { label: 'referral-alt', value: 'referral-alt' },
  { label: 'book-open-reader', value: 'book-open-reader' },
] as const

export const outcomeTones = [
  { label: 'Brand 400', value: 'brand-400' },
  { label: 'Brand 500', value: 'brand-500' },
  { label: 'Brand 800', value: 'brand-800' },
  { label: 'Brand 900', value: 'brand-900' },
] as const

export const pinIcons = [
  { label: 'code-merge', value: 'code-merge' },
  { label: 'code-fork', value: 'code-fork' },
  { label: 'people-group', value: 'people-group' },
  { label: 'link-horizontal', value: 'link-horizontal' },
  { label: 'box-connection', value: 'box-connection' },
  { label: 'tools', value: 'tools' },
] as const

const caption = (name: string, label: string, description: string): GroupField => ({
  name,
  type: 'group',
  label,
  admin: { description },
  fields: [
    text('label', { required: true, description: 'Small label above the statement.' }),
    textarea('statement', { required: true, description: 'Large sentence.' }),
    textarea('emphasis', {
      required: false,
      description: 'Optional end of the sentence, set in red directly after the statement.',
    }),
    paragraphs('details', {
      minRows: 2,
      maxRows: 2,
      description: 'Two lines of smaller text under the statement. One row per line.',
    }),
  ],
})

export const TheoryOfChangePage: GlobalConfig = {
  slug: 'theory-of-change-page',
  label: 'Theory of change page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/organization/theory-of-change'),
    group: 'Organization',
    description: 'Content of /organization/theory-of-change.',
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
              links('links', { label: 'Links under the text', minRows: 0 }),
              responsiveImage('image', {
                label: 'Hero image',
                description: 'Image behind the centred hero text.',
              }),
            ],
          },
        ]),
        tab('Scroll scene', [
          {
            name: 'scene',
            type: 'group',
            label: 'Scroll scene',
            admin: {
              description:
                'Pinned section that moves from the challenge to the goal while the visitor scrolls.',
            },
            fields: [
              caption('challenge', 'The challenge', 'First caption of the scene.'),
              caption('goal', 'Our goal', 'Second caption of the scene.'),
              paragraphs('values', {
                label: 'Value words',
                minRows: 4,
                maxRows: 4,
                description: 'The four words around the circle. One row per word.',
              }),
            ],
          },
        ]),
        tab('Approach', [
          {
            name: 'approach',
            type: 'group',
            fields: [
              text('mobileTag', {
                required: true,
                label: 'Tag (mobile)',
                description: 'Small label above the title, shown below 1024 px only.',
              }),
              text('title', { required: true }),
              text('subline', { required: true, description: 'Line under the title.' }),
              {
                name: 'steps',
                type: 'array',
                minRows: 1,
                maxRows: 5,
                admin: {
                  description:
                    'Columns of the approach. The numbers (01, 02, …) follow the order here.',
                },
                fields: [
                  textarea('title', {
                    required: true,
                    description: 'A line break starts a new line.',
                  }),
                  textarea('text', { required: true }),
                  image('image', {
                    required: false,
                    label: 'Illustration',
                    description:
                      'Illustration above the step. Without one the step shows the placeholder box.',
                  }),
                ],
              },
            ],
          },
        ]),
        tab('Outputs and impact', [
          {
            name: 'outcomes',
            type: 'group',
            label: 'Outputs and outcomes',
            fields: [
              text('title', { required: true }),
              {
                name: 'columns',
                type: 'array',
                minRows: 1,
                maxRows: 4,
                admin: {
                  description: 'One column per output with the outcome it leads to.',
                },
                fields: [
                  text('output', { required: true, description: 'Name of the output.' }),
                  textarea('description', {
                    required: true,
                    description: 'Text under the output.',
                  }),
                  textarea('outcome', {
                    required: true,
                    description: 'Outcome shown when the column opens.',
                  }),
                  {
                    type: 'row',
                    fields: [
                      choice('icon', outcomeIcons, {
                        required: true,
                        description: 'The matrix draws these four icons only.',
                      }),
                      choice('tone', outcomeTones, { required: true, label: 'Icon colour' }),
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'impact',
            type: 'group',
            fields: [text('title', { required: true }), textarea('text', { required: true })],
          },
        ]),
        tab('Globe', [
          {
            name: 'globe',
            type: 'group',
            admin: { description: 'Decorative globe at the end of the page.' },
            fields: [
              coordinates('view', {
                label: 'View',
                description: 'Point of the earth at the centre of the globe.',
              }),
              {
                name: 'pins',
                type: 'array',
                admin: { description: 'Icon pins on the globe.' },
                fields: [
                  choice('icon', pinIcons, {
                    required: true,
                    description: 'The globe draws these six icons only.',
                  }),
                  {
                    type: 'row',
                    fields: [
                      number('longitude', { required: true, description: 'Degrees east.' }),
                      number('latitude', { required: true, description: 'Degrees north.' }),
                      number('scale', {
                        required: true,
                        description: 'Size of the pin; 1 is the standard size.',
                      }),
                    ],
                  },
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
