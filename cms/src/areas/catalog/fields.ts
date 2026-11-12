import type { ArrayField, CheckboxField, Field, NumberField } from 'payload'

import { image, links, select, text, textarea } from '../../fields'

export const brandTones = ['brand-600', 'brand-700', 'brand-800', 'brand-900'] as const

export const bannerTones = [...brandTones, 'light'] as const

export const collages = ['wind', 'thermalpower', 'biz'] as const

export const accents = ['brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900'] as const

export const emphases = ['primary', 'secondary'] as const

export const checkbox = (
  name: string,
  options: { label: string; description: string },
): CheckboxField => ({
  name,
  type: 'checkbox',
  required: true,
  defaultValue: false,
  label: options.label,
  admin: { description: options.description },
})

export const order = (description: string): NumberField => ({
  name: 'order',
  type: 'number',
  required: true,
  index: true,
  admin: { position: 'sidebar', description },
})

export const actions = (name: string, options: { label: string; maxRows: number }): ArrayField =>
  links(name, {
    label: options.label,
    minRows: 1,
    maxRows: options.maxRows,
    extra: [
      {
        type: 'row',
        fields: [
          select('emphasis', emphases, {
            required: true,
            label: 'Emphasis',
            description: 'primary is the filled button, secondary the outlined one.',
          }),
          checkbox('newTab', {
            label: 'Open in a new tab',
            description: 'Opens the target in a new browser tab.',
          }),
        ],
      },
    ],
  })

export const valueItems = (options: { description: string; maxRows: number }): ArrayField => ({
  name: 'items',
  type: 'array',
  label: 'Value cards',
  required: true,
  minRows: 1,
  maxRows: options.maxRows,
  admin: { description: options.description },
  fields: [
    {
      type: 'row',
      fields: [
        text('label', { required: true, description: 'Small label above the card title.' }),
        textarea('title', {
          required: true,
          description: 'Card title. A line break here is a line break on the site.',
        }),
      ],
    },
    textarea('body', { required: true, description: 'Card text.' }),
    {
      type: 'row',
      fields: [
        image('thumbnail', {
          required: true,
          label: 'Thumbnail (desktop)',
          description:
            'Pre-composed square illustration: 248 px wide in a five-column row, 207 px in a six-column row.',
        }),
        image('thumbnailMobile', {
          required: true,
          label: 'Thumbnail (mobile)',
          description: 'Pre-composed square illustration, 186 px wide.',
        }),
      ],
    },
  ],
})

export const closingCta = (description: string): Field[] => [
  textarea('heading', {
    required: true,
    description: `${description} A line break here is a line break on the site.`,
  }),
  textarea('text', { required: true, description: 'Paragraph next to the heading.' }),
]
