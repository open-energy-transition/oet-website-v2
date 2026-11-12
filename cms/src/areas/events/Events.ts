import type { Block, CollectionConfig, PayloadRequest } from 'payload'

import { publishedRead } from '../../access'
import { always, draftVersions, previewOptions } from '../../preview'
import { href, image, plainText, richText, select, slug, text, textarea } from '../../fields'
import { checkbox, dateTime, filled } from './fields'

export const posterFits = ['cover', 'contain'] as const

interface VideoData {
  embedUrl?: string | null
  watchUrl?: string | null
  title?: string | null
}

interface HighlightData {
  video?: VideoData | null
}

const secureUrl = /^https:\/\/\S+$/

const videoStarted = (video: VideoData) =>
  filled(video.embedUrl) || filled(video.watchUrl) || filled(video.title)

const videoUrl = (value: unknown, { siblingData }: { siblingData: VideoData }) => {
  if (!filled(value))
    return videoStarted(siblingData)
      ? 'Required when the highlight has a video. Clear all three video fields for a highlight without one.'
      : true
  return secureUrl.test(value) ? true : 'Use a full https:// address'
}

const videoTitle = (value: unknown, { siblingData }: { siblingData: VideoData }) =>
  filled(value) || !videoStarted(siblingData)
    ? true
    : 'Required when the highlight has a video. Clear all three video fields for a highlight without one.'

const highlightImage = (value: unknown, { siblingData }: { siblingData: HighlightData }) => {
  if (value !== null && value !== undefined) return true
  return siblingData.video && videoStarted(siblingData.video)
    ? 'A video needs the image it plays over'
    : true
}

const timeZone = (value: unknown) => {
  if (!filled(value)) return 'A time zone is required'
  try {
    new Intl.DateTimeFormat('en', { timeZone: value })
    return true
  } catch {
    return 'Use an IANA time zone name such as Europe/Berlin'
  }
}

const timeOf = (value: unknown) => {
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'string') return new Date(value).getTime()
  return Number.NaN
}

const endAfterStart = (value: unknown, { siblingData }: { siblingData: { start?: unknown } }) => {
  const end = timeOf(value)
  if (Number.isNaN(end)) return 'An end is required'
  const start = timeOf(siblingData.start)
  if (Number.isNaN(start)) return true
  return end > start ? true : 'The end must be after the start'
}

const memberWithPhoto = async (value: unknown, { req }: { req: PayloadRequest }) => {
  if (typeof value !== 'number' && typeof value !== 'string') return 'Choose a team member'
  const member = await req.payload.findByID({
    collection: 'team-members',
    id: value,
    depth: 0,
    req,
  })
  return member.photo === null || member.photo === undefined
    ? `${member.name} has no head photo. Add one to the team member before listing them as a contributor.`
    : true
}

const memberBlock: Block = {
  slug: 'member',
  labels: { singular: 'OET team member', plural: 'OET team members' },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'team-members',
      required: true,
      label: 'Team member',
      validate: memberWithPhoto,
      admin: {
        description:
          'Name, job title and head photo are taken from the team member. The team member needs a head photo.',
      },
    },
  ],
}

const externalBlock: Block = {
  slug: 'external',
  labels: { singular: 'External person', plural: 'External people' },
  fields: [
    plainText('name', {
      required: true,
      description: 'Full name with title. Two lines at most on the site.',
    }),
    text('title', {
      required: true,
      description: 'Job title and organisation. One line on the site, longer text is cut off.',
    }),
    image('photo', {
      required: true,
      label: 'Photo',
      description: 'Square head photo, shown at 44 px.',
    }),
  ],
}

export const Events: CollectionConfig = {
  slug: 'events',
  access: publishedRead,
  versions: draftVersions,
  defaultSort: '-start',
  admin: {
    group: 'Events',
    ...previewOptions((slug) => `/organization/news-and-events/${slug}`, always),
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'start', 'featuredAsHighlight', '_status'],
    description:
      'Each event has a card on /organization/news-and-events and its own page at /organization/news-and-events/<slug>. An event is "upcoming" until its end has passed. After that it stays on the site as "highlighted" only when the highlight box is checked; otherwise it disappears from the list and loses its page.',
  },
  fields: [
    text('title', {
      required: true,
      description: 'Title on the card, the event page, the details card and the browser tab.',
    }),
    slug('title'),
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'event-types',
      required: true,
      label: 'Type',
      admin: {
        position: 'sidebar',
        description: 'Filter tab under which the card is listed.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Text',
          fields: [
            textarea('excerpt', {
              required: true,
              description:
                'Short text on the card in the event list. Also the search result description of the event page.',
            }),
            textarea('brief', {
              required: true,
              description: 'Summary under the title at the top of the event page.',
            }),
            ...richText('description', {
              required: true,
              label: 'Description',
              description: 'Text of the "About" section on the event page.',
            }),
          ],
        },
        {
          label: 'Date and time',
          description:
            'The pickers show times in the time zone of your computer. The site converts them to the time zone of the event.',
          fields: [
            {
              type: 'row',
              fields: [
                dateTime('start', {
                  required: true,
                  label: 'Start',
                  description: 'Date on the card; date and start time on the details card.',
                }),
                {
                  ...dateTime('end', {
                    required: true,
                    label: 'End',
                    description:
                      'End time and duration on the details card. The event counts as upcoming until this moment.',
                  }),
                  validate: endAfterStart,
                },
              ],
            },
            {
              ...plainText('timeZone', {
                required: true,
                label: 'Time zone',
                description:
                  'IANA name of the time zone in which the site shows every date and time of this event, for example Europe/Berlin.',
              }),
              validate: timeZone,
            },
            {
              type: 'row',
              fields: [
                dateTime('publishedAt', {
                  required: true,
                  label: 'Published',
                  description: '"Published" line at the top of the event page.',
                }),
                dateTime('registrationClosesAt', {
                  required: false,
                  label: 'Registration closes',
                  description:
                    'Optional. Adds "Registration closes …" to the card while the event is upcoming. Empty: the card has no such line.',
                }),
              ],
            },
            checkbox('featuredAsHighlight', {
              label: 'Keep as a highlight after the event',
              description:
                'Checked: once the event has ended it is listed under "Highlighted Events" and its page shows the highlight media and the documentation gallery. Unchecked: the event is removed from the site when it has ended.',
            }),
          ],
        },
        {
          label: 'Location and links',
          fields: [
            text('locationRegion', {
              required: true,
              label: 'Location (short)',
              description: 'Place at the top of the event page, for example "Online" or a city.',
            }),
            textarea('locationAddress', {
              required: true,
              label: 'Location (full)',
              description: 'Full address or joining details on the details card.',
            }),
            href('mapHref', {
              required: true,
              label: 'Map link',
              description:
                'Target of "Open Map" on the details card. Full URL, site path or mailto:.',
            }),
            {
              type: 'row',
              fields: [
                href('calendarHref', {
                  required: true,
                  label: 'Calendar link',
                  description:
                    'Target of "Mark Calendar" on the details card while the event is upcoming.',
                }),
                href('joinHref', {
                  required: true,
                  label: 'Join link',
                  description:
                    'Target of "Join Event" on the details card while the event is upcoming.',
                }),
              ],
            },
          ],
        },
        {
          label: 'Contributors',
          fields: [
            {
              name: 'contributors',
              type: 'blocks',
              label: 'Contributors',
              labels: { singular: 'Contributor', plural: 'Contributors' },
              blocks: [memberBlock, externalBlock],
              admin: {
                description:
                  'People listed on the details card, in this order. Choose "OET team member" for someone in the team list, "External person" for anyone else.',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              type: 'row',
              fields: [
                image('poster', {
                  required: true,
                  label: 'Poster',
                  description:
                    'Poster on the card and at the top of the event page; after the event it moves into the details card.',
                }),
                select('posterFit', posterFits, {
                  required: true,
                  label: 'Poster fit on the card',
                  description:
                    'cover fills the card frame and crops the poster; contain shows the whole poster inside the frame (for tall posters).',
                }),
              ],
            },
            {
              name: 'highlight',
              type: 'group',
              label: 'Highlight media',
              admin: {
                description:
                  'Optional. Replaces the poster at the top of the event page once the event is a highlight. No image: the poster stays.',
              },
              fields: [
                {
                  ...image('image', {
                    required: false,
                    label: 'Image',
                    description:
                      'Photo of the event. With a video it is the still behind the play button.',
                  }),
                  validate: highlightImage,
                },
                {
                  name: 'video',
                  type: 'group',
                  label: 'Video',
                  admin: {
                    description:
                      'Optional recording that plays over the image. Fill all three fields or none.',
                  },
                  fields: [
                    {
                      ...plainText('embedUrl', {
                        required: false,
                        label: 'Embed URL',
                        description:
                          'Address the player loads, for example https://www.youtube-nocookie.com/embed/<id>?autoplay=1.',
                      }),
                      validate: videoUrl,
                    },
                    {
                      ...plainText('watchUrl', {
                        required: false,
                        label: 'Watch URL',
                        description:
                          'Address of the video page, used as the link when the player cannot run.',
                      }),
                      validate: videoUrl,
                    },
                    {
                      ...text('title', {
                        required: false,
                        label: 'Title',
                        description: 'Name of the video, read by screen readers.',
                      }),
                      validate: videoTitle,
                    },
                  ],
                },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Documentation gallery',
              labels: { singular: 'Image', plural: 'Images' },
              admin: {
                description:
                  'Photos of the "Documentation" section on the page of a highlighted event, in this order. No rows: the page has no such section.',
              },
              fields: [image('image', { required: true, label: 'Image' })],
            },
          ],
        },
      ],
    },
  ],
}
