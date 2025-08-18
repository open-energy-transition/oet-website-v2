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
    icon,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className)}
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
        {label && label}
        {children && children}
        {icon && typeof icon === 'object' && 'svg' in icon && (
          <span className="inline-block ml-2" dangerouslySetInnerHTML={{ __html: icon.svg }} />
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
      size={size}
      variant={appearance}
    >
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
        {icon && typeof icon === 'object' && 'svg' in icon && (
          <span
            className="inline-block ml-2"
            dangerouslySetInnerHTML={{ __html: (icon as Icon).svg }}
          ></span>
        )}
      </Link>
    </Button>
  )
}
