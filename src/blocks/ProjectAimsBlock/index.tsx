import React from 'react'
import { ProjectAimsBlockComponent } from './Component'

export const ProjectAimsBlock: React.FC<{
  title?: string
  items?: Array<{
    title: string
    content?: Array<{
      text: string
      id?: string
    }>
    id?: string
  }>
  media?: Array<{
    image: any
    id?: string
  }>
  id?: string
}> = (props) => {
  const { title, items, media } = props

  return <ProjectAimsBlockComponent title={title} items={items} media={media} />
}
