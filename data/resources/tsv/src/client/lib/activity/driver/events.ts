// Declarations
import { ActivityEnum } from '@declares/activity';
import { IEventListener } from '@declares/events';
import { ClientEventNativeEnum } from '@declares/events';
// Module
import { populationPedCreating } from './functions';

// Activity events descriptions
const driverEvents: IEventListener[] = [
  {
    name: ClientEventNativeEnum.populationPedCreating,
    module: ActivityEnum.DRIVER,
    handler: populationPedCreating,
  },
];

export { driverEvents };
