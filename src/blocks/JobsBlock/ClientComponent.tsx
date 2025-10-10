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

const JobCard: React.FC<{ job: Job; isSingleView?: boolean }> = ({ job, isSingleView = false }) => {
  const { location, title, department, metadata } = job
  const employmentType = metadata?.employment_type || 'Full-time'
  // const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm
                    transition-shadow hover:shadow-lg flex flex-col items-stretch p-8 ${isSingleView ? 'mb-8' : ''}`}
    >
      <div>
        {/* Job Title */}
        <h3 className="text-2xl font-medium text-gray-900 mb-4 text-left w-full">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-6 my-3 font-heebo text-lg">
        <div className="inline-flex items-center gap-3 rounded px-2 py-1">
          <svg
            width="16"
            height="21"
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00006 12.5C10.2061 12.5 12.0001 10.706 12.0001 8.5C12.0001 6.294 10.2061 4.5 8.00006 4.5C5.79406 4.5 4.00006 6.294 4.00006 8.5C4.00006 10.706 5.79406 12.5 8.00006 12.5ZM8.00006 6.5C9.10306 6.5 10.0001 7.397 10.0001 8.5C10.0001 9.603 9.10306 10.5 8.00006 10.5C6.89706 10.5 6.00006 9.603 6.00006 8.5C6.00006 7.397 6.89706 6.5 8.00006 6.5Z"
              fill="#0B0C0B"
            />
            <path
              d="M7.42009 20.314C7.58934 20.4349 7.79211 20.4998 8.00009 20.4998C8.20806 20.4998 8.41084 20.4349 8.58009 20.314C8.88409 20.099 16.0291 14.94 16.0001 8.5C16.0001 4.089 12.4111 0.5 8.00009 0.5C3.58909 0.5 8.80377e-05 4.089 8.80377e-05 8.495C-0.028912 14.94 7.11609 20.099 7.42009 20.314ZM8.00009 2.5C11.3091 2.5 14.0001 5.191 14.0001 8.505C14.0211 12.943 9.61209 16.928 8.00009 18.235C6.38909 16.927 1.97909 12.941 2.00009 8.5C2.00009 5.191 4.69109 2.5 8.00009 2.5Z"
              fill="#0B0C0B"
            />
          </svg>
          <span>{employmentType}</span>
        </div>

        {/* Location */}
        {location && (
          <span className="inline-flex items-center gap-3 rounded px-2 py-1">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0.5C4.486 0.5 0 4.986 0 10.5C0 16.014 4.486 20.5 10 20.5C15.514 20.5 20 16.014 20 10.5C20 4.986 15.514 0.5 10 0.5ZM10 18.5C5.589 18.5 2 14.911 2 10.5C2 6.089 5.589 2.5 10 2.5C14.411 2.5 18 6.089 18 10.5C18 14.911 14.411 18.5 10 18.5Z"
                fill="#0B0C0B"
              />
              <path
                d="M11 5.5H9V10.914L12.293 14.207L13.707 12.793L11 10.086V5.5Z"
                fill="#0B0C0B"
              />
            </svg>
            {location}
          </span>
        )}
      </div>

      {/* Job content for single view */}
      {isSingleView && job.content && (
        <div className="mt-6 mb-8 job-description prose max-w-none">
          {(() => {
            try {
              // Create a safe version of the content by removing scripts
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
      )}
      {/* <div>
        {job.content && (
          <>
            <div
              className={`prose max-w-none transition-all duration-300 ${
                expanded ? '' : 'max-h-96 overflow-hidden relative'
              }`}
              dangerouslySetInnerHTML={{ __html: decodeHtml(job.content) }}
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm font-medium focus:outline-none"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            </div>
          </>
        )}
      </div> */}

      <div className="mt-4">
        <Link
          href={job.slug}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 text-base font-medium text-black rounded-xl border border-[#0B0C0B26] hover:shadow-md transition-shadow"
        >
          <span className="mr-2">Apply Now</span>
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
  isLoading = false,
  error = null,
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
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
        <div className="max-w-4xl mx-auto">
          <JobCard job={jobs[0]} isSingleView={true} />
        </div>
      ) : (
        // Multiple jobs list view
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
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
