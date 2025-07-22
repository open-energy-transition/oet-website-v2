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
  <div className="flex items-center gap-6 my-8">
    {image && (
      <Image
        src={image.url}
        alt={image.alt || 'Quote avatar'}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover border shadow"
      />
    )}
    <div className="prose max-w-none">
      {quote && <RichText className="mb-0" data={quote} enableGutter={false} />}
    </div>
  </div>
)
