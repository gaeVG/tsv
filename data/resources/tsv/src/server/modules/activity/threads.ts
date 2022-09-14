import { ThreadModule } from '../../../core/declares/threads';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { Feed, Thrist } from '../../../core/libs/status/needs';
import moduleConfig from './config';
import { tsv } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Thread,
  isModuleDisplay: moduleConfig.debug,
};

const activityThreads: ThreadModule[] = [
  {
    name: 'activityTick',
    timer: 1000,
    callback: () => {
      log.location = 'activityTick()';
      try {
        tsv.users.All.map((user) => {});
      } catch (error) {
        tsv.log.error({
          namespace: 'status',
          container: EnumLogContainer.Thread,
          location: 'statusTick()',
          message: error instanceof Error ? error.message : error,
        });
      }

      return true;
    },
  },
];

export { activityThreads };
