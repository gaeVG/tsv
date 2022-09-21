import { IEventListener } from '../../../core/declares/events';
import { getEntityHeading, setEntityHeading, setEntityHealth, setEntityArmor } from './function';

const entityEvents: IEventListener[] = [
  {
    name: 'getEntityHeading',
    module: 'entity',
    onNet: true,
    isCallback: true,
    handler: getEntityHeading,
  },
  {
    name: 'setEntityHeading',
    module: 'entity',
    onNet: true,
    isCallback: true,
    handler: setEntityHeading,
  },
  {
    name: 'setEntityHealth',
    module: 'entity',
    onNet: true,
    isCallback: true,
    handler: setEntityHealth,
  },
  {
    name: 'setEntityArmor',
    module: 'entity',
    onNet: true,
    handler: setEntityArmor,
  },
];

export { entityEvents };
