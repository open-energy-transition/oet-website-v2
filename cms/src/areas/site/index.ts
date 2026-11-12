import type { CollectionConfig, GlobalConfig } from 'payload'

import { HomePage } from './HomePage'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { SiteSettings } from './SiteSettings'

export const collections: CollectionConfig[] = []

export const globals: GlobalConfig[] = [HomePage, SiteHeader, SiteFooter, SiteSettings]
