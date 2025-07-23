import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'One Fourth',
        value: 'oneFourth',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'type',
    type: 'select',
    defaultValue: 'content',
    options: [
      {
        label: 'Content',
        value: 'content',
      },
      {
        label: 'Card',
        value: 'card',
      },
      {
        label: 'Card Modal',
        value: 'cardModal',
      },
    ],
    admin: {
      description: 'Choose the display type for this column',
    },
  },
  {
    name: 'modal',
    type: 'relationship',
    relationTo: 'models',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'cardModal',
    },
    required: true,
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'content',
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink && siblingData?.type === 'content')
        },
      },
    },
  }),
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'content',
    },
  },
  {
    name: 'tag',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
      width: '50%',
    },
  },
  {
    name: 'title',
    type: 'text',
    required: false,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
      width: '100%',
    },
  },
  {
    name: 'subtitle',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
      width: '100%',
    },
  },
  {
    name: 'description',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
      width: '100%',
    },
  },
  {
    name: 'useBorder',
    label: 'Use Border',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
    },
  },
  {
    name: 'cardSize',
    label: 'Size',
    type: 'select',
    required: true,
    defaultValue: 'full',
    options: [
      { label: 'Full', value: 'full' },
      { label: 'Small', value: 'small' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
    },
  },
  {
    name: 'action',
    type: 'array',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
    },
    fields: [
      {
        name: 'label',
        type: 'text',
      },
      {
        name: 'url',
        type: 'text',
      },
    ],
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
