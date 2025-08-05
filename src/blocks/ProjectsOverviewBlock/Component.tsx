import React from 'react'
import type { Project, ProjectsOverviewBlock as ProjectsOverviewBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { ProjectCard } from './ProjectCard'

export const ProjectsOverviewBlock: React.FC<ProjectsOverviewBlockProps> = ({
  title,
  description,
  unitsButton,
  projects,
}) => {
  return (
    <div className="container py-8">
      <div className="flex justify-between">
        <div className="mb-6 ">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && <RichText className="" data={description} />}
        </div>
        <div>
          {unitsButton?.link && (
            <CMSLink
              {...unitsButton.link}
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold"
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {Array.isArray(projects) &&
          projects.length > 0 &&
          projects.map((item, i) => {
            return <ProjectCard key={i} project={item.project as Project} />
          })}
      </div>
    </div>
  )
}
