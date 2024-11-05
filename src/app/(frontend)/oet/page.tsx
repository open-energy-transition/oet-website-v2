import React from 'react'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import PageClient from './page.client'
import { getMarkdownFromLexical } from '@/utilities/generateMarkDown'

import { getLexicalFromMarkDown } from '@/utilities/convertToLexical'

export default async function Page() {
  const payload = await getPayloadHMR({ config: configPromise })

  const handbookPage = await payload.find({
    collection: 'handbook-pages',
    depth: 5,
    limit: 12,
    overrideAccess: false,
  })

  console.log('handbookPage', handbookPage)
  //   console.log('pages', pages.docs[0].content)
  getMarkdownFromLexical({ nodes: handbookPage.docs[0].content })

  getLexicalFromMarkDown({ markdownString: 'The new text editor to rule the handbook' })

  return (
    <div>
      <PageClient />
      <p>aegvfegv</p>
    </div>
  )
}
