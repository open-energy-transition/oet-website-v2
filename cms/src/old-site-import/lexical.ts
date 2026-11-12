import type { LegacyRichText, LexicalNode } from './source'

const kept = new Set([
  'paragraph',
  'text',
  'link',
  'autolink',
  'list',
  'listitem',
  'linebreak',
  'heading',
  'quote',
  'horizontalrule',
  'tab',
])

export interface EditorState {
  root: {
    type: string
    children: { type: string; version: number; [key: string]: unknown }[]
    direction: 'ltr' | 'rtl' | null
    format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
    indent: number
    version: number
  }
  [key: string]: unknown
}

const quote = (text: string): LexicalNode => ({
  type: 'quote',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: [{ type: 'text', version: 1, text, format: 0, mode: 'normal', style: '', detail: 0 }],
})

const clean = (node: LexicalNode): LexicalNode | null => {
  if (node.type === 'block') {
    const fields = node.fields as { blockType: string; description?: string }
    if (fields.blockType === 'blogQuote' && typeof fields.description === 'string')
      return quote(fields.description)
    return null
  }
  if (!kept.has(node.type)) return null
  const children = node.children?.map(clean).filter((child) => child !== null)
  if (node.type === 'heading' && node.tag === 'h1') return { ...node, tag: 'h2', children }
  return children === undefined ? { ...node } : { ...node, children }
}

const isEmpty = (node: LexicalNode) =>
  node.type === 'paragraph' && (node.children ?? []).every((child) => child.type === 'linebreak')

export const cleanNodes = (nodes: LexicalNode[]) =>
  nodes
    .map(clean)
    .filter((node) => node !== null)
    .filter((node) => !isEmpty(node))

const versioned = (node: LexicalNode) => {
  if (typeof node.version !== 'number') throw new Error(`Lexical ${node.type} node has no version`)
  return { ...node, version: node.version }
}

export const editorState = (nodes: LexicalNode[]): EditorState => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: nodes.map(versioned),
  },
})

export const cleanRichText = (value: LegacyRichText) =>
  editorState(cleanNodes(value.root.children ?? []))

export const blocksOf = (value: LegacyRichText, type: string) =>
  (value.root.children ?? [])
    .filter((node) => node.type === 'block')
    .map((node) => node.fields as { blockType: string; [key: string]: unknown })
    .filter((fields) => fields.blockType === type)
