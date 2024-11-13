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

  // console.log('handbookPage', handbookPage)
  //   console.log('pages', pages.docs[0].content)
  getMarkdownFromLexical({ nodes: handbookPage.docs[0].content })

  // getLexicalFromMarkDown({
  //   markdownString:
  //     'ab\n\nc\n\n\n\n - item\n- item2\n1. item1\n2. item2\n3. item3\n\nTest\n\nTest\n- another list\n- with items\n-  {{additional_information}} ',
  // })

  return (
    <div>
      <PageClient />
      <p>aegvfegv</p>
    </div>
  )
}
