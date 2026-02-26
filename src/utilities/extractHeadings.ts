import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export interface HeadingItem {
  id: string
  text: string
  level: number
}

/**
 * Generate a slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

/**
 * Extract text content from Lexical nodes recursively
 */
function extractTextFromNode(node: any): string {
  if (node.text) {
    return node.text
  }
  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child: any) => extractTextFromNode(child)).join('')
  }
  return ''
}

/**
 * Extract all headings from Lexical rich text content
 */
export function extractHeadings(data: DefaultTypedEditorState): HeadingItem[] {
  const headings: HeadingItem[] = []

  if (!data?.root?.children) {
    return headings
  }

  const processNode = (node: any) => {
    if (node.type === 'heading') {
      const text = extractTextFromNode(node)
      if (text) {
        const level = parseInt(node.tag.replace('h', ''), 10)
        const id = generateSlug(text)
        headings.push({ id, text, level })
      }
    }

    // Recursively process children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(processNode)
    }
  }

  data.root.children.forEach(processNode)

  return headings
}
