import {
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  SubscriptFeature,
  ParagraphFeature,
  AlignFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  RelationshipFeature,
  UploadFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  BlocksFeature,
  TextStateFeature,
  defaultColors,
} from '@payloadcms/richtext-lexical'

import { CallToAction } from '@/blocks/CallToAction/config'
import { Button } from '@/blocks/Button/config'
import { ProjectTabs } from '@/blocks/ProjectTabsBlock/config'
import { ProjectsList } from '@/blocks/ProjectsListBlock/config'
import { PostsList } from '@/blocks/PostsListBlock/config'

export function getLexicalFeatures({ rootFeatures }: { rootFeatures: any[] }) {
  return [
    ...rootFeatures,
    HeadingFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    SubscriptFeature(),
    ParagraphFeature(),
    AlignFeature(),
    IndentFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          type: 'select',
          options: ['noopener', 'noreferrer', 'nofollow'],
        },
      ],
      enabledCollections: ['pages', 'posts'],
      maxDepth: 2,
    }),
    RelationshipFeature({
      maxDepth: 2,
    }),
    UploadFeature({
      collections: {
        uploads: {
          fields: [
            { name: 'caption', type: 'text', label: 'Caption' },
            { name: 'alt', type: 'text', label: 'Alt Text' },
          ],
        },
      },
      maxDepth: 1,
    }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    BlocksFeature({
      blocks: [CallToAction, Button, ProjectTabs, ProjectsList, PostsList],
      inlineBlocks: [
        {
          slug: 'mention',
          fields: [{ name: 'name', type: 'text', required: true }],
        },
      ],
    }),
    TextStateFeature({
      state: {
        size: {
          small: { label: 'Small', css: { 'font-size': '0.875rem' } },
          normal: { label: 'Normal', css: { 'font-size': '1rem' } },
          large: { label: 'Large', css: { 'font-size': '1.5rem' } },
          huge: { label: 'Huge', css: { 'font-size': '2rem' } },
          heading1: {
            label: 'Heading 1',
            css: {
              'font-size': '72px',
              'font-weight': '600',
              'line-height': '120%',
              'letter-spacing': '-1%',
            },
          },
          h9: {
            label: 'H9',
            css: { 'font-size': '16px', 'line-height': '24px', 'letter-spacing': '0%' },
          },
          poppins: {
            label: 'poppins-h5',
            css: { 'font-size': '56px', 'line-height': '100%', 'letter-spacing': '0%' },
          },
        },
        color: {
          ...defaultColors.text,
          customGrey1: { label: '#0B0C0B80-50%', css: { color: 'rgba(11, 12, 11, 0.5)' } },
          customGrey2: { label: '#0B0C0BB2-70%', css: { color: 'rgba(11, 12, 11, 0.7)' } },
        },
        background: { ...defaultColors.background },
      },
    }),
  ]
}
