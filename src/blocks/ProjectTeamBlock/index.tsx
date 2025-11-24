import React from 'react'
import { ProjectTeamBlockComponent } from './Component'

export const ProjectTeamBlock: React.FC<{
  title?: string | null
  teamMembers?: Array<{
    member: any
    description?: string | null
    id?: string
  }>
  id?: string
}> = (props) => {
  const { title, teamMembers } = props

  return <ProjectTeamBlockComponent title={title} teamMembers={teamMembers} />
}
