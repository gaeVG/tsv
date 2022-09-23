import { IEventListener } from '../../../core/declares/events';
import {
  getGamePool,
  getEntityHeading,
  setEntityHeading,
  setEntityHealth,
  setEntityArmor,
  setEntityFreezePosition,
} from './function';

const entityEvents: IEventListener[] = [
  {
    name: 'getGamePool',
    module: 'entity',
    onNet: true,
    isCallback: true,
    handler: getGamePool,
  },
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
  {
    name: 'setEntityFreezePosition',
    module: 'entity',
    onNet: true,
    isCallback: true,
    handler: setEntityFreezePosition,
  },
];

export { entityEvents };
