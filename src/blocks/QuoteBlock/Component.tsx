import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

interface QuoteBlockProps {
  image?: {
    url: string
    alt?: string
  }
  quote?: any
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ image, quote }) => (
  <div className="flex items-start gap-3 my-8 container">
    <div className="w-20 h-20 relative rounded-full overflow-hidden border shadow">
      {image && (
        <Image
          src={image.url}
          alt={image.alt || 'Quote avatar'}
          width={80}
          height={80}
          className="object-cover"
        />
      )}
    </div>
    <div className="prose w-3/4">
      {quote && <RichText className="mb-0" data={quote} enableGutter={false} />}
    </div>
  </div>
)
