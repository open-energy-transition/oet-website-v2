import React from 'react'

import type { ButtonBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'

const colorClassMap: Record<string, string> = {
  default: 'bg-gray-200 text-black',
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-500 text-black',
  danger: 'bg-red-600 text-white',
  gray: 'bg-gray-400 text-black',
}

export const ButtonBlock: React.FC<CTABlockProps> = ({ link, color = 'default' }) => {
  const colorClass = colorClassMap[color || 'default'] || colorClassMap.default
  return (
    <div>
      <div>
        <div>
          {link && (
            <CMSLink className={`button px-4 py-2 rounded ${colorClass}`} size="lg" {...link} />
          )}
        </div>
      </div>
    </div>
  )
}
