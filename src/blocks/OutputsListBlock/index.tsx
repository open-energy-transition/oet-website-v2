import React from 'react'
import { OutputsListBlockComponent } from './Component'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'

export const OutputsListBlock: React.FC<{
  title?: string | null
  description?: string | null
  tag?: string | null
  id?: string
}> = async (props) => {
  const { title, description, tag } = props

  const payload = await getPayload({ config: configPromise })

  // Fetch all published outputs
  const { docs: outputs } = await payload.find({
    collection: 'outputs',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
    sort: '-createdAt',
  })

  return (
    <OutputsListBlockComponent
      title={title}
      description={description}
      tag={tag}
      outputs={outputs}
    />
  )
}
