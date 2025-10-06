import type { Block } from 'payload'

export const DepartmentsList: Block = {
  slug: 'departmentsList',
  interfaceName: 'DepartmentsListBlock',
  fields: [
    {
      name: 'departments',
      type: 'relationship',
      relationTo: 'departments',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select one or more departments to display in this block',
      },
      label: 'Departments',
    },
  ],
  labels: {
    plural: 'Departments Lists',
    singular: 'Departments List',
  },
}
