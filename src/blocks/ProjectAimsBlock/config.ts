import type { Block } from 'payload'

export const ProjectAims: Block = {
  slug: 'projectAims',
  interfaceName: 'ProjectAimsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
