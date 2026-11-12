import type { CollectionConfig, Condition } from 'payload'

import { publicRead } from '../../access'
import { href, image, plainText } from '../../fields'
import { checkbox, choice, number, size, tab } from './fields'

export const partnerGroups = [
  { label: 'Trusted partner', value: 'trusted-partner' },
  { label: 'Network and affiliation', value: 'network-affiliation' },
] as const

const inLogoGrid: Condition = (data) => data.showOnHome === true || data.showOnPartnersPage === true

const onHome: Condition = (data) => data.showOnHome === true

const onPartnersPage: Condition = (data) => data.showOnPartnersPage === true

const hasTagLogo: Condition = (data) => Boolean(data.tagLogo)

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Partner or funder', plural: 'Partners and funders' },
  access: publicRead,
  admin: {
    group: 'Organization',
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'showOnPartnersPage', 'showOnHome', 'homeOrder'],
    description:
      'Partner, funder and client organisations. One document per organisation; logo grids and card tags refer to it.',
  },
  defaultSort: 'name',
  fields: [
    {
      type: 'tabs',
      tabs: [
        tab('Organisation', [
          {
            ...plainText('name', {
              required: true,
              description: 'Name of the organisation. Read out as the text of its logo.',
            }),
            unique: true,
            index: true,
          },
          href('website', {
            required: false,
            description: 'Full URL of the organisation website (https://…).',
          }),
          choice('group', partnerGroups, {
            required: false,
            description:
              'Group on the home page logo section. A partner without a group is left out of grouped grids.',
          }),
          {
            type: 'row',
            fields: [
              checkbox('isFunder', {
                label: 'Funder',
                description: 'Listed under the "Funders" tab of the partners page.',
                sidebar: false,
              }),
              checkbox('isPartner', {
                label: 'Partner',
                description: 'Listed under the "Partners" tab of the partners page.',
                sidebar: false,
              }),
            ],
          },
        ]),
        tab('Logo grids', [
          {
            type: 'row',
            fields: [
              checkbox('showOnPartnersPage', {
                label: 'Show on the partners page',
                description: 'Adds the logo to the grid on /organization/partners-and-funders.',
                sidebar: false,
              }),
              checkbox('showOnHome', {
                label: 'Show on the home page',
                description: 'Adds the logo to the partner section of the home page.',
                sidebar: false,
              }),
            ],
          },
          {
            type: 'row',
            fields: [
              number('order', {
                required: true,
                label: 'Position on the partners page',
                description: 'Lower comes first.',
                condition: onPartnersPage,
              }),
              number('homeOrder', {
                required: true,
                label: 'Position on the home page',
                description: 'Lower comes first, within its group.',
                condition: onHome,
              }),
            ],
          },
          {
            ...image('logo', {
              required: true,
              description:
                'Logo for the grids on the home and partners pages. Dark on a transparent or white background.',
            }),
            admin: {
              condition: inLogoGrid,
              description:
                'Logo for the grids on the home and partners pages. Dark on a transparent or white background.',
            },
          },
          {
            type: 'collapsible',
            label: 'Logo display size',
            admin: {
              condition: inLogoGrid,
              description:
                'Optional. Leave both sizes empty and the site sizes the logo from its proportions so that all logos look equally heavy. Fill in a width and height in CSS pixels only to override that for one logo; the logo keeps its proportions.',
            },
            fields: [
              size('logoDesktop', {
                label: 'Desktop',
                description:
                  'Home page and partners page from 1024 px. The partners page also uses this size on mobile, limited to the cell width.',
                condition: inLogoGrid,
              }),
              size('logoMobile', {
                label: 'Mobile',
                description: 'Home page below 1024 px, where the cells are narrower.',
                condition: inLogoGrid,
              }),
            ],
          },
        ]),
        tab('Card tag', [
          image('tagLogo', {
            required: false,
            label: 'Tag logo',
            description:
              'Small logo in the tag on project and publication cards that name this organisation as partner.',
          }),
          size('tagSize', {
            label: 'Tag logo display size',
            description:
              'Optional. Leave empty and the tag logo is sized from its proportions. Fill in a width and height in CSS pixels to override that.',
            condition: hasTagLogo,
          }),
        ]),
      ],
    },
  ],
}
