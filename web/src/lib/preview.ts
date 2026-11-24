import { AsyncLocalStorage } from 'node:async_hooks'

export type PreviewTarget =
  { kind: 'globals' } | { kind: 'document'; collection: string; slug: string }

interface PreviewRequest {
  target: PreviewTarget | null
  missing: Set<string>
}

const previewRequests = new AsyncLocalStorage<PreviewRequest>()

export const inPreview = (): boolean => previewRequests.getStore() !== undefined

export const withPreview = <Result>(run: () => Result): Result =>
  previewRequests.run({ target: null, missing: new Set() }, run)

const previewRequest = (): PreviewRequest => {
  const store = previewRequests.getStore()
  if (store === undefined) throw new Error('Not in a preview request')
  return store
}

export const setPreviewTarget = (target: PreviewTarget): void => {
  previewRequest().target = target
}

export const previewTarget = (): PreviewTarget => {
  const { target } = previewRequest()
  if (target === null) throw new Error('The preview target is not set')
  return target
}

export const markMissing = (what: string): void => {
  previewRequest().missing.add(what)
}

export const missingFields = (): string[] => [...previewRequest().missing]

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
