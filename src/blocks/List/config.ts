import type { Block } from 'payload'

export const List: Block = {
  slug: 'list',
  interfaceName: 'ListBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'List Title',
    },
    {
      name: 'direction',
      type: 'select',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
      defaultValue: 'vertical',
      required: true,
      label: 'Direction',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Normal List', value: 'normal' },
        { label: 'Tag', value: 'tag' },
      ],
      defaultValue: 'normal',
      required: true,
      label: 'Type',
    },
    {
      name: 'items',
      type: 'array',
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
}
