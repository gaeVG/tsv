import { IEventListener, ServerEventNativeEnum } from '../../../core/declares/events';
import { default as moduleConfig } from './config';
import { onResourceStop, toggleEntrance } from './functions';

const entranceEvents: IEventListener[] = [
  {
    // onResourceStop event : native event when server resource stop
    name: ServerEventNativeEnum.onResourceStop,
    module: moduleConfig.name,
    handler: onResourceStop,
  },
  {
    name: 'toggleEntrance',
    module: moduleConfig.name,
    onNet: true,
    isCallback: true,
    handler: toggleEntrance,
  },
];

export { entranceEvents };
