import { IEventListener } from '../../../core/declares/events';
import { IUser } from '../../../core/declares/user';
import { IZone } from '../../../core/declares/zone';
import moduleConfig from './config';

const zoneEvents: IEventListener[] = [
  {
    name: 'onEnter',
    module: moduleConfig.name,
    onNet: true,
    handler: (_, zone: IZone) => {
      console.log(zone);

      return true;
    },
  },
];

export { zoneEvents };
