import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CustomerTestimonialsListBlock } from '@/blocks/CustomerTestimonialsListBlock/Component'
import { ClientDepartmentsListBlock } from '@/blocks/DepartmentsListBlock'
import { ButtonBlock } from '@/blocks/Button/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { DonateBlock } from '@/blocks/Donate/Component'
import { AboutBlock } from '@/blocks/About/Component'
import { OurServiceBlock } from '@/blocks/OurServiceBlock/Component'
import { ToolsWeSupportBlock } from '@/blocks/ToolsWeSupportBlock/Component'
import { WhoWeAreBlock } from '@/blocks/WhoWeAreBlock/Component'
import { ProjectTabsBlock } from '@/blocks/ProjectTabsBlock/Component'
import { TeamMembersBlock } from '@/blocks/TeamMembersBlock/Component'
import { JobsBlock } from '@/blocks/JobsBlock/Component'
import { TabsBlock } from '@/blocks/TabsBlock/Component'
import { CardBlock } from '@/blocks/CardBlock/Component'
import { QuoteBlock } from '@/blocks/QuoteBlock/Component'
import { PartnersBlock } from './PartnersBlock/Component'
import { ProjectsOverviewBlock } from './ProjectsOverviewBlock/Component'
import { ProjectsListBlock } from './ProjectsListBlock/Component'
import { PostsListBlock } from './PostsListBlock/Component'
import { OurBlogBlock } from './OurBlogBlock'
import { OutputsListBlock } from './OutputsListBlock'
import { ContentItemsBlock } from './ContentItemsBlock'
import { ProjectAimsBlock } from './ProjectAimsBlock'
import { ProjectTeamBlock } from './ProjectTeamBlock'
import { BlogQuoteBlock } from './BlogQuoteBlock'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  card: CardBlock,
  quote: QuoteBlock,
  cta: CallToActionBlock,
  button: ButtonBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  donate: DonateBlock,
  about: AboutBlock,
  ourService: OurServiceBlock,
  toolsWeSupport: ToolsWeSupportBlock,
  whoWeAre: WhoWeAreBlock,
  customerTestimonialsList: CustomerTestimonialsListBlock,
  departmentsList: ClientDepartmentsListBlock,
  projectsOverview: ProjectsOverviewBlock,
  projectTabs: ProjectTabsBlock,
  projectsList: ProjectsListBlock,
  postsList: PostsListBlock,
  ourBlog: OurBlogBlock,
  outputsList: OutputsListBlock,
  contentItems: ContentItemsBlock,
  projectAims: ProjectAimsBlock,
  projectTeam: ProjectTeamBlock,
  blogQuote: BlogQuoteBlock,
  partners: PartnersBlock,
  teamMembers: TeamMembersBlock,
  jobs: JobsBlock,
  tabs: TabsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            console.log(blockType)
            let className = ''
            switch (blockType) {
              case 'ourService':
              case 'projectsOverview':
                className = 'dark:border-y dark:border-white'
                break
              default:
                break
            }
            if (Block) {
              return (
                <div className={`py-16 ${className}`} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
