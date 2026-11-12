import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { paragraphs, seo, text, textarea } from '../../fields'
import { responsiveImage, stats, tab } from './fields'

export const PartnersPage: GlobalConfig = {
  slug: 'partners-page',
  label: 'Partners and funders page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/organization/partners-and-funders'),
    group: 'Organization',
    description:
      'Content of /organization/partners-and-funders. The logos are the partners and funders marked "Show on the partners page".',
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
        tab('Introduction', [
          {
            name: 'intro',
            type: 'group',
            label: 'Introduction',
            fields: [
              textarea('statement', {
                required: true,
                description: 'Large statement at the left of the logo grid.',
              }),
              paragraphs('paragraphs', { minRows: 1 }),
            ],
          },
        ]),
        tab('Logo filter', [
          {
            name: 'filter',
            type: 'group',
            label: 'Filter tabs',
            admin: { description: 'Tabs above the logo grid, after "Show All".' },
            fields: [
              {
                type: 'row',
                fields: [
                  text('fundersLabel', {
                    required: true,
                    label: 'Funders tab',
                    description: 'Shows the partners flagged as funder.',
                  }),
                  text('partnersLabel', {
                    required: true,
                    label: 'Partners tab',
                    description: 'Shows the partners flagged as partner.',
                  }),
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
