// Declarations
import { IEventListener } from '@declares/events';
// Module
import { getEntranceDoors } from './functions';
import config from './config';

// Entrance events descriptions
const entranceEvents: IEventListener[] = [
  {
    name: 'getEntranceDoors',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: getEntranceDoors,
  },
];

export { entranceEvents };
