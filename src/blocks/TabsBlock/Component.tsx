'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { CardBlock } from '../CardBlock/Component'

import type { TabsBlock as TabsBlockProps } from '@/payload-types'
import { ContentBlock } from '../Content/Component'
import { ClientTeamMembersBlock } from '../TeamMembersBlock/ClientWrapper'
import { ProjectsListBlock } from '../ProjectsListBlock'
import { PostsListBlock } from '../PostsListBlock'
import { ClientJobsBlock } from '../JobsBlock/ClientWrapper'
import { ClientDepartmentsListBlock } from '../DepartmentsListBlock/ClientWrapper'

const renderTabContent = (content: any[]) => {
  if (!content || content.length === 0) return null

  return content.map((block, index) => {
    switch (block.blockType) {
      case 'departmentsList':
        return (
          <ClientDepartmentsListBlock
            key={index}
            id={block.id}
            departments={block.departments || []}
            blockType={'departmentsList'}
          />
        )
      case 'content':
        return (
          <div key={index} className="prose max-w-none">
            <ContentBlock key={index} {...block} />
          </div>
        )
      case 'card':
        return <CardBlock key={index} {...block} />
      case 'teamMembers':
        return (
          <ClientTeamMembersBlock
            key={index}
            tag={block.tag || undefined}
            title={block.title || undefined}
            description={block.description || undefined}
            teamMembers={block.teamMembers || []}
            defaultStaffCategory={block.defaultStaffCategory}
          />
        )
      case 'jobs':
        return (
          <ClientJobsBlock
            key={index}
            tag={block.tag}
            title={block.title}
            description={block.description}
          />
        )
      case 'mediaBlock':
        return (
          <div key={index} className="my-8">
            {/* Simple media rendering */}
            {block.media?.url && (
              <Image
                src={block.media.url}
                alt={block.media.alt || ''}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            )}
          </div>
        )
      case 'projectsList':
        return (
          <div key={index} className="my-8">
            <ProjectsListBlock {...block} />
          </div>
        )
      case 'postsList':
        return (
          <div key={index} className="my-8">
            <PostsListBlock {...block} />
          </div>
        )
      case 'callToAction':
        return (
          <div key={index} className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{block.richText}</h3>
            {block.links?.map(
              (
                link: {
                  url: string | undefined
                  label:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactPortal
                        | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined
                },
                linkIndex: React.Key | null | undefined,
              ) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  {link.label}
                </a>
              ),
            )}
          </div>
        )
      default:
        return (
          <div key={index} className="p-4 bg-gray-100 rounded">
            <p>Unsupported block type: {block.blockType}</p>
          </div>
        )
    }
  })
}

// Helper function to slugify text for hash URLs
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim() // Trim whitespace
}

export const TabsBlock: React.FC<TabsBlockProps> = (props) => {
  const { title, description, tabs, tabStyle = 'default', tabPosition = 'top' } = props

  // Get initial tab index based on URL hash
  const [activeTab, setActiveTab] = useState(0)

  // Set active tab based on URL hash when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && tabs && tabs.length > 0) {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return // No hash in URL, use default tab

      // Find tab index by matching hash with slugified tab titles
      const tabIndex = tabs.findIndex((tab) => slugify(tab.title || '') === hash)

      if (tabIndex !== -1) {
        setActiveTab(tabIndex)
      }
    }
  }, [tabs])

  // Listen for hash changes in the URL
  useEffect(() => {
    const handleHashChange = () => {
      if (!tabs || tabs.length === 0) return

      const hash = window.location.hash.replace('#', '')
      if (!hash) return // No hash in URL, keep current tab

      // Find tab index by matching hash with slugified tab titles
      for (let i = 0; i < tabs.length; i++) {
        const tabSlug = slugify(tabs[i].title || '')

        if (tabSlug === hash) {
          setActiveTab(i)
          return
        }
      }
    }

    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange)

      // Also run once on mount to handle initial hash
      handleHashChange()
    }

    // Clean up
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange)
      }
    }
  }, [tabs])

  if (!tabs || tabs.length === 0) {
    return null
  }
  const tabStyleClasses = {
    default: {
      nav: 'space-x-2',
      tab: 'text-gray-black-300 pb-2 hover:text-gray-black-500 border-b-2 font-normal border-transparent dark:!text-white',
      activeTab: 'border-red-600 font-bold text-gray-black-500 dark:!text-white',
    },
    pills: {
      nav: 'space-x-2',
      tab: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100',
      activeTab: 'bg-red-100 text-red-700',
    },
    underline: {
      nav: '',
      tab: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300',
      activeTab: 'text-red-600 border-red-600',
    },
    bordered: {
      nav: 'border border-b-0 border-[#0B0C0B26] dark:border-dark-blue-gray rounded-t-3xl overflow-hidden w-full',
      tab: 'text-center px-8 py-6 font-poppins text-2xl font-normal leading w-full',
      activeTab: 'bg-gray-100',
    },
  } as const

  const currentStyle = tabStyleClasses[tabStyle as keyof typeof tabStyleClasses]
  const isVertical = tabPosition === 'left' || tabPosition === 'right'

  const mapTitleSizes = (size: string | null) => {
    switch (size) {
      case 'xs':
        return 'text-xs'
      case 'sm':
        return 'text-sm'
      case 'md':
        return 'text-base'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      case '2xl':
        return 'text-2xl'
      default:
        return 'text-base'
    }
  }
  return (
    <div className="container -my-8 lg:my-16">
      {/* Title and Description */}
      {(title || description) && (
        <div className="mb-8">
          {title && <h2 className="text-3xl font-oxanium font-bold text-gray-900 mb-4">{title}</h2>}
          {description && <p className="text-lg text-gray-600 max-w-3xl">{description}</p>}
        </div>
      )}

      {/* Tabs Container */}
      <div
        className={cn('w-full', {
          flex: isVertical,
          'flex-col': !isVertical,
        })}
      >
        {/* Tab Navigation */}
        <div
          className={cn('flex', currentStyle.nav, {
            'flex-col space-y-1 mr-6 min-w-48': tabPosition === 'left',
            'flex-col space-y-1 ml-6 min-w-48 order-2': tabPosition === 'right',
            'flex-col lg:flex-row gap-6': tabPosition === 'top',
          })}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index)
                // Update URL hash when clicking on a tab
                if (typeof window !== 'undefined') {
                  const hash = slugify(tab.title || '')
                  window.history.pushState(null, '', `#${hash}`)
                }
              }}
              className={cn(
                'transition-colors duration-200 leading-none font-heebo',
                mapTitleSizes(tab.titleSize as string),
                currentStyle.tab,
                {
                  [currentStyle.activeTab]: activeTab === index,
                  'text-left': isVertical,
                  'text-center': !isVertical,
                  'flex-1': tabStyle === 'bordered' && !isVertical,
                },
              )}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={cn('mt-6', {
            'flex-1': isVertical,
            'mt-6': !isVertical,
            'border border-[#0B0C0B26] dark:border-dark-blue-gray mt-0 rounded-b-3xl':
              tabStyle === 'bordered',
          })}
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={cn('transition-opacity duration-200', {
                block: activeTab === index,
                hidden: activeTab !== index,
              })}
            >
              {tab.content && tab.content.length > 0 && renderTabContent(tab.content)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
