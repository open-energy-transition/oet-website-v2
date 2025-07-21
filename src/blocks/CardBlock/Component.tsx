import RichText from '@/components/RichText'
import React from 'react'

export interface CardBlockProps {
  tag?: string
  title: string
  subtitle?: string
  description?: string
  action?: {
    label: string
    url: string
  }
}

export const CardBlock: React.FC<CardBlockProps> = ({
  tag,
  title,
  subtitle,
  description,
  action,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
    {tag && <span className="text-xs font-semibold text-blue-600 uppercase">{tag}</span>}
    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
    {subtitle && <h4 className="text-lg text-gray-600">{subtitle}</h4>}
    {description && <RichText data={description as any} enableGutter={false} />}
    {action && (
      <a
        href={action.url}
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {action.label}
      </a>
    )}
  </div>
)
