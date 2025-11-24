'use client'

import React from 'react'

export const BlogQuoteBlockComponent: React.FC<{
  description: string
}> = ({ description }) => {
  if (!description) return null

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <blockquote className="relative">
          {/* Quote mark */}
          <div className="absolute -top-4 -left-2 text-6xl text-gray-300 dark:text-gray-700 font-serif">
            &ldquo;
          </div>

          {/* Quote text */}
          <p className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200 italic text-center px-8 py-4">
            {description}
          </p>

          {/* Bottom quote mark */}
          <div className="absolute -bottom-8 right-0 text-6xl text-gray-300 dark:text-gray-700 font-serif">
            &rdquo;
          </div>
        </blockquote>
      </div>
    </section>
  )
}
