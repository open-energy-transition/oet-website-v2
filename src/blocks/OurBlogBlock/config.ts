import type { Block } from 'payload'

export const OurBlog: Block = {
  slug: 'ourBlog',
  interfaceName: 'OurBlogBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Title for the blog section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Description for the blog section',
      },
    },
  ],
  labels: {
    plural: 'Our Blog Blocks',
    singular: 'Our Blog Block',
  },
}
