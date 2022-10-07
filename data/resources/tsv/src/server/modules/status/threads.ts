// Declarations
import { ThreadModule } from '@declares/threads';
import { EnumLogContainer, LogData } from '@declares/log';
// Basic needs classes
import { Feed, Thrist } from '@libs/status/needs';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`,
  container: EnumLogContainer.Thread,
  isModuleDisplay: config.debug,
};

// Status module threads descriptions
const statusThreads: ThreadModule[] = [
  {
    name: 'statusTick',
    timer: 1000,
    callback: () => {
      log.location = 'statusTick()';

      try {
        tsv.users.All.forEach((user) => {
          user.status.All.forEach((status) => {
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
          ...log,
          message: error instanceof Error ? error.message : error,
        });
      }

      return true;
    },
  },
];

export { statusThreads };
