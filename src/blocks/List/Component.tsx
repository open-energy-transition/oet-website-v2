import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Link from 'next/link'
import React from 'react'

type ListItem = {
  title: string
  link: string
  content?: DefaultTypedEditorState
  icon?: {
    svg: string
  } | null
}

type ListBlockProps = {
  items: ListItem[]
  direction?: 'vertical' | 'horizontal'
  type?: 'normal' | 'tag'
  title?: string
}

export const ListBlockComponent: React.FC<ListBlockProps> = ({ items }) => {
  return (
    <ul className="flex flex-col gap-4 mt-4">
      {items?.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 px-3 py-2">
          {/* Render the SVG icon */}
          {item.icon && item.icon.svg && (
            <span
              className="inline-block mt-0.5"
              dangerouslySetInnerHTML={{ __html: item.icon.svg }}
            />
          )}
          <div>
            <div className="font-heebo font-semibold text-base leading-normal ">
              {item.link ? (
                <Link href={item.link} className="hover:underline">
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </div>
            {item.content && (
              <RichText data={item.content} enableGutter={false} enableProse={false} />
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
