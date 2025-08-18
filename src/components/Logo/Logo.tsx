import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  type?: 'white' | 'red'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    type = 'white',
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const srcLink = type === 'white' ? '/oet-logo-white.png' : '/oet-logo-red.png'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      style={{ filter: 'none' }}
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[119px] w-full h-[54px]', className)}
      src={srcLink}
    />
  )
}
