import type { Block, CollectionConfig } from 'payload'

import { publishedRead } from '../../access'
import { always, draftVersions, previewOptions } from '../../preview'
import { icon, image, link, paragraphs, select, seo, slug, text, textarea } from '../../fields'
import { accents, brandTones, checkbox, closingCta, collages, order, valueItems } from './fields'

export const navigationIcons = [
  'pylon',
  'government',
  'engineer',
  'column',
  'research',
  'monitor',
] as const

export const ctaCardIconTones = ['brand-500', 'brand-600', 'brand-700', 'brand-800'] as const

export const ctaCardFrames = ['brand-500', 'brand-600'] as const

export const valueColumns = ['5', '6'] as const

const approachShown = (_data: unknown, siblingData: { show?: boolean | null }) =>
  siblingData.show === true

const requiredWhenShown = (
  value: unknown,
  { siblingData }: { siblingData: { show?: boolean | null } },
) =>
  siblingData.show !== true || (typeof value === 'string' && value.trim() !== '')
    ? true
    : 'Required while the section is shown'

const paragraphBlock: Block = {
  slug: 'paragraph',
  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
  fields: [textarea('text', { required: true })],
}

const listBlock: Block = {
  slug: 'list',
  labels: { singular: 'Bullet list', plural: 'Bullet lists' },
  fields: [
    paragraphs('items', { label: 'Bullets', minRows: 1, description: 'One row per bullet.' }),
  ],
}

export const Services: CollectionConfig = {
  slug: 'services',
  access: publishedRead,
  versions: draftVersions,
  defaultSort: 'order',
  admin: {
    group: 'Catalog',
    ...previewOptions((slug) => `/services/${slug}`, always),
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', '_status'],
    description:
      'One document per audience OET serves. Each has its own page at /services/<slug> and appears on /services, the home page, the navigation, the footer and on project and publication pages.',
  },
  fields: [
    text('name', {
      required: true,
      description: 'Full name of the service, used wherever the site refers to it in running text.',
    }),
    slug('name'),
    order(
      'Position in every list of services (/services, home accordion, navigation, footer), lowest first.',
    ),
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Page: hero',
          description: 'Top of the service page.',
          fields: [
            textarea('title', {
              required: true,
              description: 'Hero title. A line break here is a line break on the site.',
            }),
            textarea('titleMobile', {
              required: false,
              label: 'Title (mobile)',
              description:
                'Only when the title needs different line breaks on narrow screens. Empty: the title above is used at every width.',
            }),
            textarea('lead', { required: true, description: 'Paragraph under the hero title.' }),
            {
              type: 'row',
              fields: [
                image('image', {
                  required: true,
                  label: 'Image (desktop)',
                  description: 'Pre-graded hero illustration for wide screens.',
                }),
                image('imageMobile', {
                  required: true,
                  label: 'Image (mobile)',
                  description: 'Pre-graded hero illustration for narrow screens.',
                }),
              ],
            },
            select('background', brandTones, {
              required: true,
              label: 'Background colour',
              description: 'Colour of the hero panel behind the title.',
            }),
          ],
        },
        {
          name: 'intro',
          label: 'Page: intro',
          description: 'Statement with a photo below the hero of the service page.',
          fields: [
            text('tag', { required: true, description: 'Tag above the heading.' }),
            textarea('title', { required: true, description: 'Heading of the intro.' }),
            paragraphs('paragraphs', { label: 'Paragraphs', minRows: 1 }),
            image('image', {
              required: true,
              label: 'Photo',
              description: 'Photo next to the intro text.',
            }),
          ],
        },
        {
          name: 'offerings',
          label: 'Page: offerings',
          description: 'Numbered list of what OET offers this audience.',
          fields: [
            text('tag', { required: true, description: 'Tag above the heading.' }),
            textarea('title', { required: true, description: 'Heading of the list.' }),
            {
              name: 'items',
              type: 'array',
              label: 'Offerings',
              required: true,
              minRows: 1,
              admin: {
                description: 'Shown in this order; the number is the position in this list.',
              },
              fields: [
                text('title', { required: true }),
                {
                  type: 'row',
                  fields: [
                    icon('icon', { required: true }),
                    select('accent', accents, {
                      required: true,
                      label: 'Accent colour',
                      description: 'Colour of the icon tile of this offering.',
                    }),
                  ],
                },
                {
                  name: 'text',
                  type: 'blocks',
                  label: 'Text',
                  minRows: 1,
                  required: true,
                  blocks: [paragraphBlock, listBlock],
                  admin: {
                    description: 'Paragraphs and bullet lists, in the order they appear.',
                  },
                },
                link('link', {
                  required: false,
                  label: 'Link',
                  description:
                    'Optional "More About …" link under the text. Leave both parts empty for an offering without a link.',
                }),
                paragraphs('deliverables', {
                  label: 'Deliverables',
                  minRows: 0,
                  description:
                    'One row per entry of the deliverables list on the right. No rows: the offering has no list.',
                }),
              ],
            },
          ],
        },
        {
          name: 'values',
          label: 'Page: why OET',
          description: 'Row of value cards on the service page.',
          fields: [
            text('tag', { required: true, description: 'Tag above the heading.' }),
            textarea('title', { required: true, description: 'Heading of the row.' }),
            select('columns', valueColumns, {
              required: true,
              label: 'Cards per row (desktop)',
              description:
                'Five cards per row use 248 px thumbnails, six use 207 px thumbnails. Match the number of cards.',
            }),
            valueItems({ description: 'Cards of the row, in this order.', maxRows: 6 }),
          ],
        },
        {
          name: 'approach',
          label: 'Page: how we work',
          description:
            'Optional section with the shared steps from the Services page global. The steps and the illustration are edited there.',
          fields: [
            checkbox('show', {
              label: 'Show this section',
              description: 'Unchecked: the service page has no "How We Work" section.',
            }),
            {
              ...text('tag', { required: false, description: 'Tag above the heading.' }),
              validate: requiredWhenShown,
              admin: { description: 'Tag above the heading.', condition: approachShown },
            },
            {
              ...textarea('title', { required: false, description: 'Heading of the section.' }),
              validate: requiredWhenShown,
              admin: { description: 'Heading of the section.', condition: approachShown },
            },
            {
              ...paragraphs('paragraphs', { label: 'Paragraphs', minRows: 0, maxRows: 2 }),
              admin: {
                description: 'One row per column of text next to the heading.',
                condition: approachShown,
              },
            },
          ],
        },
        {
          name: 'cta',
          label: 'Page: closing banner',
          description:
            'Banner at the end of the service page. Its buttons are on the Services page global.',
          fields: [
            ...closingCta('Heading of the banner.'),
            {
              type: 'row',
              fields: [
                select('background', brandTones, {
                  required: true,
                  label: 'Panel colour',
                  description: 'Background of the text panel.',
                }),
                select('collage', collages, {
                  required: true,
                  label: 'Collage',
                  description: 'Photo collage next to the text panel.',
                }),
              ],
            },
          ],
        },
        {
          name: 'card',
          label: 'Services index card',
          description:
            'Card of this service in the list on /services. It links to the service page.',
          fields: [
            textarea('title', {
              required: true,
              description: 'Card title. A line break here is a line break on the site.',
            }),
            paragraphs('paragraphs', { label: 'Paragraphs', minRows: 1 }),
            text('linkLabel', { required: true, label: 'Link label' }),
            {
              type: 'row',
              fields: [
                image('image', {
                  required: true,
                  label: 'Illustration (desktop)',
                  description: 'Pre-composed illustration, 172 px wide on the site.',
                }),
                image('imageMobile', {
                  required: true,
                  label: 'Illustration (mobile)',
                  description: 'Pre-composed illustration, 372 px wide on the site.',
                }),
              ],
            },
          ],
        },
        {
          name: 'ctaCard',
          label: 'Project and publication pages',
          description:
            'Card that promotes this service in the sidebar of project and publication pages. It links to the service page.',
          fields: [
            textarea('title', { required: true, description: 'Card title.' }),
            paragraphs('paragraphs', { label: 'Paragraphs', minRows: 1 }),
            text('linkLabel', { required: true, label: 'Link label' }),
            {
              type: 'row',
              fields: [
                icon('icon', { required: true }),
                select('iconTone', ctaCardIconTones, {
                  required: true,
                  label: 'Icon tile colour',
                  description: 'Background of the square behind the icon.',
                }),
                select('frame', ctaCardFrames, {
                  required: true,
                  label: 'Frame colour',
                  description: 'Colour of the frame around the illustration.',
                }),
              ],
            },
            {
              type: 'row',
              fields: [
                image('image', {
                  required: true,
                  label: 'Illustration',
                  description: 'Pre-composed illustration of the card.',
                }),
                image('imageMobile', {
                  required: false,
                  label: 'Illustration (mobile)',
                  description:
                    'Optional separate crop for narrow screens. Empty: the illustration above is used at every width.',
                }),
              ],
            },
          ],
        },
        {
          name: 'home',
          label: 'Home accordion',
          description:
            'Entry of this service in the accordion of the home page. Its button links to the service page.',
          fields: [
            text('title', { required: true, description: 'Title of the accordion row.' }),
            paragraphs('paragraphs', { label: 'Paragraphs', minRows: 1 }),
            image('image', {
              required: true,
              label: 'Photo',
              description: 'Photo shown while the row is open.',
            }),
          ],
        },
        {
          name: 'navigation',
          label: 'Navigation and footer',
          description:
            'Entry of this service in the Services menu of the header. The footer uses the same label.',
          fields: [
            text('label', {
              required: true,
              description: 'Menu label; also the link label in the footer.',
            }),
            textarea('description', {
              required: true,
              description: 'Short text under the label in the header menu.',
            }),
            select('icon', navigationIcons, {
              required: true,
              label: 'Icon',
              description: 'Illustration next to the label in the header menu.',
            }),
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
