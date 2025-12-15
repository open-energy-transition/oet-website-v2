import React from 'react'

import type { ButtonBlock as CTABlockProps, Icon } from '@/payload-types'

import { CMSLink } from '@/components/Link'

const colorClassMap: Record<string, string> = {
  default: 'bg-gray-200 text-black dark:bg-transparent dark:text-white',
  primary: 'bg-blue-600 text-white dark:bg-transparent dark:text-white',
  secondary: 'bg-gray-600 text-white dark:bg-transparent dark:text-white',
  success: 'bg-green-600 text-white dark:bg-transparent dark:text-white',
  warning: 'bg-yellow-500 text-black dark:bg-transparent dark:text-white',
  danger: 'bg-red-600 text-white dark:bg-transparent dark:text-white',
  gray: 'bg-gray-400 text-black dark:bg-transparent dark:text-white',
}

export const ButtonBlock: React.FC<CTABlockProps> = ({ link, color = 'default', icon, size }) => {
  const colorClass = colorClassMap[color || 'default'] || colorClassMap.default
  const iconSvg = (icon as Icon)?.svg || null
  const sizeClass =
    size === 'sm'
      ? 'px-0'
      : size === 'lg'
        ? 'px-6 py-3'
        : size === '2xl'
          ? 'px-8 py-4'
          : 'px-4 py-2'

  const getPosClass = () => {
    switch (link.pos) {
      case 'center':
        return 'text-center'
      case 'end':
        return 'text-end'
      default:
        return ''
    }
  }
  console.log('ButtonBlock render with props:', { link })
  return (
    <div>
      <div>
        <div className={getPosClass()}>
          {link && (
            <CMSLink className={`button ${sizeClass} rounded ${colorClass}`} size="lg" {...link} />
          )}
          {iconSvg && (
            <span
              className="inline-block ml-2 align-middle"
              dangerouslySetInnerHTML={{ __html: iconSvg }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
