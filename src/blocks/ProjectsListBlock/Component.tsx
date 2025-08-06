import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ProjectsListBlock as ProjectsListBlockProps } from '@/payload-types'

export const ProjectsListBlock: React.FC<
  ProjectsListBlockProps & {
    id?: string
  }
> = async (props) => {
  console.log('ProjectsListBlock props:', props)

  return (
    <div>
      123123
      {/* <ProjectsListClient
        introContent={introContent}
        showTabs={showTabs}
        tabLabels={tabLabels}
        displayOptions={displayOptions}
        categories={categories}
        projects={projects}
      /> */}
    </div>
  )
}
