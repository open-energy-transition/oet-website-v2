import React from 'react'
import type { OurServiceBlock as OurServiceBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const OurServiceBlock: React.FC<OurServiceBlockProps> = ({
  title,
  description,
  unitsButton,
  services,
  bottomImages,
}) => {
  return (
    <div className="container py-8">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {description && (
          <RichText className="text-lg text-muted-foreground mb-4" data={description} />
        )}
        {unitsButton && (
          <a
            href={unitsButton.url}
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold"
          >
            {unitsButton.label}
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {services &&
          services.length > 0 &&
          services.map((service, i) => (
            <div key={i} className="p-6 bg-card rounded-lg shadow flex flex-col items-start gap-3">
              <span className="text-primary font-bold text-xl">{service.number}</span>
              <div className="flex items-center gap-2">
                <i className={service.icon + ' text-2xl text-primary'}></i>
                <h3 className="font-semibold text-lg">{service.title}</h3>
              </div>
              {service.description && (
                <RichText className="text-muted-foreground" data={service.description} />
              )}
            </div>
          ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
        {bottomImages &&
          bottomImages.length > 0 &&
          bottomImages.map((img, i) => (
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
