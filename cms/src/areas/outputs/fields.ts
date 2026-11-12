import type {
  ArrayField,
  CheckboxField,
  CollapsibleField,
  DateField,
  Field,
  GroupField,
  RelationshipField,
  SelectField,
  Tab,
} from 'payload'

import { href, image, links, plainText, socialLinks, text, textarea } from '../../fields'

export const frameTones = [
  { label: 'Bright red', value: 'bright' },
  { label: 'Red (brand 500)', value: 'brand-500' },
  { label: 'Red (brand 600)', value: 'brand-600' },
  { label: 'Dark red (brand 700)', value: 'brand-700' },
  { label: 'Maroon (brand 800)', value: 'brand-800' },
  { label: 'Plum (brand 900)', value: 'brand-900' },
  { label: 'Charcoal (neutral 800)', value: 'neutral-800' },
  { label: 'Dark charcoal (neutral 900)', value: 'neutral-900' },
  { label: 'Black (neutral 950)', value: 'neutral-950' },
] as const

export const emphases = [
  { label: 'Primary (filled)', value: 'primary' },
  { label: 'Secondary (outlined)', value: 'secondary' },
] as const

export const personKinds = [
  { label: 'Team member', value: 'team-member' },
  { label: 'Someone else', value: 'external' },
] as const

type PersonKind = (typeof personKinds)[number]['value']

type PersonSibling = { siblingData: { kind?: PersonKind | null } }

export const tab = (label: string, fields: Field[]): Tab => ({ label, fields })

export const choice = <Value extends string>(
  name: string,
  options: readonly { label: string; value: Value }[],
  common: { required: boolean; label: string; description: string },
): SelectField => ({
  name,
  type: 'select',
  required: common.required,
  label: common.label,
  options: options.map((option) => ({ label: option.label, value: option.value })),
  admin: { description: common.description },
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

export const day = (name: string, options: { label: string; description: string }): DateField => ({
  name,
  type: 'date',
  required: true,
  label: options.label,
  admin: {
    description: options.description,
    date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
  },
})

export const relation = (
  name: string,
  relationTo: 'regions' | 'services' | 'testimonials' | 'publication-categories' | 'partners',
  options: { required: boolean; label: string; description: string },
): RelationshipField => ({
  name,
  type: 'relationship',
  relationTo,
  required: options.required,
  label: options.label,
  admin: { description: options.description },
})

export const relations = (
  name: string,
  relationTo: 'tags' | 'tools' | 'services' | 'departments' | 'partners' | 'testimonials',
  options: { label: string; description: string; minRows?: number },
): RelationshipField => ({
  name,
  type: 'relationship',
  relationTo,
  hasMany: true,
  minRows: options.minRows,
  required: options.minRows !== undefined,
  label: options.label,
  admin: { description: options.description },
})

export const cardAppearance = (description: string): CollapsibleField => ({
  type: 'collapsible',
  label: 'Card appearance',
  admin: { description: 'Picture and frame of the card in listings and carousels.' },
  fields: [
    {
      type: 'row',
      fields: [
        image('thumbnail', { required: true, label: 'Thumbnail', description }),
        choice('frame', frameTones, {
          required: true,
          label: 'Frame colour',
          description: 'Colour of the frame around the thumbnail, chosen to match the picture.',
        }),
      ],
    },
  ],
})

const filled = (value: unknown) =>
  typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined

const isTeamMember = (_data: unknown, siblingData: { kind?: PersonKind | null }) =>
  siblingData.kind === 'team-member'

const isExternal = (_data: unknown, siblingData: { kind?: PersonKind | null }) =>
  siblingData.kind === 'external'

const requiredFor =
  (kind: PersonKind, message: string) => (value: unknown, options: PersonSibling) =>
    options.siblingData.kind !== kind || filled(value) ? true : message

export const personFields = (options: { completeRow: boolean }): Field[] => {
  const rowDescription = options.completeRow
    ? ''
    : ' Without a photo the person is named in the page header only and gets no row in the sidebar.'
  const requiredForRow = (message: string) =>
    options.completeRow ? requiredFor('external', message) : () => true as const
  return [
    choice('kind', personKinds, {
      required: true,
      label: 'Person',
      description:
        'Team member: name, role, head photo and links come from the Team members document. Someone else: fill in the fields below.',
    }),
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'team-members',
      label: 'Team member',
      validate: requiredFor('team-member', 'Choose a team member'),
      admin: {
        condition: isTeamMember,
        description:
          'The row shows the head photo of the team member; choose someone who has one, or add it to their document.',
      },
    },
    {
      ...plainText('name', { required: false }),
      validate: requiredFor('external', 'A name is required'),
      admin: { condition: isExternal, description: 'Full name with academic title.' },
    },
    {
      ...text('title', { required: false, label: 'Position' }),
      validate: requiredForRow('A position is required'),
      admin: {
        condition: isExternal,
        description: `Position and organisation, one line under the name.${rowDescription}`,
      },
    },
    {
      ...image('photo', { required: false }),
      validate: requiredForRow('A photo is required'),
      admin: {
        condition: isExternal,
        description: `Square head photo, shown at 44 px.${rowDescription}`,
      },
    },
    socialLinks({
      description: 'Icons under the name, in this order. Leave empty for none.',
      condition: isExternal,
    }),
  ]
}

export const linkGroups = (description: string): ArrayField => ({
  name: 'linkGroups',
  type: 'array',
  label: 'Link groups',
  labels: { singular: 'Link group', plural: 'Link groups' },
  admin: { description },
  fields: [
    text('title', { required: true, description: 'Heading of the group, for example "Data".' }),
    {
      name: 'links',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Link', plural: 'Links' },
      fields: [
        {
          name: 'parts',
          type: 'array',
          required: true,
          minRows: 1,
          label: 'Label',
          labels: { singular: 'Label part', plural: 'Label parts' },
          admin: {
            description:
              'The label is written as one or more parts in a row. Underline the part that reads as the link: "DOI: " without underline followed by the address with underline.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                text('text', {
                  required: true,
                  description: 'Text of this part, with its own spaces and punctuation.',
                }),
                checkbox('underline', {
                  label: 'Underlined',
                  description: 'Draws this part with the link underline.',
                }),
              ],
            },
          ],
        },
        href('href', { required: true, label: 'Target' }),
        {
          type: 'row',
          fields: [
            checkbox('truncate', {
              label: 'Keep on one line',
              description: 'Cuts a long label with an ellipsis instead of wrapping it.',
            }),
            checkbox('newTab', {
              label: 'Open in a new tab',
              description: 'Opens the target in a new browser tab.',
            }),
            checkbox('disabled', {
              label: 'Disabled',
              description: 'Shows the label greyed out and not clickable, for something announced.',
            }),
          ],
        },
      ],
    },
  ],
})

export const serviceCta = (page: string): Field[] => [
  {
    name: 'cta',
    type: 'group',
    label: 'Band text',
    admin: { description: `Red band at the end of the ${page} page, left of the service card.` },
    fields: [
      textarea('heading', { required: true, description: 'Heading of the band.' }),
      textarea('primary', {
        required: true,
        label: 'Main text',
        description: 'Paragraph under the heading.',
      }),
      textarea('secondary', {
        required: true,
        label: 'Secondary text',
        description: 'Smaller paragraph under the buttons that points to the service card.',
      }),
      links('actions', {
        label: 'Buttons',
        minRows: 1,
        maxRows: 2,
        extra: [
          choice('emphasis', emphases, {
            required: true,
            label: 'Emphasis',
            description: 'Filled or outlined button.',
          }),
        ],
      }),
    ],
  },
  relation('ctaService', 'services', {
    required: true,
    label: 'Service card',
    description:
      'Service whose card is shown in the band. The card content is edited on the service, tab "Project and publication pages".',
  }),
]

export const typeLabels = (name: string, label: string, description: string): GroupField => ({
  name,
  type: 'group',
  label,
  admin: { description },
  fields: [
    {
      type: 'row',
      fields: [
        text('academic', { required: true, label: 'Academic publications' }),
        text('blogs', { required: true, label: 'Blogs' }),
        text('policyBriefs', { required: true, label: 'Policy briefs' }),
        text('reports', { required: true, label: 'Reports' }),
      ],
    },
  ],
})

export const heroImages = (description: string): Field => ({
  type: 'row',
  fields: [
    image('image', { required: true, label: 'Image (desktop)', description }),
    image('imageMobile', {
      required: true,
      label: 'Image (mobile)',
      description: 'Pre-graded hero picture for narrow screens.',
    }),
  ],
})
