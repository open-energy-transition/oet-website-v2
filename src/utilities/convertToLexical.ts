import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown'

import { createHeadlessEditor } from '@lexical/headless'
import { $generateNodesFromDOM } from '@lexical/html'
import { getEnabledNodes, sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import configPromise from '@payload-config'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultEditorConfig, defaultEditorFeatures } from '@payloadcms/richtext-lexical' // <= make sure this package is installed

type Props = {
  markdownString: string
}

export const getLexicalFromMarkDown = async ({ markdownString }: Props): Promise<string> => {
  const payloadConfig = await configPromise
  const yourEditorConfig = { ...defaultEditorConfig }

  yourEditorConfig.features = [
    ...defaultEditorFeatures,
    // Add your custom features here
  ]

  const editorConfig = await sanitizeServerEditorConfig(yourEditorConfig, payloadConfig)
  const transformers = editorConfig?.features?.markdownTransformers
  //   const transformers = TRANSFORMERS

  const editor = createHeadlessEditor({
    nodes: getEnabledNodes({ editorConfig }),
  })

  //   editor.setEditorState($convertFromMarkdownString(markdownString, transformers))
  editor.update(
    () => {
      // Convert Markdown to editor state
      console.log('markdownString', markdownString)
      $convertFromMarkdownString(markdownString, transformers)

      // Debug: log the editor state to see if children exist
      const editorState = editor.getEditorState()
      console.log('Editor State (after update):', editorState.toJSON())

      // Convert the updated editor state back to markdown
      //   const convertedMarkdown = $convertToMarkdownString(editorState, transformers)
    },
    { discrete: true },
  )

  return new Promise((resolve) => {})
}
