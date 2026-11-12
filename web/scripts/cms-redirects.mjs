export const cmsRedirects = () => ({
  name: 'oet-cms-redirects',
  hooks: {
    'astro:config:setup': async ({ command, updateConfig }) => {
      if (command !== 'build' && command !== 'dev') return
      const base = process.env.PAYLOAD_URL
      if (!base) throw new Error('PAYLOAD_URL is not set')
      const response = await fetch(new URL('/api/redirects?limit=0&depth=0', base))
      if (!response.ok) throw new Error(`CMS redirects answered ${response.status}`)
      const { docs } = await response.json()
      const redirects = {}
      for (const { from, to, statusCode } of docs) {
        if (!/^\/(?!\/)[^\s?#]*$/.test(from)) throw new Error(`Invalid redirect source: ${from}`)
        if (!/^\/(?!\/)|^https?:\/\//.test(to))
          throw new Error(`Invalid redirect destination: ${to}`)
        if (from === to) throw new Error(`Redirect points to itself: ${from}`)
        if (statusCode !== '301' && statusCode !== '302')
          throw new Error(`Invalid redirect status: ${statusCode}`)
        if (from in redirects) throw new Error(`Duplicate redirect: ${from}`)
        redirects[from] = { destination: to, status: Number(statusCode) }
      }
      for (const source of Object.keys(redirects)) {
        const visited = new Set([source])
        let target = redirects[source].destination
        while (target in redirects) {
          if (visited.has(target)) throw new Error(`Redirect cycle from ${source}`)
          visited.add(target)
          target = redirects[target].destination
        }
      }
      updateConfig({ redirects })
    },
  },
})
