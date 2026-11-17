import type { ImageMetadata } from 'astro'

export type PartnerTag =
  | { kind: 'logo'; name: string; logo: ImageMetadata; width: number; height: number }
  | { kind: 'name'; name: string }

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
