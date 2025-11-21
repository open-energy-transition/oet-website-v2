import type { Block } from 'payload'

export const PostsList: Block = {
  slug: 'postsList',
  interfaceName: 'PostsListBlock',
  fields: [
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select one or more posts to display in this block',
      },
      label: 'Posts',
      hooks: {
        afterRead: [
          ({ value }) => {
            // Ensure we always return full objects, not IDs
            return value
          },
        ],
      },
    },
  ],
  labels: {
    plural: 'Posts List',
    singular: 'Posts List',
  },
}
