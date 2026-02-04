import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// Revalidate page data every 1 minutes (60 seconds)
// This ensures team member changes show up without republishing the page
export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

async function injectTeamMembers(layout: any[]) {
  const payload = await getPayload({ config: configPromise })
  return Promise.all(
    layout.map(async (block) => {
      if (block.blockType === 'tabs' && Array.isArray(block.tabs)) {
        // Recursively inject into tabs' content
        return {
          ...block,
          tabs: await Promise.all(
            block.tabs.map(async (tab: any) => ({
              ...tab,
              content: await Promise.all(
                tab.content.map(async (contentBlock: any) => {
                  if (contentBlock.blockType === 'teamMembers') {
                    const teamMembers = await payload.find({
                      collection: 'team-members',
                      limit: 100,
                    })
                    return { ...contentBlock, teamMembers: teamMembers.docs }
                  } else if (contentBlock.blockType === 'jobs') {
                    const jobs = await payload.find({
                      collection: 'jobs',
                      limit: 100,
                    })
                    return { ...contentBlock, jobs: jobs.docs }
                  }
                  return contentBlock
                }),
              ),
            })),
          ),
        }
      }
      return block
    }),
  )
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  const enrichedLayout = await injectTeamMembers(layout)

  return (
    <article className="">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={enrichedLayout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    depth: 2,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
