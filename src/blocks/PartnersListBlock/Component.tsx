import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { PartnersListBlock as PartnersListBlockProps } from '@/payload-types'
import { PartnersListClient } from './ClientComponent'

export const PartnersListBlock: React.FC<PartnersListBlockProps & { id?: string }> = async (
  props,
) => {
  const { id, title, subTitle, defaultFilter, showFilterTabs } = props

  const payload = await getPayload({ config: configPromise })

  const partnersQuery = await payload.find({
    collection: 'partners',
    depth: 1,
    sort: '_order',
    limit: 999999,
  })

  const partners = partnersQuery.docs

  return (
    <div className={id ? `block-${id}` : ''}>
      <PartnersListClient
        title={title ?? ''}
        subTitle={subTitle ?? ''}
        defaultFilter={(defaultFilter as 'all' | 'partner' | 'funder') ?? 'all'}
        showFilterTabs={showFilterTabs ?? true}
        partners={partners}
      />
    </div>
  )
}
