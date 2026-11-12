import type { CheckboxField, GlobalConfig } from 'payload'

import { draftGlobalRead } from '../../access'
import { draftVersions, globalPreviewOptions } from '../../preview'
import {
  image,
  link,
  links,
  paragraphs,
  plainText,
  select,
  seo,
  text,
  textarea,
} from '../../fields'
import { checkbox, heading, number } from './fields'

export const statIcons = [
  'blueprint',
  'handshake',
  'employees',
  'world',
  'folder-edit',
  'license',
] as const

export const actionVariants = ['primary', 'outline'] as const

const sectionVisible = (what: string): CheckboxField => ({
  name: 'visible',
  type: 'checkbox',
  required: true,
  defaultValue: true,
  label: 'Show this section',
  admin: {
    description: `Untick to hide ${what} from the home page. Its content stays here and in the collection.`,
  },
})

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home page',
  access: draftGlobalRead,
  versions: draftVersions,
  admin: {
    ...globalPreviewOptions('/'),
    group: 'Site',
    description:
      'Fixed content of the home page. The service accordion comes from Services, the partner logos from Partners, the project cards from Projects.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            link('primaryAction', {
              required: true,
              label: 'Primary button',
              description: 'Filled button at the bottom of the hero, the same on every slide.',
            }),
            link('secondaryAction', {
              required: true,
              label: 'Secondary button',
              description: 'Outlined button next to the primary one.',
            }),
            {
              name: 'slides',
              type: 'array',
              label: 'Slides',
              required: true,
              minRows: 1,
              admin: {
                description: 'Slides of the hero, in the order they play.',
                initCollapsed: true,
              },
              fields: [
                text('label', {
                  required: true,
                  description:
                    'Short name of the slide, shown next to its thumbnail on the "next" control.',
                }),
                textarea('title', {
                  required: true,
                  description: 'Large title. A line break here is a line break on the site.',
                }),
                textarea('statement', {
                  required: true,
                  label: 'First text box',
                  description:
                    'Short statement in the upper box under the title. A line break here is a line break on the site.',
                }),
                textarea('description', {
                  required: true,
                  label: 'Second text box',
                  description: 'Longer text in the lower box.',
                }),
                {
                  type: 'row',
                  fields: [
                    image('image', {
                      required: true,
                      label: 'Photo (desktop)',
                      description:
                        'Pre-graded photo without the rectangle pattern, 2800 x 1560. Its alternative text describes the slide.',
                    }),
                    image('imageMobile', {
                      required: true,
                      label: 'Photo (mobile)',
                      description: 'Pre-graded portrait crop for narrow screens.',
                    }),
                    image('thumbnail', {
                      required: true,
                      label: 'Thumbnail',
                      description: 'Small crop shown on the "next" control of the previous slide.',
                    }),
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Rectangle pattern',
                  fields: [
                    {
                      name: 'pattern',
                      type: 'group',
                      label: 'Rectangle pattern',
                      admin: {
                        description:
                          'Cut-out of the three graded rectangles, drawn over the desktop photo and animated on its own.',
                      },
                      fields: [
                        image('image', {
                          required: true,
                          label: 'Pattern image',
                          description: 'Transparent PNG exported at 2x.',
                        }),
                        {
                          type: 'row',
                          fields: [
                            number('left', {
                              label: 'Left (px)',
                              description:
                                'Distance from the left edge of the 1400 x 780 hero frame.',
                            }),
                            number('top', {
                              label: 'Top (px)',
                              description:
                                'Distance from the top edge of the 1400 x 780 hero frame.',
                            }),
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'intro',
          label: 'Intro',
          description: 'Section under the hero with the vision statement and a photo.',
          fields: [
            ...heading('the intro section'),
            paragraphs('paragraphs', {
              label: 'Paragraphs',
              minRows: 1,
              description: 'One row per paragraph; on desktop they sit side by side.',
            }),
            links('actions', {
              label: 'Buttons',
              minRows: 0,
              maxRows: 2,
              extra: [
                {
                  type: 'row',
                  fields: [
                    select('variant', actionVariants, {
                      required: true,
                      label: 'Style',
                      description: 'primary is the filled button, outline the outlined one.',
                    }),
                    checkbox('arrow', {
                      label: 'Arrow icon',
                      description: 'Shows an arrow after the label.',
                    }),
                  ],
                },
              ],
            }),
            image('image', {
              required: true,
              label: 'Photo',
              description: 'Pre-graded photo next to the text.',
            }),
          ],
        },
        {
          label: 'Figures',
          description: 'Strip of figures under the intro.',
          fields: [
            {
              name: 'stats',
              type: 'array',
              label: 'Figures',
              required: true,
              minRows: 1,
              maxRows: 6,
              fields: [
                {
                  type: 'row',
                  fields: [
                    plainText('value', {
                      required: true,
                      description:
                        'Shown as written ("50+", "€0"); not counted from the documents.',
                    }),
                    text('label', { required: true, description: 'Text under the figure.' }),
                    select('icon', statIcons, {
                      required: true,
                      description: 'Icon and its colour are fixed per key.',
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'services',
          label: 'Services',
          description:
            'Heading of the service accordion. The entries are the published Services ("Home accordion" tab of each service), sorted by their order.',
          fields: heading('the services section'),
        },
        {
          name: 'tools',
          label: 'Tools',
          description: 'Section about the supported modelling platforms.',
          fields: [
            ...heading('the tools section'),
            paragraphs('paragraphs', {
              label: 'Paragraphs',
              minRows: 2,
              maxRows: 2,
              description: 'Two paragraphs; the button sits under the second one.',
            }),
            link('action', {
              required: true,
              label: 'Button',
              description: 'Button under the second paragraph.',
            }),
            {
              name: 'logos',
              type: 'array',
              label: 'Platform logos',
              required: true,
              minRows: 1,
              admin: {
                description:
                  'Row of logos of the modelling platforms OET supports. These are not the entries of the Tools collection.',
                initCollapsed: true,
              },
              fields: [
                plainText('name', {
                  required: true,
                  description: 'Name of the platform, for reference in this list.',
                }),
                image('logo', {
                  required: true,
                  label: 'Logo',
                  description: 'Its alternative text is the name of the platform.',
                }),
                {
                  type: 'row',
                  fields: [
                    number('width', {
                      label: 'Display width (px)',
                      description: 'Width of the logo in its cell on desktop.',
                    }),
                    number('height', {
                      label: 'Display height (px)',
                      description: 'Height of the logo in its cell on desktop.',
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'steps',
          label: 'Steps',
          description: 'Scrolling section "Build, Deploy, Scale".',
          fields: [
            ...heading('the steps section'),
            {
              name: 'items',
              type: 'array',
              label: 'Steps',
              required: true,
              minRows: 1,
              admin: { initCollapsed: true },
              fields: [
                text('title', { required: true, description: 'Name of the step.' }),
                paragraphs('paragraphs', { label: 'Paragraphs', minRows: 1 }),
                textarea('note', {
                  required: true,
                  description: 'Smaller text under the paragraphs.',
                }),
                image('image', {
                  required: true,
                  label: 'Photo',
                  description: 'Pre-graded photo shown beside the step.',
                }),
              ],
            },
          ],
        },
        {
          name: 'partners',
          label: 'Partners',
          description:
            'Partner logo section. The logos are the Partners and funders marked "show on home", grouped by their group and sorted by their home order.',
          fields: [
            sectionVisible('the partner logo section'),
            text('trustedPartnersLabel', {
              required: true,
              label: 'Label: trusted partners',
              description:
                'Label of the group "trusted-partner". On mobile it labels the single grid with all logos.',
            }),
            text('networksLabel', {
              required: true,
              label: 'Label: networks and affiliations',
              description: 'Label of the group "network-affiliation" (desktop only).',
            }),
          ],
        },
        {
          name: 'projects',
          label: 'Projects',
          description:
            'Heading of the project carousel. The cards are the Projects marked for the home carousel.',
          fields: [
            sectionVisible('the project carousel'),
            text('tag', { required: true, description: 'Small label above the title.' }),
            textarea('title', { required: true, description: 'Title beside the carousel.' }),
            text('carouselLabel', {
              required: true,
              label: 'Carousel name',
              description: 'Name of the carousel announced by screen readers.',
            }),
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
