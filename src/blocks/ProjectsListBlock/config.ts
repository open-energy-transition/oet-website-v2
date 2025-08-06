import type { Block } from 'payload'

export const ProjectsList: Block = {
  slug: 'projectsList',
  interfaceName: 'ProjectsListBlock',
  fields: [
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select one or more projects to display in this block',
      },
      label: 'Projects',
    },
  ],
  labels: {
    plural: 'Project Lists',
    singular: 'Project List',
  },
}
