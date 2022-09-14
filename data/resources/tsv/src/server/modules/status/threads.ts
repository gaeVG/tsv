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

const statusThreads: ThreadModule[] = [
  {
    name: 'statusTick',
    timer: 1000,
    callback: () => {
      log.location = 'statusTick()';
      try {
        tsv.users.All.map((user) => {
          user.status.All.map((status) => {
            if (status instanceof Feed || status instanceof Thrist) {
              user.status.updateOne({
                ...status,
                value: (status.value as number) - status.consume,
              });
            }
          });
          tsv.events.trigger({
            name: 'playerStatusUpdate',
            module: 'status',
            onNet: true,
            target: user.source,
            data: [user.status.getAll()],
          });
        });
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

export { statusThreads };
