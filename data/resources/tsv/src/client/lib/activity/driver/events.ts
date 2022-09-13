import { ActivityEnum } from '../../../../core/declares/activity';
import { IEventListener } from '../../../../core/declares/events';
import { ClientEventNativeEnum } from '../../../../core/declares/events';

import { populationPedCreating } from './functions';

const driverEvents: IEventListener[] = [
  {
    name: ClientEventNativeEnum.populationPedCreating,
    module: ActivityEnum.DRIVER,
    handler: populationPedCreating,
  },
];

export { driverEvents };
