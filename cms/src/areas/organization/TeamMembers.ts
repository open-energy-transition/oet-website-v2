import type { CollectionConfig, GroupField } from 'payload'

import { publicRead } from '../../access'
import { image, plainText, richText, socialLinks, text } from '../../fields'
import { checkbox, choice, number, tab } from './fields'

export const educationKinds = [
  { label: 'Doctorate', value: 'doctorate' },
  { label: 'Degree', value: 'degree' },
] as const

export const portraitKinds = [
  { label: 'Cut-out (transparent background)', value: 'cut-out' },
  { label: 'Photo on white', value: 'photo' },
] as const

export const glows = [
  { label: 'Centre', value: 'center' },
  { label: 'Right', value: 'right' },
] as const

const box = (name: string, label: string, description: string): GroupField => ({
  name,
  type: 'group',
  label,
  admin: { description },
  fields: [
    {
      type: 'row',
      fields: [
        number('x', { required: true, label: 'Left (px)' }),
        number('y', { required: true, label: 'Top (px)' }),
        number('width', { required: true, label: 'Width (px)' }),
        number('height', { required: true, label: 'Height (px)' }),
      ],
    },
  ],
})

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  access: publicRead,
  admin: {
    group: 'Organization',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'seniorLeadership', 'departments', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      type: 'tabs',
      tabs: [
        tab('Person', [
          plainText('name', {
            required: true,
            description: 'Full name with title, as shown on cards and person rows.',
          }),
          plainText('lastName', {
            required: true,
            label: 'Last name',
            description:
              'Family name as written in the full name, e.g. "van der Weijde". Members outside senior leadership are sorted by it.',
          }),
          text('role', {
            required: true,
            description: 'Job title under the name on the team card, department card and hero.',
          }),
          image('photo', {
            required: false,
            label: 'Head photo',
            description:
              'Square photo for small avatars: department cards, the department page hero and person rows. Required for department heads.',
          }),
          {
            name: 'departments',
            type: 'relationship',
            relationTo: 'departments',
            hasMany: true,
            admin: {
              description:
                'Departments this person belongs to. Each one adds a tag to the team card and puts the person under that tab of the team filter.',
            },
          },
          {
            name: 'country',
            type: 'relationship',
            relationTo: 'countries',
            admin: { description: 'Country the person works from.' },
          },
        ]),
        tab('Links', [
          socialLinks({
            description:
              'Icon buttons on the team card and in the contact box of a success story, in this order.',
          }),
        ]),
        tab('Profile', [
          plainText('profileLabel', {
            required: true,
            label: 'Profile button label',
            description:
              'Text of the button at the bottom of the team card that opens the profile. The design shortens it to "Read" on some cards.',
          }),
          {
            name: 'education',
            type: 'array',
            label: 'Education',
            admin: { description: 'Lines under the name in the profile, in this order.' },
            fields: [
              {
                type: 'row',
                fields: [
                  text('degree', {
                    required: true,
                    label: 'Degree',
                    description:
                      'University and degree, e.g. "Vrije Universiteit Amsterdam (PhD, Spatial Economics)".',
                  }),
                  choice('kind', educationKinds, { required: true, label: 'Icon' }),
                ],
              },
            ],
          },
          ...richText('biography', {
            required: false,
            label: 'Biography',
            description:
              'Text of the profile. Leave empty when there is none; the profile then shows the name and education only.',
          }),
        ]),
        tab('Team card portrait', [
          image('portrait', {
            required: true,
            label: 'Cut-out portrait',
            description: 'Portrait with a transparent background, shown on the team page card.',
          }),
          {
            type: 'collapsible',
            label: 'Portrait placement',
            admin: {
              description:
                'Position and size of the portrait inside the card frame, set by hand per person. The frame is 280 px wide on desktop and 332 px on mobile.',
            },
            fields: [
              box('portraitDesktop', 'Desktop box', 'Offset and size inside the 280 px frame.'),
              box('portraitMobile', 'Mobile box', 'Offset and size inside the 332 px frame.'),
              choice('portraitKind', portraitKinds, {
                required: true,
                label: 'Portrait kind',
                description:
                  'Cut-outs sit on the glow as they are. Photos on a white background are multiplied onto the card so the white disappears.',
              }),
              {
                type: 'row',
                fields: [
                  number('portraitRotation', {
                    required: true,
                    label: 'Rotation (degrees)',
                    description: 'Clockwise. 0 for an upright portrait.',
                  }),
                  choice('glow', glows, {
                    required: true,
                    label: 'Glow position',
                    description: 'Where the red glow sits behind the portrait.',
                  }),
                ],
              },
            ],
          },
        ]),
      ],
    },
    checkbox('seniorLeadership', {
      label: 'Senior leadership',
      description: 'Adds the senior leadership tag and lists the person under that filter tab.',
      sidebar: true,
    }),
    number('order', {
      required: true,
      label: 'Order',
      description:
        'Order of senior leadership at the start of the team list, lower first. Everyone else is sorted by last name.',
      sidebar: true,
    }),
  ],
}
