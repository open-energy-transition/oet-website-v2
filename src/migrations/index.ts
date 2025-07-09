import * as migration_20250708_024151 from './20250708_024151'

export const migrations = [
  {
    up: migration_20250708_024151.up,
    down: migration_20250708_024151.down,
    name: '20250708_024151',
  },
]
