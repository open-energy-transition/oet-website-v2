import React from 'react'
import { PartnersCarousel } from './PartnersCarousel'

interface PartnersBlockProps {
  title: string
  subTitle?: string
  partnerImages: {
    image: string
    alt: string
  }[]
}

export const PartnersBlock: React.FC<PartnersBlockProps> = ({ title, subTitle, partnerImages }) => {
  // Skip rendering if no partner images
  if (!partnerImages || partnerImages.length === 0) return null

  return (
    <section className="-my-6">
      <div className="container px-4">
        <div className="text-center">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-oxanium-3xl font-semibold mb-6 md:mb-6">{title}</h2>
            {subTitle && <p className="customTextState-size-h8">{subTitle}</p>}
          </div>

          <div>
            <PartnersCarousel images={partnerImages} />
          </div>
        </div>
      </div>
    </section>
  )
}
