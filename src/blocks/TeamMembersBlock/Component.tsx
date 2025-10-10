import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { TeamMembersBlock as TeamMembersBlockProps } from '@/payload-types'
import { TeamMembersClient } from './ClientComponent'

export const TeamMembersBlock: React.FC<
  TeamMembersBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, tag, title, description } = props
  const payload = await getPayload({ config: configPromise })

  // Fetch all team members with categories populated
  const teamMembersQuery = await payload.find({
    collection: 'team-members',
    depth: 2, // Increased depth to get category details
    limit: 999999,
  })

  // Fetch all staff categories for filtering
  const staffCategoriesQuery = await payload.find({
    collection: 'staff',
    depth: 0,
    sort: 'order', // Sort by order field if available
    limit: 999999,
  })

  const teamMembers = teamMembersQuery.docs
  const staffCategories = staffCategoriesQuery.docs

  return (
    <div className={id ? `block-${id}` : ''}>
      <TeamMembersClient
        tag={tag || ''}
        title={title || ''}
        description={description || ''}
        teamMembers={teamMembers}
        staffCategories={staffCategories}
      />
    </div>
  )
}
