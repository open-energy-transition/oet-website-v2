import type { Block } from 'payload'

export const ProjectAims: Block = {
  slug: 'projectAims',
  interfaceName: 'ProjectAimsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      defaultValue: 'Project Aims',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Project Aims',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: false,
        },
        {
          name: 'iconColor',
          type: 'select',
          label: 'Icon Color',
          required: false,
          defaultValue: 'red',
          options: [
            {
              label: 'Red',
              value: 'red',
            },
            {
              label: 'Black',
              value: 'black',
            },
          ],
        },
      ],
    },
    {
      name: 'media',
      type: 'array',
      label: 'Media Items',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Project Aims Blocks',
    singular: 'Project Aims Block',
  },
}
