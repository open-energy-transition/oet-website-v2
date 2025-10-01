import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { JobsClient, Job } from './ClientComponent'

type JobsBlockProps = {
  id?: string
  tag?: string
  title?: string
  description?: string
  jobId?: string // Optional ID to fetch a specific job detail
}

// Fetch specific job details from Greenhouse API
async function fetchJobDetails(jobId: string): Promise<Job | null> {
  try {
    const response = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/openenergytransition/jobs/${jobId}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch job details: ${response.status}`)
    }

    const jobData = await response.json()
    return {
      id: jobData.id,
      title: jobData.title,
      location: jobData.location.name,
      department: jobData.departments?.[0]?.name || '',
      description: jobData.content,
      slug: jobData.absolute_url,
      publishedAt: jobData.updated_at,
      status: 'published',
      // Additional detailed fields
      applicationUrl: jobData.absolute_url,
      content: jobData.content, // Full HTML content
      questions: jobData.questions || [],
      metadata: {
        employment_type: jobData.metadata?.employment_type || null,
        minimum_experience: jobData.metadata?.minimum_experience || null,
        required_education: jobData.metadata?.required_education || null,
      },
    }
  } catch (error) {
    console.error(`Error fetching job detail for ID ${jobId}:`, error)
    return null
  }
}

export const JobsBlock: React.FC<JobsBlockProps> = async (props) => {
  const { id, tag, title, description } = props

  // Otherwise fetch all jobs
  let jobs: Job[] = []

  // Fetch jobs from Greenhouse API
  try {
    const greenhouseResponse = await fetch(
      'https://boards-api.greenhouse.io/v1/boards/openenergytransition/jobs',
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!greenhouseResponse.ok) {
      throw new Error(`Failed to fetch jobs: ${greenhouseResponse.status}`)
    }

    const data = await greenhouseResponse.json()
    interface GreenHouseJob {
      id: string | number
      title: string
      location: { name: string }
      departments: Array<{ name: string }>
      content: string
      absolute_url: string
      updated_at: string
    }

    // Fetch detailed information for each job
    const jobDetailsPromises = data.jobs.map(async (job: GreenHouseJob) => {
      try {
        // Fetch the detailed job information
        const detailResponse = await fetch(
          `https://boards-api.greenhouse.io/v1/boards/openenergytransition/jobs/${job.id}`,
          { next: { revalidate: 3600 } },
        )
        console.log(detailResponse)
        if (!detailResponse.ok) {
          throw new Error(`Failed to fetch job details for ID ${job.id}: ${detailResponse.status}`)
        }

        const jobDetail = await detailResponse.json()

        return {
          id: job.id,
          title: job.title,
          location: job.location.name,
          department: job.departments?.[0]?.name || '',
          description: job.content,
          slug: job.absolute_url,
          publishedAt: job.updated_at,
          status: 'published',
          // Add detailed fields
          content: jobDetail.content,
          applicationUrl: jobDetail.absolute_url,
          questions: jobDetail.questions || [],
          metadata: {
            employment_type: jobDetail.metadata?.employment_type || null,
            minimum_experience: jobDetail.metadata?.minimum_experience || null,
            required_education: jobDetail.metadata?.required_education || null,
          },
        }
      } catch (error) {
        console.error(`Error fetching details for job ${job.id}:`, error)
        // Return basic job info if detail fetch fails
        return {
          id: job.id,
          title: job.title,
          location: job.location.name,
          department: job.departments?.[0]?.name || '',
          description: job.content,
          slug: job.absolute_url,
          publishedAt: job.updated_at,
          status: 'published',
        }
      }
    })

    // Wait for all job detail requests to complete
    jobs = await Promise.all(jobDetailsPromises)
    console.log(jobs)
  } catch (error) {
    console.error('Error fetching Greenhouse jobs:', error)
    jobs = []
  }

  return (
    <div className={id ? `block-${id}` : ''}>
      <JobsClient
        tag={tag || ''}
        title={title || ''}
        description={description || ''}
        jobs={jobs}
        isSingleJob={false}
      />
    </div>
  )
}
