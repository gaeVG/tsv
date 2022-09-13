import { IEventListener } from '../../../core/declares/events';
import { IUser } from '../../../core/declares/user';
import { IZone } from '../../../core/declares/zone';
import moduleConfig from './config';

const zoneEvents: IEventListener[] = [
  {
    name: 'onEnterZone',
    module: moduleConfig.name,
    isCallback: true,
    handler: (_, user: IUser, zone: IZone) => {
      console.log(zone);

      return true;
    },
  },
];

export { zoneEvents };
