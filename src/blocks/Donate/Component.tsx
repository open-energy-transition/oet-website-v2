import React from 'react'
import type { DonateBlock as DonateBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const DonateBlock: React.FC<DonateBlockProps> = ({ richText, listItems, title }) => {
  return (
    <div className="container">
      <div className="p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          {listItems && listItems.length > 0 && (
            <div className="flex justify-center items-center mx-auto gap-2 cursor-pointer">
              {listItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <i className={`${item.iconClass} text-xl`}></i>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
