declare module 'klaro/dist/klaro.css'

declare module 'klaro/dist/klaro-no-css' {
  type KlaroManager = {
    getConsent: (name: string) => boolean
    watch: (watcher: { update?: () => void }) => void
  }

  export function setup(config: unknown): void
  export function getManager(config: unknown): KlaroManager
}
