import type { Block } from 'payload'

export const PartnersListBlock: Block = {
  slug: 'partnersList',
  interfaceName: 'PartnersListBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'defaultFilter',
      type: 'select',
      label: 'Default Filter',
      defaultValue: 'all',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Partners', value: 'partner' },
        { label: 'Funders', value: 'funder' },
      ],
      admin: {
        description: 'Which tab is selected by default when the block loads.',
      },
    },
    {
      name: 'showFilterTabs',
      type: 'checkbox',
      label: 'Show Filter Tabs',
      defaultValue: true,
      admin: {
        description: 'Toggle the All / Partners / Funders filter tabs.',
      },
    },
  ],
  labels: {
    plural: 'Partners & Funders Lists',
    singular: 'Partners & Funders List',
  },
}
