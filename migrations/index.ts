import * as migration_20261009_073758_initial from './20261009_073758_initial';
import * as migration_20261009_101000_analytics_events from './20261009_101000_analytics_events';

export const migrations = [
  {
    up: migration_20261009_073758_initial.up,
    down: migration_20261009_073758_initial.down,
    name: '20261009_073758_initial'
  },
  {
    up: migration_20261009_101000_analytics_events.up,
    down: migration_20261009_101000_analytics_events.down,
    name: '20261009_101000_analytics_events'
  },
];

