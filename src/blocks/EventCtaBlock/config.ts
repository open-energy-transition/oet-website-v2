import type { Block } from 'payload'

export const EventCtaBlock: Block = {
  slug: 'eventCta',
  interfaceName: 'EventCtaBlock',
  labels: {
    singular: 'Event CTA',
    plural: 'Event CTA',
  },
  admin: {
    // No fields — the content is managed in the "Event CTA" global.
  },
  fields: [],
}
