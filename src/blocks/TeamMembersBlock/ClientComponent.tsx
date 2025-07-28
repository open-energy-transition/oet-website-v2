'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

import type { TeamMember } from '@/payload-types'

export type TeamMembersClientProps = {
  tag?: string
  title?: string
  description?: any
  teamMembers: TeamMember[]
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const imageUrl =
    typeof member.image === 'object' && member.image?.url ? member.image.url : undefined
  const { firstName, lastName, jobTitle, linkedIn, externalLink, x, description } = member

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col items-center p-6">
      {imageUrl && (
        <div className="mb-4 rounded-full overflow-hidden w-24 h-24">
          <Image
            src={imageUrl}
            alt="Team Member Image"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">
        {firstName} {lastName}
      </h3>
      {jobTitle && <p className="mt-1 text-sm text-gray-600">{jobTitle}</p>}
      {description && (
        <div className="mb-2">
          <RichText data={description} />
        </div>
      )}
      <div className="flex gap-2 mt-2">
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            LinkedIn
          </a>
        )}
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            Website
          </a>
        )}
        {x && (
          <a
            href={x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            X
          </a>
        )}
      </div>
    </div>
  )
}

export const TeamMembersClient: React.FC<TeamMembersClientProps> = ({
  tag,
  title,
  description,
  teamMembers,
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {(tag || title || description) && (
        <div className="mb-8 text-center">
          {tag && (
            <span className="inline-block mb-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 uppercase tracking-wide">
              {tag}
            </span>
          )}
          {title && <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>}
          {description && (
            <div className="max-w-2xl mx-auto text-gray-600">
              <RichText data={description} />
            </div>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers && teamMembers.length > 0 ? (
          teamMembers.map((member) => <TeamMemberCard key={member.id} member={member} />)
        ) : (
          <div className="col-span-full text-gray-500 text-center py-12">
            No team members found.
          </div>
        )}
      </div>
    </div>
  )
}
