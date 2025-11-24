import type { Block } from 'payload'

export const BlogQuote: Block = {
  slug: 'blogQuote',
  interfaceName: 'BlogQuoteBlock',
  fields: [
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The quote text',
      },
    },
  ],
  labels: {
    plural: 'Blog Quote Blocks',
    singular: 'Blog Quote Block',
  },
}
