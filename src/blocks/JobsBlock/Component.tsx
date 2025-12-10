import React from 'react'
import { ClientJobsBlock } from './ClientWrapper'

type JobsBlockProps = {
  id?: string
  tag?: string
  title?: string
  description?: string
  jobId?: string // Optional ID to fetch a specific job detail
}

export const JobsBlock: React.FC<JobsBlockProps> = (props) => {
  // Use client-side fetching to avoid build-time issues
  return <ClientJobsBlock {...props} />
}
