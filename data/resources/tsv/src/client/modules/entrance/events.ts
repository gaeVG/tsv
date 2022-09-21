import { IEventListener } from '../../../core/declares/events';
import { getEntranceDoors } from './functions';
import moduleConfig from './config';

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
