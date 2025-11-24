import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'
import './styles.css'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  // BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  ContentItemsBlock as ContentItemsBlockProps,
  ProjectAimsBlock as ProjectAimsBlockProps,
  ProjectTeamBlock as ProjectTeamBlockProps,
  BlogQuoteBlock as BlogQuoteBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { ButtonBlock } from '@/blocks/Button/Component'
import { ContentItemsBlock } from '@/blocks/ContentItemsBlock'
import { ProjectAimsBlock } from '@/blocks/ProjectAimsBlock'
import { ProjectTeamBlock } from '@/blocks/ProjectTeamBlock'
import { BlogQuoteBlock } from '@/blocks/BlogQuoteBlock'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | CodeBlockProps
      | ButtonBlockProps
      | ContentItemsBlockProps
      | ProjectAimsBlockProps
      | ProjectTeamBlockProps
      | BlogQuoteBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => {
  // Customize the default converters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customTextConverter = (args: any) => {
    const { node, nodesToJSX } = args
    const textState = node.$
    // Default handling for text nodes
    const children = node.children ? nodesToJSX({ nodes: node.children }) : null

    // Check if this node has HTML element data that indicates formatting
    if (node.type === 'element') {
      if (node.tag === 'strong' || node.tag === 'b') {
        return <strong>{node.text || children}</strong>
      }
      if (node.tag === 'em' || node.tag === 'i') {
        return <em>{node.text || children}</em>
      }
    }

    // Prepare to handle all formatting together
    let result = node.text || children

    // Lexical format constants:
    // BOLD: 1 << 1 (2)
    // ITALIC: 1 << 0 (1)
    // UNDERLINE: 1 << 3 (8)
    // STRIKETHROUGH: 1 << 4 (16)
    // CODE: 1 << 5 (32)
    // SUBSCRIPT: 1 << 6 (64)
    // SUPERSCRIPT: 1 << 7 (128)
    // HIGHLIGHT: 1 << 8 (256)

    // Handle className-based styling first
    if (node.className) {
      // Direct class name mapping from Lexical editor
      if (node.className.includes('LexicalEditorTheme__textBold')) {
        result = <strong>{result}</strong>
      }
      if (node.className.includes('LexicalEditorTheme__textItalic')) {
        result = <em>{result}</em>
      }
      if (node.className.includes('LexicalEditorTheme__textUnderline')) {
        result = <u>{result}</u>
      }
      if (node.className.includes('LexicalEditorTheme__textStrikethrough')) {
        result = <s>{result}</s>
      }
    }

    // Handle format values
    // IMPORTANT: There appears to be a mismatch between the Lexical editor format values
    // and what gets sent to the API. From console logs:
    // format 1 = italic (should be bold according to Lexical docs)
    // format 2 = bold (should be italic according to Lexical docs)
    if (node.format > 0) {
      // Apply formats in the CORRECT order based on observed behavior
      // These format values appear to be flipped from what the Lexical docs suggest
      if (node.format & 1) {
        result = <strong>{result}</strong> // Format 1 is actually BOLD in our data
      }
      if (node.format & 2) {
        result = <em>{result}</em> // Format 2 is actually ITALIC in our data
      }
      if (node.format & 8) {
        result = <u>{result}</u> // Underline
      }
      if (node.format & 16) {
        result = <s>{result}</s> // Strikethrough
      }
      if (node.format & 32) {
        result = <code>{result}</code> // Code
      }
      if (node.format & 64) {
        result = <sub>{result}</sub> // Subscript
      }
      if (node.format & 128) {
        result = <sup>{result}</sup> // Superscript
      }
      if (node.format & 256) {
        result = <mark>{result}</mark> // Highlight
      }
    }

    // Handle custom styles (colors, sizes, etc.)
    if (textState) {
      // Use inline styles to directly apply the formatting from TextStateFeature
      const style: React.CSSProperties = {}

      // Handle font size
      if (textState.size) {
        switch (textState.size) {
          case 'small':
            style.fontSize = '0.875rem'
            break
          case 'normal':
            style.fontSize = '1rem'
            break
          case 'large':
            style.fontSize = '1.5rem'
            break
          case 'huge':
            style.fontSize = '2rem'
            break
          case 'heading1':
            style.fontSize = '60px'
            style.fontWeight = '600'
            style.lineHeight = '120%'
            style.letterSpacing = '-1%'
            break
          case 'h9':
            style.fontSize = '16px'
            style.lineHeight = '24px'
            style.letterSpacing = '0%'
            break
          case 'poppins':
            style.fontSize = '56px'
            style.lineHeight = '100%'
            style.letterSpacing = '0%'
            break
        }
      }

      // Handle font weight
      if (textState.fontWeight) {
        style.fontWeight = textState.fontWeight
      }

      // Handle text color
      if (textState.color) {
        if (textState.color === 'customGrey1') {
          style.color = 'rgba(11, 12, 11, 0.5)'
        } else if (textState.color === 'customGrey2') {
          style.color = 'rgba(11, 12, 11, 0.7)'
        } else {
          style.color = textState.color
        }
      }

      // Handle background color
      if (textState.background) {
        style.backgroundColor = textState.background
      }

      // Apply both style and class name for better compatibility
      let className = ''
      if (textState.color) {
        className += ` customTextState-color-${textState.color}`
      }
      if (textState.size) {
        className += ` customTextState-size-${textState.size}`
      }
      if (textState.background) {
        className += ` customTextState-background-${textState.background}`
      }

      // Apply text state styling to the result, preserving any formatting already applied
      if (Object.keys(style).length > 0 || className) {
        result = (
          <span style={style} className={className.trim() || undefined}>
            {result}
          </span>
        )
      }
    }

    // Return the final formatted result
    return result
  }

  const customDefaultConverters = {
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    text: customTextConverter,
  }

  return {
    ...customDefaultConverters,
    blocks: {
      banner: ({ node }: { node: any }) => (
        <BannerBlock className="col-start-2 mb-4" {...node.fields} />
      ),
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
      code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
      cta: ({ node }) => <CallToActionBlock {...node.fields} />,
      button: ({ node }) => <ButtonBlock {...node.fields} />,
      contentItems: ({ node }) => <ContentItemsBlock {...(node.fields as any)} />,
      projectAims: ({ node }) => <ProjectAimsBlock {...(node.fields as any)} />,
      projectTeam: ({ node }) => <ProjectTeamBlock {...(node.fields as any)} />,
      blogQuote: ({ node }) => <BlogQuoteBlock {...node.fields} />,
    },
  }
}

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
