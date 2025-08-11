import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'

import type { Category } from '@/payload-types'

import { CategoryDetail } from './CategoryDetail'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = categories.docs
    ?.filter((doc) => {
      return doc.slug !== null
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params || []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Category({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/categories/' + slug
  const { category, posts } = await queryCategoryBySlug({ slug })

  if (!category) {
    return notFound()
  }

  return (
    <article className="pt-16 pb-16">
      <PayloadRedirects disableNotFound url={url} />
      <CategoryDetail category={category} posts={posts} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const { category } = await queryCategoryBySlug({ slug })

  return generateMeta({ doc: category })
}

const queryCategoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const category = result.docs?.[0]

  if (!category) {
    // handle not found
    return {
      posts: [],
      category: null,
    }
  }

  const postsResult = await payload.find({
    collection: 'posts',
    where: {
      categories: {
        contains: category.id,
      },
    },
    depth: 2,
    limit: 1000,
  })

  return {
    posts: postsResult.docs,
    category,
  }
})
