import React from 'react'
import Image from 'next/image'
import { CalendarIcon, TagIcon } from 'lucide-react'
import RichText from '@/components/RichText'

import type { Project } from '@/payload-types'
import Link from 'next/link'

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
      <div className="mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {/* Project Status Badge */}
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                project.projectStatus === 'completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-[#E6FAEE] border border-[#B8F0CE] text-[#166A3F]'
              }`}
            >
              {project.projectStatus === 'completed' ? 'Completed' : 'In Progress'}
            </span>

            {/* Service Badge */}
            {project.service && (
              <span className=" items-center hidden lg:inline-flex rounded-full bg-[#ECEFF3] px-3 py-1 text-sm font-medium text-gray-black-300">
                <TagIcon className="mr-1 h-3 w-3" />
                {project.service}
              </span>
            )}
          </div>

          {/* Service Badge */}
          <div className="lg:hidden flex flex-wrap items-center gap-2 mb-4">
            {project.service &&
              project.service.split(',').map((serviceItem, index) => (
                <span
                  key={index}
                  className="overflow-ellipsis max-w-[90vw] items-center inline-flex rounded-xl bg-[#ECEFF3] px-2 text-sm font-medium text-gray-black-300"
                >
                  {serviceItem.trim()}
                </span>
              ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">{project.title}</h1>
          {/* Date */}
          {project.date && (
            <span className="inline-flex items-center text-sm text-gray-600 dark:text-white">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {formatDate(project.date)}
            </span>
          )}
          {project.subTitle && (
            <p className="text-xl text-gray-600 mb-6 dark:text-white">{project.subTitle}</p>
          )}
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
              <h3 className="lg:text-5xl text-2xl dark:text-white font-semibold text-gray-black-500 mb-6">
                Related Projects
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.relatedProjects.map((relatedProject) => {
                  if (typeof relatedProject === 'number') return null
                  const relatedImageUrl = getImageUrl(relatedProject.imageUrl)

                  return (
                    <div
                      key={relatedProject.id}
                      className="flex flex-col items-start border border-[#D9DCDA] border-t-0 rounded-xl dark:border"
                    >
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
                      <div className="p-6 w-full">
                        <h4 className="font-semibold text-lg mb-1 customTextState-size-h8 text-gray-black-400 min-h-[60px] max-h-[60px] overflow-hidden line-clamp-3 text-ellipsis">
                          {relatedProject.title}
                        </h4>
                        {relatedProject.subTitle && (
                          <p className="customTextState-size-h9 text-gray-black-300 min-h-[72px] max-h-[72px] overflow-hidden line-clamp-3 text-ellipsis">
                            {relatedProject.subTitle}
                          </p>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-poppins-x-small text-base text-gray-black-500 flex dark:!text-white items-center gap-2"
                          aria-label={`View details for project: ${project.title}`}
                        >
                          <span className="underline">View Project</span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="dark:fill-white"
                              d="M15.4 12L9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12Z"
                              fill="#26372C"
                            />
                          </svg>
                        </Link>
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
