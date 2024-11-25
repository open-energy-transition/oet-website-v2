import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import Hero from '@/WebsiteComponents/Hero'
import RedHeadingText from '@/WebsiteComponents/RedHeadingText'
import { TextCard } from '@/WebsiteComponents/TextCard'
import Textslider from '@/WebsiteComponents/Textslider'
import { OutputCard } from '@/WebsiteComponents/OutputCard'
import ProjectsCard from '@/WebsiteComponents/ProjectsCard'
import BlackHeadingText from '@/WebsiteComponents/BlackHeadingText'
import { TeamMemberComponent } from '@/WebsiteComponents/TeamMemberComponent'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
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

export default async function Page({ params: paramsPromise }: Args) {
  // const { slug = 'home' } = await paramsPromise
  // const url = '/' + slug

  // let page: PageType | null

  // page = await queryPageBySlug({
  //   slug,
  // })

  // // Remove this code once your website is seeded
  // if (!page && slug === 'home') {
  //   page = homeStatic
  // }

  // if (!page) {
  //   return <PayloadRedirects url={url} />
  // }

  // const { hero, layout } = page

  return (
    <>
      {/* <Hero />
      <TextCard />
      <OutputCard />
      <ProjectsCard />
      <TeamMemberComponent /> */}
      <div className="w-full h-24 text-center flex justify-center align-middle items-center">
        <BlackHeadingText text="MISSION" />
      </div>
      <div className="w-[100vw] overflow-hidden flex justify-center align-middle items-center">
        <Textslider CardComponent={TextCard} endpoint="TextCardPayload" />
      </div>
      <div className="w-full h-24 text-center flex justify-center align-middle items-center">
        <BlackHeadingText text="OUTPUTS" />
      </div>
      <div className="w-[100vw] flex overflow-hidden justify-center align-middle items-center">
        <Textslider CardComponent={OutputCard} endpoint="OutputCardPayload" />
      </div>
      <div className="w-full h-24 text-center flex justify-center align-middle items-center">
        <BlackHeadingText text="PROJECTS" />
      </div>
      <div className="w-[100vw] flex justify-center align-middle items-center">
        <Textslider CardComponent={ProjectsCard} endpoint="projectCard" />
      </div>
      <div className="w-full h-24 text-center flex justify-center align-middle items-center">
        <BlackHeadingText text="Text Component" />
      </div>
      <div className="w-[100vw] flex justify-center align-middle items-center">
        <Textslider CardComponent={TeamMemberComponent} endpoint="users" />
      </div>
      {/* <article className="pt-16 pb-24"> */}
      {/* <PageClient /> */}
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} />
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} /> */}
      {/* <div>sedvg</div> */}
      {/* </article> */}
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
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
