import type { CollectionConfig } from 'payload'

import { publishedRead } from '../../access'
import { draftVersions, previewOptions } from '../../preview'
import { icon, plainText, richText, slug, text, textarea } from '../../fields'
import { checkbox, choice, number, responsiveImage, tab } from './fields'

export const accents = [
  { label: 'Red', value: 'red' },
  { label: 'Dark red', value: 'dark-red' },
  { label: 'Charcoal', value: 'charcoal' },
  { label: 'Plum', value: 'plum' },
] as const

export const heroBackgrounds = [
  { label: 'Red (brand 600)', value: 'brand-600' },
  { label: 'Plum (brand 900)', value: 'brand-900' },
  { label: 'Charcoal (neutral 900)', value: 'neutral-900' },
] as const

export const heroOrnaments = [
  { label: 'Standard', value: 'department' },
  { label: 'Inverse', value: 'department-inverse' },
] as const

export const mobileColumns = [
  { label: '326 px', value: '326' },
  { label: '332 px', value: '332' },
] as const

export const Departments: CollectionConfig = {
  slug: 'departments',
  access: publishedRead,
  versions: draftVersions,
  admin: {
    group: 'Organization',
    ...previewOptions(
      (slug) => `/organization/departments/${slug}`,
      (doc) => doc.hasDetailPage === true,
    ),
    useAsTitle: 'name',
    defaultColumns: ['name', 'head', 'hasDetailPage', 'order', '_status'],
  },
  defaultSort: 'order',
  fields: [
    {
      type: 'tabs',
      tabs: [
        tab('Card', [
          text('name', {
            required: true,
            description:
              'Department name: card title on the about and departments pages, page title of the detail page.',
          }),
          textarea('lead', {
            required: true,
            description: 'First text on the department card, under the name.',
          }),
          textarea('summary', {
            required: true,
            description: 'Grey text on the department card, clamped to three lines.',
          }),
          {
            name: 'head',
            type: 'relationship',
            relationTo: 'team-members',
            required: true,
            label: 'Head of department',
            admin: {
              description:
                'Shown with head photo, name and role on the card and in the detail page hero.',
            },
          },
          {
            type: 'collapsible',
            label: 'Card appearance',
            admin: { description: 'Icon and colour of the square at the top right of the card.' },
            fields: [
              {
                type: 'row',
                fields: [
                  icon('icon', {
                    required: true,
                    description:
                      'Department icon: card square, departments page and detail page hero.',
                  }),
                  choice('accent', accents, {
                    required: true,
                    label: 'Icon square colour',
                  }),
                ],
              },
            ],
          },
        ]),
        tab('Team page', [
          text('teamLabel', {
            required: true,
            label: 'Label on the team page',
            description: 'Filter tab above the team list and tag on the cards of its members.',
          }),
          number('teamOrder', {
            required: true,
            label: 'Position in the team filter',
            description: 'Lower comes first, after the senior leadership tab.',
          }),
        ]),
        tab('Detail page', [
          {
            name: 'detail',
            type: 'group',
            label: false,
            admin: {
              condition: (data) => data.hasDetailPage === true,
              description: 'Content of /organization/departments/<slug>.',
            },
            fields: [
              responsiveImage('cardImage', {
                label: 'Card image',
                description:
                  'Photo at the bottom of the department card. Only departments with a detail page show one.',
              }),
              {
                name: 'hero',
                type: 'group',
                fields: [
                  textarea('title', {
                    required: true,
                    description: 'Hero title. A line break starts a new line.',
                  }),
                  textarea('lead', {
                    required: true,
                    description:
                      'Paragraph under the hero title. Also used as the search result description.',
                  }),
                  responsiveImage('image', {
                    label: 'Hero image',
                    description: 'Map illustration on the right of the hero.',
                  }),
                  plainText('peopleCount', {
                    required: true,
                    label: 'People figure',
                    description:
                      'Number next to "People" in the hero. Shown as written; not counted from the team.',
                  }),
                  {
                    type: 'collapsible',
                    label: 'Hero appearance',
                    fields: [
                      {
                        type: 'row',
                        fields: [
                          choice('background', heroBackgrounds, {
                            required: true,
                            label: 'Background colour',
                          }),
                          choice('ornament', heroOrnaments, {
                            required: true,
                            label: 'Ornament',
                            description: 'Pattern drawn over the hero background.',
                          }),
                        ],
                      },
                    ],
                  },
                ],
              },
              ...richText('about', {
                required: true,
                label: 'About department',
                description: 'Text of the "About Department" section.',
              }),
              ...richText('worksIntro', {
                required: true,
                label: 'Works: introduction',
                description: 'Text of the "Works" section above the topic grid.',
              }),
              {
                name: 'topics',
                type: 'array',
                label: 'Works: topics',
                admin: {
                  description: 'Grid of topics between the two texts. Leave empty for no grid.',
                },
                fields: [
                  textarea('title', {
                    required: true,
                    description: 'A line break starts a new line.',
                  }),
                  textarea('description', { required: false }),
                  icon('icon', { required: true }),
                ],
              },
              ...richText('worksOutro', {
                required: false,
                label: 'Works: closing text',
                description: 'Text under the topic grid.',
              }),
              {
                type: 'collapsible',
                label: 'Page layout',
                fields: [
                  choice('mobileColumn', mobileColumns, {
                    required: true,
                    label: 'Mobile text column width',
                    description:
                      'Width of the text column at 412 px, set by hand per page in the design.',
                  }),
                ],
              },
            ],
          },
        ]),
      ],
    },
    slug('name'),
    checkbox('hasDetailPage', {
      label: 'Has a detail page',
      description:
        'On: the card links to /organization/departments/<slug> and shows a photo, and the detail page fields are required. Off: compact card without link.',
      sidebar: true,
    }),
    number('order', {
      required: true,
      label: 'Order',
      description: 'Position on the departments page. Lower comes first.',
      sidebar: true,
    }),
  ],
}
