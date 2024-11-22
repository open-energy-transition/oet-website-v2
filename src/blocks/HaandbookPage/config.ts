import { Block, CollectionConfig } from 'payload'

import { defaultEditorFeatures, UploadFeature } from '@payloadcms/richtext-lexical' // <= make sure this package is installed
import { getLexicalFromMarkDown, createPalylodEditor } from '@/utilities/convertToLexical'

import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { UploadFeatureClient } from '@payloadcms/richtext-lexical/client'
import { get } from 'http'

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

// const t = await getLexicalFromMarkDown({
//   markdownString:
//     'ab\n\nc\n\n\n\n - item\n- item2\n1. item1\n2. item2\n3. item3\n\nTest\n\nTest\n- another list\n- with items\n-  {{additional_information}} ',
// })

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
      // editor: lexicalEditor({
      //   features: () => [
      //     ...defaultEditorFeatures,
      //     //   BoldFeature(),
      //     //   ItalicFeature(),
      //     //   HeadingFeature(),
      //     //   LinkFeature(),
      //     //   UploadFeature(),
      //     //   UploadFeatureClient(),
      //     //     {
      //     //     enabledCollections: ['handbook-pages'],
      //     //   }
      //     FixedToolbarFeature(),
      //   ],
      //   // features: defaultEditorFeatures,
      // }),
      editor: createPalylodEditor(),
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
