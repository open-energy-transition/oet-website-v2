import type { GlobalConfig, RelationshipField } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { image, seo, text, textarea } from '../../fields'

const banner = (name: string, label: string, description: string): RelationshipField => ({
  name,
  type: 'relationship',
  relationTo: 'cta-banners',
  required: true,
  label,
  admin: { description },
})

export const NewsEventsPage: GlobalConfig = {
  slug: 'news-events-page',
  label: 'News and Events page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/organization/news-and-events'),
    group: 'Events',
    description:
      'Fixed content of /organization/news-and-events. The cards come from Events, the type tabs from Event types. The banners also close every event page.',
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
              description: 'Label of the chip in the hero that jumps to the event list.',
            }),
            {
              type: 'row',
              fields: [
                image('image', {
                  required: true,
                  label: 'Image (desktop)',
                  description: 'Pre-graded hero photo for wide screens.',
                }),
                image('imageMobile', {
                  required: true,
                  label: 'Image (mobile)',
                  description: 'Pre-graded hero photo for narrow screens.',
                }),
              ],
            },
          ],
        },
        {
          name: 'listing',
          label: 'Event list',
          fields: [
            text('title', { required: true, description: 'Heading above the event list.' }),
            textarea('description', {
              required: true,
              description: 'Paragraph next to the heading.',
            }),
            {
              name: 'stateLabels',
              type: 'group',
              label: 'State tabs',
              admin: {
                description: 'Labels of the three tabs that filter the list by state.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    text('all', { required: true, label: 'All events' }),
                    text('highlighted', { required: true, label: 'Highlighted events' }),
                    text('upcoming', { required: true, label: 'Upcoming events' }),
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'cta',
          label: 'Calls to action',
          description:
            'Banners under the event list and at the end of every event page. They are edited under CTA banners.',
          fields: [
            banner('support', 'First banner (desktop)', 'First banner on wide screens.'),
            banner(
              'discuss',
              'First banner (mobile)',
              'Shown in place of the first banner on narrow screens.',
            ),
            banner('updates', 'Second banner', 'Second banner at every width.'),
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
