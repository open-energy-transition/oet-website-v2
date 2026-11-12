import type { Block, CollectionConfig } from 'payload'

import { publishedRead } from '../../access'
import { always, draftVersions, previewOptions } from '../../preview'
import { icon, image, plainText, richText, slug, text, textarea } from '../../fields'
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

export const publicationTypes = [
  { label: 'Academic publication', value: 'academic' },
  { label: 'Blog', value: 'blogs' },
  { label: 'Policy brief', value: 'policy-briefs' },
  { label: 'Report', value: 'reports' },
] as const

const richTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Text', plural: 'Texts' },
  fields: [
    ...richText('content', {
      required: true,
      description:
        'Article text. Headings 2 and 3 are listed in the table of contents next to the article.',
    }),
  ],
}

const statsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Figures', plural: 'Figures' },
  fields: [
    text('title', {
      required: true,
      description: 'Heading above the figures. Listed in the table of contents.',
    }),
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Figures',
      labels: { singular: 'Figure', plural: 'Figures' },
      admin: { description: 'Shown in two columns on desktop, filled column by column.' },
      fields: [
        {
          type: 'row',
          fields: [
            plainText('value', {
              required: true,
              description: 'Shown as written, for example "40+".',
            }),
            icon('icon', { required: true }),
          ],
        },
        textarea('label', {
          required: true,
          description: 'Text next to the figure. A line break here is a line break on the site.',
        }),
      ],
    },
  ],
}

const imageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    image('image', {
      required: true,
      description:
        'Picture across the article column, 687 px wide on desktop. Its alternative text is on the media document.',
    }),
  ],
}

export const Publications: CollectionConfig = {
  slug: 'publications',
  access: publishedRead,
  versions: draftVersions,
  defaultSort: '-date',
  admin: {
    group: 'Outputs',
    ...previewOptions((slug) => `/outputs/publications/${slug}`, always),
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'category', 'date', '_status'],
    description:
      'Academic publications, blogs, policy briefs and reports. Each has its own page at /outputs/publications/<slug> and a card on the publication listings.',
  },
  fields: [
    text('title', {
      required: true,
      description: 'Card title, page title and browser tab title.',
    }),
    slug('title'),
    choice('type', publicationTypes, {
      required: true,
      label: 'Type',
      description:
        'Listing the publication appears on: /outputs/publications (all types), /outputs/blogs, /outputs/policy-briefs or /outputs/reports.',
    }),
    {
      type: 'tabs',
      tabs: [
        tab('Summary', [
          textarea('excerpt', {
            required: true,
            description: 'Text on the card. Also the search result description of the page.',
          }),
          relation('category', 'publication-categories', {
            required: true,
            label: 'Category',
            description: 'Label at the bottom of the card, for example "Blog | Case Study".',
          }),
          {
            type: 'row',
            fields: [
              day('date', {
                label: 'Publication date',
                description: 'Date on the card and in the page header. Also sorts the listings.',
              }),
              checkbox('preprint', {
                label: 'Preprint',
                description: 'The card shows "Preprint" in place of the date.',
              }),
            ],
          },
          textarea('highlight', {
            required: true,
            description: 'Highlighted paragraph in the page header.',
          }),
          cardAppearance(
            'Pre-composed picture made with the Thumbnail Maker Guide, 734 × 476 px. Used by the cards on the listings and in "Related Publications".',
          ),
          checkbox('showInOutputs', {
            label: 'List in the "Outputs" section',
            description:
              'Also lists the publication as a card without picture in the "Outputs" section under the listing.',
          }),
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
          relations('services', 'services', {
            label: 'Services',
            description:
              'Services the publication belongs to, for the service filter of the listing.',
          }),
          relations('tools', 'tools', {
            label: 'Products',
            description: 'Tools the publication is about, for the products filter of the listing.',
          }),
        ]),
        tab('Authors', [
          {
            name: 'authors',
            type: 'array',
            required: true,
            minRows: 1,
            labels: { singular: 'Author', plural: 'Authors' },
            admin: {
              description:
                'In this order. Every name is listed under "Authors" in the page header; authors with a photo also get a row in the sidebar.',
            },
            fields: personFields({ completeRow: false }),
          },
        ]),
        tab('Page', [
          image('hero', {
            required: true,
            label: 'Hero image',
            description: 'Wide picture under the page header.',
          }),
          {
            name: 'body',
            type: 'blocks',
            required: true,
            minRows: 1,
            label: 'Article',
            labels: { singular: 'Section', plural: 'Sections' },
            admin: {
              description: 'The article, built from text, figure grids and images in any order.',
            },
            blocks: [richTextBlock, statsBlock, imageBlock],
          },
          linkGroups(
            'Lists of links under the article, for example "Resources", "Links" and "Journal & DOI". Leave empty for none.',
          ),
          textarea('citation', {
            required: true,
            description: 'Text the "Cite" button in the sidebar copies to the clipboard.',
          }),
          {
            name: 'related',
            type: 'relationship',
            relationTo: 'publications',
            hasMany: true,
            label: 'Related publications',
            filterOptions: ({ id }) => (id === undefined ? true : { id: { not_equals: id } }),
            admin: {
              description:
                'Cards in the "Related Publications" carousel, in this order. Leave empty for a page without it.',
            },
          },
        ]),
        tab('Call to action', serviceCta('publication')),
      ],
    },
  ],
}
