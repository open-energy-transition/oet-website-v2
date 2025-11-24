import type { Block } from 'payload'

export const ContentItems: Block = {
  slug: 'contentItems',
  interfaceName: 'ContentItemsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Content Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
  labels: {
    plural: 'Content Items Blocks',
    singular: 'Content Items Block',
  },
}
