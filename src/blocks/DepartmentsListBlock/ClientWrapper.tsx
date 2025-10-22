'use client'

import React, { useEffect, useState } from 'react'
import { DepartmentsListBlock } from './Component'
import type { DepartmentsListBlock as DepartmentsListBlockType } from '@/payload-types'

type TeamMember = {
  id: string | number
  firstName?: string
  lastName?: string
  image?:
    | {
        id: string | number
        url: string
      }
    | string
    | number
}

type Department = {
  id: string | number
  department: string
  shortDescription?: string
  projects?: any[]
  icon?: any
  representativeMember?: TeamMember | string | number
}

type ClientWrapperProps = DepartmentsListBlockType & { id?: string }

export const ClientDepartmentsListBlock: React.FC<ClientWrapperProps> = (props) => {
  const [enhancedDepartments, setEnhancedDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      if (!props.departments || props.departments.length === 0) {
        setLoading(false)
        return
      }

      try {
        // Get the IDs of all departments
        const departmentIds = props.departments.map((dept) =>
          typeof dept === 'object' ? dept.id : dept,
        )

        // Fetch full department data with populated relations
        const departmentsPromises = departmentIds.map(async (id) => {
          const response = await fetch(`/api/departments/${id}?depth=2`)
          if (!response.ok) throw new Error(`Failed to fetch department ${id}`)
          return await response.json()
        })

        const enhancedDepts = await Promise.all(departmentsPromises)
        setEnhancedDepartments(enhancedDepts)
      } catch (error) {
        console.error('Error fetching department data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartmentsData()
  }, [props.departments])

  if (loading) {
    return <div className="p-4 text-center">Loading departments...</div>
  }

  // Pass the enhanced departments data to the original component
  return <DepartmentsListBlock {...props} departments={enhancedDepartments as any} />
}
