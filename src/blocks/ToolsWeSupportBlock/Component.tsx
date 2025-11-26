import React from 'react'
import type { Model, ToolsWeSupportBlock as ToolsWeSupportBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const ToolsWeSupportBlock: React.FC<ToolsWeSupportBlockProps> = ({
  title,
  description,
  services,
  link,
  media,
}) => {
  return (
    <div className="container lg:py-4">
      <div className="flex flex-col lg:flex-row justify-between lg:gap-12">
        <div className="mb-6 lg:w-3/5">
          <h2 className="text-oxanium-3xl mb-2 font-semibold">{title}</h2>
          {description && (
            <RichText enableGutter={false} enableProse={false} className="" data={description} />
          )}
          <div className="mt-7 gap-2 flex flex-wrap">
            <CMSLink
              {...link}
              className="rounded-3xl text-poppins-x-small font-medium leading-[100%] dark:!text-white"
            />
          </div>
        </div>
        <div className="flex lg:w-2/5 lgjustify-end">
          {media && (
            <Media
              resource={media}
              className="w-full"
              imgClassName="w-full h-auto lg:h-full rounded-xl"
            />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        {/* Render services if present */}
        <div className="w-[40%] grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(services) &&
            services.length > 0 &&
            services
              .filter((service) => typeof service.model === 'object')
              .map((service, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl text-[#26372C] border-[#D9DCDA] border-[2.4px] shadow"
                >
                  <div className="w-[210px] min-h-[271px]">
                    {service.icon && typeof service.icon === 'object' && 'svg' in service.icon && (
                      <div className="mb-2">
                        <span
                          className="size-12"
                          dangerouslySetInnerHTML={{ __html: service.icon.svg }}
                        />
                      </div>
                    )}
                    <h3 className="customTextState-size-h7">
                      {typeof service.model === 'object' && 'title' in service.model
                        ? service.model.title
                        : ''}
                    </h3>
                    <p className="text-poppins-regular mt-4">
                      {typeof service.model === 'object' && 'description' in service.model
                        ? service.model.description
                        : ''}
                    </p>
                  </div>
                  {/* Add Read More button */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={(service.model as Model).website || '#'}
                      className="flex justify-between items-center w-max px-4 py-2 border text-poppins-c-xs border-[#D9DCDA] text-[#26372C80] rounded-2xl"
                    >
                      <span>Visit website</span>
                      <span>
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.120117"
                            y="18.8599"
                            width="18.72"
                            height="18.72"
                            rx="9.36"
                            transform="rotate(-90 0.120117 18.8599)"
                            fill="white"
                            fill-opacity="0.5"
                          />
                          <path
                            d="M12.1324 9.50018L7.45235 14.1802L6.36035 13.0882L9.94835 9.50018L6.36035 5.91218L7.45235 4.82018L12.1324 9.50018Z"
                            fill="#8F9892"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
