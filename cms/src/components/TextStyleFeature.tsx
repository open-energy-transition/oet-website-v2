'use client'

import type { ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  $getNodeByKey,
  $getState,
  $isRangeSelection,
  $isTextNode,
  $setState,
  createState,
  TextNode,
  type BaseSelection,
  type LexicalEditor,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { $forEachSelectedTextNode } from '@payloadcms/richtext-lexical/lexical/selection'
import { useEffect, type CSSProperties } from 'react'
import {
  isTextStyleValue,
  textStyleKeys,
  textStyleValues,
  type TextStyle,
  type TextStyleKey,
} from '../textStyles'

const states = Object.fromEntries(
  textStyleKeys.map((key) => [
    key,
    createState(key, {
      parse: (value) => (isTextStyleValue(key, value) ? value : undefined),
    }),
  ]),
) as Record<TextStyleKey, ReturnType<typeof createState<string, string | undefined>>>

const camelCase = (property: string) =>
  property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())

const reactStyle = (css: Record<string, string>): CSSProperties =>
  Object.fromEntries(Object.entries(css).map(([property, value]) => [camelCase(property), value]))

const box: CSSProperties = {
  alignItems: 'center',
  border: '1px solid var(--theme-elevation-250)',
  borderRadius: '4px',
  display: 'flex',
  fontSize: '13px',
  fontWeight: 600,
  height: '20px',
  justifyContent: 'center',
  width: '20px',
}

const Swatch = ({ styleKey, style }: { styleKey: TextStyleKey; style: TextStyle }) => {
  if (styleKey === 'color') {
    return <span style={{ ...box, backgroundColor: style.css.color }} />
  }
  if (styleKey === 'highlight') {
    return (
      <span style={{ ...box, backgroundColor: style.css['background-color'], color: '#302f2e' }}>
        A
      </span>
    )
  }
  return <span style={{ ...box, ...reactStyle(style.css), border: 'none' }}>A</span>
}

const ClearSwatch = () => (
  <span
    style={{
      ...box,
      background:
        'linear-gradient(to top right, transparent calc(50% - 1px), var(--theme-error-500) 50%, transparent calc(50% + 1px))',
    }}
  />
)

const ToolbarIcon = () => (
  <span style={{ ...box, border: 'none', flexDirection: 'column', fontSize: '15px', gap: '1px' }}>
    <span style={{ lineHeight: 1 }}>A</span>
    <span style={{ background: '#e31937', borderRadius: '1px', height: '3px', width: '14px' }} />
  </span>
)

const apply = (editor: LexicalEditor, key: TextStyleKey, value: string | undefined) => {
  editor.update(() => {
    $forEachSelectedTextNode((node) => {
      $setState(node, states[key], value)
    })
  })
}

const selectionHas = (selection: BaseSelection, key: TextStyleKey, value: string) => {
  if (!$isRangeSelection(selection)) return false
  const nodes = selection.getNodes().filter($isTextNode)
  return nodes.length > 0 && nodes.every((node) => $getState(node, states[key]) === value)
}

const styleItems: ToolbarGroupItem[] = textStyleKeys.flatMap((key) =>
  Object.entries(textStyleValues(key)).map(([value, style]) => ({
    ChildComponent: () => <Swatch styleKey={key} style={style} />,
    isActive: ({ selection }) => selectionHas(selection, key, value),
    key: `${key}-${value}`,
    label: style.label,
    onSelect: ({ editor }) => apply(editor, key, value),
  })),
)

const clearItem: ToolbarGroupItem = {
  ChildComponent: ClearSwatch,
  key: 'clear-style',
  label: 'Default style',
  onSelect: ({ editor }) => textStyleKeys.forEach((key) => apply(editor, key, undefined)),
  order: 1,
}

const StylePlugin = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(
    () =>
      editor.registerMutationListener(TextNode, (mutations) => {
        editor.getEditorState().read(() => {
          for (const [nodeKey, mutation] of mutations) {
            if (mutation === 'destroyed') continue
            const node = $getNodeByKey(nodeKey)
            const dom = editor.getElementByKey(nodeKey)
            if (node === null || dom === null) continue
            const css = textStyleKeys.flatMap((key) => {
              const value = $getState(node, states[key])
              return value === undefined ? [] : Object.entries(textStyleValues(key)[value].css)
            })
            dom.style.cssText = ''
            for (const [property, value] of css) dom.style.setProperty(property, value)
          }
        })
      }),
    [editor],
  )
  return null
}

const toolbar = {
  groups: [
    {
      type: 'dropdown' as const,
      ChildComponent: ToolbarIcon,
      items: [clearItem, ...styleItems],
      key: 'textStyle',
      order: 30,
    },
  ],
}

export const TextStyleFeatureClient = createClientFeature({
  plugins: [{ Component: StylePlugin, position: 'normal' }],
  toolbarFixed: toolbar,
  toolbarInline: toolbar,
})
