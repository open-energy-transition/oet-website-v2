import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  agentRules: false,
  output: 'standalone',
  redirects: async () => [{ source: '/', destination: '/admin', permanent: false }],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
