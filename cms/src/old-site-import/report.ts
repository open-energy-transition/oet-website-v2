export interface Entry {
  area: string
  title: string
  action: 'created' | 'updated'
  status: 'published' | 'draft' | 'none'
  notes: string[]
}

const entries: Entry[] = []

export const resetReport = () => {
  entries.length = 0
}

export const record = (entry: Entry) => {
  entries.push(entry)
}

const row = (entry: Entry) =>
  `| ${entry.title.replaceAll('|', '/')} | ${entry.action} | ${entry.status} | ${entry.notes.join('; ')} |`

export const renderReport = () => {
  const areas = [...new Set(entries.map((entry) => entry.area))]
  const sections = areas.map((area) => {
    const rows = entries.filter((entry) => entry.area === area)
    return [
      `## ${area}`,
      '',
      `${rows.length} documents: ${rows.filter((entry) => entry.action === 'created').length} created, ${rows.filter((entry) => entry.status === 'draft').length} saved as draft.`,
      '',
      '| Document | Action | Status | Notes |',
      '| --- | --- | --- | --- |',
      ...rows.map(row),
    ].join('\n')
  })
  return `${[`# Old site import report`, `Run on ${new Date().toISOString()}.`, ...sections].join('\n\n')}\n`
}
