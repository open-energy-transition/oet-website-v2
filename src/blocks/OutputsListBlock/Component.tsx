'use client'

import React, { useMemo, useState } from 'react'
import type { Output } from '@/payload-types'
import Link from 'next/link'

export const OutputsListBlockComponent: React.FC<{
  title?: string | null
  description?: string | null
  tag?: string | null
  outputs: Output[]
}> = ({ title, description, tag, outputs }) => {
  const [visibleCount, setVisibleCount] = useState(9)

  // Sort outputs by outputDate in reverse chronological order (newest first)
  // Outputs without outputDate are lowest priority
  const sortedOutputs = [...outputs].sort((a, b) => {
    const dateA = new Date(a.outputDate || 0).getTime()
    const dateB = new Date(b.outputDate || 0).getTime()
    return dateB - dateA
  })

  // Format date for display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const visibleOutputs = sortedOutputs.slice(0, visibleCount)

  const hasMore = visibleCount < sortedOutputs.length

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, sortedOutputs.length))
  }

  const enRichTags = (output: Output) => {
    if (!output.outputDate) return output.tags
    const newTags = [...(output.tags || [])]
    const dateTag = { tag: formatDate(output.outputDate) || '' }

    if (newTags.length > 0) {
      newTags.splice(1, 0, dateTag)
    } else {
      newTags.push(dateTag)
    }

    return newTags
  }

  return (
    <section id="outputs" className="lg:py-16 lg:my-0 -my-8 px-4 md:px-8 container">
      <div className="">
        {/* Header */}
        {(tag || title || description) && (
          <div className="mb-12">
            {tag && (
              <span className=" inline-block px-1 py-1 text-sm font-medium bg-gray-f9 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">
                {tag}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">{description}</p>
            )}
          </div>
        )}

        {/* Outputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleOutputs.map((output) => {
            const enrichedTags = enRichTags(output)
            return (
              <div key={output.id} className="flex items-start gap-3 px-3 py-2">
                <span className="inline-block mt-0.5">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      className="dark:fill-white"
                      clip-rule="evenodd"
                      d="M17.73 5.12L17.59 4.87C17.4094 4.56769 17.1547 4.31643 16.85 4.14L10.14 0.27C9.8362 0.09375 9.4913 0.00062 9.14 0H8.85C8.4987 0.00062 8.1538 0.09375 7.85 0.27L1.14 4.15C0.836969 4.32526 0.58526 4.57697 0.41 4.88L0.27 5.13C0.0937499 5.43384 0.00062 5.77874 0 6.13V13.88C0.00062 14.2313 0.0937499 14.5762 0.27 14.88L0.41 15.13C0.58979 15.4295 0.84049 15.6802 1.14 15.86L7.86 19.73C8.1623 19.9099 8.5082 20.0033 8.86 20H9.14C9.4913 19.9994 9.8362 19.9063 10.14 19.73L16.85 15.85C17.156 15.6787 17.4087 15.426 17.58 15.12L17.73 14.87C17.9041 14.5653 17.9971 14.221 18 13.87V6.12C17.9994 5.76874 17.9063 5.42384 17.73 5.12ZM8.85 2H9.14L15 5.38L9 8.84L3 5.38L8.85 2ZM10 17.5L15.85 14.12L16 13.87V7.11L10 10.58V17.5Z"
                      fill="#0B0C0B"
                    ></path>
                  </svg>
                </span>
                {/* Title */}
                <div>
                  <div className="font-heebo font-semibold text-base leading-normal mb-2">
                    {output.link ? (
                      <Link href={output.link} className="hover:underline dark:!text-white">
                        {output.title}
                      </Link>
                    ) : (
                      output.title
                    )}
                  </div>
                  {/* Tags */}
                  {enrichedTags && enrichedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {enrichedTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                        >
                          {tag.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* See More Button */}
        {hasMore && (
          <div className="flex justify-end mt-8">
            <button
              onClick={showMore}
              className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="See more outputs"
            >
              <span>See more</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
