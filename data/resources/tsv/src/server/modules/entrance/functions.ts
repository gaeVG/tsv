import { Prop } from '../../../core/libs';
import { EntranceStateEnum, EntranceStateStype } from '../../../core/declares/entrance';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { IUser } from '../../../core/declares/user';
import { default as moduleConfig } from './config';
import { tsv } from '../../';

const log: LogData = {
  namespace: moduleConfig.name,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

function onResourceStop(resourceName: string) {
  if (resourceName === global.GetCurrentResourceName()) {
    tsv.entrances.All.forEach((entrance) => {
      if (entrance.state === EntranceStateEnum.CLOSE) {
        entrance.unlock();
      }
    });
  }
}

async function toggleEntrance(
  source: string,
  door: Prop | Prop[],
): Promise<[boolean, EntranceStateStype]> {
  try {
    const entrance = tsv.entrances.All.find((entrance) => entrance.target === door);
    if (entrance === undefined) return [false, null];

    if (entrance.state === EntranceStateEnum.CLOSE) {
      entrance.unlock();
    } else {
      const entraceState = await entrance.lock(tsv.users.getOneBySource(source) as IUser);
      return [entraceState !== EntranceStateEnum.OPEN, entraceState];
    }
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error.message,
    });

    return [false, null];
  }
}

export { onResourceStop, toggleEntrance };
