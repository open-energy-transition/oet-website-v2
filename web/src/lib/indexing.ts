export const indexingEnabled = (): boolean => {
  const setting = import.meta.env.SITE_INDEXING
  if (setting === 'on') return true
  if (setting === 'off') return false
  throw new Error(`SITE_INDEXING must be "on" or "off", got "${setting}"`)
}
