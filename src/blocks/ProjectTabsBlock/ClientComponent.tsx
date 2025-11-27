'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

import type { Project, ProjectTabsBlock as ProjectTabsBlockProps } from '@/payload-types'

export type ProjectTabsClientProps = {
  projects: {
    inProgress: Project[]
    completed: Project[]
  }
  introContent: ProjectTabsBlockProps['introContent']
  showTabs: ProjectTabsBlockProps['showTabs']
  tabLabels: ProjectTabsBlockProps['tabLabels']
  displayOptions: ProjectTabsBlockProps['displayOptions']
  categories: ProjectTabsBlockProps['categories']
  title: ProjectTabsBlockProps['title']
}

const ProjectCard: React.FC<{
  project: Project
  displayOptions: ProjectTabsBlockProps['displayOptions']
}> = ({ project, displayOptions }) => {
  const getImageUrl = (imageUrl: Project['imageUrl']): string | null => {
    if (!imageUrl) return null
    if (typeof imageUrl === 'number') return null
    return typeof imageUrl === 'object' && 'url' in imageUrl ? imageUrl.url || null : null
  }

  const imageUrl = getImageUrl(project.imageUrl)

  return (
    <div className="flex flex-col items-start border border-[#D9DCDA] border-t-0 rounded-xl dark:border-dark-blue-gray">
      {imageUrl && (
        <div className="object-cover min-h-[232px] w-full lg:h-[217px] rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            width={400}
            height={225}
            className="rounded-xl w-full object-cover"
          />
        </div>
      )}
      <div className="p-4 lg:p-6 w-full">
        <h3 className="font-semibold text-lg mb-1 customTextState-size-h8 text-gray-black-400 min-h-[60px] max-h-[60px] overflow-hidden line-clamp-3 text-ellipsis">
          {project.title}
        </h3>
        {project.subTitle && (
          <div className="customTextState-size-h9 text-gray-black-300 min-h-[72px] max-h-[72px] overflow-hidden line-clamp-3 text-ellipsis dark:!text-white">
            {project.subTitle}
          </div>
        )}

        {/* Learn More Button */}
        {project.slug && (
          <div className="mt-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-heebo-regular-normal font-medium text-gray-black-500 dark:!text-white"
            >
              View projects
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6667 0C10.6667 0.494667 11.1553 1.23333 11.65 1.85333C12.286 2.65333 13.046 3.35133 13.9173 3.884C14.5707 4.28333 15.3627 4.66667 16 4.66667M16 4.66667C15.3627 4.66667 14.57 5.05 13.9173 5.44933C13.046 5.98267 12.286 6.68067 11.65 7.47933C11.1553 8.1 10.6667 8.84 10.6667 9.33333M16 4.66667L-4.76837e-07 4.66667"
                  stroke="#1D1F2C"
                  strokeWidth="1.2"
                  className="dark:fill-white dark:stroke-white"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const ProjectGrid: React.FC<{
  projects: Project[]
  displayOptions: ProjectTabsBlockProps['displayOptions']
}> = ({ projects, displayOptions }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} displayOptions={displayOptions} />
      ))}
    </div>
  )
}

export const ProjectTabsClient: React.FC<ProjectTabsClientProps> = ({
  introContent,
  showTabs,
  tabLabels,
  displayOptions,
  projects,
  title,
}) => {
  const [activeTab, setActiveTab] = useState<'in-progress' | 'completed'>('completed')

  const inProgressProjects = projects?.inProgress || []
  const completedProjects = projects?.completed || []

  const tabs = [
    {
      key: 'completed' as const,
      label: tabLabels?.completedLabel || 'Completed',
      projects: completedProjects,
      count: completedProjects.length,
    },
    {
      key: 'in-progress' as const,
      label: tabLabels?.inProgressLabel || 'In Progress',
      projects: inProgressProjects,
      count: inProgressProjects.length,
    },
  ]

  if (!showTabs) {
    // Show all projects without tabs
    const allProjects = [...inProgressProjects, ...completedProjects]
    return (
      <div className="container mx-auto px-4 -my-4 lg:py-12">
        {introContent && (
          <div className="mb-8">
            <RichText data={introContent} />
          </div>
        )}
        <ProjectGrid projects={allProjects} displayOptions={displayOptions} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 -my-4 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-4">
        {title && (
          <div className="customTextState-poppins-h5 font-semibold text-2xl lg:w-1/2">{title}</div>
        )}
        {introContent && (
          <div className="text-heebo-medium-normal text-[#777980] dark:text-gray-300 lg:w-1/2">
            <RichText enableGutter={false} enableProse={false} data={introContent} />
          </div>
        )}
      </div>
      {/* Tab Navigation */}
      <div className="mb-8 mt-14">
        <nav
          className="flex space-x-8 h-[80px] border-[#DFE1E7] border rounded-2xl p-1.5"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'whitespace-nowrap w-1/2 rounded-xl py-2 px-1 customTextState-size-h8 text-base lg:text-2xl font-medium transition-colors',
                activeTab === tab.key
                  ? 'bg-[#DFE1E7] text-[#26372C]'
                  : 'border-transparent text-[#26372C] font-normal dark:text-white',
              )}
              aria-current={activeTab === tab.key ? 'page' : undefined}
            >
              {tab.label}
              {/* {tab.count > 0 && (
                <span
                  className={cn(
                    'ml-2 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs',
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-500',
                  )}
                >
                  {tab.count}
                </span>
              )}
              */}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-16">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={cn(
              'transition-opacity duration-200',
              activeTab === tab.key ? 'opacity-100' : 'hidden opacity-0',
            )}
          >
            <ProjectGrid projects={tab.projects} displayOptions={displayOptions} />
          </div>
        ))}
      </div>
    </div>
  )
}
