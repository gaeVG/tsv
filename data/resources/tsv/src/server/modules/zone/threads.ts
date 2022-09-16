import { ThreadModule } from '../../../core/declares/threads';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { PolyZone } from '../../libs/zone';
import moduleConfig from './config';
import { tsv } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Thread,
  isModuleDisplay: moduleConfig.debug,
};

const zoneThreads: ThreadModule[] = [
  {
    name: 'zoneTick',
    timer: 1000,
    callback: () => {
      log.location = 'zoneTick()';

      try {
        tsv.zones.All.forEach((zone) =>
          tsv.users.All.forEach((user) => {
            if (zone.isInside(user.Ped.Position) && !zone.users.includes(user)) {
              zone.onEnter(user);
            }
          }),
        );
      } catch (error) {
        tsv.log.error({
          ...log,
          message: error instanceof Error ? error.message : error,
        });
      }

      return true;
    },
  },
];

export { zoneThreads };
