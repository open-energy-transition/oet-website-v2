import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { EventTabsBlock as EventTabsBlockProps } from '@/payload-types'
import { EventTabsClient } from './ClientComponent'

export const EventTabsBlock: React.FC<EventTabsBlockProps & { id?: string }> = async (props) => {
  const { id, title, introContent, tabLabels, defaultTab, categories, pageSize } = props

  const limit = pageSize && pageSize > 0 ? pageSize : 12
  const nowISO = new Date().toISOString()

  const payload = await getPayload({ config: configPromise })

  const restrictCategoryIds = categories
    ?.map((category) => (typeof category === 'object' ? category.id : category))
    .filter((value): value is number => typeof value === 'number')

  const [highlightsQuery, upcomingQuery, categoriesQuery] = await Promise.all([
    payload.find({
      collection: 'events',
      depth: 1,
      limit,
      sort: '-startDate',
      where: {
        startDate: { less_than: nowISO },
        featuredAsHighlight: { equals: true },
      },
    }),
    payload.find({
      collection: 'events',
      depth: 1,
      limit,
      sort: 'startDate',
      where: {
        startDate: { greater_than_equal: nowISO },
      },
    }),
    payload.find({
      collection: 'event-categories',
      depth: 0,
      limit: 100,
      sort: '_order',
      ...(restrictCategoryIds && restrictCategoryIds.length > 0
        ? { where: { id: { in: restrictCategoryIds } } }
        : {}),
    }),
  ])

  return (
    <div className={id ? `block-${id}` : ''}>
      <EventTabsClient
        title={title}
        introContent={introContent}
        tabLabels={tabLabels}
        defaultTab={defaultTab}
        categoryOptions={categoriesQuery.docs.map((category) => ({
          id: category.id,
          label: category.title,
        }))}
        events={{
          highlights: highlightsQuery.docs,
          upcoming: upcomingQuery.docs,
        }}
      />
    </div>
  )
}
