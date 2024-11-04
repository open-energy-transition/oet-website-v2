import { Block, CollectionConfig } from 'payload'

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

const HandBookPageBlock: Block = {
  slug: 'handbook-page-block', // required
  //   imageURL: 'https://google.com/path/to/image.jpg',
  //   imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'HandBookPageBlock', // optional
  fields: [
    // required
    {
      name: 'maintainer',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'maintainerSecondary',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'pageContent',
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
    },
  ],
}

export const HandBookPageCollection: CollectionConfig = {
  slug: 'handbook-page-collection',
  fields: [
    {
      name: 'Name',
      label: 'Name of collection',
      type: 'text',
      required: true,
    },
    {
      name: 'maintainer',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'maintainerSecondary',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'pageContent',
      label: 'This is content for index page itself',
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
    },
    {
      name: 'layout', // required
      type: 'blocks', // required
      minRows: 1,
      maxRows: 10,
      blocks: [
        // required
        HandBookPageBlock,
      ],
    },
  ],
}
