import React from 'react'
import type { OurServiceBlock as OurServiceBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const OurServiceBlock: React.FC<OurServiceBlockProps> = ({
  title,
  description,
  services,
}) => {
  return (
    <div className="bg-[#F8FAFB] dark:bg-[#1a1f2e] transition-colors duration-300">
      <div className="container py-14">
        <div className="mb-6 text-start flex lg:flex-row flex-col justify-between">
          <h2 className="mb-2 text-4xl font-semibold lg:text-5xl text-gray-black-500 dark:text-white">
            {title}
          </h2>
          {description && (
            <RichText
              enableProse={false}
              enableGutter={false}
              className="customTextState-size-h9 mb-4 text-[#777980] dark:text-gray-300 mx-w-[391px]"
              data={description}
            />
          )}
        </div>

        <div className="grid grid-cols-1 mt-14">
          {services &&
            services.length > 0 &&
            services.map((service, i) => (
              <div
                key={i}
                className="lg:py-6 flex flex-col lg:flex-row items-start border-t border-t-[#D2D2D5] transition-colors duration-300"
              >
                <div className="my-8 lg:my-10 lg:w-1/2">
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
                        className="lg:text-3xl text-2xl p-0 font-medium mb-4 lg:mb-6 text-[#26372C] dark:!text-white !bg-transparent"
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
                  <div className="w-full h-auto lg:w-1/2 lg:h-full overflow-hidden flex items-center lg:justify-end">
                    <Media
                      resource={service.image}
                      className="object-cover mb-8 lg:mb-0 w-full h-auto lg:w-auto lg:h-full rounded-lg lg:max-h-[218px]"
                      imgClassName="h-auto w-full lg:h-full lg:w-auto bg-transparent"
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
