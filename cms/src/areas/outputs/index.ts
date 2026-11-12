import type { CollectionConfig, GlobalConfig } from 'payload'

import { Projects } from './Projects'
import { PublicationCategories } from './PublicationCategories'
import { Publications } from './Publications'
import { PublicationsPage } from './PublicationsPage'
import { Regions } from './Regions'
import { SuccessStoriesPage } from './SuccessStoriesPage'
import { Tags } from './Tags'
import { Testimonials } from './Testimonials'

export const collections: CollectionConfig[] = [
  Projects,
  Publications,
  Testimonials,
  Regions,
  Tags,
  PublicationCategories,
]

export const globals: GlobalConfig[] = [SuccessStoriesPage, PublicationsPage]
