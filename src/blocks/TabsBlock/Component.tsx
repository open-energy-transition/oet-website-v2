'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { CardBlock } from '../CardBlock/Component'

import type { TabsBlock as TabsBlockProps } from '@/payload-types'
import { ContentBlock } from '../Content/Component'
import { ClientTeamMembersBlock } from '../TeamMembersBlock/ClientWrapper'
import { ProjectsListBlock } from '../ProjectsListBlock'
import { PostsListBlock } from '../PostsListBlock'
import { ClientJobsBlock } from '../JobsBlock/ClientWrapper'

const renderTabContent = (content: any[]) => {
  if (!content || content.length === 0) return null

  return content.map((block, index) => {
    switch (block.blockType) {
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

export const TabsBlock: React.FC<TabsBlockProps> = (props) => {
  const { title, description, tabs, tabStyle = 'default', tabPosition = 'top' } = props
  const [activeTab, setActiveTab] = useState(0)

  if (!tabs || tabs.length === 0) {
    return null
  }

  const tabStyleClasses = {
    default: {
      nav: 'border-b border-gray-200',
      tab: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent',
      activeTab: 'text-blue-600 border-blue-600',
    },
    pills: {
      nav: 'space-x-2',
      tab: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100',
      activeTab: 'bg-blue-100 text-blue-700',
    },
    underline: {
      nav: '',
      tab: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300',
      activeTab: 'text-blue-600 border-blue-600',
    },
    bordered: {
      nav: 'border border-b-0 border-[#0B0C0B26] rounded-t-3xl overflow-hidden w-full',
      tab: 'text-center px-8 py-6 font-poppins text-2xl font-normal leading w-full',
      activeTab: 'bg-gray-100 shadow-sm',
    },
  } as const

  const currentStyle = tabStyleClasses[tabStyle as keyof typeof tabStyleClasses]
  const isVertical = tabPosition === 'left' || tabPosition === 'right'

  return (
    <div className="container my-16">
      {/* Title and Description */}
      {(title || description) && (
        <div className="mb-8">
          {title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>}
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
            'flex-row space-x-1': tabPosition === 'top',
            grid: tabStyle === 'bordered' && !isVertical,
          })}
          style={
            tabStyle === 'bordered' && !isVertical
              ? { gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }
              : undefined
          }
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn('transition-colors duration-200', currentStyle.tab, {
                [currentStyle.activeTab]: activeTab === index,
                'text-left': isVertical,
                'text-center': !isVertical,
              })}
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
            'border border-[#0B0C0B26] mt-0 rounded-b-3xl': tabStyle === 'bordered',
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
