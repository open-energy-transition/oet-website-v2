'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Media } from '@/components/Media'
import './carousel.css'

interface PartnersCarouselProps {
  images: {
    image: string
    alt: string
  }[]
}

export const PartnersCarousel: React.FC<PartnersCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [slidesToShow, setSlidesToShow] = useState(4)

  // Preload all images to prevent flashing during slides
  useEffect(() => {
    let loadedCount = 0
    const totalImages = images.length

    // Create an array of image objects for preloading
    const imageObjects = images.map((img) => {
      const imgObj = new Image()
      imgObj.src = typeof img.image === 'string' ? img.image : ''
      imgObj.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      imgObj.onerror = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      return imgObj
    })

    // Set a timeout to ensure we don't wait forever
    const timeout = setTimeout(() => {
      if (!imagesLoaded) {
        setImagesLoaded(true)
      }
    }, 3000)

    return () => {
      imageObjects.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
      clearTimeout(timeout)
    }
  }, [images, imagesLoaded])

  // Update slidesToShow based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(4)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener with debounce for performance
    let resizeTimer: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', debouncedResize)

    // Cleanup
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  // Function to go to the next slide, moving only one item at a time
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, images.length - slidesToShow)
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }, [images.length, slidesToShow])

  // Function to go to the previous slide, moving only one item at a time
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, images.length - slidesToShow)
      return prevIndex <= 0 ? maxIndex : prevIndex - 1
    })
  }, [images.length, slidesToShow])

  // Auto scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      timerRef.current = setInterval(() => {
        nextSlide()
      }, 3000) // Change slide every 3 seconds
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isAutoScrolling, nextSlide])

  // Pause auto-scrolling when hovering over the carousel
  const handleMouseEnter = () => {
    setIsAutoScrolling(false)
  }

  const handleMouseLeave = () => {
    setIsAutoScrolling(true)
  }

  // Add touch support for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swiped right
      prevSlide()
    }
  }

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the carousel is focused or hovered
      if (
        carouselRef.current?.contains(document.activeElement) ||
        carouselRef.current?.matches(':hover')
      ) {
        if (e.key === 'ArrowLeft') {
          prevSlide()
        } else if (e.key === 'ArrowRight') {
          nextSlide()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlide, nextSlide])

  // Calculate total pages for pagination dots

  // Calculate the percentage to move for each individual item
  const slideWidth = 100 / images.length

  return (
    <>
      <div
        className={`partners-carousel-container relative w-full px-4 md:px-8 lg:px-12 py-4 overflow-hidden ${!imagesLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ transition: 'opacity 0.5s ease-in-out' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={carouselRef}
        tabIndex={0}
        role="region"
        aria-label="Partner logos carousel"
        aria-roledescription="carousel"
      >
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * slideWidth}%)`,
              width: `${(images.length / slidesToShow) * 100}%`,
            }}
          >
            {images.map((img, i) => (
              <div
                key={i} // Use stable index as key
                className="partner-slide h-52 md:h-56 lg:h-60 overflow-hidden rounded-lg flex items-center justify-center"
                style={{
                  width: `${100 / images.length}%`,
                  padding: '0 0.5rem md:0 1rem',
                  opacity: i >= currentIndex && i < currentIndex + slidesToShow ? 1 : 0.3,
                  transition: 'all 0.3s ease-in-out',
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Partner: ${img.alt}`}
                aria-hidden={!(i >= currentIndex && i < currentIndex + slidesToShow)}
              >
                <Media
                  resource={img.image}
                  className="object-contain p-1 md:p-2"
                  alt={img.alt}
                  imgClassName="max-h-44 md:max-h-48 lg:max-h-52 max-w-full mx-auto hover:scale-105 transition-transform duration-300"
                  loading="eager" // Ensure images load immediately
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop navigation buttons (inside carousel) */}
        <button
          className="carousel-nav-btn carousel-prev absolute left-0 md:left-2 top-1/2 transform -translate-y-1/2 p-1 md:p-2 z-10 text-gray-600 hover:text-gray-900 bg-white/80 rounded-full shadow-md hidden md:block"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className="carousel-nav-btn carousel-next absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 p-1 md:p-2 z-10 text-gray-600 hover:text-gray-900 bg-white/80 rounded-full shadow-md hidden md:block"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      {/* Mobile navigation with dots and arrows */}
      <div className="flex justify-between items-center mt-4 md:hidden px-4">
        <button
          className="carousel-nav-btn p-2 text-gray-600 hover:text-gray-900 bg-white rounded-full shadow-sm border border-gray-200"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Pagination dots */}
        <div className="flex gap-1">
          {Array.from({ length: Math.ceil(images.length / slidesToShow) }, (_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / slidesToShow) === i ? 'bg-gray-700 w-4' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(i * slidesToShow)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="carousel-nav-btn p-2 text-gray-600 hover:text-gray-900 bg-white rounded-full shadow-sm border border-gray-200"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </>
  )
}
