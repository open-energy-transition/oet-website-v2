import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { plainText, select, textarea } from '../../fields'
import { actions, bannerTones, checkbox, collages } from './fields'

const keyPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/

export const CtaBanners: CollectionConfig = {
  slug: 'cta-banners',
  access: publicRead,
  labels: { singular: 'CTA banner', plural: 'CTA banners' },
  admin: {
    group: 'Catalog',
    useAsTitle: 'key',
    defaultColumns: ['key', 'heading', 'tone', 'collage'],
    description:
      'Reusable call-to-action banners. A page shows a banner by referring to it; the Tools and Data page and the News and Events page use them.',
  },
  fields: [
    {
      ...plainText('key', {
        required: true,
        description:
          'Name the pages use to find this banner. Lowercase letters, digits and hyphens. Changing it detaches the banner from pages that look it up by key.',
      }),
      unique: true,
      index: true,
      validate: (value: unknown) =>
        typeof value === 'string' && keyPattern.test(value)
          ? true
          : 'Use lowercase letters, digits and single hyphens',
    },
    textarea('heading', {
      required: true,
      description: 'Large heading. A line break here is a line break on the site.',
    }),
    textarea('lead', {
      required: false,
      description:
        'Optional emphasised sentence above the text. Leave empty for a banner without it.',
    }),
    textarea('text', { required: true, description: 'Paragraph of the banner.' }),
    actions('actions', { label: 'Buttons', maxRows: 2 }),
    {
      type: 'collapsible',
      label: 'Appearance',
      fields: [
        {
          type: 'row',
          fields: [
            select('tone', bannerTones, {
              required: true,
              label: 'Panel colour',
              description:
                'Background of the text panel. "light" is the pale panel with dark text and red buttons.',
            }),
            select('collage', collages, {
              required: true,
              label: 'Collage',
              description: 'Photo collage next to the text panel.',
            }),
          ],
        },
        checkbox('breakout', {
          label: 'Collage breaks out of the panel',
          description: 'When checked the collage extends above the top edge of the banner.',
        }),
      ],
    },
  ],
}
