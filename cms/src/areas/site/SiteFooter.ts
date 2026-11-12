import type { GlobalConfig } from 'payload'

import { globalRead } from '../../access'
import { link, links, paragraphs, text, textarea } from '../../fields'
import { linkColumnBlock, servicesColumnBlock, singleServicesBlock } from './fields'

export const SiteFooter: GlobalConfig = {
  slug: 'site-footer',
  label: 'Footer',
  access: globalRead,
  admin: {
    group: 'Site',
    description:
      'Footer of every page. The legal links, the cookie-settings labels and the copyright line are also shown at the bottom of the mobile menu.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'cta',
          label: 'Call to action',
          description:
            'Large block above the footer columns. The email link next to the button is the contact email in Site settings.',
          fields: [
            paragraphs('headline', {
              label: 'Headline',
              minRows: 1,
              description: 'One row per line of the headline.',
            }),
            link('action', {
              required: true,
              label: 'Button',
              description: 'Button under the headline.',
            }),
          ],
        },
        {
          label: 'Columns',
          fields: [
            textarea('blurb', {
              required: true,
              description: 'Short text about the organisation in the first footer box.',
            }),
            {
              name: 'columns',
              type: 'blocks',
              label: 'Link columns',
              required: true,
              minRows: 4,
              maxRows: 4,
              blocks: [linkColumnBlock, servicesColumnBlock],
              validate: singleServicesBlock(
                'servicesColumn',
                'Only one services column is supported',
              ),
              admin: {
                description:
                  'The four columns of footer links, left to right. On mobile they sit in two rows of two.',
              },
            },
          ],
        },
        {
          label: 'Legal line',
          description: 'Shown in the footer and at the bottom of the mobile menu.',
          fields: [
            text('copyright', { required: true, description: 'Copyright line.' }),
            links('legal', { label: 'Legal links', minRows: 1 }),
            {
              type: 'row',
              fields: [
                text('consentLabel', {
                  required: true,
                  label: 'Cookie settings label (desktop footer)',
                  description: 'Label of the button that reopens the cookie settings.',
                }),
                text('consentLabelCompact', {
                  required: true,
                  label: 'Cookie settings label (mobile)',
                  description: 'Same button in the mobile footer and in the mobile menu.',
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
