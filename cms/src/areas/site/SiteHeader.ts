import type { Block, GlobalConfig } from 'payload'

import { globalRead } from '../../access'
import { href, link, links, select, text, textarea } from '../../fields'
import { singleServicesBlock } from './fields'

export const desktopDisplays = ['menu', 'hidden'] as const

export const mobileDisplays = ['menu', 'link', 'hidden'] as const

const hrefPattern = /^(\/|#|https?:\/\/|mailto:|tel:)/

const linkGroupBlock: Block = {
  slug: 'linkGroup',
  labels: { singular: 'Link group', plural: 'Link groups' },
  fields: [
    text('label', {
      required: true,
      description: 'Label of the menu entry in the bar and in the mobile menu.',
    }),
    links('links', { label: 'Links', minRows: 1 }),
    {
      type: 'row',
      fields: [
        select('desktop', desktopDisplays, {
          required: true,
          defaultValue: 'menu',
          label: 'Desktop bar',
          description: 'menu: a dropdown with the links. hidden: not in the desktop bar.',
        }),
        select('mobile', mobileDisplays, {
          required: true,
          defaultValue: 'menu',
          label: 'Mobile menu',
          description:
            'menu: an expandable group with the links. link: a single link without sub-links. hidden: not in the mobile menu.',
        }),
      ],
    },
    {
      name: 'mobileHref',
      type: 'text',
      label: 'Mobile link target',
      admin: {
        description:
          'Where the entry leads when the mobile menu shows it as a single link. Site path, anchor, full URL or mailto: address.',
        condition: (_data, siblingData) => siblingData.mobile === 'link',
      },
      validate: (value: unknown, { siblingData }: { siblingData: object }) => {
        const single = 'mobile' in siblingData && siblingData.mobile === 'link'
        if (value === null || value === undefined || value === '')
          return single ? 'Required while the mobile menu shows a single link' : true
        return typeof value === 'string' && hrefPattern.test(value)
          ? true
          : 'Start with /, #, http://, https://, mailto: or tel:'
      },
    },
  ],
}

const servicesGroupBlock: Block = {
  slug: 'servicesGroup',
  labels: { singular: 'Services menu', plural: 'Services menus' },
  fields: [
    text('label', {
      required: true,
      description:
        'Label of the menu entry. The entries of the panel are the published Services ("Navigation and footer" tab of each service), sorted by their order; nothing is listed here.',
    }),
    {
      name: 'more',
      type: 'group',
      label: 'Link to all services',
      admin: { description: 'Card at the end of the services panel.' },
      fields: [
        text('label', { required: true }),
        textarea('description', { required: true, description: 'Text under the label.' }),
        href('href', { required: true }),
      ],
    },
  ],
}

export const SiteHeader: GlobalConfig = {
  slug: 'site-header',
  label: 'Header and navigation',
  access: globalRead,
  admin: {
    group: 'Site',
    description:
      'Navigation of the desktop bar and the mobile menu. The legal links, the cookie-settings label and the copyright line of the mobile menu are edited once, in Footer.',
  },
  fields: [
    {
      name: 'menu',
      type: 'blocks',
      label: 'Menu entries',
      required: true,
      minRows: 1,
      blocks: [linkGroupBlock, servicesGroupBlock],
      validate: singleServicesBlock('servicesGroup', 'Only one services menu is supported'),
      admin: {
        description:
          'One list for both menus, in the order the entries appear. Each link group says how it shows on desktop and on mobile, so links that are the same are entered once.',
      },
    },
    link('contact', {
      required: true,
      label: 'Contact button',
      description: 'Button at the right end of the bar and at the top of the mobile menu.',
    }),
  ],
}
