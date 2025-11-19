import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline' | 'internal' | 'external' | 'github'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  internal: {
    label: 'Internal',
    value: 'internal',
  },
  external: {
    label: 'External',
    value: 'external',
  },
  github: {
    label: 'GitHub',
    value: 'github',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
          {
            name: 'icon',
            label: 'Button Icon',
            relationTo: 'icons',
            type: 'relationship',
            required: false,
            admin: {
              description: 'Select an icon to display on the button',
              width: '100%',
            },
          },
          {
            name: 'btnBgColor',
            // dbName: 'b_bg',
            label: 'Button Background Color',
            type: 'text',
            required: false,
            defaultValue: '#ffffff',
            admin: {
              description: 'Choose a background color for the button, Leave empty for transparent',
              width: '50%',
            },
          },
          {
            name: 'btnTextColor',
            label: 'Button Text Color',
            // dbName: 'text_color',
            type: 'text',
            required: false,
            defaultValue: '#000000',
            admin: {
              description: 'Choose a text color for the button',
              width: '50%',
            },
          },
          {
            name: 'btnSize',
            dbName: 'size',
            label: 'Text Size',
            type: 'select',
            required: false,
            defaultValue: 'md',
            options: [
              { label: 'Extra Small', value: 'xs' },
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
              { label: 'Extra Large', value: 'xl' },
              { label: '2X Large', value: '2xl' },
            ],
            admin: {
              description: 'Choose the size of the button text',
              width: '100%',
            },
          },
          {
            name: 'pos',
            type: 'select',
            label: 'Button Position',
            defaultValue: 'start',
            options: [
              { label: 'Start', value: 'start' },
              { label: 'Center', value: 'center' },
              { label: 'End', value: 'end' },
            ],
            admin: {
              description: 'Position of the button (default: start)',
              width: '50%',
            },
          },
          {
            name: 'sublinks',
            type: 'array',
            admin: {
              description: 'Add links to specific sections within the page',
            },
            fields: [
              {
                name: 'label',
                type: 'text',
                required: true,
                label: 'Section Label',
              },
              {
                name: 'hash',
                type: 'text',
                required: true,
                label: 'Hash Fragment',
                admin: {
                  description: 'Enter without # (e.g., "overview" will link to "#overview")',
                },
              },
            ],
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
