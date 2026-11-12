import type { GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import { image, link, links, paragraphs, seo, text, textarea } from '../../fields'
import { actions, heading, responsiveImage, tab } from './fields'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/organization/about'),
    group: 'Organization',
    description: 'Content of /organization/about.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        tab('Hero', [
          {
            name: 'hero',
            type: 'group',
            fields: [
              textarea('title', { required: true, description: 'Centred title over the photo.' }),
              links('links', { label: 'Links under the title', minRows: 0 }),
              responsiveImage('image', {
                label: 'Hero photo',
                description: 'Full-width photo behind the title, with the grading baked in.',
              }),
            ],
          },
        ]),
        tab('Introduction', [
          {
            name: 'intro',
            type: 'group',
            label: 'Introduction',
            fields: [
              textarea('statement', {
                required: true,
                description: 'Large vision statement at the left of the section.',
              }),
              paragraphs('paragraphs', {
                minRows: 1,
                description: 'Columns of text under the statement. One row per column.',
              }),
              actions('actions', { description: 'Buttons under the text, stacked.' }),
            ],
          },
          {
            name: 'infoCards',
            type: 'array',
            label: 'Info cards',
            minRows: 1,
            maxRows: 2,
            admin: {
              description: 'Cards with a photo next to the introduction ("Aim", "Offers").',
            },
            fields: [
              image('image', { required: true }),
              text('title', { required: true }),
              paragraphs('paragraphs', { minRows: 1 }),
              link('action', {
                required: false,
                label: 'Button',
                description: 'Optional button at the bottom of the card.',
              }),
            ],
          },
        ]),
        tab('Departments', [
          heading('departments', {
            label: 'Departments heading',
            description: 'Heading above the department cards.',
          }),
          {
            name: 'featuredDepartments',
            type: 'relationship',
            relationTo: 'departments',
            hasMany: true,
            required: true,
            minRows: 1,
            admin: {
              description:
                'Departments shown as cards on this page, in this order. Pick departments that have a detail page.',
            },
          },
        ]),
        tab('Values', [
          {
            name: 'values',
            type: 'group',
            label: 'Core values',
            fields: [
              text('tag', { required: true, description: 'Small label above the title.' }),
              textarea('title', {
                required: true,
                description: 'A line break starts a new line.',
              }),
              textarea('subline', { required: true, description: 'Text under the title.' }),
              {
                name: 'items',
                type: 'array',
                label: 'Values',
                minRows: 1,
                fields: [
                  {
                    type: 'row',
                    fields: [
                      image('thumbnail', {
                        required: true,
                        label: 'Thumbnail (desktop)',
                      }),
                      image('thumbnailMobile', {
                        required: true,
                        label: 'Thumbnail (mobile)',
                        description: 'Narrower crop for the two-column mobile grid.',
                      }),
                    ],
                  },
                  text('label', { required: true, description: 'Name of the value.' }),
                  textarea('title', { required: true, description: 'Bold sentence on the card.' }),
                  textarea('body', { required: true, description: 'Text under the sentence.' }),
                ],
              },
            ],
          },
        ]),
        tab('Search', [seo()]),
      ],
    },
  ],
}
