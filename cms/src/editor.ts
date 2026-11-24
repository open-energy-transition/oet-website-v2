import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  TextStateFeature,
  type SerializedTextNode,
} from '@payloadcms/richtext-lexical'
import {
  TextHTMLConverterAsync,
  type HTMLConverterAsync,
  type HTMLConvertersFunctionAsync,
} from '@payloadcms/richtext-lexical/html-async'

const textStates = {
  color: {
    red: { label: 'Red', css: { color: '#e31937' } },
    'dark-red': { label: 'Dark red', css: { color: '#9b112e' } },
    grey: { label: 'Grey', css: { color: '#73716f' } },
  },
  size: {
    large: { label: 'Large text', css: { 'font-size': '1.25em' } },
    small: { label: 'Small text', css: { 'font-size': '0.875em' } },
  },
}

const stateAttributes: Record<keyof typeof textStates, string> = {
  color: 'data-text-color',
  size: 'data-text-size',
}

export const editor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((feature) => feature.key !== 'heading'),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    TextStateFeature({ state: textStates }),
  ],
})

const plainText = TextHTMLConverterAsync.text
if (typeof plainText !== 'function')
  throw new Error('Payload text HTML converter is not a function')

const stateAttributesOf = (node: SerializedTextNode): string[] => {
  const state = node.$
  if (state === undefined) return []
  return (Object.keys(stateAttributes) as (keyof typeof textStates)[]).flatMap((key) => {
    const value = state[key]
    if (typeof value !== 'string' || !Object.hasOwn(textStates[key], value)) return []
    return [`${stateAttributes[key]}="${value}"`]
  })
}

const text: HTMLConverterAsync<SerializedTextNode> = async (args) => {
  const html = await plainText(args)
  const attributes = stateAttributesOf(args.node)
  return attributes.length === 0 ? html : `<span ${attributes.join(' ')}>${html}</span>`
}

export const htmlConverters: HTMLConvertersFunctionAsync = ({ defaultConverters }) => ({
  ...defaultConverters,
  text,
})
