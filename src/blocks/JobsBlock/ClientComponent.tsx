'use client'

import React from 'react'
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
}

const JobCard: React.FC<{ job: Job; isSingleView?: boolean }> = ({ job, isSingleView = false }) => {
  const { location, title, department, metadata } = job
  const employmentType = metadata?.employment_type || 'Full-time'

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm
                    transition-shadow hover:shadow-lg flex flex-col items-stretch p-6 ${isSingleView ? 'mb-8' : ''}`}
    >
      <div>
        {/* Job Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center w-full">{title}</h3>
        {department && (
          <div className="inline-flex items-center gap-1 text-gray-500 text-xs bg-gray-100 rounded px-2 py-1 mb-2">
            {department}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 my-3">
        <div className="inline-flex items-center gap-1 text-gray-500 text-xs bg-gray-100 rounded px-2 py-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M10 0.5C4.486 0.5 0 4.986 0 10.5C0 16.014 4.486 20.5 10 20.5C15.514 20.5 20 16.014 20 10.5C20 4.986 15.514 0.5 10 0.5ZM10 18.5C5.589 18.5 2 14.911 2 10.5C2 6.089 5.589 2.5 10 2.5C14.411 2.5 18 6.089 18 10.5C18 14.911 14.411 18.5 10 18.5Z"
              fill="#0B0C0B"
            />
            <path d="M11 5.5H9V10.914L12.293 14.207L13.707 12.793L11 10.086V5.5Z" fill="#0B0C0B" />
          </svg>
          <span>{employmentType}</span>
        </div>

        {/* Location */}
        {location && (
          <span className="inline-flex items-center gap-1 text-gray-500 text-xs bg-gray-100 rounded px-2 py-1">
            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            {location}
          </span>
        )}
      </div>

      {/* Job content for single view */}
      {isSingleView && job.content && (
        <div
          className="mt-6 mb-8 job-description prose max-w-none"
          dangerouslySetInnerHTML={{ __html: job.content }}
        />
      )}
      <div>
        {job.content && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.content }} />
        )}
      </div>

      <div className="mt-4">
        <Link
          href={job.slug}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <span className="mr-2">Apply Now</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 1H11V4.5H9.5V3.207L4.854 7.854L3.646 6.646L8.293 2H7.5V1ZM10.5 10.5H1.5V1.5H6V0H1.5C0.675 0 0 0.675 0 1.5V10.5C0 11.325 0.675 12 1.5 12H10.5C11.325 12 12 11.325 12 10.5V6H10.5V10.5Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export const JobsClient: React.FC<JobsClientProps> = ({
  tag,
  title,
  description,
  jobs,
  isSingleJob = false,
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
              {typeof description === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                // @ts-expect-error - RichText expects a specific format
                <RichText data={description} />
              )}
            </div>
          )}
        </div>
      )}

      {isSingleJob && jobs.length === 1 ? (
        // Single job detail view
        <div className="max-w-4xl mx-auto">
          <JobCard job={jobs[0]} isSingleView={true} />
        </div>
      ) : (
        // Multiple jobs list view
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full text-gray-500 text-center py-12">No jobs found.</div>
          )}
        </div>
      )}
    </div>
  )
}
