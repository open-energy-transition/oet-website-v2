import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { image, paragraphs, seo, text, textarea } from '../../fields'
import { actions, closingCta, valueItems } from './fields'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/services'),
    group: 'Catalog',
    description:
      'Fixed content of /services and the parts every service page shares. The service cards come from Services.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            textarea('title', { required: true, description: 'Hero title of /services.' }),
            text('linkLabel', {
              required: true,
              label: 'Chip label',
              description: 'Label of the chip in the hero that jumps to the service list.',
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
            text('tag', {
              required: true,
              description: 'Tag above the heading of the service list.',
            }),
            textarea('title', { required: true, description: 'Heading above the service cards.' }),
            paragraphs('columns', {
              label: 'Text columns',
              minRows: 1,
              maxRows: 2,
              description: 'One row per column of text next to the heading.',
            }),
          ],
        },
        {
          name: 'approach',
          label: 'How We Work',
          description:
            'The steps and the illustration are also shown on every service page that has its own "How We Work" section.',
          fields: [
            text('tag', { required: true, description: 'Tag above the heading on /services.' }),
            textarea('title', { required: true, description: 'Heading on /services.' }),
            {
              name: 'steps',
              type: 'array',
              label: 'Steps',
              required: true,
              minRows: 1,
              maxRows: 5,
              admin: {
                description:
                  'Shown in this order on /services and on service pages. The step number is the position in this list.',
              },
              fields: [
                text('title', { required: true }),
                textarea('text', { required: true }),
                image('image', {
                  required: false,
                  label: 'Picture',
                  description:
                    'Optional picture of the step. Without it the site shows the placeholder box.',
                }),
              ],
            },
            image('illustration', {
              required: true,
              description: 'Wide illustration that runs behind the steps.',
            }),
          ],
        },
        {
          name: 'values',
          label: 'Why OET',
          fields: [
            text('tag', { required: true, description: 'Tag above the heading on /services.' }),
            textarea('title', { required: true, description: 'Heading on /services.' }),
            valueItems({
              description: 'Cards of the "Why OET" row on /services, five in a row on desktop.',
              maxRows: 5,
            }),
          ],
        },
        {
          name: 'cta',
          label: 'Call to action',
          fields: closingCta('Heading of the banner at the end of /services.'),
        },
        {
          label: 'Service pages',
          description: 'Parts that are the same on every service page.',
          fields: [
            text('detailEyebrow', {
              required: true,
              label: 'Eyebrow',
              description: 'Small label above the hero title of every service page.',
            }),
            actions('ctaActions', { label: 'Banner buttons', maxRows: 2 }),
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
