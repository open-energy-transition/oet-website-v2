'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import type { Project, ProjectsOverviewBlock as ProjectsOverviewBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { ProjectCard } from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export const ProjectsOverviewBlock: React.FC<ProjectsOverviewBlockProps> = ({
  title,
  description,
  unitsButton,
  projects,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header (title + description)
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

      // Animate project cards staggered
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [projects])

  return (
    <div ref={sectionRef} className="bg-[#FAFAFA] dark:bg-[#1a1f2e] transition-colors duration-300">
      <div className="container py-16">
        <div ref={headerRef} className="lg:flex justify-between">
          <div className="mb-6 lg:w-1/2">
            <h2 className="font-oxanium mb-2 text-4xl font-semibold lg:text-5xl text-gray-black-500 dark:text-white">
              {title}
            </h2>
          </div>
          <div className="lg:w-1/2">
            {description && (
              <RichText
                enableGutter={false}
                enableProse={false}
                className="text-gray-black-400"
                data={description}
              />
            )}
          </div>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-14">
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
