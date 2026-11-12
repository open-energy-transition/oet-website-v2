import type { CollectionConfig, PayloadRequest } from 'payload'

import { anyone, editor } from '../../access'
import { plainText } from '../../fields'

const formName = /^[a-z0-9]+(-[a-z0-9]+)*$/

const knownLocale = (value: unknown, { req }: { req: PayloadRequest }) => {
  const { localization } = req.payload.config
  if (!localization) throw new Error('The CMS has no localization configured')
  return typeof value === 'string' && localization.localeCodes.includes(value)
    ? true
    : `Use one of: ${localization.localeCodes.join(', ')}`
}

const plainObject = (value: unknown) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
    ? true
    : 'Send the form fields as a JSON object'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  access: {
    read: editor,
    create: anyone,
    update: () => false,
    delete: editor,
  },
  defaultSort: '-createdAt',
  labels: { singular: 'Form submission', plural: 'Form submissions' },
  admin: {
    group: 'Events',
    useAsTitle: 'form',
    defaultColumns: ['form', 'locale', 'createdAt'],
    description:
      'Entries sent through forms on the website. They are written by the site and cannot be changed here.',
  },
  fields: [
    {
      ...plainText('form', {
        required: true,
        label: 'Form',
        description: 'Name of the form the entry came from, for example contact.',
      }),
      index: true,
      validate: (value: unknown) =>
        typeof value === 'string' && formName.test(value)
          ? true
          : 'Use lowercase letters, digits and single hyphens',
    },
    {
      ...plainText('locale', {
        required: true,
        label: 'Language',
        description: 'Language of the page the form was sent from.',
      }),
      validate: knownLocale,
    },
    {
      name: 'payload',
      type: 'json',
      required: true,
      label: 'Fields',
      validate: plainObject,
      admin: { description: 'What the visitor entered, as sent by the form.' },
    },
  ],
}
