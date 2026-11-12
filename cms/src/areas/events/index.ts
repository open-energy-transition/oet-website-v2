import type { CollectionConfig, GlobalConfig } from 'payload'

import { Events } from './Events'
import { EventTypes } from './EventTypes'
import { FormSubmissions } from './FormSubmissions'
import { NewsEventsPage } from './NewsEventsPage'
import { Pages } from './Pages'
import { Redirects } from './Redirects'

export const collections: CollectionConfig[] = [
  Events,
  EventTypes,
  Pages,
  Redirects,
  FormSubmissions,
]

export const globals: GlobalConfig[] = [NewsEventsPage]
