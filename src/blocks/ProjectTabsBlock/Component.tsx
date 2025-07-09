import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ProjectTabsBlock as ProjectTabsBlockProps } from '@/payload-types'
import { ProjectTabsClient } from './ClientComponent'

export const ProjectTabsBlock: React.FC<
  ProjectTabsBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, showTabs, tabLabels, displayOptions } = props

  const limit = 999999

  const payload = await getPayload({ config: configPromise })

  const flattenedCategories = categories?.map((category) => {
    if (typeof category === 'object') return category.id
    else return category
  })

  // Fetch in-progress projects
  const inProgressQuery = await payload.find({
    collection: 'projects',
    depth: 1,
    limit,
    where: {
      projectStatus: { equals: 'in-progress' },
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            categories: {
              in: flattenedCategories,
            },
          }
        : {}),
    },
  })

  // Fetch completed projects
  const completedQuery = await payload.find({
    collection: 'projects',
    depth: 1,
    limit,
    where: {
      projectStatus: { equals: 'completed' },
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            categories: {
              in: flattenedCategories,
            },
          }
        : {}),
    },
  })

  const projects = {
    inProgress: inProgressQuery.docs,
    completed: completedQuery.docs,
  }

  return (
    <div className={id ? `block-${id}` : ''}>
      <ProjectTabsClient
        introContent={introContent}
        showTabs={showTabs}
        tabLabels={tabLabels}
        displayOptions={displayOptions}
        categories={categories}
        projects={projects}
      />
    </div>
  )
}
