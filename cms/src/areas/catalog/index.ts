import type { CollectionConfig, GlobalConfig } from 'payload'

import { CtaBanners } from './CtaBanners'
import { Services } from './Services'
import { ServicesPage } from './ServicesPage'
import { ToolCategories } from './ToolCategories'
import { Tools } from './Tools'
import { ToolsPage } from './ToolsPage'

export const collections: CollectionConfig[] = [Services, Tools, ToolCategories, CtaBanners]

export const globals: GlobalConfig[] = [ServicesPage, ToolsPage]
