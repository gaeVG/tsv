// Declarations
import { IEventListener } from '@declares/events';
// Module
import { getEntranceDoors } from './functions';
import moduleConfig from './config';

// Entrance events descriptions
const entranceEvents: IEventListener[] = [
  {
    name: 'getEntranceDoors',
    module: moduleConfig.name,
    onNet: true,
    isCallback: true,
    handler: getEntranceDoors,
  },
];

export { entranceEvents };
