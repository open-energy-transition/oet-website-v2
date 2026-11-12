import type {
  ArrayField,
  CheckboxField,
  Condition,
  Field,
  GroupField,
  NumberField,
  SelectField,
  Tab,
} from 'payload'

import { icon, image, links, text, textarea } from '../../fields'

type Common = { required: boolean; label?: string; description?: string }

export const number = (
  name: string,
  options: Common & { sidebar?: true; condition?: Condition },
): NumberField => ({
  name,
  type: 'number',
  required: options.required,
  label: options.label,
  admin: {
    description: options.description,
    condition: options.condition,
    position: options.sidebar ? 'sidebar' : undefined,
  },
})

export const checkbox = (
  name: string,
  options: { label: string; description: string; sidebar: boolean },
): CheckboxField => ({
  name,
  type: 'checkbox',
  label: options.label,
  admin: options.sidebar
    ? { description: options.description, position: 'sidebar' }
    : { description: options.description },
})

export const choice = <Value extends string>(
  name: string,
  options: readonly { label: string; value: Value }[],
  common: Common,
): SelectField => ({
  name,
  type: 'select',
  required: common.required,
  label: common.label,
  options: options.map((option) => ({ label: option.label, value: option.value })),
  admin: { description: common.description },
})

export const responsiveImage = (
  name: string,
  options: { label: string; description: string },
): GroupField => ({
  name,
  type: 'group',
  label: options.label,
  admin: { description: options.description },
  fields: [
    {
      type: 'row',
      fields: [
        image('desktop', { required: true, label: 'Desktop (from 1024 px)' }),
        image('mobile', { required: true, label: 'Mobile' }),
      ],
    },
  ],
})

export const coordinates = (
  name: string,
  options: { label: string; description: string },
): GroupField => ({
  name,
  type: 'group',
  label: options.label,
  admin: { description: options.description },
  fields: [
    {
      type: 'row',
      fields: [
        number('longitude', { required: true, description: 'Degrees east, -180 to 180.' }),
        number('latitude', { required: true, description: 'Degrees north, -90 to 90.' }),
      ],
    },
  ],
})

export const size = (
  name: string,
  options: { label: string; description: string; condition?: Condition },
): GroupField => ({
  name,
  type: 'group',
  label: options.label,
  admin: { description: options.description, condition: options.condition },
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...number('width', { required: false, label: 'Width (px)' }),
          validate: (value: unknown, { siblingData }: SizeSibling) =>
            unset(value) === unset(siblingData.height) ? true : 'Fill in both sizes or neither',
        },
        {
          ...number('height', { required: false, label: 'Height (px)' }),
          validate: (value: unknown, { siblingData }: SizeSibling) =>
            unset(value) === unset(siblingData.width) ? true : 'Fill in both sizes or neither',
        },
      ],
    },
  ],
})

type SizeSibling = { siblingData: { width?: number | null; height?: number | null } }

const unset = (value: unknown) => value === null || value === undefined

export const heading = (
  name: string,
  options: { label: string; description: string },
): GroupField => ({
  name,
  type: 'group',
  label: options.label,
  admin: { description: options.description },
  fields: [
    text('tag', { required: true, description: 'Small label above the title.' }),
    textarea('title', { required: true, description: 'A line break starts a new line.' }),
  ],
})

export const count = (
  name: string,
  options: { label: string; description: string },
): GroupField => ({
  name,
  type: 'group',
  label: options.label,
  admin: { description: options.description },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'Shown as written; not counted from the documents.' },
        },
        text('label', { required: true }),
      ],
    },
  ],
})

export const tab = (label: string, fields: Field[]): Tab => ({ label, fields })

export const statTones = [
  { label: 'Red', value: 'brand' },
  { label: 'Light', value: 'light' },
] as const

export const stats = (name: string, options: { description: string }): ArrayField => ({
  name,
  type: 'array',
  minRows: 1,
  admin: { description: options.description },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'Shown as written; not counted from the documents.' },
        },
        text('label', { required: true }),
      ],
    },
    {
      type: 'row',
      fields: [
        icon('icon', { required: true }),
        choice('tone', statTones, { required: true, label: 'Icon square colour' }),
      ],
    },
  ],
})

export const buttonVariants = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
] as const

export const actions = (name: string, options: { description: string }): ArrayField => ({
  ...links(name, {
    label: 'Buttons',
    minRows: 0,
    extra: [
      {
        type: 'row',
        fields: [
          choice('variant', buttonVariants, { required: true, label: 'Style' }),
          {
            name: 'arrow',
            type: 'checkbox',
            label: 'Arrow icon',
          },
        ],
      },
    ],
  }),
  admin: { description: options.description },
})
