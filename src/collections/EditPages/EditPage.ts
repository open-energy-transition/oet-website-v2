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
      // admin: {
      //   hidden: false, // hides the field from the admin panel
      // },
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
    beforeOperation: [
      ({ args }) => {
        const fields = args.collection.config.fields

        // Iterate over fields and find the one with type 'richText'
        fields.forEach((field) => {
          if (field.type === 'richText') {
            // Ensure admin object exists
            field.admin = field.admin || {}

            // Add hidden: true to the admin object
            field.admin = {
              ...field.admin,
              hidden: true,
            }
          }
        })

        // Assign the updated fields back to args.collection.config.fields
        args.collection.config.fields = fields

        console.log('Updated fields:', fields)
        return args
      },
    ],
    // beforeChange: [
    //   (data) => {
    //     // ensures data is not stored in DB
    //     // delete siblingData['location']
    //     console.log('data before chaneg', data)
    //   },
    // ],
    // beforeChange: [loadLexical],
  },
}
