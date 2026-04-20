'use client'

import React, { useState, useEffect } from 'react'
import { PartnersListClient } from './ClientComponent'
import type { Partner } from '@/payload-types'

type ClientPartnersListBlockProps = {
  id?: string
  title?: string
  subTitle?: string
  defaultFilter?: 'all' | 'partner' | 'funder'
  showFilterTabs?: boolean
}

export const ClientPartnersListBlock: React.FC<ClientPartnersListBlockProps> = ({
  id,
  title = '',
  subTitle = '',
  defaultFilter = 'all',
  showFilterTabs = true,
}) => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners?sort=_order&limit=999999&depth=1')
        if (!response.ok) throw new Error(`Failed to fetch partners: ${response.status}`)
        const data = await response.json()
        setPartners(data.docs ?? [])
      } catch (error) {
        console.error('Error fetching partners:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading partners...</div>
  }

  return (
    <div className={id ? `block-${id}` : ''}>
      <PartnersListClient
        title={title}
        subTitle={subTitle}
        defaultFilter={defaultFilter}
        showFilterTabs={showFilterTabs}
        partners={partners}
      />
    </div>
  )
}
