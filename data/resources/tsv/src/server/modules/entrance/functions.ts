// Native wrapper
import { Prop } from '@native/models';
// Declarations
import { EntranceStateEnum, EntranceStateStype, IEntrance, DoorType } from '@declares/entrance';
import { LogData, EnumLogContainer } from '@declares/log';
import { IUser } from '@declares/user';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: config.moduleName,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

/**
 * Listen function on 'onResourceStop' event
 * @param resourceName The name of the resource that is stopping
 */
function onResourceStop(resourceName: string): void {
  if (resourceName === global.GetCurrentResourceName()) {
    tsv.entrances.All.forEach((entrance) => {
      if (entrance.state === EntranceStateEnum.CLOSE) {
        entrance.unlock({ id: '', source: '-1' });
      }
    });
  }
}
/**
 * Find the prop inside the GamePool
 * @param {DoorType} door
 * @param {IUser} user
 * @returns The found prop
 */
async function getTargetProp(door: DoorType, user: IUser): Promise<Prop | Error> {
  try {
    const closestObject = await (tsv.events.trigger({
      name: 'getClosestObject',
      module: 'entity',
      onNet: true,
      isCallback: true,
      target: user.source,
      data: [door],
    }) as Promise<{ handle: number } | Error>);

    if (closestObject instanceof Error) {
      throw closestObject;
    }
    return new Prop(closestObject.handle);
  } catch (error) {
    console.log('une errror');
    return error;
  }
}
async function toggleEntrance(
  entrance: IEntrance,
  state: EntranceStateStype,
  user: IUser,
): Promise<boolean | Error> {
  try {
    const entranceState =
      state === EntranceStateEnum.CLOSE ? await entrance.lock(user) : await entrance.unlock(user);
    return entranceState !== state;
  } catch (error) {
    if (error instanceof Error) {
      tsv.log.error({
        ...log,
        message: error.message,
      });
    }
    return error;
  }
}

export { onResourceStop, getTargetProp, toggleEntrance };
