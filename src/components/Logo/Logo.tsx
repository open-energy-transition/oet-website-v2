import clsx from 'clsx'
import React from 'react'
import OetLogoWhite from './assets/oet-logo-white.svg'
import OetLogoRed from './assets/oet-logo.svg'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  type?: 'white' | 'red'
}

const LogoComponent = (props: Props) => {
  const { className, type = 'white' } = props

  const Common = ({ children }: { children: React.ReactNode }) => (
    <span
      role="img"
      aria-label="Payload Logo"
      className={clsx('inline-block max-w-[119px] w-full h-[54px]', className)}
    >
      {children}
    </span>
  )

  const renderAsset = (Asset: any) => {
    if (!Asset) return null

    // If import is a React component (SVGR)
    if (typeof Asset === 'function') {
      const Component = Asset as React.ComponentType<any>
      return <Component width={193} height={34} />
    }

    // Some bundlers export the component as default
    if (Asset.default && typeof Asset.default === 'function') {
      const Component = Asset.default as React.ComponentType<any>
      return <Component width={193} height={34} />
    }

    // If import is an object with a `src` property or a string URL
    const src = typeof Asset === 'string' ? Asset : Asset?.src || Asset?.default?.src
    if (src) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} width={193} height={34} alt="Payload Logo" />
      )
    }

    return null
  }

  return type === 'white' ? (
    <Common>{renderAsset(OetLogoWhite)}</Common>
  ) : (
    <Common>{renderAsset(OetLogoRed)}</Common>
  )
}

export const Logo = React.memo(LogoComponent)
Logo.displayName = 'Logo'
