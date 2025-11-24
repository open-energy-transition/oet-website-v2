import type { Block } from 'payload'

export const ProjectTeam: Block = {
  slug: 'projectTeam',
  interfaceName: 'ProjectTeamBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Title for the project team section',
      },
    },
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      fields: [
        {
          name: 'member',
          type: 'relationship',
          relationTo: 'team-members',
          required: true,
          admin: {
            description: 'Select a team member',
          },
        },
        {
          name: 'description',
          type: 'text',
          required: false,
          admin: {
            description: 'Custom description for this team member in this project',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Project Team Blocks',
    singular: 'Project Team Block',
  },
}
