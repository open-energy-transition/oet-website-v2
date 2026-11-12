import { env } from './env'

export type MediaStorage = 'disk' | 'blob'

export const mediaStorage = (): MediaStorage => {
  const value = env('MEDIA_STORAGE')
  if (value !== 'disk' && value !== 'blob')
    throw new Error(`MEDIA_STORAGE must be "disk" or "blob", got "${value}"`)
  return value
}
