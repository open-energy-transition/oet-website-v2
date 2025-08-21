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
    <div className="">
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-kode_mono_h5">{project.title}</h3>
            {displayOptions?.showSubtitle && project.subTitle && (
              <p className="mt-4 text-heebo-regular-normal">{project.subTitle}</p>
            )}
          </div>
          {/* <div className="ml-4 flex flex-col items-end space-y-2">
            {displayOptions?.showService && project.service && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {project.service}
              </span>
            )}
            {displayOptions?.showDate && project.date && (
              <span className="text-xs text-gray-500">{formatDate(project.date)}</span>
            )}
          </div> */}
        </div>

        {/* Learn More Button */}
        {project.slug && (
          <div className="mt-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center text-heebo-regular-normal font-medium"
            >
              Learn more
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
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
      <div className="container mx-auto px-4 py-12">
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
    <div className="container mx-auto px-4 py-12">
      {title && <div className="customTextState-poppins-h5">{title}</div>}
      {introContent && (
        <div className="text-heebo-medium-normal mt-6">
          <RichText enableGutter={false} enableProse={false} data={introContent} />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-8 mt-14">
        <nav className="flex space-x-8 h-[80px]" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'whitespace-nowrap w-1/2 border-r border-[#0B0C0B26] py-2 px-1 customTextState-size-h8 font-medium transition-colors',
                activeTab === tab.key
                  ? 'bg-[#F4F6F0] text-[#26372C]'
                  : 'border-transparent text-[#26372C] font-normal',
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
