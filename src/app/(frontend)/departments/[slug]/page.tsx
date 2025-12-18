import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'

import type { Department, Project, TeamMember } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ProjectCard } from '@/blocks/ProjectsOverviewBlock/ProjectCard'
import { TeamMemberCard } from '@/blocks/TeamMembersBlock/ClientComponent'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const departments = await payload.find({
    collection: 'departments',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    // select: {
    //   id: true,
    // },
  })

  const params = departments.docs.map((doc) => {
    return { slug: doc.id.toString() }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Department({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/departments/' + slug
  const department = await queryDepartmentById({ id: slug })

  if (!department) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Department Hero */}
      <div className="container">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">{department.department}</h1>
          {department.shortDescription && (
            <p className="text-xl text-gray-600 text-center">{department.shortDescription}</p>
          )}

          {/* Representative member if available */}
          {department.representativeMember &&
            typeof department.representativeMember === 'object' && (
              <div className="flex flex-col items-center mt-4 mb-8">
                {department.representativeMember.image && (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm mb-2">
                    <Image
                      src={
                        typeof department.representativeMember.image === 'object' &&
                        department.representativeMember.image.url
                          ? department.representativeMember.image.url
                          : `/api/media/${department.representativeMember.image}`
                      }
                      alt={
                        `${department.representativeMember.firstName || ''} ${department.representativeMember.lastName || ''}`.trim() ||
                        'Department Representative'
                      }
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold">
                  {department.representativeMember.firstName}{' '}
                  {department.representativeMember.lastName}
                </h3>
                {department.representativeMember.jobTitle && (
                  <p className="text-gray-600">{department.representativeMember.jobTitle}</p>
                )}
              </div>
            )}
        </div>

        {/* Department content */}
        <div className=" mx-auto">
          <RichText
            className="prose max-w-none"
            data={department.description}
            enableGutter={false}
          />
        </div>

        {/* Department projects */}
        {department.projects && department.projects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Department Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-14">
              {department?.projects &&
                department.projects.map((project, i) => {
                  // Only process projects that are objects (not IDs)
                  if (typeof project !== 'object' || !project) return null

                  return <ProjectCard key={i} project={project as Project} />
                })}
            </div>
          </div>
        )}

        {/* Department team members */}
        {department.teamMembers && department.teamMembers.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {department.teamMembers
                .filter((member) => typeof member === 'object' && member)
                .sort((a, b) => {
                  const lastNameA = (a as TeamMember).lastName?.toLowerCase() || ''
                  const lastNameB = (b as TeamMember).lastName?.toLowerCase() || ''
                  return lastNameA.localeCompare(lastNameB)
                })
                .map((member, i) => (
                  <TeamMemberCard key={i} member={member as TeamMember} />
                ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const department = await queryDepartmentById({ id: slug })

  return generateMeta({ doc: department })
}

const queryDepartmentById = cache(async ({ id }: { id: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  try {
    // Fetch the department by ID with population
    const department = await payload.findByID({
      collection: 'departments',
      id,
      draft,
      depth: 2, // Populate nested relationships
    })

    return department || null
  } catch (error) {
    console.error('Error fetching department:', error)
    return null
  }
})
