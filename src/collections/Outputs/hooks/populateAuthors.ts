import type { CollectionBeforeChangeHook } from 'payload'

export const populateAuthors: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if ((operation === 'create' || operation === 'update') && data.authors) {
    const authorIds = Array.isArray(data.authors) ? data.authors : [data.authors]

    const populatedAuthors = await Promise.all(
      authorIds.map(async (authorId) => {
        try {
          const id = typeof authorId === 'object' ? authorId.id : authorId
          const author = await req.payload.findByID({
            collection: 'team-members',
            id,
            depth: 0,
          })

          return {
            id: author.id,
            name: `${author.firstName} ${author.lastName}`,
          }
        } catch (error) {
          req.payload.logger.error(`Failed to populate author ${authorId}: ${error}`)
          return null
        }
      }),
    )

    data.populatedAuthors = populatedAuthors.filter(Boolean)
  }

  return data
}
