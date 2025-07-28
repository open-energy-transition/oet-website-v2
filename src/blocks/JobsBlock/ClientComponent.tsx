'use client'

import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

import type { Job } from '@/payload-types'

export type JobsClientProps = {
  tag?: string
  title?: string
  description?: any
  jobs: Job[]
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  // const imageUrl = typeof job.image === 'object' && job.image?.url ? job.image.url : undefined
  const { location, description, jobTitle } = job

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg flex flex-col items-stretch p-6">
      {/* Job Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center w-full">{jobTitle}</h3>
      {/* Description */}
      <div className="mb-4 text-gray-700 text-sm w-full">
        <RichText data={description} />
      </div>
      {/* Location */}
      <div className="flex gap-2 mt-auto items-center justify-center">
        {location && (
          <span className="inline-flex items-center gap-1 text-gray-500 text-xs bg-gray-100 rounded px-2 py-1">
            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            {location}
          </span>
        )}
      </div>
    </div>
  )
}

export const JobsClient: React.FC<JobsClientProps> = ({ tag, title, description, jobs }) => {
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
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-full text-gray-500 text-center py-12">No jobs found.</div>
        )}
      </div>
    </div>
  )
}
