'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import Link from 'next/link'

export type Job = {
  id: string | number
  title: string
  location?: string
  department?: string
  description?: string | Record<string, unknown>
  slug: string
  publishedAt?: string
  status?: string
  content?: string
  applicationUrl?: string
  questions?: Record<string, unknown>[]
  metadata?: {
    employment_type?: string | null
    minimum_experience?: string | null
    required_education?: string | null
  }
}

export type JobsClientProps = {
  tag?: string
  title?: string
  description?: string | Record<string, unknown>
  jobs: Job[]
  isSingleJob?: boolean
  isLoading?: boolean
  error?: string | null
}

function decodeHtml(html: string) {
  if (typeof window !== 'undefined') {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }
  // For SSR fallback, use a simple replace (not perfect for all cases)
  return html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}

const JobListItem: React.FC<{ job: Job; isSingleView?: boolean }> = ({
  job,
  isSingleView = false,
}) => {
  const { location, title, metadata } = job
  const employmentType = metadata?.employment_type || 'Full-time'

  if (isSingleView && job.content) {
    return (
      <div className="mb-8">
        <h3 className="text-2xl font-medium text-gray-900 mb-4">{title}</h3>
        <div className="mt-6 mb-8 job-description prose max-w-none">
          {(() => {
            try {
              const safeContent = job.content.replace(
                /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                '',
              )
              return <div dangerouslySetInnerHTML={{ __html: safeContent }} />
            } catch (err) {
              console.error('Error rendering job content:', err)
              return (
                <p>
                  Unable to display full job details. Please check the application link for more
                  information.
                </p>
              )
            }
          })()}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={job.slug}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-4 border-b border-gray-200"
    >
      <div className="flex flex-wrap items-center gap-2 text-base font-heebo">
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        <span className="text-gray-400 dark:text-white">|</span>
        <span className="text-gray-600 dark:text-white">{employmentType}</span>
        {location && (
          <>
            <span className="text-gray-400 dark:text-white">|</span>
            <span className="text-gray-600 dark:text-white">{location}</span>
          </>
        )}
      </div>
    </Link>
  )
}

export const JobsClient: React.FC<JobsClientProps> = ({
  tag,
  title,
  description,
  jobs,
  isSingleJob = false,
  isLoading = false,
  error = null,
}) => {
  return (
    <div className="container mx-auto px-4 -mt-8">
      {(tag || title || description) && (
        <div className="mb-8">
          {tag && (
            <span className="font-heebo leading-[150%] font-semibold text-base text-black mb-4">
              {tag}
            </span>
          )}
          {title && (
            <div className="font-poppins leading-none font-medium text-5xl mb-6 py-3">{title}</div>
          )}
          {description && (
            <div className="max-w-2xl text-black">
              <RichText data={description as any} enableGutter={false} enableProse={false} />
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        // Loading state
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 mb-2 rounded"></div>
            <div className="h-3 w-24 bg-gray-100 rounded"></div>
          </div>
        </div>
      ) : error ? (
        // Error state
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-2 text-lg font-medium">Unable to load job listings</div>
          <p className="text-red-500">{error}</p>
        </div>
      ) : isSingleJob && jobs.length === 1 ? (
        // Single job detail view
        <div className="max-w-4xl ml-4">
          <JobListItem job={jobs[0]} isSingleView={true} />
        </div>
      ) : (
        // Multiple jobs list view
        <div className="max-w-4xl ml-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => <JobListItem key={job.id} job={job} />)
          ) : (
            <div className="text-gray-500 text-center py-12">No jobs found.</div>
          )}
        </div>
      )}
    </div>
  )
}
