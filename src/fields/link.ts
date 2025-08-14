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
            dbName: 'b_bg',
            label: 'Button Background Color',
            type: 'select',
            required: true,
            defaultValue: '#ffffff',
            admin: {
              description: 'Choose a background color for the button',
              width: '50%',
            },
            options: [
              {
                label: 'White',
                value: '#ffffff',
              },
              {
                label: 'Black',
                value: '#000000',
              },

              {
                label: '#E41E3C',
                value: '#E41E3C',
              },
              {
                label: '#D7E4BF-50%',
                value: '#D7E4BF80',
              },
            ],
          },
          {
            name: 'btnTextColor',
            label: 'Button Text Color',
            dbName: 'text_color',
            type: 'select',
            required: true,
            defaultValue: '#000000',
            admin: {
              description: 'Choose a text color for the button',
              width: '50%',
            },
            options: [
              {
                label: 'Black',
                value: '#000000',
              },
              {
                label: 'White',
                value: '#ffffff',
              },
              {
                label: '#3C432F',
                value: '#3C432F',
              },
              {
                label: '#D7E4BF-50%',
                value: '#D7E4BF80',
              },
              {
                label: '#E41E3C',
                value: '#E41E3C',
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
