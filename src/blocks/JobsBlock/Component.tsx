import React from 'react'
// Remove unused imports that may cause issues during prerendering
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
import { JobsClient, Job } from './ClientComponent'

type JobsBlockProps = {
  id?: string
  tag?: string
  title?: string
  description?: string
  jobId?: string // Optional ID to fetch a specific job detail
}

export const JobsBlock: React.FC<JobsBlockProps> = async (props) => {
  const { id, tag, title, description } = props

  // Otherwise fetch all jobs
  let jobs: Job[] = []

  // Add error handling for server-side rendering and prerendering
  try {
    // Check if we're in a prerendering environment where auth might be missing
    if (
      process.env.NEXT_PHASE === 'phase-production-build' ||
      process.env.PAYLOAD_PUBLIC_SITE_URL === 'undefined'
    ) {
      console.warn('JobsBlock: Running in prerendering or build context, using empty jobs list')
      return (
        <div className={id ? `block-${id}` : ''}>
          <JobsClient
            tag={tag || ''}
            title={title || ''}
            description={description || ''}
            jobs={[]}
            isSingleJob={false}
          />
        </div>
      )
    }
  } catch (error) {
    console.error('Error in JobsBlock prerendering check:', error)
    // Return fallback component to prevent build failures
    return (
      <div className={id ? `block-${id}` : ''}>
        <JobsClient
          tag={tag || ''}
          title={title || ''}
          description={description || ''}
          jobs={[]}
          isSingleJob={false}
        />
      </div>
    )
  }

  // Fetch jobs from Greenhouse API
  try {
    // Handle potential fetch errors, especially during build/prerender
    const greenhouseResponse = await fetch(
      'https://boards-api.greenhouse.io/v1/boards/openenergytransition/jobs',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        cache: 'force-cache', // Use cache aggressively during builds
      },
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
