import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Image from 'next/image'

import type { Post } from '@/payload-types'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="container relative bg-white dark:bg-[#1a1f2e] transition-colors duration-300">
      <div>
        <div className="">
          <div className="mb-6 text-3xl lg:text-5xl font-semibold">{title}</div>
        </div>
        <div className="flex gap-2 items-center">
          {hasAuthors && (
            <div className="">
              <span className="mr-2 text-sm text-gray-black-300 dark:text-white transition-colors duration-300">
                By
              </span>
              <span className="text-[#E31937] transition-colors duration-300">
                {formatAuthors(populatedAuthors)}
              </span>
            </div>
          )}
          {publishedAt && (
            <div className="flex flex-row items-center gap-1">
              <p className="text-sm text-gray-black-300 dark:text-white transition-colors duration-300">
                Published
              </p>

              <time
                dateTime={publishedAt}
                className="text-white dark:text-gray-100 transition-colors duration-300"
              >
                {formatDateTime(publishedAt)}
              </time>
            </div>
          )}
        </div>
        <div className="">
          <div className="">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
      <div className="relative  w-full">
        {heroImage && typeof heroImage !== 'string' && typeof heroImage !== 'number' && (
          <Image
            className="!h-auto !relative"
            src={heroImage.url || ''}
            alt={heroImage.alt || title || 'Hero image'}
            fill
          />
        )}
      </div>
    </div>
  )
}
