import type { CollectionConfig } from 'payload'
import { SVGPreviewCell } from './SVGPreviewCell'

export const Icons: CollectionConfig = {
  slug: 'icons',
  labels: {
    singular: 'Icon',
    plural: 'Icons',
  },
  admin: {
    useAsTitle: 'name',
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
          Cell: SVGPreviewCell,
        },
      },
      required: true,
    },
  ],
}
