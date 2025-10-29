import React from 'react'
import type { WhoWeAreBlock as WhoWeAreBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const WhoWeAreBlock: React.FC<WhoWeAreBlockProps> = ({
  title,
  description,
  link,
  media,
}) => {
  return (
    <div className="container py-16 text-[#26372C]">
      <div className="lg:flex justify-between">
        <div className="mb-6 lg:w-1/2 pt-[112px]">
          <h2 className="text-oxanium-3xl mb-2">{title}</h2>
          {description && (
            <RichText
              enableGutter={false}
              enableProse={false}
              className="customTextState-size-h9 "
              data={description}
            />
          )}
          <div className="mt-7 gap-2 flex flex-wrap">
            <CMSLink
              {...link}
              className="rounded-3xl text-poppins-x-small font-medium leading-[100%] border !border-[#26372C4D]"
            />
          </div>
        </div>
        <div className="lg:w-[40%] flex items-start justify-end">
          {media && typeof media === 'object' && <Media resource={media} />}
        </div>
      </div>
    </div>
  )
}
