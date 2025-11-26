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
    <div className="partners-carousel-container w-full md:px-8 lg:px-12 py-4 relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={2.5}
        autoplay={{
          delay: 2000,
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
            slidesPerView: 4.5,
            spaceBetween: 24,
          },
        }}
        className="partners-swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="!flex !items-center !justify-center">
            <div className="h-32 lg:h-40 w-full rounded-lg flex items-center justify-center bg-white transition-colors duration-300">
              <Media
                resource={img.image}
                className="w-full h-full flex items-center justify-center"
                alt={img.alt}
                imgClassName="object-contain w-full h-full mx-auto hover:scale-105 transition-transform duration-300 p-1 lg:p-6"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination Dots */}
      </Swiper>

      {/* Navigation Arrows */}
      <button
        className="!hidden lg:!flex swiper-button-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10  items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-110 !-mt-1"
        aria-label="Previous partner"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          className="scale-[0.5] rotate-180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.4 6L1.4 12L-6.11959e-08 10.6L4.6 6L-4.63341e-07 1.4L1.4 -6.11959e-08L7.4 6Z"
            fill="#000000"
            className="dark:fill-white"
          />
        </svg>
      </button>

      <button
        className="!hidden lg:!flex swiper-button-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-110 !-mt-1"
        aria-label="Next partner"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          className="scale-[0.5]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.4 6L1.4 12L-6.11959e-08 10.6L4.6 6L-4.63341e-07 1.4L1.4 -6.11959e-08L7.4 6Z"
            fill="#000000"
            className="dark:fill-white"
          />
        </svg>
      </button>
    </div>
  )
}
