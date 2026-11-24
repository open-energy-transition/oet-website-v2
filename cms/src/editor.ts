import {
  createServerFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  type SerializedTextNode,
} from '@payloadcms/richtext-lexical'
import {
  TextHTMLConverterAsync,
  type HTMLConverterAsync,
  type HTMLConvertersFunctionAsync,
} from '@payloadcms/richtext-lexical/html-async'
import { isTextStyleValue, textStyleKeys } from './textStyles'

const TextStyleFeature = createServerFeature({
  feature: { ClientFeature: './components/TextStyleFeature#TextStyleFeatureClient' },
  key: 'textStyle',
})

export const editor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((feature) => feature.key !== 'heading'),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    TextStyleFeature(),
  ],
})

const plainText = TextHTMLConverterAsync.text
if (typeof plainText !== 'function')
  throw new Error('Payload text HTML converter is not a function')

const styleAttributesOf = (node: SerializedTextNode): string[] => {
  const state = node.$
  if (state === undefined) return []
  return textStyleKeys.flatMap((key) => {
    const value = state[key]
    return isTextStyleValue(key, value) ? [`data-text-${key}="${value}"`] : []
  })
}

const text: HTMLConverterAsync<SerializedTextNode> = async (args) => {
  const html = await plainText(args)
  const attributes = styleAttributesOf(args.node)
  return attributes.length === 0 ? html : `<span ${attributes.join(' ')}>${html}</span>`
}

export const htmlConverters: HTMLConvertersFunctionAsync = ({ defaultConverters }) => ({
  ...defaultConverters,
  text,
})
