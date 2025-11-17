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
    <div className="bg-[#FAFAFA]">
      <div className="container py-8">
        <div className="lg:flex justify-between">
          <div className="mb-6 lg:w-1/2">
            <h2 className="text-oxanium-3xl text-4xl">{title}</h2>
          </div>
          <div className="lg:w-1/2">
            {description && (
              <RichText
                enableGutter={false}
                enableProse={false}
                className="mt-4"
                data={description}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-14">
          {Array.isArray(projects) &&
            projects.length > 0 &&
            projects.map((item, i) => {
              return <ProjectCard key={i} project={item.project as Project} />
            })}
        </div>
      </div>
    </div>
  )
}
