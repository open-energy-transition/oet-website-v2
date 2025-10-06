import type { Block } from 'payload'

export const CustomerTestimonialsList: Block = {
  slug: 'customerTestimonialsList',
  interfaceName: 'CustomerTestimonialsListBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Title for the testimonials block',
      },
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      admin: {
        description: 'Subtitle for the testimonials block',
      },
      label: 'Subtitle',
    },
    {
      name: 'customerTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select one or more customerTestimonials to display in this block',
      },
      label: 'Customer Testimonials',
    },
  ],
  labels: {
    plural: 'Customer Testimonials Lists',
    singular: 'Customer Testimonial List',
  },
}
