import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CardBlock } from '../CardBlock/Component'
import { ListBlockComponent } from '../List/Component' // <-- import ListBlockComponent

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { CardModel } from '@/components/Card/CardModal'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundColor, title, tag, richText } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    oneFourth: '3',
    twoThirds: '8',
  }

  return (
    <div className={cn('content-block', backgroundColor ? `bg-${backgroundColor}` : '')}>
      <div className="container my-16">
        {tag && <div className="mb-2 font-heebo text-sm font-semibold text-primary">{tag}</div>}
        {title && <h2 className="mb-6 font-poppins text-4xl font-semibold">{title}</h2>}
        {richText && (
          <div className="mb-8">
            <RichText data={richText} enableGutter={false} />
          </div>
        )}
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const {
                type,
                modal,
                enableLink,
                link,
                media,
                richText,
                size,
                tag,
                title,
                subtitle,
                description,
                action,
                icon,
                // list fields
                listTitle,
                listDirection,
                listType,
                listItems,
              } = col
              return (
                <div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
                  })}
                  key={index}
                >
                  {type === 'cardModal' ? (
                    // Card Modal Type
                    <div className="">
                      {/* Display Rich Text for card modal */}
                      {richText && (
                        <div className="mb-4">
                          <RichText data={richText} enableGutter={false} />
                        </div>
                      )}
                      {/* Modal trigger */}
                      {modal && typeof modal === 'object' && <CardModel tag={tag} data={modal} />}
                    </div>
                  ) : type === 'card' ? (
                    // Card Type
                    <CardBlock
                      tag={tag ?? undefined}
                      title={title ?? ''}
                      subtitle={subtitle ?? ''}
                      description={description}
                      actions={(action ?? []).map(({ label, url }) => ({
                        label: label ?? null,
                        url: url ?? null,
                      }))}
                      useBorder={col.useBorder ?? false}
                      cardSize={col.cardSize ?? 'full'}
                      // iconClass={col.iconClass}
                    />
                  ) : type === 'list' ? (
                    // List Block Type
                    <div>
                      {listTitle && (
                        <div className="font-heebo font-semibold text-base leading-normal">
                          {listTitle}
                        </div>
                      )}
                      <ListBlockComponent
                        items={(listItems as any) ?? []}
                        direction={listDirection ?? 'vertical'}
                        type={listType ?? 'normal'}
                      />
                    </div>
                  ) : (
                    // Default Content Type
                    <>
                      {/* Display Media with constrained width */}
                      {media && typeof media === 'object' && (
                        <div className="media-wrapper w-full h-full mb-4">
                          <div className="aspect-video w-full h-full overflow-hidden rounded-lg">
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
    </div>
  )
}
