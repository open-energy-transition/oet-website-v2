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
    <section className="bg-[#F6F7F3] py-16">
      <div className="container px-4">
        <div className="flex">
          <div className="mb-12 text-start">
            <h2 className="text-oxanium-3xl font-bold mb-6">{title}</h2>
            {subTitle && <p className="customTextState-size-h8">{subTitle}</p>}
          </div>

          <div className="mt-10">
            <PartnersCarousel images={partnerImages} />
          </div>
        </div>
      </div>
    </section>
  )
}
