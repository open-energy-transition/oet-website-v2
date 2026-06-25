'use client'

// Returns the length of the first text value found in the JSON structure
export function getFirstTextLength(data: any): number {
  if (
    data?.root?.children?.[0]?.children?.[0]?.text &&
    typeof data.root.children[0].children[0].text === 'string'
  ) {
    return data.root.children[0].children[0].text.length
  }
  return 0
}
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import type { WhoWeAreBlock as WhoWeAreBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

gsap.registerPlugin(ScrollTrigger)

export const WhoWeAreBlock: React.FC<WhoWeAreBlockProps> = ({ items, bottomItems }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const bottomGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main content cards staggered on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return
        const content = card.querySelector('.who-content')
        const media = card.querySelector('.who-media')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          defaults: { ease: 'power3.out', duration: 0.7 },
        })

        if (content) {
          tl.fromTo(content, { x: -40, opacity: 0 }, { x: 0, opacity: 1 }, 0)
        }
        if (media) {
          tl.fromTo(media, { x: 40, opacity: 0 }, { x: 0, opacity: 1 }, 0)
        }
      })

      // Animate bottom items staggered
      if (bottomGridRef.current) {
        const items = bottomGridRef.current.children
        gsap.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bottomGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [items, bottomItems])

  if (!items || items.length === 0) return null

  return (
    <div ref={sectionRef} className="container flex flex-col gap-4 lg:gap-8">
      {/* Main Content Items with Media */}
      {items.map((item, index) => {
        const isReversed = item.reverse

        return (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el
            }}
            className={`lg:flex gap-6 justify-between ${isReversed ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Content Section */}
            <div className="who-content lg:w-1/2 bg-[#F8FAFB] dark:bg-[#1f2937] p-6 rounded-xl text-[#777980] dark:text-gray-300 transition-colors duration-300">
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
            <div className="who-media lg:w-1/2 mt-6 lg:mt-0">
              {item.media && typeof item.media === 'object' && (
                <Media resource={item.media} imgClassName="rounded-xl w-full" />
              )}
            </div>
          </div>
        )
      })}

      {/* Bottom Items List */}
      {bottomItems && bottomItems.length > 0 && (
        <div
          ref={bottomGridRef}
          className={`grid grid-cols-2 gap-6 mt-6 lg:grid-cols-${bottomItems.length}`}
        >
          {bottomItems.map((bottomItem, index) => (
            <div
              key={index}
              className="bg-[#F8FAFB] dark:bg-[#1f2937] p-6 rounded-xl transition-colors duration-300 text-center border border-gray-black-50 dark:border-dark-blue-gray"
            >
              <h3
                className={`text-[#26372C] dark:text-white mb-6 ${getFirstTextLength(bottomItem.description) > 20 ? 'text-2xl' : 'text-3xl'} font-bold`}
              >
                {bottomItem.title}
              </h3>
              {bottomItem.description && (
                <RichText
                  enableGutter={false}
                  enableProse={false}
                  className={`customTextState-size-h9 text-[#777980] dark:text-gray-300 ${getFirstTextLength(bottomItem.description) > 20 ? 'text-sm' : ''}`}
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
