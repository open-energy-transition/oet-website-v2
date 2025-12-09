import React from 'react'
import { ContentItemsBlockComponent } from './Component'

export const ContentItemsBlock: React.FC<{
  items?: Array<{
    title: string
    description: any
    id?: string
  }>
  id?: string
  title?: string
  isPublish?: boolean
}> = (props) => {
  const { items } = props
  return (
    <ContentItemsBlockComponent
      isPublish={props.isPublish}
      title={props.title || ''}
      items={items}
    />
  )
}
