'use client'

import React from 'react'
import RichText from '@/components/RichText'

interface ContentItem {
  title?: string
  description: any
  id?: string
}

export const ContentItemsBlockComponent: React.FC<{
  items?: ContentItem[]
  title: string
  isPublish?: boolean
}> = ({ items, title, isPublish }) => {
  if (!items || items.length === 0) return null

  if (!isPublish) return <></>

  return (
    <section className="lg:py-16 px-4 md:px-8">
      <div className="">
        {title && (
          <h2 className="text-oxanium-4xl text-2xl lg:text-5xl text-center my-12 text-gray-black-500 dark:text-white font-medium">
            {title}
          </h2>
        )}
        <div className={`grid grid-cols-2 gap-6 mt-16 lg:grid-cols-${items.length}`}>
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-[#F8FAFB] dark:bg-[#1f2937] p-6 rounded-xl transition-colors duration-300 text-center border border-gray-black-50 dark:border-dark-blue-gray"
            >
              <h3
                className={` my-0 text-[#26372C] mb-4 dark:text-white ${(item?.title?.length || 0) > 20 ? 'text-2xl' : 'text-3xl'} font-bold`}
              >
                {item.title}
              </h3>
              {item.description && (
                <div className="customTextState-size-h9 text-[#777980] dark:text-gray-300">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
