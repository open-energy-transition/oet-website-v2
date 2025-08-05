import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublishedWithoutDrafts } from '../../access/authenticatedOrPublished'

export const Icons: CollectionConfig = {
  slug: 'icons',
  labels: {
    singular: 'Icon',
    plural: 'Icons',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublishedWithoutDrafts,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'svg',
      type: 'code',
      admin: {
        language: 'html',
        description: 'Paste the raw SVG markup here.',
        components: {
          Cell: '@/components/Icons/SVGPreviewCell',
        },
      },
      required: true,
    },
  ],
}
