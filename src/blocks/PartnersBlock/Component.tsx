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
    <section className="bg-[#F6F7F3] py-8 md:py-16">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row lg:items-start">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-oxanium-3xl font-bold mb-6 md:mb-6">{title}</h2>
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
