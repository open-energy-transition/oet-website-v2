// import type { TextMatchTransformer } from '@lexical/markdown'
import { $isTextNode } from 'lexical'
import type { ElementTransformer } from '@lexical/markdown'
// import { $createUploadNode, $isUploadNode, UploadNode } from '@payloadcms/richtext-lexical/client'

import {
  $isUploadServerNode,
  UploadServerNode,
} from 'node_modules/@payloadcms/richtext-lexical/dist/features/upload/server/nodes/UploadNode'

export const UploadMarkdownTransformer: ElementTransformer = {
  type: 'element',
  dependencies: [UploadServerNode],
  export: (_node, exportChildren, exportFormat) => {
    if (!$isUploadServerNode(_node)) {
      return null
    }
    const node: UploadServerNode = _node
    const data = node.getData()
    console.log('data', data)
    const imageUrl = data.value
    const textContent = 'Image' // Customize this as needed
    return `[${textContent}](${imageUrl})`
  },
}
