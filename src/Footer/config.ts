import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { getLexicalFeatures } from '@/utilities/getLexicalFeatures'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: getLexicalFeatures,
      }),
      required: false,
      admin: {
        description: 'Short description for the footer',
      },
    },
    {
      name: 'aboutUs',
      type: 'group',
      label: 'First Column',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: false,
          admin: {
            description: 'Title for the About Us section',
          },
        },
        {
          name: 'linkActions',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
      admin: {
        description: 'Second column in the footer',
      },
    },
    {
      name: 'contactUs',
      type: 'group',
      label: 'Second Column',
      fields: [
        {
          name: 'linkActions',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
      admin: {
        description: 'Second column in the footer',
      },
    },
    {
      name: 'followUs',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: false,
          admin: {
            description: 'Title for the Follow Us section',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
          admin: {
            description: 'Description for the Follow Us section',
          },
        },
        {
          name: 'linkActions',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'relationship',
              relationTo: 'icons',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              admin: {
                description: 'Link of the social platform',
              },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Name of the social platform',
              },
            },
          ],
        },
      ],
      admin: {
        description: 'Follow Us section with social links',
      },
    },
    {
      name: 'copyright',
      type: 'richText',
      editor: lexicalEditor({
        features: getLexicalFeatures,
      }),
      required: false,
      admin: {
        description: 'Copyright notice',
      },
    },
    {
      name: 'privacyPolicy',
      type: 'richText',
      editor: lexicalEditor({
        features: getLexicalFeatures,
      }),
      required: false,
      admin: {
        description: 'Privacy Policy text or link',
      },
    },
    {
      name: 'termsOfUse',
      type: 'richText',
      editor: lexicalEditor({
        features: getLexicalFeatures,
      }),
      required: false,
      admin: {
        description: 'Terms of Use text or link',
      },
    },
    {
      name: 'cookiePolicy',
      type: 'richText',
      editor: lexicalEditor({
        features: getLexicalFeatures,
      }),
      required: false,
      admin: {
        description: 'Cookie Policy text or link',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
