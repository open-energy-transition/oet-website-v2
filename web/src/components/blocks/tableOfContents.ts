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
  const pattern = new RegExp(`<(${tags.join('|')})>([\\s\\S]*?)<\\/\\1>`, 'g')
  const output = html.replace(pattern, (_, tag: string, inner: string) => {
    const label = plain(inner)
    const id = slugify(label)
    items.push({ id, label })
    return `<${tag} id="${id}" class="scroll-mt-[38px] lg:scroll-mt-[18px]">${inner}</${tag}>`
  })
  return { html: output, items }
}
