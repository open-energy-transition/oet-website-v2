// import type { Block } from 'payload'
// import { link } from '@/fields/link'

// export const Button: Block = {
//   slug: 'button',
//   interfaceName: 'ButtonBlock',
//   fields: [link()],
//   labels: {
//     plural: 'Buttons',
//     singular: 'Button',
//   },
// }

import type { Block } from 'payload'
import { link } from '@/fields/link'

export const Button: Block = {
  slug: 'button',
  interfaceName: 'ButtonBlock',
  fields: [
    link(),
    {
      name: 'color',
      label: 'Button Color',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' },
        { label: 'Gray', value: 'gray' },
        // Add more Tailwind color options as needed
      ],
      required: false,
      admin: {
        description: 'Choose a color style for the button (maps to Tailwind classes)',
      },
    },
    {
      name: 'textSize',
      label: 'Button Text Size',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'sm' },
        { label: 'Large', value: 'lg' },
        { label: 'Huge', value: '2xl' },
      ],
      required: false,
      admin: {
        description: 'Choose a text size for the button (maps to Tailwind classes)',
      },
    },
    {
      name: 'size',
      label: 'Button Size',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'sm' },
        { label: 'Large', value: 'lg' },
        { label: 'Huge', value: '2xl' },
      ],
      required: false,
      admin: {
        description: 'Choose a size for the button (maps to Tailwind classes)',
      },
    },
    {
      name: 'rounded',
      label: 'Button Rounded',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Full', value: 'full' },
      ],
      required: false,
      admin: {
        description: 'Choose a border radius for the button (maps to Tailwind classes)',
      },
    },
    {
      name: 'icon',
      label: 'Button Icon',
      relationTo: 'icons',
      type: 'relationship',
      required: false,
      admin: {
        description: 'Select an icon to display on the button',
        width: '50%',
      },
    },
    // If you want a color picker instead, use type: 'text' and a custom UI component
    // {
    //   name: 'customColor',
    //   label: 'Custom Color',
    //   type: 'text',
    //   admin: {
    //     description: 'Enter a hex color or Tailwind class',
    //   },
    // },
  ],
  labels: {
    plural: 'Buttons',
    singular: 'Button',
  },
}
