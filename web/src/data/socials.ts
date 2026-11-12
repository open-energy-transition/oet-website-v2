import type { UiKey } from '../i18n/ui'
import type { Doc } from '../lib/cms'

export type PersonSocialKind = NonNullable<Doc<'team-members'>['socialLinks']>[number]['kind']

export const personSocialLabels: Record<PersonSocialKind, UiKey> = {
  email: 'social.email',
  github: 'social.github',
  linkedin: 'social.linkedin',
  message: 'social.message',
  x: 'social.x',
  youtube: 'social.youtube',
  bluesky: 'social.bluesky',
  mastodon: 'social.mastodon',
  eventbrite: 'social.eventbrite',
  newsletter: 'social.newsletter',
}
