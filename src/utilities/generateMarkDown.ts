import { createHeadlessEditor } from '@lexical/headless'
import { $generateNodesFromDOM } from '@lexical/html'
import { getEnabledNodes, sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import configPromise from '@payload-config'
import { $convertToMarkdownString } from '@lexical/markdown'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultEditorConfig, defaultEditorFeatures } from '@payloadcms/richtext-lexical' // <= make sure this package is installed

import { UploadMarkdownTransformer } from './uploadMarkTrans'

type Props = any

export const getMarkdownFromLexical = async ({ nodes }: Props): Promise<string> => {
  // Still some problems...

  // console.log('nodess', nodes)

  // const initialEditorState = await loadContent()

  const payloadConfig = await configPromise
  const yourEditorConfig = defaultEditorConfig
  yourEditorConfig.features = [
    ...defaultEditorFeatures,
    // Add your custom features here
  ]
  const editorConfig = await sanitizeServerEditorConfig(yourEditorConfig, payloadConfig)

  const editor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig,
    }),
    // editorState: nodes,
  })

  const t = editor.parseEditorState(nodes)

  editor.setEditorState(t)

  const editorState = editor.getEditorState()
  console.log('Editor State:', editorState.toJSON())

  // console.log(editorState.isEmpty())

  let markdown: string
  editor.getEditorState().read(() => {
    markdown = $convertToMarkdownString([
      ...editorConfig?.features?.markdownTransformers,
      UploadMarkdownTransformer,
    ])
    // markdown = $convertToMarkdownString(markdownTransformers)
    // markdown = $convertToMarkdownString()
    console.log('markdown', markdown)
  })

  return ''
}
