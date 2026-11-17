export interface TocItem {
  id: string
  label: string
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const plain = (html: string) =>
  html
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export const headingId = (label: string) => slugify(label)

type HeadingTag = 'h2' | 'h3' | 'h4'

export const withHeadingIds = (
  html: string,
  tags: HeadingTag[],
): { html: string; items: TocItem[] } => {
  const items: TocItem[] = []
  const bases: string[] = []
  const pattern = new RegExp(`<(${tags.join('|')})(\\s[^>]*)?>([\\s\\S]*?)<\\/\\1>`, 'g')
  const output = html.replace(
    pattern,
    (match: string, tag: string, attributes: string | undefined, inner: string) => {
      const label = plain(inner)
      const base = slugify(label)
      if (base === '') return match
      const count = bases.filter((seen) => seen === base).length
      bases.push(base)
      const id = count === 0 ? base : `${base}-${count + 1}`
      items.push({ id, label })
      const kept = attributes === undefined ? '' : attributes.replace(/\s(?:id|class)="[^"]*"/g, '')
      return `<${tag}${kept} id="${id}" class="scroll-mt-[38px] lg:scroll-mt-[18px]">${inner}</${tag}>`
    },
  )
  return { html: output, items }
}
