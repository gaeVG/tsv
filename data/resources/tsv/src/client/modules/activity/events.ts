// Declarations
import { IEventListener } from '@declares/events';
// Module
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Activities events descriptions
const activityEvents: IEventListener[] = [
  {
    name: 'addActivity',
    module: moduleConfig.name,
    handler: tsv.activities.addActivity,
  },
];

export { activityEvents };
