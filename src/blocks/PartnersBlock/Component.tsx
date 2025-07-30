import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const PartnersBlock: React.FC<PartnersBlockProps> = ({
  title,
  description,
  partnerImages,
}) => {
  return (
    <div className="container py-8">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {description && (
          <RichText className="text-lg text-muted-foreground mb-4" data={description} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
        {partnerImages &&
          partnerImages.length > 0 &&
          partnerImages.map((img, i) => (
            <div
              key={i}
              className="w-full h-32 overflow-hidden rounded-lg shadow flex items-center justify-center"
            >
              <Media resource={img.image} className="object-cover w-full h-full" alt={img.alt} />
            </div>
          ))}
      </div>
    </div>
  )
}
