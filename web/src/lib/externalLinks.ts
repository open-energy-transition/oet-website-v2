const anchor = /<a\b[^>]*>/g
const href = /\shref="(https?:\/\/[^"]+)"/
const target = /\starget=/
const rel = /\srel="([^"]*)"/

const relWith = (tag: string) => {
  const current = rel.exec(tag)
  if (current === null) return tag.replace(/^<a\b/, '<a rel="noopener noreferrer"')
  const values = new Set([...current[1].split(/\s+/).filter(Boolean), 'noopener', 'noreferrer'])
  return tag.replace(rel, ` rel="${[...values].join(' ')}"`)
}

export const openExternalLinksInNewTab = (html: string, siteHost: string) =>
  html.replace(anchor, (tag) => {
    const link = href.exec(tag)
    if (link === null || target.test(tag)) return tag
    if (new URL(link[1].replaceAll('&amp;', '&')).host === siteHost) return tag
    return relWith(tag).replace(/^<a\b/, '<a target="_blank"')
  })
