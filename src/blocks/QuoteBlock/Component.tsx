import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface QuoteBlockProps {
  image?: {
    url: string
    alt?: string
  }
  quote?: DefaultTypedEditorState
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ image, quote }) => {
  return (
    <div className="flex items-start gap-3 my-8 container">
      <div className="-ml-8 w-[106px] h-[106px] relative rounded-full overflow-hidden border shadow">
        {image && (
          <Image
            src={image.url}
            alt={image.alt || 'Quote avatar'}
            width={106}
            height={106}
            className="object-cover"
          />
        )}
      </div>
      <div className="prose w-3/4">
        {quote && <RichText className="mb-0" data={quote} enableGutter={false} />}
      </div>
    </div>
  )
}
