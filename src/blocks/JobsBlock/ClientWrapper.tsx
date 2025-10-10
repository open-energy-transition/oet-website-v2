'use client'

import React, { useState, useEffect } from 'react'
import { JobsClient, Job } from './ClientComponent'

type ClientJobsBlockProps = {
  id?: string
  tag?: string
  title?: string
  description?: string
  jobId?: string // Optional ID to fetch a specific job detail
}

export const ClientJobsBlock: React.FC<ClientJobsBlockProps> = (props) => {
  const { id, tag, title, description } = props
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/proxy/greenhouse-jobs')

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`)
        }

        const data = await response.json()

        // Map the jobs from the API response
        const fetchedJobs = data.jobs.map(
          (job: {
            id: string | number
            title: string
            location: { name: string }
            departments?: { name: string }[]
            content: string
            absolute_url: string
            updated_at: string
          }) => ({
            id: job.id,
            title: job.title,
            location: job.location.name,
            department: job.departments?.[0]?.name || '',
            description: job.content,
            slug: job.absolute_url,
            publishedAt: job.updated_at,
            status: 'published',
          }),
        )

        setJobs(fetchedJobs)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setError('Unable to load job listings at this time.')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return (
    <div className={id ? `block-${id}` : ''}>
      <JobsClient
        tag={tag || ''}
        title={title || ''}
        description={description || ''}
        jobs={jobs}
        isSingleJob={false}
        isLoading={loading}
        error={error}
      />
    </div>
  )
}
