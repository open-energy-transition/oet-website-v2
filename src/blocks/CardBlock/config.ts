import type { Block } from 'payload'

export const CardBlock: Block = {
  slug: 'card',
  labels: {
    singular: 'Card',
    plural: 'Cards',
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: false,
      admin: { width: '50%' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { width: '100%' },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      admin: { width: '100%' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: { width: '100%' },
    },
    {
      name: 'useBorder',
      label: 'Use Border',
      type: 'checkbox',
      required: false,
      admin: { width: '50%' },
    },
    {
      name: 'cardSize',
      label: 'Card Size',
      type: 'select',
      required: true,
      defaultValue: 'full',
      options: [
        { label: 'Full', value: 'full' },
        { label: 'Small', value: 'small' },
      ],
      admin: { width: '50%' },
    },
    {
      name: 'iconClass',
      label: 'Icon Class',
      type: 'text',
      required: false,
      admin: { width: '100%' },
    },
    {
      name: 'action',
      type: 'group',
      required: false,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: false,
        },
        {
          name: 'url',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}
