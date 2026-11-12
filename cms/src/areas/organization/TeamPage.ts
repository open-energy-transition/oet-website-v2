import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { paragraphs, seo, text, textarea } from '../../fields'
import { actions, coordinates, responsiveImage, stats, tab } from './fields'

export const TeamPage: GlobalConfig = {
  slug: 'team-page',
  label: 'Team page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/organization/team'),
    group: 'Organization',
    description:
      'Content of /organization/team. The cards are all team members; the filter tabs are senior leadership and the departments.',
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
              textarea('title', { required: true }),
              paragraphs('lead', { minRows: 1, description: 'Paragraphs under the title.' }),
              stats('stats', {
                description: 'Figures in the hero. The design has three.',
              }),
              responsiveImage('image', {
                label: 'Hero photo',
                description: 'Photo on the right of the hero, with the grading baked in.',
              }),
            ],
          },
        ]),
        tab('Introduction and globe', [
          {
            name: 'intro',
            type: 'group',
            label: 'Introduction',
            fields: [
              text('tag', { required: true, description: 'Small label above the title.' }),
              textarea('title', { required: true }),
              textarea('subline', { required: true, description: 'Text under the title.' }),
              actions('actions', { description: 'Buttons under the text.' }),
            ],
          },
          {
            name: 'globe',
            type: 'group',
            admin: {
              description:
                'The pins are the documents of the Countries collection. These fields set how the globe opens.',
            },
            fields: [
              coordinates('view', {
                label: 'Opening view',
                description: 'Point of the earth at the centre of the globe when the page opens.',
              }),
              {
                name: 'selectedCountry',
                type: 'relationship',
                relationTo: 'countries',
                required: true,
                label: 'Country selected at first',
                admin: { description: 'Its card is open when the page loads.' },
              },
            ],
          },
          {
            name: 'continents',
            type: 'group',
            label: 'Continent figures',
            admin: { description: 'Row of figures under the globe.' },
            fields: [
              text('label', { required: true, description: 'First cell of the row.' }),
              {
                name: 'items',
                type: 'array',
                label: 'Continents',
                minRows: 1,
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'value',
                        type: 'text',
                        required: true,
                        admin: {
                          description: 'Shown as written; not counted from the team.',
                        },
                      },
                      text('label', { required: true, description: 'Continent name.' }),
                    ],
                  },
                ],
              },
            ],
          },
        ]),
        tab('Team list', [
          {
            name: 'listing',
            type: 'group',
            label: 'Team list',
            fields: [
              text('title', { required: true, description: 'Heading of the team list.' }),
              textarea('mobileDescription', {
                required: true,
                label: 'Description (mobile)',
                description: 'Text under the heading, shown below 1024 px only.',
              }),
              text('seniorLeadershipLabel', {
                required: true,
                label: 'Senior leadership label',
                description:
                  'First filter tab after "Show All" and the tag on the cards of people flagged as senior leadership.',
              }),
            ],
          },
        ]),
        tab('Search', [seo()]),
      ],
    },
  ],
}
