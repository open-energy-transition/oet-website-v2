import React from 'react'
import type { WhoWeAreBlock as WhoWeAreBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const WhoWeAreBlock: React.FC<WhoWeAreBlockProps> = ({ items, bottomItems }) => {
  if (!items || items.length === 0) return null

  return (
    <div className="container py-16 gap-4 lg:gap-16">
      {/* Main Content Items with Media */}
      {items.map((item, index) => {
        const isReversed = item.reverse

        return (
          <div
            key={index}
            className={`lg:flex gap-6 justify-between ${isReversed ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Content Section */}
            <div className="lg:w-1/2 bg-[#F8FAFB] dark:bg-[#1f2937] p-6 rounded-xl text-[#777980] dark:text-gray-300 transition-colors duration-300">
              <div className="text-oxanium-3xl mb-2 text-[#26372C] dark:text-white text-2xl font-semibold">
                {item['title-tem']}
              </div>
              {item['description-item'] && (
                <RichText
                  enableGutter={false}
                  enableProse={false}
                  className="customTextState-size-h9"
                  data={item['description-item']}
                />
              )}
              {item.link && (
                <div className="mt-7 gap-2 flex flex-wrap">
                  <CMSLink
                    {...item.link}
                    className="rounded-3xl text-poppins-x-small font-medium leading-[100%] bg-[#E31937] hover:bg-[#c0152e] transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Media Section */}
            <div className="lg:w-1/2 mt-6 lg:mt-0">
              {item.media && typeof item.media === 'object' && (
                <Media resource={item.media} imgClassName="rounded-xl w-full" />
              )}
            </div>
          </div>
        )
      })}

      {/* Bottom Items List */}
      {bottomItems && bottomItems.length > 0 && (
        <div className={`grid grid-cols-2 gap-6 mt-16 lg:grid-cols-${bottomItems.length}`}>
          {bottomItems.map((bottomItem, index) => (
            <div
              key={index}
              className="bg-[#F8FAFB] dark:bg-[#1f2937] p-6 rounded-xl transition-colors duration-300 text-center"
            >
              <h3 className="text-oxanium-3xl text-[#26372C] dark:text-white text-3xl font-bold">
                {bottomItem.title}
              </h3>
              {bottomItem.description && (
                <RichText
                  enableGutter={false}
                  enableProse={false}
                  className="customTextState-size-h9 text-[#777980] dark:text-gray-300"
                  data={bottomItem.description}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
