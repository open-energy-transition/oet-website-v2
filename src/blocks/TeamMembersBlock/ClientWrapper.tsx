'use client'

import React, { useState, useEffect } from 'react'
import { TeamMembersClient } from './ClientComponent'
import type { TeamMember, Staff } from '@/payload-types'

type ClientTeamMembersBlockProps = {
  id?: string
  tag?: string
  title?: string
  description?: string | Record<string, unknown>
  teamMembers: TeamMember[]
  defaultStaffCategory?: string | Staff
}

export const ClientTeamMembersBlock: React.FC<ClientTeamMembersBlockProps> = (props) => {
  const { id, tag, title, description, teamMembers, defaultStaffCategory } = props
  const [staffCategories, setStaffCategories] = useState<Staff[]>([])
  const [_loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStaffCategories = async () => {
      try {
        const response = await fetch('/api/proxy/staff-categories')

        if (!response.ok) {
          throw new Error(`Failed to fetch staff categories: ${response.status}`)
        }

        const data = await response.json()
        setStaffCategories(data.docs || [])
      } catch (error) {
        console.error('Error fetching staff categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStaffCategories()
  }, [])

  return (
    <div className={id ? `block-${id}` : ''}>
      <TeamMembersClient
        tag={tag || ''}
        title={title || ''}
        description={description || ''}
        teamMembers={teamMembers || []}
        staffCategories={staffCategories}
        defaultStaffCategory={defaultStaffCategory}
      />
    </div>
  )
}
