import { tsv } from '../..';
import { DoorType, EntranceStateStype } from '../../../core/declares/entrance';
import { IEventListener, ServerEventNativeEnum } from '../../../core/declares/events';
import { default as moduleConfig } from './config';
import { onResourceStop, toggleEntrance } from './functions';
import { IUser } from '../../../core/declares/user';

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
