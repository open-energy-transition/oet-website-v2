import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { OurBlogClient } from './Component'

interface OurBlogBlockProps {
  title?: string | null
  description?: string | null
  blockType: 'ourBlog'
  id?: string
}

export const OurBlogBlock: React.FC<OurBlogBlockProps> = async (props) => {
  const payload = await getPayload({ config: configPromise })

  // Fetch all published posts
  const postsResult = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 1000,
    sort: '-publishedAt',
  })

  // Fetch all categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 1000,
    sort: 'title',
  })

  return <OurBlogClient {...props} posts={postsResult.docs} categories={categoriesResult.docs} />
}
