import React from 'react'
import type { ProjectsListBlock as ProjectsListBlockProps } from '@/payload-types'

export const ProjectsListBlock: React.FC<ProjectsListBlockProps & { id?: string }> = (props) => {
  const { projects } = props

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {(projects ?? []).map((project: any) => (
          <div key={project.id} className="border rounded-xl p-4 shadow">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            {project.subTitle && <div className="text-gray-500 mb-2">{project.subTitle}</div>}
            <div className="text-sm text-gray-400 mb-2">Status: {project.projectStatus}</div>
            {project.date && (
              <div className="text-xs text-gray-400 mb-2">
                Date: {new Date(project.date).toLocaleDateString()}
              </div>
            )}
            {/* Render project content if needed */}
            {/* <div>{JSON.stringify(project.content)}</div> */}
          </div>
        ))}
      </div>
    </div>
  )
}
