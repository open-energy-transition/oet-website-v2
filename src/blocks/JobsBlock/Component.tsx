import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { JobsClient } from './ClientComponent'

type JobsBlockProps = {
  id?: string
  tag?: string
  title?: string
  description?: string
}

export const JobsBlock: React.FC<JobsBlockProps> = async (props) => {
  const { id, tag, title, description } = props
  const payload = await getPayload({ config: configPromise })

  // Fetch all jobs
  const jobsQuery = await payload.find({
    collection: 'jobs',
    depth: 1,
    limit: 999999,
  })

  const jobs = jobsQuery.docs

  return (
    <div className={id ? `block-${id}` : ''}>
      <JobsClient tag={tag || ''} title={title || ''} description={description || ''} jobs={jobs} />
    </div>
  )
}
