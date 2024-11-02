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
import { UploadFeatureClient } from '@payloadcms/richtext-lexical/client'

export const HandbookPages: CollectionConfig = {
  slug: 'handbook-pages',
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
}
