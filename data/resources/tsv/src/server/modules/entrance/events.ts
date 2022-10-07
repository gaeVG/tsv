// Declarations
import { DoorType, EntranceStateStype } from '@declares/entrance';
import { IEventListener, ServerEventNativeEnum } from '@declares/events';
import { IUser } from '@declares/user';
// Module
import { onResourceStop, toggleEntrance } from './functions';
import config from './config';
// Core
import { tsv } from '@tsv';

// Entrance module events description
const entranceEvents: IEventListener[] = [
  {
    // onResourceStop event : native event when server resource stop
    name: ServerEventNativeEnum.onResourceStop,
    module: config.name,
    handler: onResourceStop,
  },
  {
    name: 'toggleEntrance',
    module: config.name,
    onNet: true,
    isCallback: true,
    handler: async (
      source: string,
      entranceTarget: DoorType | DoorType[],
      entranceState: EntranceStateStype,
    ) => {
      try {
        const entrance = tsv.entrances.All.find((entrance) =>
          Array.isArray(entranceTarget)
            ? entranceTarget.find((door, index) => door.hash === entrance.doors[index].hash)
            : entranceTarget.hash === (entrance.doors as DoorType).hash,
        );

        if (entrance === undefined) {
          throw new Error('Entrance not found');
        }

        return await toggleEntrance(
          entrance,
          entranceState,
          tsv.users.getOneBySource(source) as IUser,
        );
      } catch (error) {
        return error;
      }
    },
  },
];

export { entranceEvents };
