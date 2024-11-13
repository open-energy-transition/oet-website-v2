import { CollectionConfig } from 'payload'

import { defaultEditorFeatures, UploadFeature } from '@payloadcms/richtext-lexical' // <= make sure this package is installed

import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { loadLexical } from './hooks/loadLexical'

export const EditPage: CollectionConfig = {
  slug: 'edit-page',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      editor: lexicalEditor({
        features: () => [
          ...defaultEditorFeatures,
          //   BoldFeature(),
          //   ItalicFeature(),
          //   HeadingFeature(),
          //   LinkFeature(),
          //   UploadFeature(),
          //   UploadFeatureClient(),
          //     {
          //     enabledCollections: ['handbook-pages'],
          //   }
          FixedToolbarFeature(),
        ],
        // features: defaultEditorFeatures,
      }),
      required: true,
    },
  ],
  hooks: {
    beforeChange: [loadLexical],
  },
}
