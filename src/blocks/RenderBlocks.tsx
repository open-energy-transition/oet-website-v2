import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ButtonBlock } from '@/blocks/Button/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { DonateBlock } from '@/blocks/Donate/Component'
import { AboutBlock } from '@/blocks/About/Component'
import { OurServiceBlock } from '@/blocks/OurServiceBlock/Component'
import { ToolsWeSupportBlock } from '@/blocks/ToolsWeSupportBlock/Component'
import { ProjectTabsBlock } from '@/blocks/ProjectTabsBlock/Component'
import { TeamMembersBlock } from '@/blocks/TeamMembersBlock/Component'
import { JobsBlock } from '@/blocks/JobsBlock/Component'
import { TabsBlock } from '@/blocks/TabsBlock/Component'
import { CardBlock } from '@/blocks/CardBlock/Component'
import { QuoteBlock } from '@/blocks/QuoteBlock/Component'
import { PartnersBlock } from './PartnersBlock/Component'
import { ProjectsOverviewBlock } from './ProjectsOverviewBlock/Component'
import { ProjectsListBlock } from './ProjectsListBlock/Component'

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
  projectsOverview: ProjectsOverviewBlock,
  projectTabs: ProjectTabsBlock,
  projectsList: ProjectsListBlock,
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

            if (Block) {
              return (
                <div className="my-16" key={index}>
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
