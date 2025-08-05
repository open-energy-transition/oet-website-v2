import React from 'react'
import type { Project } from '@/payload-types'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'

export const ProjectCard: React.FC<{
  project: Project
}> = async ({ project }) => {
  const payload = await getPayload({ config: configPromise })

  const media = await payload.findByID({
    collection: 'media',
    id: project.imageUrl as number,
  })

  return (
    <div className="p-6 bg-card rounded-lg shadow flex flex-col items-start gap-3">
      {media && <Media resource={media} className="object-cover w-full h-full" />}
      <h3 className="font-semibold text-lg mb-1">{project.title}</h3>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        {project.projectStatus && (
          <span className="inline-block px-2 py-1 bg-gray-100 rounded">
            {project.projectStatus === 'in-progress' ? 'In Progress' : 'Completed'}
          </span>
        )}
        {project.date && <span>{new Date(project.date).toLocaleDateString()}</span>}
      </div>
      {project.subTitle && (
        <div className="text-sm text-muted-foreground mb-1">{project.subTitle}</div>
      )}
      <CMSLink
        type="custom"
        url={`/projects/${project.slug}`}
        label="View Project"
        className="mt-auto inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-semibold"
      />
    </div>
  )
}
