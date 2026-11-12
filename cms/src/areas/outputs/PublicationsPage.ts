import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { seo, text, textarea } from '../../fields'
import { heroImages, typeLabels } from './fields'

export const PublicationsPage: GlobalConfig = {
  slug: 'publications-page',
  label: 'Publications page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/outputs/publications'),
    group: 'Outputs',
    description:
      'Fixed content of /outputs/publications and the listings per type (/outputs/blogs, /outputs/policy-briefs, /outputs/reports). The cards come from Publications; the filter options from Regions and Tags.',
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
            typeLabels(
              'chips',
              'Chip labels',
              'Labels of the four chips in the hero, one per publication type. Each jumps to the listing.',
            ),
            heroImages('Pre-graded hero picture for wide screens.'),
          ],
        },
        {
          name: 'listing',
          label: 'Listing',
          fields: [
            text('title', { required: true, description: 'Heading above the publication cards.' }),
            typeLabels(
              'tabs',
              'Type labels',
              'Labels of the type tabs above the cards. On a listing per type the label is also the first part of the browser tab title.',
            ),
          ],
        },
        {
          name: 'outputs',
          label: 'Outputs section',
          description:
            'Second list under the listing. It shows the publications marked "List in the Outputs section", as cards without picture.',
          fields: [
            text('title', { required: true, description: 'Heading of the section.' }),
            textarea('description', {
              required: true,
              description: 'Text under the heading. A line break here is a line break on the site.',
            }),
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
