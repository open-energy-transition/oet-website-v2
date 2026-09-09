import type { GlobalConfig } from 'payload'

import { revalidateEventCta } from './hooks/revalidateEventCta'

export const EventCta: GlobalConfig = {
  slug: 'event-cta',
  label: 'Event CTA',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'The two-column call-to-action band shown above the site footer on event pages and the News & Events listing.',
  },
  fields: [
    {
      name: 'panels',
      type: 'array',
      minRows: 2,
      maxRows: 2,
      labels: {
        singular: 'Panel',
        plural: 'Panels',
      },
      admin: {
        initCollapsed: true,
        description: 'Exactly two panels — rendered left then right.',
      },
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'muted',
          options: [
            { label: 'Muted (warm grey)', value: 'muted' },
            { label: 'Light (off-white)', value: 'light' },
          ],
        },
        {
          name: 'heading',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Line breaks are preserved.',
          },
        },
        {
          name: 'lead',
          type: 'textarea',
          required: true,
          label: 'Lead paragraph',
        },
        {
          name: 'note',
          type: 'textarea',
          label: 'Secondary note',
        },
        {
          name: 'button',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                description: 'Leave empty to render the label as a static pill (no link).',
              },
            },
            {
              name: 'style',
              type: 'select',
              defaultValue: 'outline',
              options: [
                { label: 'Outline', value: 'outline' },
                { label: 'Solid', value: 'solid' },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateEventCta],
  },
}
