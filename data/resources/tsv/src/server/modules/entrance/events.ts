import { IEventListener, ServerEventNativeEnum } from '../../../core/declares/events';
import { default as moduleConfig } from './config';
import { tsv } from '../..';
import { EntranceStateEnum } from '../../../core/declares/entrance';

const entranceEvents: IEventListener[] = [
  {
    // onResourceStop event : native event when server resource stop
    name: ServerEventNativeEnum.onResourceStop,
    module: moduleConfig.name,
    handler: (resourceName) => {
      if (resourceName === global.GetCurrentResourceName()) {
        tsv.entrances.All.forEach((entrance) => {
          if (entrance.state === EntranceStateEnum.CLOSE) {
            entrance.unlock();
          }
        });
      }
    },
  },
];

export { entranceEvents };
