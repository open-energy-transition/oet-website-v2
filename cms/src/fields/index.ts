import { lexicalHTMLField } from '@payloadcms/richtext-lexical'
import type {
  ArrayField,
  Condition,
  Field,
  GroupField,
  RichTextField,
  SelectField,
  TextField,
  TextareaField,
  UploadField,
} from 'payload'

import { iconNames } from './iconNames'

type Common = { required: boolean; label?: string; description?: string }

const adminOf = ({ description }: { description?: string }) =>
  description ? { admin: { description } } : {}

export const text = (name: string, options: Common): TextField => ({
  name,
  type: 'text',
  localized: true,
  required: options.required,
  label: options.label,
  ...adminOf(options),
})

export const plainText = (name: string, options: Common): TextField => ({
  name,
  type: 'text',
  required: options.required,
  label: options.label,
  ...adminOf(options),
})

export const textarea = (name: string, options: Common): TextareaField => ({
  name,
  type: 'textarea',
  localized: true,
  required: options.required,
  label: options.label,
  ...adminOf(options),
})

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/

export const slug = (source: string): TextField => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `URL segment. Lowercase letters, digits and hyphens, derived from the ${source}.`,
  },
  validate: (value: unknown) =>
    typeof value === 'string' && slugPattern.test(value)
      ? true
      : 'Use lowercase letters, digits and single hyphens',
})

const hrefPattern = /^(\/|#|https?:\/\/|mailto:|tel:)/

export const href = (name: string, options: Common): TextField => ({
  name,
  type: 'text',
  required: options.required,
  label: options.label,
  admin: {
    description:
      options.description ??
      'Site path (/services), anchor (#team), full URL (https://…) or mailto: address.',
  },
  validate: (value: unknown) => {
    if (value === null || value === undefined || value === '')
      return options.required ? 'A link target is required' : true
    return typeof value === 'string' && hrefPattern.test(value)
      ? true
      : 'Start with /, #, http://, https://, mailto: or tel:'
  },
})

export const link = (name: string, options: Common): GroupField => ({
  name,
  type: 'group',
  label: options.label,
  ...adminOf(options),
  fields: [
    {
      type: 'row',
      fields: [
        text('label', { required: options.required }),
        href('href', { required: options.required }),
      ],
    },
  ],
})

export const links = (
  name: string,
  options: { label?: string; minRows: number; maxRows?: number; extra?: Field[] },
): ArrayField => ({
  name,
  type: 'array',
  label: options.label,
  minRows: options.minRows,
  maxRows: options.maxRows,
  fields: [
    {
      type: 'row',
      fields: [text('label', { required: true }), href('href', { required: true })],
    },
    ...(options.extra ?? []),
  ],
})

export const image = (name: string, options: Common): UploadField => ({
  name,
  type: 'upload',
  relationTo: 'media',
  required: options.required,
  label: options.label,
  ...adminOf(options),
})

export const icon = (name: string, options: Common): SelectField => ({
  name,
  type: 'select',
  required: options.required,
  label: options.label,
  options: iconNames.map((value) => ({ label: value, value })),
  admin: {
    description:
      options.description ??
      'Icon from the site icon set (web/src/icons). The name is the file name.',
  },
})

export const select = <Value extends string>(
  name: string,
  values: readonly Value[],
  options: Common & { defaultValue?: Value },
): SelectField => ({
  name,
  type: 'select',
  required: options.required,
  label: options.label,
  defaultValue: options.defaultValue,
  options: values.map((value) => ({ label: value, value })),
  ...adminOf(options),
})

export const paragraphs = (
  name: string,
  options: { label?: string; minRows: number; maxRows?: number; description?: string },
): ArrayField => ({
  name,
  type: 'array',
  localized: true,
  label: options.label,
  minRows: options.minRows,
  maxRows: options.maxRows,
  admin: { description: options.description ?? 'One row per paragraph.' },
  fields: [{ name: 'text', type: 'textarea', required: true }],
})

export const richText = (name: string, options: Common): [RichTextField, Field] => [
  {
    name,
    type: 'richText',
    localized: true,
    required: options.required,
    label: options.label,
    ...adminOf(options),
  },
  lexicalHTMLField({ htmlFieldName: `${name}Html`, lexicalFieldName: name }),
]

export const seo = (): GroupField => ({
  name: 'meta',
  type: 'group',
  label: 'Search and sharing',
  fields: [
    text('title', { required: true, description: 'Browser tab and search result title.' }),
    textarea('description', { required: true, description: 'Search result description.' }),
  ],
})

export const personSocialKinds = [
  'email',
  'github',
  'linkedin',
  'message',
  'x',
  'youtube',
  'bluesky',
  'mastodon',
  'eventbrite',
  'newsletter',
] as const

const personSocialLabels: Record<(typeof personSocialKinds)[number], string> = {
  email: 'Email',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  message: 'Message',
  x: 'X',
  youtube: 'YouTube',
  bluesky: 'Bluesky',
  mastodon: 'Mastodon',
  eventbrite: 'Eventbrite',
  newsletter: 'Newsletter',
}

export const socialLinks = (options: {
  description: string
  condition?: Condition
}): ArrayField => ({
  name: 'socialLinks',
  type: 'array',
  label: 'Social links',
  labels: { singular: 'Social link', plural: 'Social links' },
  admin: { description: options.description, condition: options.condition },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          label: 'Network',
          options: personSocialKinds.map((value) => ({ label: personSocialLabels[value], value })),
        },
        href('href', {
          required: true,
          label: 'Target',
          description: 'Full URL (https://…) or mailto: address for email.',
        }),
      ],
    },
  ],
})
