import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { seo, text, textarea } from '../../fields'
import { heroImages, relations } from './fields'

export const SuccessStoriesPage: GlobalConfig = {
  slug: 'success-stories-page',
  label: 'Success stories page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/outputs/success-stories'),
    group: 'Outputs',
    description:
      'Fixed content of /outputs/success-stories. The cards come from Success stories; the filter options from Regions, Services, Tools and Tags.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            textarea('title', { required: true, description: 'Hero title.' }),
            text('linkLabel', {
              required: true,
              label: 'Chip label',
              description: 'Label of the chip in the hero that jumps to the listing.',
            }),
            heroImages('Pre-graded hero picture for wide screens.'),
          ],
        },
        {
          name: 'listing',
          label: 'Listing',
          fields: [
            text('title', { required: true, description: 'Heading above the project cards.' }),
            textarea('description', {
              required: true,
              description: 'Text under the heading. A line break here is a line break on the site.',
            }),
            {
              name: 'tabs',
              type: 'group',
              label: 'Status labels',
              admin: {
                description:
                  'Labels of the two status tabs above the cards. The same labels name the status in the header of a project page.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    text('completed', { required: true, label: 'Completed' }),
                    text('inProgress', { required: true, label: 'In progress' }),
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'testimonials',
          label: 'Testimonials',
          fields: [
            text('heading', {
              required: true,
              description:
                'Heading of the testimonial slider under the listing. Also the heading above the testimonial on a project page.',
            }),
            textarea('subline', {
              required: true,
              description: 'Line under the heading, on the listing only.',
            }),
            relations('items', 'testimonials', {
              label: 'Testimonials',
              minRows: 1,
              description: 'Slides of the slider under the listing, in this order.',
            }),
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
