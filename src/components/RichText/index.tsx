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
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { ButtonBlock } from '@/blocks/Button/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | ButtonBlockProps
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
    const fontWeight = textState.fontWeight
    // Default handling for text nodes
    const children = node.children ? nodesToJSX({ nodes: node.children }) : null

    // Only apply styling if there's actual content and text state
    if (textState && (textState.color || textState.size || textState.background) && node.text) {
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

      return (
        <span style={{ fontWeight }} className={className.trim()}>
          {node.text || children}
        </span>
      )
    }

    return node.text || children
  }

  const customDefaultConverters = {
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    text: customTextConverter,
  }

  return {
    ...customDefaultConverters,
    blocks: {
      banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
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
