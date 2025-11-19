'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Media } from '@/components/Media'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './carousel.css'

interface PartnersCarouselProps {
  images: {
    image: string
    alt: string
  }[]
}

export const PartnersCarousel: React.FC<PartnersCarouselProps> = ({ images }) => {
  return (
    <div className="partners-carousel-container w-full px-4 md:px-8 lg:px-12 py-4">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={2.5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="partners-swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="!flex !items-center !justify-center">
            <div className="h-52 md:h-56 lg:h-60 w-full rounded-lg flex items-center justify-center bg-white dark:bg-gray-800 transition-colors duration-300">
              <Media
                resource={img.image}
                className="w-full h-full flex items-center justify-center"
                alt={img.alt}
                imgClassName="object-contain max-h-44 md:max-h-48 lg:max-h-52 max-w-full mx-auto hover:scale-105 transition-transform duration-300 p-4"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination Dots */}
      </Swiper>
    </div>
  )
}
