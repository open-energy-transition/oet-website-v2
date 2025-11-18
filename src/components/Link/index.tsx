import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Icon, Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  btnTextColor?: string | null
  btnBgColor?: string | null
  btnSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'small' | 'regular' | 'large' | null
  icon?: Icon | null | number
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    btnTextColor,
    btnBgColor,
    btnSize = 'regular',
    icon,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  // Map btnSize to the size format expected by Button component
  const getMappedSize = () => {
    if (appearance === 'link') return 'clear'
    if (sizeFromProps) return sizeFromProps

    // Map our custom button sizes to the Button component's size prop
    switch (btnSize) {
      case 'xs':
        return 'text-xs'
      case 'sm':
        return 'text-sm'
      case 'md':
        return 'text-md'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      case '2xl':
        return 'text-2xl'
      default:
        return 'text-base'
    }
  }

  const size = getMappedSize()
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    // Get size-specific classes for inline links
    const sizeClasses = () => {
      switch (btnSize) {
        case 'xs':
          return 'text-xs'
        case 'sm':
          return 'text-sm'
        case 'md':
          return 'text-base'
        case 'lg':
          return 'text-lg'
        case 'xl':
          return 'text-xl'
        case '2xl':
          return 'text-2xl'
        case 'small':
          return 'text-sm'
        case 'regular':
          return 'text-base'
        case 'large':
          return 'text-lg'
        default:
          return 'text-base'
      }
    }

    return (
      <Link
        className={cn(className, sizeClasses())}
        href={href || url || ''}
        {...newTabProps}
        style={{
          ...(btnTextColor
            ? {
                color: btnTextColor,
              }
            : {}),
          ...(btnBgColor ? { backgroundColor: btnBgColor } : {}),
        }}
      >
        {label && <span className={`${sizeClasses()} leading-none`}>{label}</span>}
        {children && children}
        {icon && typeof icon === 'object' && 'svg' in icon && (
          <span
            className="inline-block ml-2"
            dangerouslySetInnerHTML={{
              __html: (icon as Icon).svg.replace(/fill="[^"]*"/g, `fill="${btnTextColor}"`),
            }}
          />
        )}
      </Link>
    )
  }

  return (
    <Button
      asChild
      className={className}
      style={{
        ...(btnTextColor
          ? {
              color: btnTextColor || 'inherit',
            }
          : {}),
        ...(appearance === 'outline'
          ? { borderColor: btnTextColor || 'inherit' }
          : { backgroundColor: btnBgColor || 'transparent' }),
      }}
      variant={appearance}
    >
      <Link className={cn(size, className)} href={href || url || ''} {...newTabProps}>
        {label && <span className={`${size} leading-none`}>{label}</span>}
        {children && children}
        {icon && typeof icon === 'object' && 'svg' in icon && (
          <span
            className="inline-block ml-2"
            dangerouslySetInnerHTML={{
              __html: (icon as Icon).svg.replace(/fill="[^"]*"/g, `fill="${btnTextColor}"`),
            }}
          ></span>
        )}
      </Link>
    </Button>
  )
}
