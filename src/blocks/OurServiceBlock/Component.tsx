'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import type { OurServiceBlock as OurServiceBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

gsap.registerPlugin(ScrollTrigger)

export const OurServiceBlock: React.FC<OurServiceBlockProps> = ({
  title,
  description,
  services,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header (title + description)
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      // Animate each service row staggered
      servicesRef.current.forEach((service) => {
        if (!service) return
        const content = service.querySelector('.service-content')
        const image = service.querySelector('.service-image')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          defaults: { ease: 'power3.out', duration: 0.6 },
        })

        if (content) {
          tl.fromTo(content, { x: -30, opacity: 0 }, { x: 0, opacity: 1 }, 0)
        }
        if (image) {
          tl.fromTo(image, { x: 30, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.3')
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [services])

  return (
    <div
      ref={sectionRef}
      id="our-service"
      className="bg-[#F8FAFB] dark:bg-[#1a1f2e] transition-colors duration-300 dark:border-y dark:border-dark-blue-gray"
    >
      <div className="container py-14 lg:pt-20">
        <div ref={headerRef} className="mb-6 text-start flex lg:flex-row flex-col justify-between">
          <h2 className="font-oxanium mb-2 text-4xl font-semibold lg:text-5xl text-gray-black-500 dark:text-white">
            {title}
          </h2>
          {description && (
            <RichText
              enableProse={false}
              enableGutter={false}
              className="customTextState-size-h9 mb-4 text-[#777980] dark:text-gray-300 max-w-[391px]"
              data={description}
            />
          )}
        </div>

        <div className="grid grid-cols-1 mt-12">
          {services &&
            services.length > 0 &&
            services.map((service, i) => (
              <div
                key={i}
                ref={(el) => {
                  servicesRef.current[i] = el
                }}
                className="lg:py-6 flex flex-col lg:flex-row items-start border-t border-t-[#D2D2D5] dark:border-t-dark-blue-gray transition-colors duration-300"
              >
                <div className="service-content my-8 lg:my-10 lg:w-1/2">
                  {/* Icon */}
                  {service.icon && typeof service.icon === 'object' && 'svg' in service.icon && (
                    <div className="mb-2">
                      <span
                        className="text-primary inline-block"
                        dangerouslySetInnerHTML={{ __html: service.icon.svg }}
                      />
                    </div>
                  )}

                  {/* Link (Title) */}
                  {service.link && (
                    <div>
                      <CMSLink
                        {...service.link}
                        btnBgColor="#F6F7F3"
                        className="lg:text-3xl font-oxanium text-2xl p-0 font-medium mb-4 lg:mb-6 text-[#26372C] dark:!text-white !bg-transparent"
                      />
                    </div>
                  )}

                  {/* Description */}
                  {service.description && (
                    <RichText
                      enableProse={false}
                      enableGutter={false}
                      className="text-muted-foreground dark:text-gray-400 transition-colors duration-300"
                      data={service.description}
                    />
                  )}
                </div>
                {/* Image */}
                {service.image && typeof service.image === 'object' && (
                  <div className="service-image w-full h-auto lg:w-1/2 lg:h-full overflow-hidden flex items-center lg:justify-end">
                    <Media
                      resource={service.image}
                      className="object-cover mb-8 lg:mb-0 w-full h-auto lg:w-auto lg:h-full rounded-lg lg:max-h-[218px]"
                      imgClassName="h-auto w-full lg:h-full lg:w-auto bg-transparent rounded-xl"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
