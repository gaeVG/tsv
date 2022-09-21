import { IEventListener } from '../../../core/declares/events';
import { onEnter, onLeave } from './functions';
import moduleConfig from './config';

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
