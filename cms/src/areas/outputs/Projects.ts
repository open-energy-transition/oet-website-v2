import type { CollectionConfig } from 'payload'

import { publishedRead } from '../../access'
import { always, draftVersions, previewOptions } from '../../preview'
import { href, image, paragraphs, richText, slug, text, textarea } from '../../fields'
import {
  cardAppearance,
  checkbox,
  choice,
  day,
  linkGroups,
  personFields,
  relation,
  relations,
  serviceCta,
  tab,
} from './fields'

export const projectStatuses = [
  { label: 'Completed', value: 'completed' },
  { label: 'In progress', value: 'in-progress' },
] as const

export const homeTitleLines = [
  { label: 'Two lines', value: '2' },
  { label: 'Three lines', value: '3' },
] as const

type HomeSibling = { siblingData: { showOnHome?: boolean | null } }

type PartnerLinkSibling = { siblingData: { label?: string | null; href?: string | null } }

const onHome = (_data: unknown, siblingData: { showOnHome?: boolean | null }) =>
  siblingData.showOnHome === true

const requiredOnHome = (value: unknown, { siblingData }: HomeSibling) =>
  siblingData.showOnHome !== true || (value !== null && value !== undefined && value !== '')
    ? true
    : 'Required while the project is in the home page carousel'

const titleLinesDescription =
  'Lines reserved for the title on the home card. Use three for a title that does not fit on two.'

const empty = (value: unknown) => value === null || value === undefined || value === ''

const hrefPattern = /^(\/|https?:\/\/|mailto:)/

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: publishedRead,
  versions: draftVersions,
  labels: { singular: 'Success story', plural: 'Success stories' },
  defaultSort: '-startDate',
  admin: {
    group: 'Outputs',
    ...previewOptions((slug) => `/outputs/success-stories/${slug}`, always),
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectStatus', 'region', 'startDate', '_status'],
    description:
      'Projects. Each has its own page at /outputs/success-stories/<slug> and a card on the success stories listing, the home page, department pages and service pages.',
  },
  fields: [
    text('title', {
      required: true,
      description: 'Card title, page title and browser tab title.',
    }),
    slug('title'),
    choice('projectStatus', projectStatuses, {
      required: true,
      label: 'Status',
      description:
        'Tab of the success stories listing the project is listed under, and the status next to the dates on its page.',
    }),
    {
      type: 'tabs',
      tabs: [
        tab('Summary', [
          textarea('excerpt', {
            required: true,
            description: 'Text on the card. Also the search result description of the page.',
          }),
          {
            type: 'row',
            fields: [
              day('startDate', {
                label: 'Start',
                description:
                  'First day of the project. The card shows month and year, the page the full date.',
              }),
              day('endDate', {
                label: 'End',
                description: 'Last day of the project, or the planned one while it is in progress.',
              }),
            ],
          },
          paragraphs('highlights', {
            label: 'Highlights',
            minRows: 1,
            maxRows: 4,
            description: 'Bullet list in the page header. One row per bullet, four at most.',
          }),
          cardAppearance(
            'Pre-composed picture made with the Thumbnail Maker Guide, 734 × 476 px. Used by every card of the project.',
          ),
          {
            type: 'collapsible',
            label: 'Partner on the card',
            admin: {
              description:
                'Optional. The tag sits on the thumbnail, the link in the footer of the card.',
            },
            fields: [
              {
                ...relation('partnerTag', 'partners', {
                  required: false,
                  label: 'Partner tag',
                  description:
                    'Partner whose tag logo is laid over the thumbnail. Only partners with a tag logo can be chosen.',
                }),
                filterOptions: { tagLogo: { exists: true } },
              },
              {
                name: 'partnerLink',
                type: 'group',
                label: 'Partner link',
                admin: {
                  description:
                    'Link in the card footer. Fill in both the label and the target, or neither.',
                },
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        ...text('label', { required: false }),
                        validate: (value: unknown, { siblingData }: PartnerLinkSibling) =>
                          empty(value) && !empty(siblingData.href)
                            ? 'A link target needs a label'
                            : true,
                      },
                      {
                        ...href('href', {
                          required: false,
                          description: 'Full URL of the partner (https://…).',
                        }),
                        validate: (value: unknown, { siblingData }: PartnerLinkSibling) => {
                          if (empty(value))
                            return empty(siblingData.label) ? true : 'A label needs a link target'
                          return typeof value === 'string' && hrefPattern.test(value)
                            ? true
                            : 'Start with /, http://, https:// or mailto:'
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]),
        tab('Classification', [
          relation('region', 'regions', {
            required: true,
            label: 'Region',
            description: 'Region in the page header and in the region filter of the listing.',
          }),
          relations('tags', 'tags', {
            label: 'Tags',
            description:
              'Tags in the page header, in this order, and the tag filter of the listing.',
          }),
          relations('tools', 'tools', {
            label: 'Tools',
            description:
              '"Tools" list in the page header, in this order, and the products filter of the listing.',
          }),
          relations('services', 'services', {
            label: 'Services',
            description:
              '"Service" list in the page header and the service filter of the listing. The project is also shown as a related card on the page of each service chosen here.',
          }),
          relations('departments', 'departments', {
            label: 'Departments',
            description:
              'The project is shown in the "Department Projects" carousel on the page of each department chosen here.',
          }),
        ]),
        tab('Page', [
          image('hero', {
            required: true,
            label: 'Hero image',
            description: 'Wide picture under the page header.',
          }),
          ...richText('body', {
            required: true,
            description: 'Article text. Use heading 2 for the opening line and heading 3 below it.',
          }),
          linkGroups(
            'Lists of links under the article, for example "Tools", "Data" and "Links". Leave empty for none.',
          ),
          relation('testimonial', 'testimonials', {
            required: false,
            label: 'Testimonial',
            description: 'Quote shown under the links. Leave empty for a page without one.',
          }),
          {
            name: 'related',
            type: 'relationship',
            relationTo: 'projects',
            hasMany: true,
            label: 'Related projects',
            filterOptions: ({ id }) => (id === undefined ? true : { id: { not_equals: id } }),
            admin: {
              description:
                'Cards in the "Related Projects" carousel, in this order. Leave empty for a page without it.',
            },
          },
        ]),
        tab('Sidebar', [
          {
            name: 'contact',
            type: 'group',
            label: 'Contact',
            admin: { description: 'Person in the "Contact" box next to the article.' },
            fields: [
              text('role', {
                required: false,
                label: 'Role in the project',
                description: 'Small line above the name, for example "Project Lead".',
              }),
              ...personFields({ completeRow: true }),
            ],
          },
          relations('partners', 'partners', {
            label: 'Partners',
            description:
              '"Partners" box next to the article, in this order. An organisation with a logo shows its logo, one without shows its name, linked to its website when it has one. Use "Create new" to add an organisation that is not in Partners and funders yet. Leave empty for a page without the box.',
          }),
          relations('funders', 'partners', {
            label: 'Funders',
            description:
              '"Funders" box under the partners, in this order, shown the same way. Leave empty for a page without the box.',
          }),
        ]),
        tab('Call to action', serviceCta('project')),
        tab('Home page', [
          {
            name: 'home',
            type: 'group',
            label: 'Home page carousel',
            admin: {
              description: 'The "Projects" carousel on the home page is a hand-picked set.',
            },
            fields: [
              checkbox('showOnHome', {
                label: 'Show in the home page carousel',
                description: 'Adds the card of this project to the carousel.',
              }),
              {
                type: 'row',
                fields: [
                  {
                    name: 'order',
                    type: 'number',
                    label: 'Position',
                    validate: requiredOnHome,
                    admin: { condition: onHome, description: 'Lower comes first.' },
                  },
                  {
                    ...choice('titleLines', homeTitleLines, {
                      required: false,
                      label: 'Title lines',
                      description: titleLinesDescription,
                    }),
                    validate: requiredOnHome,
                    admin: { condition: onHome, description: titleLinesDescription },
                  },
                ],
              },
            ],
          },
        ]),
      ],
    },
  ],
}
