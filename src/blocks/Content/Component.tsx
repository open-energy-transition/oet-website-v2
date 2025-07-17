import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    oneFourth: '3',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { type, modal, enableLink, link, media, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {type === 'cardModal' ? (
                  // Card Modal Type
                  <div className="card-modal bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                    {/* Display Rich Text for card modal */}
                    {richText && (
                      <div className="mb-4">
                        <RichText data={richText} enableGutter={false} />
                      </div>
                    )}

                    {/* Modal trigger - you can customize this based on your modal implementation */}
                    {modal && typeof modal === 'object' && (
                      <div className="text-sm text-gray-500">Modal: {modal.title || modal.id}</div>
                    )}
                  </div>
                ) : (
                  // Default Content Type
                  <>
                    {/* Display Media with constrained width */}
                    {media && typeof media === 'object' && (
                      <div className="media-wrapper w-full mb-4">
                        <div className="aspect-video w-full overflow-hidden rounded-lg">
                          <Media resource={media} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                    {/* Display Rich Text */}
                    {richText && <RichText data={richText} enableGutter={false} />}

                    {/* Display Link */}
                    {enableLink && <CMSLink {...link} />}
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
