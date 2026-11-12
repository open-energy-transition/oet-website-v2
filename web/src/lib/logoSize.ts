import type { ImageMetadata } from 'astro'

export interface LogoBox {
  width: number
  height: number
}

export interface LogoSet {
  width?: number | null
  height?: number | null
}

interface LogoFit {
  scale: number
  exponent: number
  maxWidth: number
  maxHeight: number
}

export const logoFits = {
  desktop: { scale: 69, exponent: 0.435, maxWidth: 145, maxHeight: 70 },
  mobile: { scale: 47, exponent: 0.34, maxWidth: 81, maxHeight: 55 },
  tag: { scale: 26, exponent: 1, maxWidth: 100, maxHeight: 35 },
} satisfies Record<string, LogoFit>

const unset = (value: number | null | undefined): value is null | undefined =>
  value === null || value === undefined

const fitted = (logo: ImageMetadata, fit: LogoFit): LogoBox => {
  const ratio = logo.width / logo.height
  const width = fit.scale * ratio ** fit.exponent
  const shrink = Math.min(1, fit.maxWidth / width, fit.maxHeight / (width / ratio))
  return {
    width: Math.round(width * shrink),
    height: Math.round((width / ratio) * shrink),
  }
}

export const logoBox = (
  set: LogoSet | null | undefined,
  logo: ImageMetadata,
  fit: LogoFit,
  what: string,
): LogoBox => {
  if (set === null || set === undefined || (unset(set.width) && unset(set.height)))
    return fitted(logo, fit)
  if (unset(set.width) || unset(set.height))
    throw new Error(`${what}: width and height must be filled in together`)
  return { width: set.width, height: set.height }
}
