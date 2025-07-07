import React from 'react'
import type { AboutBlock as AboutBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const AboutBlock: React.FC<AboutBlockProps> = ({
  richText,
  listItems,
  media,
  actionItems,
}) => {
  return (
    <div className="container">
      <div className="p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-6">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <div className="flex-shrink-0">
                {media && typeof media === 'object' && <Media resource={media} />}
              </div>
            </div>
            <div className="col-span-7">
              {listItems && listItems.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {listItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <i className={`${item.iconClass} text-xl`}></i>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {actionItems && actionItems.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  {actionItems.map((action, i) => (
                    <a
                      key={i}
                      href={action.link}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <i className={action.iconClass}></i>
                      <span>{action.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
