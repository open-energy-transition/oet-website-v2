import type { Block, BlocksFieldValidation, CheckboxField, Field, NumberField } from 'payload'
import { blocks } from 'payload/shared'

import { links, text, textarea } from '../../fields'

export const number = (
  name: string,
  options: { label: string; description: string },
): NumberField => ({
  name,
  type: 'number',
  required: true,
  label: options.label,
  admin: { description: options.description },
})

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

export const heading = (where: string): Field[] => [
  text('tag', { required: true, description: `Small label above the title of ${where}.` }),
  textarea('title', {
    required: true,
    description: `Title of ${where}. A line break here is a line break on the site.`,
  }),
]

export const singleServicesBlock =
  (slug: 'servicesGroup' | 'servicesColumn', message: string): BlocksFieldValidation =>
  (value, options) => {
    if (!Array.isArray(value)) return blocks(value, options)
    const count = value.filter(
      (row: unknown) =>
        typeof row === 'object' && row !== null && 'blockType' in row && row.blockType === slug,
    ).length
    return count > 1 ? message : blocks(value, options)
  }

export const linkColumnBlock: Block = {
  slug: 'linkColumn',
  labels: { singular: 'Link column', plural: 'Link columns' },
  fields: [
    text('title', { required: true, description: 'Column heading.' }),
    links('links', { label: 'Links', minRows: 1 }),
  ],
}

export const servicesColumnBlock: Block = {
  slug: 'servicesColumn',
  labels: { singular: 'Services column', plural: 'Services columns' },
  fields: [
    text('title', {
      required: true,
      description:
        'Column heading. The links are the published Services, each with its "Navigation and footer" label; nothing is listed here.',
    }),
  ],
}
