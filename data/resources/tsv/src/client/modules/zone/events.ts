// Declarations
import { IEventListener } from '@declares/events';
// Module
import { onEnter, onLeave } from './functions';
import moduleConfig from './config';

// Zone module events descriptions
const zoneEvents: IEventListener[] = [
  {
    name: 'onEnter',
    module: moduleConfig.name,
    onNet: true,
    handler: onEnter,
  },
  {
    name: 'onLeave',
    module: moduleConfig.name,
    onNet: true,
    handler: onLeave,
  },
];

export { zoneEvents };
