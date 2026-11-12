import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { image, paragraphs, seo, text, textarea } from '../../fields'

export const ToolsPage: GlobalConfig = {
  slug: 'tools-page',
  label: 'Tools and Data page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/tools-and-data'),
    group: 'Catalog',
    description:
      'Fixed content of /tools-and-data and its category pages. The cards come from Tools, the tabs from Tool categories.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            text('eyebrow', {
              required: true,
              description: 'Small label above the hero title (desktop only).',
            }),
            textarea('title', { required: true, description: 'Hero title.' }),
            text('linkLabel', {
              required: true,
              label: 'Chip label',
              description: 'Label of the chip in the hero that jumps to the tool list.',
            }),
            {
              type: 'row',
              fields: [
                image('image', {
                  required: true,
                  label: 'Image (desktop)',
                  description: 'Pre-graded hero illustration for wide screens.',
                }),
                image('imageMobile', {
                  required: true,
                  label: 'Image (mobile)',
                  description: 'Pre-graded hero illustration for narrow screens.',
                }),
              ],
            },
          ],
        },
        {
          name: 'intro',
          label: 'Intro',
          fields: [
            textarea('title', {
              required: true,
              description:
                'Heading above the filter tabs. A line break here is a line break on the site.',
            }),
            paragraphs('paragraphs', {
              label: 'Paragraphs',
              minRows: 1,
              maxRows: 2,
              description: 'One row per paragraph; on desktop they sit side by side.',
            }),
          ],
        },
        {
          label: 'Call to action',
          fields: [
            {
              name: 'cta',
              type: 'relationship',
              relationTo: 'cta-banners',
              required: true,
              label: 'Banner',
              admin: { description: 'Banner shown below the tool list.' },
            },
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
