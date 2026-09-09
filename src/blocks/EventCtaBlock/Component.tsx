import React from 'react'

import { EventFooterCta } from '@/components/EventFooterCta'

/**
 * Page block that renders the shared "Event CTA" band. All content is managed
 * in the `event-cta` global, so this block takes no fields.
 */
export const EventCtaBlock: React.FC = () => {
  return <EventFooterCta />
}
