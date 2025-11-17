import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  type?: 'white' | 'red'
}

export const LogoMobile = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const srcLink = '/oet-logo-mobile.png'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      style={{ filter: 'none; !important' }}
      alt="Payload Logo"
      width={82}
      height={36}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[119px]', className)}
      src={srcLink}
    />
  )
}
