import type { Access } from 'payload'

// Create separate access control functions for each collection type
// This ensures we only apply _status filter to collections with drafts

// For collections with drafts (pages, posts, projects)
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  // Apply _status filter for collections with drafts
  return {
    _status: {
      equals: 'published',
    },
  }
}

// For collections without drafts
export const authenticatedOrPublishedWithoutDrafts: Access = ({ req: { user } }) => {
  // For collections without drafts, simply allow access if authenticated
  // Otherwise, allow access to all documents (no _status field to filter on)
  return Boolean(user) || true
}
