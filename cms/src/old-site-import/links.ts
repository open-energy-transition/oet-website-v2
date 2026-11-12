export interface LinkGroupLink {
  href: string
  truncate: boolean
  newTab: boolean
  disabled: boolean
  parts: { text: string; underline: boolean }[]
}

export interface LinkGroup {
  title: string
  links: LinkGroupLink[]
}

export const plainLink = (label: string, href: string): LinkGroupLink => ({
  href,
  truncate: false,
  newTab: true,
  disabled: false,
  parts: [{ text: label, underline: true }],
})

export const prefixedLink = (prefix: string, label: string, href: string): LinkGroupLink => ({
  href,
  truncate: false,
  newTab: true,
  disabled: false,
  parts: [
    { text: prefix, underline: false },
    { text: label, underline: true },
  ],
})

export const groupsOf = (groups: LinkGroup[]) => groups.filter((group) => group.links.length > 0)
