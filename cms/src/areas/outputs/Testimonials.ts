import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { image, paragraphs, plainText, text, textarea } from '../../fields'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: publicRead,
  defaultSort: 'name',
  admin: {
    group: 'Outputs',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'role'],
    description:
      'Quotes from partners and clients. Shown in the slider of the success stories listing and on the project pages that refer to one.',
  },
  fields: [
    textarea('quote', {
      required: true,
      description: 'Large pull quote, written with its quotation marks.',
    }),
    paragraphs('paragraphs', {
      label: 'Full statement',
      minRows: 1,
      description: 'Longer text next to the quote. One row per paragraph.',
    }),
    {
      type: 'row',
      fields: [
        plainText('name', { required: true, description: 'Name of the person quoted.' }),
        text('role', {
          required: true,
          description: 'Position and organisation, shown under the name.',
        }),
      ],
    },
    image('portrait', {
      required: true,
      description: 'Portrait of the person quoted, upright, shown beside the quote.',
    }),
    {
      type: 'row',
      fields: [
        plainText('company', {
          required: true,
          label: 'Organisation',
          description: 'Name of the organisation. Read out as the text of its logo.',
        }),
        image('logo', {
          required: true,
          label: 'Organisation logo',
          description: 'Logo tile at the corner of the portrait.',
        }),
      ],
    },
  ],
}
