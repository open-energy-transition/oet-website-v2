import * as migration_20250708_024151 from './20250708_024151';
import * as migration_20250709_174821 from './20250709_174821';
import * as migration_20250710_033506 from './20250710_033506';
import * as migration_20250710_034416 from './20250710_034416';
import * as migration_20250714_085625 from './20250714_085625';
import * as migration_20250718_033325 from './20250718_033325';

export const migrations = [
  {
    up: migration_20250708_024151.up,
    down: migration_20250708_024151.down,
    name: '20250708_024151',
  },
  {
    up: migration_20250709_174821.up,
    down: migration_20250709_174821.down,
    name: '20250709_174821',
  },
  {
    up: migration_20250710_033506.up,
    down: migration_20250710_033506.down,
    name: '20250710_033506',
  },
  {
    up: migration_20250710_034416.up,
    down: migration_20250710_034416.down,
    name: '20250710_034416',
  },
  {
    up: migration_20250714_085625.up,
    down: migration_20250714_085625.down,
    name: '20250714_085625',
  },
  {
    up: migration_20250718_033325.up,
    down: migration_20250718_033325.down,
    name: '20250718_033325'
  },
];
