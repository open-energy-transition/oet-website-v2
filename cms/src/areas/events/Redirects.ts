import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { href, plainText, select } from '../../fields'

export const statusCodes = ['301', '302'] as const

const sitePath = /^\/\S*$/

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  access: publicRead,
  admin: {
    group: 'Events',
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'statusCode', 'updatedAt'],
    description: 'Old addresses that forward visitors to a new address.',
  },
  fields: [
    {
      ...plainText('from', {
        required: true,
        label: 'From path',
        description:
          'Path on this site that is forwarded, starting with a slash, for example /blog.',
      }),
      unique: true,
      index: true,
      validate: (value: unknown) =>
        typeof value === 'string' && sitePath.test(value)
          ? true
          : 'Start with a slash and use no spaces',
    },
    href('to', {
      required: true,
      label: 'To',
      description: 'Target: a path on this site (/outputs/blogs) or a full URL (https://…).',
    }),
    select('statusCode', statusCodes, {
      required: true,
      label: 'Status code',
      description: '301 is a permanent redirect, 302 a temporary one.',
    }),
  ],
}
