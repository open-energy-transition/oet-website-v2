import { AsyncLocalStorage } from 'node:async_hooks'

const previewRequests = new AsyncLocalStorage<true>()

export const inPreview = (): boolean => previewRequests.getStore() === true

export const withPreview = <Result>(run: () => Result): Result => previewRequests.run(true, run)

export const previewApiKey = (): string => {
  const key = import.meta.env.PAYLOAD_PREVIEW_API_KEY
  if (!key) throw new Error('PAYLOAD_PREVIEW_API_KEY is not set')
  return key
}

export const previewSecret = (): string => {
  const secret = import.meta.env.PREVIEW_SECRET
  if (!secret) throw new Error('PREVIEW_SECRET is not set')
  return secret
}
