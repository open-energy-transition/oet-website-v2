import React from 'react'
import Image from 'next/image'
import { CalendarIcon, TagIcon } from 'lucide-react'
import RichText from '@/components/RichText'

import type { Project } from '@/payload-types'

export const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getImageUrl = (imageUrl: Project['imageUrl']): string | null => {
    if (!imageUrl) return null
    if (typeof imageUrl === 'number') return null
    return typeof imageUrl === 'object' && 'url' in imageUrl ? imageUrl.url || null : null
  }

  const imageUrl = getImageUrl(project.imageUrl)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {/* Project Status Badge */}
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                project.projectStatus === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {project.projectStatus === 'completed' ? 'Completed' : 'In Progress'}
            </span>

            {/* Service Badge */}
            {project.service && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                <TagIcon className="mr-1 h-3 w-3" />
                {project.service}
              </span>
            )}

            {/* Date */}
            {project.date && (
              <span className="inline-flex items-center text-sm text-gray-600">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {formatDate(project.date)}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>

          {project.subTitle && <p className="text-xl text-gray-600 mb-6">{project.subTitle}</p>}
        </header>

        {/* Main Image */}
        {imageUrl && (
          <div className="mb-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={project.title}
                width={800}
                height={450}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        {project.content && (
          <div className="prose prose-lg max-w-none mb-8">
            <RichText data={project.content} enableGutter={false} enableProse={false} />
          </div>
        )}

        {/* Categories */}
        {project.categories &&
          Array.isArray(project.categories) &&
          project.categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => {
                  const categoryName = typeof category === 'object' ? category.title : category
                  return (
                    <span
                      key={typeof category === 'object' ? category.id : category}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {categoryName}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

        {/* Related Projects */}
        {project.relatedProjects &&
          Array.isArray(project.relatedProjects) &&
          project.relatedProjects.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.relatedProjects.map((relatedProject) => {
                  if (typeof relatedProject === 'number') return null
                  const relatedImageUrl = getImageUrl(relatedProject.imageUrl)

                  return (
                    <div key={relatedProject.id} className="">
                      {relatedImageUrl && (
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={relatedImageUrl}
                            alt={relatedProject.title}
                            width={300}
                            height={169}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                          {relatedProject.title}
                        </h4>
                        {relatedProject.subTitle && (
                          <p className="mt-1 text-sm text-gray-600">{relatedProject.subTitle}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
