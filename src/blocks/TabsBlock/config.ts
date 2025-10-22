import type { Block, Field } from 'payload'

// Import all available blocks that can be nested in tabs
import { Content } from '../Content/config'
import { Archive } from '../ArchiveBlock/config'
import { ProjectTabs } from '../ProjectTabsBlock/config'
import { ProjectsList } from '../ProjectsListBlock/config'
import { PostsList } from '../PostsListBlock/config'
import { TeamMembersBlock } from '../TeamMembersBlock/config'
import { DepartmentsList } from '../DepartmentsListBlock/config'
import { JobsBlock } from '../JobsBlock/config'

const tabFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'The title that will appear on the tab button',
    },
  },
  {
    name: 'titleSize',
    label: 'Text Size',
    type: 'select',
    required: false,
    defaultValue: 'md',
    options: [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2X Large', value: '2xl' },
    ],
    admin: {
      description: 'Choose the size of the text',
      width: '50%',
    },
  },
  {
    name: 'content',
    type: 'blocks',
    blocks: [
      Content,
      Archive,
      ProjectTabs,
      TeamMembersBlock,
      JobsBlock,
      ProjectsList,
      PostsList,
      DepartmentsList,
    ],
    admin: {
      description: 'Add content blocks to this tab',
    },
  },
]

export const TabsBlock: Block = {
  slug: 'tabs',
  interfaceName: 'TabsBlock',
  labels: {
    singular: 'Tabs Block',
    plural: 'Tabs Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title for the entire tabs section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description for the tabs section',
      },
    },
    {
      name: 'tabs',
      type: 'array',
      fields: tabFields,
      minRows: 1,
      admin: {
        description: 'Add multiple tabs with their own content',
        initCollapsed: true,
      },
      labels: {
        singular: 'Tab',
        plural: 'Tabs',
      },
    },
    {
      name: 'tabStyle',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Pills',
          value: 'pills',
        },
        {
          label: 'Underline',
          value: 'underline',
        },
        {
          label: 'Bordered',
          value: 'bordered',
        },
      ],
      admin: {
        description: 'Choose the visual style for the tabs',
      },
    },
    {
      name: 'tabPosition',
      type: 'select',
      defaultValue: 'top',
      options: [
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      admin: {
        description: 'Position of the tab navigation',
      },
    },
  ],
}
