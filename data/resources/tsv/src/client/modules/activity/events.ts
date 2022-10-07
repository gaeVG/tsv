// Declarations
import { IEventListener } from '@declares/events';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Activities events descriptions
const activityEvents: IEventListener[] = [
  {
    name: 'addActivity',
    module: config.moduleName,
    handler: tsv.activities.addActivity,
  },
];

export { activityEvents };
