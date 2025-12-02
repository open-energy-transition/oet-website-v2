'use client'

import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import Link from 'next/link'

interface ContentItem {
  text: string
  id?: string
}

interface MediaItem {
  image: Media | string
  id?: string
}

interface ProjectAim {
  title: string
  link?: string
  isPublish?: boolean
  iconColor?: 'red' | 'black'
  content?: ContentItem[]
  id?: string
}

export const ProjectAimsBlockComponent: React.FC<{
  title?: string
  items?: ProjectAim[]
  media?: MediaItem[]
}> = ({ title, items, media }) => {
  if (!items || items.length === 0) return null
  return (
    <section className={title ? 'lg:my-16 my-4' : ''}>
      <div className="">
        {/* Section Title */}
        {title && (
          <h2 className="text-3xl font-semibold text-gray-black-500 dark:text-white mb-4">
            {title}
          </h2>
        )}
        <div className={`flex gap-6 lg:flex-row flex-col ${title ? 'lg:my-6 my-3' : ''}`}>
          <div className="flex flex-col lg:gap-6 gap-3 lg:w-3/5">
            {items
              .filter((item) => item.isPublish)
              .map((item, index) => {
                return (
                  <div key={item.id || index}>
                    {/* Title */}
                    <div className="text-gray-black-400 dark:text-white font-base flex gap-3">
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="dark:!fill-white"
                            d="M20.255 13.5421L15.144 17.5792C13.868 18.5872 12 17.6712 12 16.0372V12.0001C12 12.5751 11.752 13.1501 11.255 13.5421L6.14404 17.5792C4.86804 18.5872 3 17.6712 3 16.0372V7.96296C3 6.32896 4.86704 5.41297 6.14404 6.42097L11.255 10.4571C11.752 10.8491 12 11.4241 12 11.9991V7.96296C12 6.32896 13.867 5.41297 15.144 6.42097L20.255 10.4571C21.248 11.2421 21.248 12.7571 20.255 13.5421Z"
                            fill={item.iconColor === 'black' ? '#000000' : '#E31937'}
                          />
                        </svg>
                      </div>
                      {item.link ? (
                        <Link
                          href={item.link || '#'}
                          className="leading-tight hover:underline no-underline"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <div className="leading-tight">{item.title}</div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="lg:w-2/5">
            {/* Media Items Section */}
            {media && media.length > 0 && (
              <div
                className={`grid gap-4 ${
                  media.length === 1
                    ? 'grid-cols-1'
                    : media.length === 2
                      ? 'grid-cols-2'
                      : media.length === 3
                        ? 'grid-cols-1 md:grid-cols-2 md:grid-rows-2'
                        : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {media.map((mediaItem, idx) => {
                  const imageData = typeof mediaItem.image === 'object' ? mediaItem.image : null

                  if (!imageData || !imageData.url) return null

                  // For 3 images: first one spans 2 rows on left, other two stack on right
                  const isFirstOfThree = media.length === 3 && idx === 0

                  return (
                    <div
                      key={mediaItem.id || idx}
                      className={`relative w-full rounded-xl overflow-hidden ${
                        isFirstOfThree
                          ? 'h-64 md:h-full md:row-span-2'
                          : media.length === 3
                            ? 'h-48'
                            : 'h-48 md:h-64'
                      }`}
                    >
                      <Image
                        src={imageData.url}
                        alt={imageData.alt || title || 'Project image'}
                        fill
                        className="object-cover m-0"
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
