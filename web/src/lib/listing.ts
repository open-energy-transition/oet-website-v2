export interface PageSize {
  desktop: number | null
  mobile: number | null
}

export const firstPageClass = (index: number, size: PageSize) => [
  size.mobile !== null && index >= size.mobile && 'max-lg:hidden',
  size.desktop !== null && index >= size.desktop && 'lg:hidden',
]

export const facet = (values: string[]) => values.join(' ')

export const sortByNewest = <Item>(items: Item[], dateOf: (item: Item) => string) =>
  [...items].sort((a, b) => Date.parse(dateOf(b)) - Date.parse(dateOf(a)))
