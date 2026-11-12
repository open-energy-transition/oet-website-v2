import type { ImageMetadata } from 'astro'

export interface PartnerTag {
  name: string
  logo: ImageMetadata
  width: number
  height: number
}

export type TitleLines = 2 | 3

export type FrameTone =
  | 'bright'
  | 'brand-500'
  | 'brand-600'
  | 'brand-700'
  | 'brand-800'
  | 'brand-900'
  | 'neutral-800'
  | 'neutral-900'
  | 'neutral-950'

export type MobileFrame = 'scaled' | 'fixed'

export type CardHeight = 'natural' | 'fixed'
