import type { CollectionAfterReadHook } from 'payload'
import { Media } from 'src/payload-types'

// Populate authors from both users and team members
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  const allAuthors: Array<{
    id: number
    name: string | null
    image: string | null
    jobTitle: string | null
  }> = []

  // Populate from users collection
  if (doc?.authors && doc?.authors?.length > 0) {
    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 1,
        })

        if (authorDoc) {
          let imageUrl: string | null = null
          if (authorDoc.image && typeof authorDoc.image === 'object') {
            imageUrl = (authorDoc.image as Media).url || null
          }
          allAuthors.push({
            id: authorDoc.id,
            name: authorDoc.name || null,
            image: imageUrl,
            jobTitle: authorDoc.jobTitle || null,
          })
        }
      } catch {
        // swallow error
      }
    }
  }

  // Populate from team-members collection
  if (doc?.teamMemberAuthors && doc?.teamMemberAuthors?.length > 0) {
    for (const author of doc.teamMemberAuthors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'team-members',
          depth: 1,
        })

        if (authorDoc) {
          let imageUrl: string | null = null
          if (authorDoc.image && typeof authorDoc.image === 'object') {
            imageUrl = (authorDoc.image as Media).url || null
          }
          const fullName = `${authorDoc.firstName} ${authorDoc.lastName}`
          allAuthors.push({
            id: authorDoc.id,
            name: fullName,
            image: imageUrl,
            jobTitle: authorDoc.jobTitle,
          })
        }
      } catch {
        // swallow error
      }
    }
  }

  if (allAuthors.length > 0) {
    doc.populatedAuthors = allAuthors
  }

  return doc
}
