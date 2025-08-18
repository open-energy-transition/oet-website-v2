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
  const [slidesToShow, setSlidesToShow] = useState(3)

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
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, images.length - slidesToShow)
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }, [images.length, slidesToShow])

  // Function to go to the previous slide
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
  const totalPages = Math.ceil(images.length / slidesToShow)
  const currentPage = Math.floor(currentIndex / slidesToShow)

  return (
    <div
      className={`partners-carousel-container relative w-full px-10 overflow-hidden ${!imagesLoaded ? 'opacity-0' : 'opacity-100'}`}
      style={{ transition: 'opacity 0.3s ease-in-out' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={carouselRef}
      tabIndex={0} // Make it focusable for keyboard navigation
      role="region"
      aria-label="Partner logos carousel"
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-all duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            width: `${(images.length / slidesToShow) * 100}%`,
            gap: '2rem',
          }}
        >
          {images.map((img, i) => (
            <div
              key={i} // Use stable index as key
              className={`partner-slide flex-1 min-w-0 h-32 overflow-hidden rounded-lg flex items-center justify-center ${
                i >= currentIndex && i < currentIndex + slidesToShow ? 'visible' : 'invisible'
              }`}
              style={{
                flex: `0 0 calc(${100 / images.length}%)`,
                transition: 'transform 0.3s ease-in-out',
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Partner: ${img.alt}`}
              aria-hidden={!(i >= currentIndex && i < currentIndex + slidesToShow)}
            >
              <Media
                resource={img.image}
                className="object-contain scale-75 p-2"
                alt={img.alt}
                loading="eager" // Ensure images load immediately
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        className="carousel-nav-btn carousel-prev absolute left-0 top-1/2 rounded-full p-2 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
        className="carousel-nav-btn carousel-next absolute right-0 top-1/2 hover:bg-gray-100 rounded-full p-2 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
  )
}
