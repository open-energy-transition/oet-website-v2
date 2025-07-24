import RichText from '@/components/RichText'
import React from 'react'

export interface CardBlockProps {
  tag?: string
  title: string
  subtitle?: string
  description?: any
  cardSize: 'full' | 'small'
  useBorder?: boolean
  iconClass?: string
  actions?: {
    label: string | null
    url: string | null
  }[]
}

export const CardBlock: React.FC<CardBlockProps> = ({
  tag,
  title,
  subtitle,
  description,
  useBorder,
  cardSize,
  iconClass,
  actions,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex flex-col gap-4
      ${useBorder ? 'border border-gray-300' : ''}
      ${cardSize === 'small' ? 'max-w-md' : ''}
    `}
    >
      {iconClass && <span className={`text-3xl mb-2 ${iconClass}`} />}
      {tag && <span className="text-xs font-semibold text-blue-600 uppercase">{tag}</span>}
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      {subtitle && <h4 className="text-lg text-gray-600">{subtitle}</h4>}
      {description && <RichText data={description as any} enableGutter={false} />}
      {actions?.length &&
        actions.map((action, index) =>
          action.url ? (
            <a key={index} href={action.url} className="mt-4 inline-block  px-6 py-2 transition">
              {action.label}
            </a>
          ) : (
            <div key={index} className="mt-4 inline-block px-6 py-2 text-xs transition">
              {action.label}
            </div>
          ),
        )}
    </div>
  )
}
