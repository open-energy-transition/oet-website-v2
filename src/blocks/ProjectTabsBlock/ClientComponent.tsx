'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

gsap.registerPlugin(ScrollTrigger)

import type { Project, Partner, ProjectTabsBlock as ProjectTabsBlockProps } from '@/payload-types'

type ProjectWithPartners = Project & { partners?: (number | Partner)[] | null }

export type ProjectTabsClientProps = {
  projects: {
    inProgress: ProjectWithPartners[]
    completed: ProjectWithPartners[]
  }
  introContent: ProjectTabsBlockProps['introContent']
  showTabs: ProjectTabsBlockProps['showTabs']
  tabLabels: ProjectTabsBlockProps['tabLabels']
  displayOptions: ProjectTabsBlockProps['displayOptions']
  categories: ProjectTabsBlockProps['categories']
  title: ProjectTabsBlockProps['title']
}

const ProjectCard: React.FC<{
  project: ProjectWithPartners
  displayOptions: ProjectTabsBlockProps['displayOptions']
}> = ({ project, displayOptions }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  const getImageUrl = (imageUrl: Project['imageUrl']): string | null => {
    if (!imageUrl) return null
    if (typeof imageUrl === 'number') return null
    return typeof imageUrl === 'object' && 'url' in imageUrl ? imageUrl.url || null : null
  }

  const imageUrl = getImageUrl(project.imageUrl)

  // Hover animations
  useEffect(() => {
    const card = cardRef.current
    const imgWrap = imageWrapperRef.current
    const img = imageRef.current
    const arrow = arrowRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      // Card lift & shadow on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -6,
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          duration: 0.4,
          ease: 'power3.out',
          borderColor: '#A0A5A1',
        })
        // Image zoom
        if (img) {
          gsap.to(img, {
            scale: 1.15,
            duration: 0.5,
            ease: 'power3.out',
          })
        }
        // Arrow slide
        if (arrow) {
          gsap.to(arrow, {
            x: 4,
            duration: 0.35,
            ease: 'power3.out',
          })
        }
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.4,
          ease: 'power3.out',
          borderColor: '#D9DCDA',
        })
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
          })
        }
        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            duration: 0.35,
            ease: 'power3.out',
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-start border border-[#D9DCDA] border-t-0 rounded-xl dark:border-dark-blue-gray will-change-transform"
    >
      {imageUrl && (
        <div
          ref={imageWrapperRef}
          className="object-cover min-h-[232px] w-full lg:h-[217px] rounded-xl overflow-hidden"
        >
          <Image
            ref={imageRef}
            src={imageUrl}
            alt={project.title}
            width={400}
            height={225}
            className="rounded-xl w-full object-cover will-change-transform"
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
        {/* Partners */}
        {project.partners && project.partners.length > 0 && (
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {project.partners.map((p) => {
              const partner = typeof p === 'object' ? p : null
              if (!partner) return null
              const logo =
                partner.logo && typeof partner.logo === 'object' && 'url' in partner.logo
                  ? partner.logo.url
                  : null
              return (
                <a
                  key={partner.id}
                  href={partner.website || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  {logo ? (
                    <div className="w-8 h-8 rounded overflow-hidden bg-white">
                      <Image
                        src={logo}
                        alt={partner.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-600 dark:text-gray-300">{partner.name}</span>
                  )}
                </a>
              )
            })}
          </div>
        )}

        {/* Learn More Button */}
        {project.slug && (
          <div className="mt-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-heebo-regular-normal font-medium text-gray-black-500 dark:!text-white"
            >
              View project
              <span ref={arrowRef} className="inline-flex will-change-transform">
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
              </span>
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
  const [prevTab, setPrevTab] = useState<'in-progress' | 'completed'>('completed')

  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tabContainerRef = useRef<HTMLDivElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)

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

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header (title + intro content)
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      // Animate tab buttons with stagger
      if (tabContainerRef.current) {
        gsap.fromTo(
          tabContainerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tabContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      // Animate project cards row by row on scroll
      if (gridContainerRef.current) {
        // Find the visible grid: search for a non-hidden [data-grid], or use the container itself
        const visibleGrid =
          gridContainerRef.current.querySelector('[data-grid]:not(.hidden)') ||
          gridContainerRef.current
        // The grid wrapper is the immediate child — get its direct children (the cards)
        const gridEl = visibleGrid.querySelector(':scope > .grid, :scope > div')
        const cards = gridEl ? gridEl.children : visibleGrid.children

        if (cards.length > 0) {
          const cols = 3
          // Group cards into rows
          const rows: Element[][] = []
          Array.from(cards).forEach((card, i) => {
            const rowIdx = Math.floor(i / cols)
            if (!rows[rowIdx]) rows[rowIdx] = []
            rows[rowIdx].push(card)
          })

          // Hide all rows initially
          rows.forEach((row) => gsap.set(row, { y: 120, opacity: 0, scale: 0.95 }))

          // Animate one full row at a time — each row appears as a complete unit
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gridContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })

          rows.forEach((row) => {
            tl.to(row, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
            })
            // Small pause between rows for visible row-by-row effect
            tl.to({}, { duration: 0.2 })
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [projects, showTabs])

  // Animate tab switch — row by row
  useEffect(() => {
    if (prevTab === activeTab) return

    const ctx = gsap.context(() => {
      if (!gridContainerRef.current) return

      const cols = 3

      // Helper: get the grid wrapper's children (cards), grouped by row
      const getCardRows = (panel: Element): Element[][] => {
        const gridEl = panel.querySelector(':scope > .grid, :scope > div')
        const items = gridEl ? Array.from(gridEl.children) : Array.from(panel.children)
        const rows: Element[][] = []
        items.forEach((child, i) => {
          const rowIdx = Math.floor(i / cols)
          if (!rows[rowIdx]) rows[rowIdx] = []
          rows[rowIdx].push(child)
        })
        return rows
      }

      // Fade out old grid — row by row
      const oldGrid = gridContainerRef.current.querySelector(`[data-grid="${prevTab}"]`)
      if (oldGrid) {
        const oldRows = getCardRows(oldGrid)
        const tlOut = gsap.timeline()
        oldRows.forEach((row) => {
          tlOut.to(row, {
            y: -30,
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: 'power2.in',
          })
          tlOut.to({}, { duration: 0.05 })
        })
      }

      // Fade in new grid — row by row
      const newGrid = gridContainerRef.current.querySelector(`[data-grid="${activeTab}"]`)
      if (newGrid) {
        const newRows = getCardRows(newGrid)
        newRows.forEach((row) => gsap.set(row, { y: 80, opacity: 0, scale: 0.95 }))

        const tlIn = gsap.timeline({ delay: 0.25 })
        newRows.forEach((row) => {
          tlIn.to(row, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
          })
          tlIn.to({}, { duration: 0.15 })
        })
      }
    })

    setPrevTab(activeTab)
    return () => ctx.revert()
  }, [activeTab, prevTab])

  if (!showTabs) {
    // Show all projects without tabs
    const allProjects = [...inProgressProjects, ...completedProjects]
    return (
      <div ref={sectionRef} className="container mx-auto px-4 -my-4 lg:py-12">
        {introContent && (
          <div ref={headerRef} className="mb-8">
            <RichText data={introContent as any} />
          </div>
        )}
        <div ref={gridContainerRef} data-grid>
          <ProjectGrid projects={allProjects} displayOptions={displayOptions} />
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="container mx-auto px-4 -my-4 lg:py-12">
      <div ref={headerRef} className="flex flex-col lg:flex-row gap-4">
        {title && (
          <div className="font-oxanium text-5xl font-semibold text-gray-black-500 dark:text-white mb-4 lg:w-1/2">
            {title}
          </div>
        )}
        {introContent && (
          <div className="text-heebo-medium-normal text-[#777980] dark:text-gray-300 lg:w-1/2">
            <RichText enableGutter={false} enableProse={false} data={introContent as any} />
          </div>
        )}
      </div>
      {/* Tab Navigation */}
      <div className="mb-8 mt-14">
        <div
          ref={tabContainerRef}
          className="flex border border-[#0B0C0B26] dark:border-dark-blue-gray rounded-3xl overflow-hidden w-full flex-col lg:flex-row gap-6"
          role="tablist"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'transition-colors duration-200 px-8 py-6 font-poppins text-2xl font-normal leading-none w-full text-center flex-1',
                activeTab === tab.key
                  ? 'bg-gray-100 text-[#26372C] dark:bg-gray-800 dark:text-white'
                  : 'bg-transparent text-[#26372C] dark:text-white',
              )}
              aria-current={activeTab === tab.key ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div ref={gridContainerRef} className="mt-16">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            data-grid={tab.key}
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
