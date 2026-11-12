import type { CheckboxField, DateField, NumberField } from 'payload'

export const filled = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== ''

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

export const dateTime = (
  name: string,
  options: { required: boolean; label: string; description: string },
): DateField => ({
  name,
  type: 'date',
  required: options.required,
  label: options.label,
  admin: {
    description: options.description,
    date: {
      pickerAppearance: 'dayAndTime',
      displayFormat: 'd MMM yyyy, HH:mm',
      timeFormat: 'HH:mm',
    },
  },
})
