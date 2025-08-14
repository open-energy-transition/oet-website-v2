import * as migration_20250708_024151 from './20250708_024151';
import * as migration_20250709_174821 from './20250709_174821';
import * as migration_20250710_033506 from './20250710_033506';
import * as migration_20250710_034416 from './20250710_034416';
import * as migration_20250714_085625 from './20250714_085625';
import * as migration_20250718_033325 from './20250718_033325';
import * as migration_20250724_082812 from './20250724_082812';
import * as migration_20250728_032321 from './20250728_032321';
import * as migration_20250730_073154 from './20250730_073154';
import * as migration_20250802_171700 from './20250802_171700';
import * as migration_20250810_142934 from './20250810_142934';
import * as migration_20250813_074628 from './20250813_074628';

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
    name: '20250718_033325',
  },
  {
    up: migration_20250724_082812.up,
    down: migration_20250724_082812.down,
    name: '20250724_082812',
  },
  {
    up: migration_20250728_032321.up,
    down: migration_20250728_032321.down,
    name: '20250728_032321',
  },
  {
    up: migration_20250730_073154.up,
    down: migration_20250730_073154.down,
    name: '20250730_073154',
  },
  {
    up: migration_20250802_171700.up,
    down: migration_20250802_171700.down,
    name: '20250802_171700',
  },
  {
    up: migration_20250810_142934.up,
    down: migration_20250810_142934.down,
    name: '20250810_142934',
  },
  {
    up: migration_20250813_074628.up,
    down: migration_20250813_074628.down,
    name: '20250813_074628'
  },
];
