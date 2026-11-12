import type { Payload } from 'payload'

import { env } from '../env'

export const seed = async (payload: Payload) => {
  const email = env('ADMIN_EMAIL')
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) return
  await payload.create({
    collection: 'users',
    data: { email, password: env('ADMIN_PASSWORD'), name: 'Administrator', role: 'admin' },
    depth: 0,
  })
}
