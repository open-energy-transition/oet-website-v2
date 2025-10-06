import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

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
      { label: 'Content', value: 'content' },
      { label: 'Card', value: 'card' },
      { label: 'Card Modal', value: 'cardModal' },
      { label: 'List Block', value: 'list' },
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
      features: getLexicalFeatures,
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
    name: 'icon',
    type: 'relationship',
    relationTo: 'icons',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'card',
      width: '50%',
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
      features: getLexicalFeatures,
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
  // List block fields, shown only when type === 'list'
  {
    name: 'listTitle',
    type: 'text',
    label: 'List Title',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'list',
      width: '100%',
    },
  },
  {
    name: 'listDirection',
    type: 'select',
    label: 'Direction',
    options: [
      { label: 'Vertical', value: 'vertical' },
      { label: 'Horizontal', value: 'horizontal' },
    ],
    defaultValue: 'vertical',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'list',
      width: '50%',
    },
  },
  {
    name: 'listType',
    type: 'select',
    label: 'Type',
    options: [
      { label: 'Normal List', value: 'normal' },
      { label: 'Tag', value: 'tag' },
    ],
    defaultValue: 'normal',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'list',
      width: '50%',
    },
  },
  {
    name: 'listItems',
    type: 'array',
    label: 'Items',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'list',
      width: '100%',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
      },
      {
        name: 'icon',
        label: 'Icon',
        relationTo: 'icons',
        type: 'relationship',
        required: false,
        admin: {
          description: 'Select an icon to display',
          width: '50%',
        },
      },
    ],
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      required: false,
      defaultValue: '',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'tag',
      type: 'text',
      required: false,
      defaultValue: '',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      defaultValue: '',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: getLexicalFeatures,
      }),
      label: false,
    },
    {
      name: 'padding',
      label: 'Section Padding',
      type: 'group',
      fields: [
        {
          name: 'top',
          label: 'Top',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Extra Large', value: 'xl' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'bottom',
          label: 'Bottom',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Extra Large', value: 'xl' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'left',
          label: 'Left',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Extra Large', value: 'xl' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'right',
          label: 'Right',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Extra Large', value: 'xl' },
          ],
          admin: { width: '25%' },
        },
      ],
    },
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
