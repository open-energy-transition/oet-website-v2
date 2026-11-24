export type TextStyle = { label: string; css: Record<string, string> }

export const textStyles = {
  color: {
    red: { label: 'Red', css: { color: '#e31937' } },
    'dark-red': { label: 'Dark red', css: { color: '#9b112e' } },
    'deep-red': { label: 'Deep red', css: { color: '#52091d' } },
    grey: { label: 'Grey', css: { color: '#73716f' } },
    'near-black': { label: 'Near black', css: { color: '#191918' } },
  },
  highlight: {
    'soft-red': { label: 'Soft red highlight', css: { 'background-color': '#fcece8' } },
    'soft-grey': { label: 'Soft grey highlight', css: { 'background-color': '#edece9' } },
  },
  size: {
    large: { label: 'Large text', css: { 'font-size': '1.25em' } },
    small: { label: 'Small text', css: { 'font-size': '0.875em' } },
  },
} satisfies Record<string, Record<string, TextStyle>>

export type TextStyleKey = keyof typeof textStyles

export const textStyleKeys = Object.keys(textStyles) as TextStyleKey[]

export const isTextStyleValue = (key: TextStyleKey, value: unknown): value is string =>
  typeof value === 'string' && Object.hasOwn(textStyleValues(key), value)

export const textStyleValues = (key: TextStyleKey): Record<string, TextStyle> => textStyles[key]
