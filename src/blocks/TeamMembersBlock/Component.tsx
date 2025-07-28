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

  // Fetch all team members
  const teamMembersQuery = await payload.find({
    collection: 'team-members',
    depth: 1,
    limit: 999999,
  })

  const teamMembers = teamMembersQuery.docs

  return (
    <div className={id ? `block-${id}` : ''}>
      <TeamMembersClient
        tag={tag || ''}
        title={title || ''}
        description={description || ''}
        teamMembers={teamMembers}
      />
    </div>
  )
}
