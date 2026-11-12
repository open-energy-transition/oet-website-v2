import type { Access, FieldAccess } from 'payload'

export const anyone: Access = () => true

export const editor: Access = ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor'

export const admin: Access = ({ req }) => req.user?.role === 'admin'

export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

export const publicRead = {
  read: anyone,
  create: editor,
  update: editor,
  delete: editor,
}

export const publishedRead = {
  read: publishedOrAuthenticated,
  create: editor,
  update: editor,
  delete: editor,
}

export const globalRead = {
  read: anyone,
  update: editor,
}

export const draftGlobalRead = {
  read: publishedOrAuthenticated,
  update: editor,
}
