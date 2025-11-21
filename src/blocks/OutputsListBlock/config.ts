import type { Block } from 'payload'

export const OutputsList: Block = {
  slug: 'outputsList',
  interfaceName: 'OutputsListBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Title for the outputs section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Description for the outputs section',
      },
    },
    {
      name: 'tag',
      type: 'text',
      required: false,
      admin: {
        description: 'Tag/category label for the outputs section',
      },
    },
  ],
  labels: {
    plural: 'Outputs List Blocks',
    singular: 'Outputs List Block',
  },
}
