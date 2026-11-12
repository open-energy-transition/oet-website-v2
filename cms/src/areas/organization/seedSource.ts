import type { Payload } from 'payload'

import { iconNames, type IconName } from '../../fields/iconNames'
import { upload, type Asset, type IconRef } from '../../seed/lib'

export interface ResponsiveAsset {
  desktop: Asset
  mobile: Asset
}

export interface LinkSource {
  label: string
  href: string
}

export interface MetaSource {
  title: string
  description: string
}

export interface CountSource {
  value: string
  label: string
}

export interface ViewSource {
  lon: number
  lat: number
}

export const iconName = (ref: IconRef): IconName => {
  const found = iconNames.find((name) => name === ref.__icon)
  if (!found) throw new Error(`Icon ${ref.__icon} is not in the site icon set`)
  return found
}

export const responsive = async (payload: Payload, source: ResponsiveAsset) => ({
  desktop: await upload(payload, source.desktop, ''),
  mobile: await upload(payload, source.mobile, ''),
})

export const linkOf = ({ label, href }: LinkSource) => ({ label, href })

export const coordinatesOf = ({ lon, lat }: ViewSource) => ({ longitude: lon, latitude: lat })

export const departmentKey = (label: string) =>
  label
    .toLowerCase()
    .replaceAll('&', 'and')
    .replaceAll('modelling', 'modeling')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const assertNumbered = (items: { number: string }[], what: string) => {
  items.forEach((item, index) => {
    const expected = String(index + 1).padStart(2, '0')
    if (item.number !== expected)
      throw new Error(`${what} ${index + 1} is numbered ${item.number}, expected ${expected}`)
  })
}
