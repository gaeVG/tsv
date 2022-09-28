import { ThreadModule } from '../../../core/declares/threads';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
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
    timer: 500,
    callback: () => {
      log.location = 'zoneTick()';
      try {
        tsv.users.All.forEach((user) => {
          user.isReady &&
            tsv.zones.All.forEach(async (zone) => {
              if (zone.isInside(user.Ped.Position)) {
                if (!zone.users.includes(user)) {
                  zone.onEnter(user);
                }
              } else if (zone.users.includes(user)) {
                zone.onLeave(user);
              }
            });
        });
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
