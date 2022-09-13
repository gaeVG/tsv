// DECLARES
import { IEventListener } from '../../../core/declares/events';
// CONFIG
import moduleConfig from './config';
// TSP
import { tsp } from '../..';

// List of all activities events
const activityEvents: IEventListener[] = [
  {
    name: 'addActivity',
    module: moduleConfig.name,
    handler: tsv.activities.addActivity,
  },
];

export { activityEvents };
