import type { GlobalConfig } from 'payload'

import { globalRead } from '../../access'
import { href, image, plainText, select, seo, text, textarea } from '../../fields'

export const socialKinds = [
  'linkedin',
  'github',
  'x',
  'youtube',
  'bluesky',
  'mastodon',
  'eventbrite',
  'newsletter',
] as const

const tagManagerPattern = /^(GTM|G)-[A-Z0-9]+$/

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: globalRead,
  admin: {
    group: 'Site',
    description: 'Values shared by every page: name, default search texts, contact and tracking.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            plainText('siteName', {
              required: true,
              label: 'Site name',
              description:
                'Name of the organisation as it is added to browser titles and shared links.',
            }),
            {
              name: 'contactEmail',
              type: 'email',
              required: true,
              label: 'Contact email',
              admin: {
                description:
                  'General contact address. Shown as the email link in the footer call to action.',
              },
            },
          ],
        },
        {
          label: 'Search and sharing',
          description: 'Used by a page that has no title or description of its own.',
          fields: [
            seo(),
            image('shareImage', {
              required: true,
              label: 'Share image',
              description:
                'Picture shown when a page without its own picture is shared on social media or in chat apps. It is cropped to 1200 × 630.',
            }),
          ],
        },
        {
          label: 'Social profiles',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social profiles',
              minRows: 0,
              admin: {
                description:
                  'Profiles of the organisation, shown as icons in the footer in this order and listed in the structured data.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    select('kind', socialKinds, { required: true, label: 'Network' }),
                    text('label', {
                      required: true,
                      label: 'Name',
                      description:
                        'Read out by screen readers and shown on hover, for example "OET on LinkedIn".',
                    }),
                    href('url', {
                      required: true,
                      label: 'Profile URL',
                      description: 'Full URL of the profile (https://…).',
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'googleTagManagerId',
              type: 'text',
              label: 'Google tag id',
              admin: {
                description:
                  'Google Analytics measurement id (G-ABC1234) or Tag Manager container id (GTM-ABC1234). Leave empty to load no tracking. It only loads for visitors who accept analytics in the cookie banner.',
              },
              validate: (value: unknown) => {
                if (value === null || value === undefined || value === '') return true
                return typeof value === 'string' && tagManagerPattern.test(value)
                  ? true
                  : 'Use the form G-XXXXXXX or GTM-XXXXXXX'
              },
            },
          ],
        },
        {
          label: 'Cookie consent',
          description:
            'Texts of the cookie banner and of the privacy settings dialog that "Cookies Settings" in the footer opens. The banner only appears when a Google Tag Manager id is set, because there is nothing else to consent to.',
          fields: [
            {
              name: 'consent',
              type: 'group',
              label: 'Cookie consent',
              fields: [
                textarea('notice', {
                  required: true,
                  label: 'Banner text',
                  description:
                    'Shown at the bottom of the first page a visitor opens. A link to the privacy statement is added after it.',
                }),
                text('modalTitle', { required: true, label: 'Settings title' }),
                textarea('modalDescription', {
                  required: true,
                  label: 'Settings introduction',
                }),
                text('necessaryTitle', { required: true, label: 'Necessary service name' }),
                textarea('necessaryDescription', {
                  required: true,
                  label: 'Necessary service description',
                  description:
                    'What the always-on part does, for example storing the consent choice.',
                }),
                text('analyticsTitle', { required: true, label: 'Analytics service name' }),
                textarea('analyticsDescription', {
                  required: true,
                  label: 'Analytics service description',
                  description: 'What Google Tag Manager collects and who processes it.',
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
