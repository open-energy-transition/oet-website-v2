import React from 'react'
import type { OurServiceBlock as OurServiceBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const OurServiceBlock: React.FC<OurServiceBlockProps> = ({
  title,
  description,
  link,
  services,
  bottomImages,
}) => {
  return (
    <div className="bg-[#F6F7F3]">
      <div className="container py-14">
        <div className="flex justify-between">
          <div className="mb-6 text-start">
            <h2 className="text-oxanium-3xl mb-2">{title}</h2>
            {description && (
              <RichText
                enableProse={false}
                enableGutter={false}
                className="customTextState-size-h9 mb-4"
                data={description}
              />
            )}
          </div>
          <div>
            {link && (
              <CMSLink
                {...link}
                btnBgColor="#F6F7F3"
                className="text-poppins-sm !text-[#26372CB2]"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-14">
          {services &&
            services.length > 0 &&
            services.map((service, i) => (
              <div
                key={i}
                className="pb-10 pt-14 flex flex-col items-start gap-3 border-r-[2px] border-[#26372C1A]"
              >
                <div className="flex items-end gap-8">
                  <div>
                    {service.icon && typeof service.icon === 'object' && 'svg' in service.icon && (
                      <div className="mb-2">
                        <span
                          className="text-primary inline-block"
                          dangerouslySetInnerHTML={{ __html: service.icon.svg }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-poppins-h5">{service.number}</span>
                    <div className="flex items-center gap-2">
                      <h3 className="text-poppins-h7">{service.title}</h3>
                    </div>
                  </div>
                </div>
                {service.description && (
                  <RichText
                    enableProse={false}
                    enableGutter={false}
                    className="text-muted-foreground"
                    data={service.description}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 justify-center">
          {bottomImages &&
            bottomImages.length > 0 &&
            bottomImages.map((img, i) => (
              <div
                key={i}
                className="w-full max-w-[95%] h-[128px] overflow-hidden flex items-center justify-center"
              >
                <Media
                  resource={img.image}
                  className="object-cover w-full h-full"
                  alt={img.alt || 'Service Image'}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
