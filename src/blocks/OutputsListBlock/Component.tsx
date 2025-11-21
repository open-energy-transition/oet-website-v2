'use client'

import React, { useState } from 'react'
import type { Output } from '@/payload-types'

export const OutputsListBlockComponent: React.FC<{
  title?: string | null
  description?: string | null
  tag?: string | null
  outputs: Output[]
}> = ({ title, description, tag, outputs }) => {
  const [visibleCount, setVisibleCount] = useState(9)

  const visibleOutputs = outputs.slice(0, visibleCount)
  const hasMore = visibleCount < outputs.length

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, outputs.length))
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(tag || title || description) && (
          <div className="mb-12">
            {tag && (
              <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-f9 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">
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
          {visibleOutputs.map((output) => (
            <a
              key={output.id}
              href={output.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {output.title}
              </h3>

              {/* Tags */}
              {output.tags && output.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {output.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
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
