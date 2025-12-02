import type { Block } from 'payload'

export const ContentItems: Block = {
  slug: 'contentItems',
  interfaceName: 'ContentItemsBlock',
  fields: [
    {
      name: 'isPublish',
      type: 'checkbox',
      label: 'Is Publish',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      defaultValue: 'Project Overview',
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
    plural: 'Project Overview Blocks',
    singular: 'Project Overview Block',
  },
}
