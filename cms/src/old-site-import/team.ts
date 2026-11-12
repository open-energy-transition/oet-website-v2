import type { Payload } from 'payload'
import sharp from 'sharp'

import { fullName } from './context'
import { cleanRichText } from './lexical'
import { quiet } from './quiet'
import { record } from './report'
import { fetchFile, urlOf, type LegacyStaffMember } from './source'

const leadership = 'Senior Leadership'

const departmentNames: Record<string, string> = {
  'Energy System Modeling': 'Energy System Modeling',
  'Modeling Tools & Data': 'Modeling Tools & Data',
  'Software Engineering': 'Software Engineering',
  'Research & Market Development': 'Research and Market Development',
  Finance: 'Finance',
  'People & Culture': 'People and Culture',
  'Grid Data': 'Grid Data',
}

const portraitDesktop = { x: 16, y: 0, width: 248, height: 248 }
const portraitMobile = { x: 21, y: 0, width: 290, height: 290 }

const normalise = (name: string) =>
  name
    .replace(/^(Asst\. Prof\. |Prof\. |Dr\. )+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

const portraitOf = async (payload: Payload, member: LegacyStaffMember, name: string) => {
  if (!member.image) throw new Error(`${name} has no picture on the old site`)
  const filename = `old-site-team-${member.id}.png`
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })
  const found = existing.docs[0]
  if (found) return found.id
  const source = await fetchFile(member.image.url)
  const data = await sharp(source).flatten({ background: '#ffffff' }).png().toBuffer()
  const created = await payload.create({
    context: quiet(),
    collection: 'media',
    data: { alt: name },
    file: { data, mimetype: 'image/png', name: filename, size: data.byteLength },
    depth: 0,
  })
  return created.id
}

const socialLinksOf = (member: LegacyStaffMember) => {
  const email = member.email?.trim()
  const github = urlOf(member.github)
  const linkedin = urlOf(member.linkedIn)
  return [
    ...(email ? [{ kind: 'email' as const, href: `mailto:${email}` }] : []),
    ...(github ? [{ kind: 'github' as const, href: github }] : []),
    ...(linkedin ? [{ kind: 'linkedin' as const, href: linkedin }] : []),
  ]
}

export const migrateTeam = async (payload: Payload, legacy: LegacyStaffMember[]) => {
  const current = await payload.find({ collection: 'team-members', limit: 1000, depth: 0 })
  const known = new Set(current.docs.map((doc) => normalise(doc.name)))
  const departments = await payload.find({ collection: 'departments', limit: 100, depth: 0 })
  const departmentId = (legacyName: string) => {
    if (!Object.hasOwn(departmentNames, legacyName))
      throw new Error(`Old site staff category "${legacyName}" has no department`)
    const doc = departments.docs.find((item) => item.name === departmentNames[legacyName])
    if (!doc) throw new Error(`Department "${departmentNames[legacyName]}" does not exist`)
    return doc.id
  }
  let nextOrder = Math.max(0, ...current.docs.map((doc) => doc.order)) + 1

  const missing = legacy
    .filter((member) => !known.has(normalise(fullName(member))))
    .sort((a, b) => (a._order < b._order ? -1 : a._order > b._order ? 1 : 0))

  for (const member of missing) {
    const name = fullName(member)
    const categories = member.categories.map((category) => category.name)
    const role = member.jobTitle?.trim()
    if (!role) throw new Error(`${name} has no job title on the old site`)
    await payload.create({
      context: quiet(),
      collection: 'team-members',
      depth: 0,
      data: {
        name,
        lastName: member.lastName.trim(),
        role,
        departments: categories.filter((category) => category !== leadership).map(departmentId),
        socialLinks: socialLinksOf(member),
        profileLabel: 'Read Profile',
        education: member.education.map(({ degree }) => ({
          degree: degree.trim(),
          kind: /\b(phd|ph\.d|doctor|dr\.)/i.test(degree)
            ? ('doctorate' as const)
            : ('degree' as const),
        })),
        biography: member.description ? cleanRichText(member.description) : null,
        portrait: await portraitOf(payload, member, name),
        portraitDesktop,
        portraitMobile,
        portraitKind: 'photo',
        portraitRotation: 0,
        glow: 'center',
        seniorLeadership: categories.includes(leadership),
        order: nextOrder++,
      },
    })
    record({
      area: 'Team members',
      title: name,
      action: 'created',
      status: 'none',
      notes: [role, ...categories, 'country not set; choose it in the CMS for the team globe'],
    })
  }
  return missing.length
}
