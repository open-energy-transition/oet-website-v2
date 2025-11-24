import React from 'react'
import { BlogQuoteBlockComponent } from './Component'

export const BlogQuoteBlock: React.FC<{
  description: string
  id?: string
}> = (props) => {
  const { description } = props

  return <BlogQuoteBlockComponent description={description} />
}
