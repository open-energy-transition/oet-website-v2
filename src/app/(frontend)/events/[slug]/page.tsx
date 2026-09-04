import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'

import { EventDetail } from './EventDetail'
import { EventFooterCta } from '@/components/EventFooterCta'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return (
    events.docs
      ?.filter((doc) => doc.slug !== null)
      .map(({ slug }) => ({ slug: slug as string })) || []
  )
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/events/' + slug
  const event = await queryEventBySlug({ slug })

  if (!event) {
    return notFound()
  }

  return (
    <>
      <article className="pt-10 pb-16">
        <PayloadRedirects disableNotFound url={url} />
        <EventDetail event={event} />
      </article>
      <EventFooterCta />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const event = await queryEventBySlug({ slug })

  return generateMeta({ doc: event })
}

const queryEventBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    depth: 2,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
